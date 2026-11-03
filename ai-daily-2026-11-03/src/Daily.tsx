import React from "react";
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Backgrounds } from "./backgrounds";
import { S01, S02, S03, S04, S05, S06, S07 } from "./scenes";
import { TOTAL, fsec } from "./timing";
import { Grain, IVORY, SANS, Vignette, clamp } from "./ui";

const HITS: { at: number; name: string; volume: number }[] = [
  { at: 0.25, name: "whoosh", volume: 0.32 },
  { at: 1.2, name: "whoosh", volume: 0.28 },
  { at: 2.3, name: "tick", volume: 0.3 },
  { at: 4.28, name: "thud", volume: 0.5 },
  { at: 4.4, name: "pop", volume: 0.26 },
  { at: 6.15, name: "whoosh", volume: 0.24 },
  { at: 13.25, name: "tick", volume: 0.26 },
  { at: 14.2, name: "pop", volume: 0.32 },
  { at: 15.75, name: "whoosh", volume: 0.22 },
  { at: 16.25, name: "whoosh", volume: 0.36 },
  { at: 25.8, name: "pop", volume: 0.4 },
  { at: 33.45, name: "tick", volume: 0.22 },
  { at: 39.25, name: "tick", volume: 0.24 },
  { at: 39.95, name: "pop", volume: 0.28 },
  { at: 41.2, name: "pop", volume: 0.28 },
  { at: 42.6, name: "whoosh", volume: 0.2 },
  { at: 43.3, name: "shimmer", volume: 0.26 },
  { at: 48.3, name: "whoosh", volume: 0.28 },
  { at: 61.75, name: "tick", volume: 0.28 },
  { at: 65.45, name: "thud", volume: 0.4 },
  { at: 73.1, name: "whoosh", volume: 0.3 },
  { at: 77.75, name: "pop", volume: 0.38 },
  { at: 80.25, name: "thud", volume: 0.36 },
  { at: 81.65, name: "tick", volume: 0.4 },
  { at: 90.4, name: "pop", volume: 0.22 },
  { at: 97.1, name: "whoosh", volume: 0.18 },
  { at: 101.5, name: "whoosh", volume: 0.26 },
  { at: 103.1, name: "boom", volume: 0.38 },
  { at: 107.3, name: "thud", volume: 0.34 },
  { at: 107.85, name: "whoosh", volume: 0.18 },
  { at: 108.5, name: "thud", volume: 0.42 },
  { at: 112.9, name: "thud", volume: 0.4 },
  { at: 113.95, name: "thud", volume: 0.42 },
  { at: 115.0, name: "thud", volume: 0.46 },
  { at: 115.6, name: "pop", volume: 0.28 },
  { at: 117.65, name: "shimmer", volume: 0.3 },
];

export const Daily: React.FC = () => {
  const frame = useCurrentFrame();
  const bed = Math.min(
    interpolate(frame, [0, 18], [0, 0.1], clamp),
    interpolate(frame, [TOTAL - 40, TOTAL], [0.1, 0], clamp),
  );
  return (
    <AbsoluteFill style={{ background: "#182230", fontFamily: SANS, color: IVORY }}>
      <Backgrounds />
      <Vignette />
      <S01 />
      <S02 />
      <S03 />
      <S04 />
      <S05 />
      <S06 />
      <S07 />
      <Grain />
      <Audio src={staticFile("vo.mp3")} />
      <Audio src={staticFile("music.mp3")} volume={bed} />
      {HITS.map((hit, i) => (
        <Sequence key={i} from={fsec(hit.at)} durationInFrames={80}>
          <Audio src={staticFile("sfx/" + hit.name + ".wav")} volume={hit.volume} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
