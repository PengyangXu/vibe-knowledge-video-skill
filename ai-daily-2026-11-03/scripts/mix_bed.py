#!/usr/bin/env python3
"""Mix Maia v4 under a flat bed. Does not loudnorm the voice (that would undo the flattened read)."""
import math
import re
import subprocess
import sys
import wave
from pathlib import Path

import numpy as np

SR = 48000
FPS = 30
TOTAL_FRAMES = 1750  # ceil(58.32 * 30)
N = TOTAL_FRAMES * SR // FPS


def decode(path: str) -> np.ndarray:
    raw = subprocess.check_output(
        ["ffmpeg", "-v", "error", "-i", path, "-ac", "1", "-ar", str(SR), "-f", "f32le", "-"]
    )
    return np.frombuffer(raw, np.float32).copy()


def bed(n: int) -> np.ndarray:
    t = np.arange(n, dtype=np.float64) / SR
    rng = np.random.default_rng(11)
    trem = 1.0 + 0.025 * np.sin(2 * math.pi * 0.05 * t)
    pad = (
        0.62 * np.sin(2 * math.pi * 110.00 * t)
        + 0.26 * np.sin(2 * math.pi * 164.81 * t + 0.3)
        + 0.16 * np.sin(2 * math.pi * 130.81 * t + 0.8)
    )
    noise = rng.normal(0, 1, n)
    acc = 0.0
    lp = np.empty(n, dtype=np.float64)
    for i, v in enumerate(noise):
        acc = 0.992 * acc + 0.008 * v
        lp[i] = acc
    sig = trem * (pad + 0.22 * lp)
    sig -= sig.mean()
    fade_in = int(0.35 * SR)
    fade_out = int(0.45 * SR)
    sig[:fade_in] *= np.linspace(0, 1, fade_in)
    sig[-fade_out:] *= np.linspace(1, 0, fade_out)
    rms = float(np.sqrt(np.mean(sig ** 2)) + 1e-12)
    sig *= (10 ** (-28 / 20)) / rms
    return sig.astype(np.float32)


def measure(path: str) -> dict:
    r = subprocess.run(
        ["ffmpeg", "-hide_banner", "-nostats", "-i", path, "-af", "ebur128=peak=true:framelog=verbose", "-f", "null", "-"],
        capture_output=True,
        text=True,
    )
    err = r.stderr
    I = re.findall(r"I:\s+(-?[\d.]+) LUFS", err)
    lra = re.findall(r"LRA:\s+(-?[\d.]+) LU", err)
    tp = re.findall(r"Peak:\s+(-?[\d.]+) dBFS", err)
    short = [float(x) for x in re.findall(r"S:\s*(-?\d+(?:\.\d+)?)", err)]
    short = [s for s in short if s > -60]
    return {
        "I": float(I[-1]) if I else None,
        "LRA": float(lra[-1]) if lra else None,
        "TP": float(tp[-1]) if tp else None,
        "S": short,
        "raw_tail": "\n".join(err.splitlines()[-18:]),
    }


def write_wav(path: Path, stereo: np.ndarray) -> None:
    pcm = np.clip(stereo, -1, 1)
    ints = (pcm * 32767.0).astype(np.int16)
    interleaved = ints.reshape(-1)
    with wave.open(str(path), "wb") as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(interleaved.tobytes())


def main() -> None:
    src = Path(sys.argv[1])
    dst = Path(sys.argv[2])
    voice = decode(str(src))
    if len(voice) < N:
        voice = np.pad(voice, (0, N - len(voice)))
    else:
        voice = voice[:N]
    music = bed(N)
    # Drop the bed another 8 dB so the voice stays the loudness story.
    music *= 10 ** (-8 / 20)
    mix = voice + music
    # Dual-mono into stereo sums +3 dB on EBU R128. Pull back so the
    # stereo file matches the mono master's integrated loudness.
    mix *= 10 ** (-3.0 / 20.0)
    peak = float(np.max(np.abs(mix)))
    tp_lin = 10 ** (-1.6 / 20)
    if peak > tp_lin:
        mix *= tp_lin / peak
        print(f"scaled mix to hold TP, peak was {20*math.log10(peak):.2f} dBFS")
    else:
        print(f"peak {20*math.log10(max(peak,1e-9)):.2f} dBFS, no limiter")
    stereo = np.stack([mix, mix], axis=1)
    dst.parent.mkdir(parents=True, exist_ok=True)
    write_wav(dst, stereo)
    stats = measure(str(dst))
    s = stats["S"]
    if s:
        arr = np.array(s)
        print(
            f"short-term n={len(arr)} min={arr.min():.2f} p5={np.percentile(arr,5):.2f} "
            f"median={np.median(arr):.2f} p95={np.percentile(arr,95):.2f} max={arr.max():.2f} "
            f"span={arr.max()-arr.min():.2f}"
        )
    print(f"I={stats['I']} LRA={stats['LRA']} TP={stats['TP']}")
    print(stats["raw_tail"])
    # voice-only reference
    vpath = dst.with_name("voice-ref.wav")
    write_wav(vpath, np.stack([voice, voice], axis=1))
    vst = measure(str(vpath))
    print(f"VOICE I={vst['I']} LRA={vst['LRA']} TP={vst['TP']}")
    vpath.unlink(missing_ok=True)


if __name__ == "__main__":
    main()
