import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { BUTTON_Y, fsec, Range } from "./timing";

export const SANS = '"Noto Sans CJK SC", "Noto Sans CJK TC", "Noto Sans", sans-serif';
export const SERIF = '"Noto Serif CJK SC", "Noto Serif CJK TC", "Noto Serif", serif';

export const IVORY = "#f7f2e8";
export const GOLD = "#e8c48a";
export const CYAN = "#9adfff";
export const MINT = "#b9f3cb";
export const INK = "#121820";
export const STAMP = "#e23b32";

export const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };

export const FS = {
  hero: 66,
  num: 116,
  sub: 48,
  question: 48,
  button: 38,
  tag: 32,
  corner: 30,
};

export function appear(frame: number, at: number, dur = 10): number {
  const x = interpolate(frame, [at, at + dur], [0, 1], clamp);
  return 1 - Math.pow(1 - x, 3);
}

export function pulse(frame: number, at: number, dur: number): number {
  return interpolate(frame, [at, at + dur * 0.35, at + dur], [0, 1, 0], clamp);
}

export function shock(frame: number, at: number, amp = 12): number {
  const d = frame - at;
  if (d < 0 || d > 12) return 0;
  return Math.sin(d * 1.7) * (1 - d / 12) * amp;
}

export function flashAlpha(frame: number, at: number): number {
  const d = frame - at;
  if (d < 0 || d > 5) return 0;
  return (1 - d / 5) * 0.2;
}

export function rangeOpacity(frame: number, range: Range | null, holdOut = false): number {
  if (!range) return 0;
  const fade = 7;
  const a = fsec(range[0]);
  const b = fsec(range[1]);
  if (frame < a || frame > b) return 0;
  const inn = interpolate(frame, [a, Math.min(b, a + fade)], [0, 1], clamp);
  if (holdOut) return inn;
  const out = interpolate(frame, [Math.max(a, b - fade), b], [1, 0], clamp);
  return Math.min(inn, out);
}

export function exitDrop(frame: number, range: Range | null): number {
  if (!range) return 0;
  const b = fsec(range[1]);
  return interpolate(frame, [b - 8, b], [0, 86], clamp);
}

export function sceneOpacity(frame: number, from: number, to: number, edgeIn: boolean, edgeOut: boolean): number {
  const fade = 7;
  const a = fsec(from);
  const b = fsec(to);
  if (frame < a - fade - 1 || frame > b + fade + 1) return 0;
  let o = 1;
  if (!edgeIn) o = interpolate(frame, [a - fade, a + fade], [0, 1], clamp);
  if (!edgeOut) o = Math.min(o, interpolate(frame, [b - fade, b + fade], [1, 0], clamp));
  return o;
}

export function bandOpacity(frame: number, from: number, to: number, edgeIn: boolean, edgeOut: boolean): number {
  return sceneOpacity(frame, from, to, edgeIn, edgeOut);
}

const Sheen: React.FC = () => {
  const frame = useCurrentFrame();
  const x = interpolate(frame % 150, [0, 150], [-180, 520], clamp);
  return (
    <div
      style={{
        position: "absolute",
        top: -40,
        bottom: -40,
        width: 90,
        left: x,
        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)",
        transform: "skewX(-18deg)",
        pointerEvents: "none",
      }}
    />
  );
};

export const Glass: React.FC<{ children: React.ReactNode; style?: React.CSSProperties; glow?: string }> = ({
  children,
  style,
  glow,
}) => {
  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        background:
          "linear-gradient(165deg, rgba(255,255,255,0.2), rgba(28,38,52,0.78) 36%, rgba(16,22,32,0.84))",
        border: "1px solid rgba(255,255,255,0.24)",
        borderRadius: 28,
        boxShadow:
          "0 28px 70px rgba(0,0,0,0.38), inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -16px 36px rgba(0,0,0,0.22)" +
          (glow ? ", 0 0 42px " + glow : ""),
        ...style,
      }}
    >
      <Sheen />
      {children}
    </div>
  );
};

export const Choice: React.FC<{ label: string; state: "idle" | "hot" | "dim"; press: number }> = ({
  label,
  state,
  press,
}) => {
  const bg =
    state === "hot"
      ? "linear-gradient(180deg, rgba(198,255,214,0.34), rgba(18,46,34,0.88))"
      : "linear-gradient(180deg, rgba(255,255,255,0.18), rgba(16,22,32,0.82))";
  const border = state === "hot" ? "1px solid rgba(198,255,214,0.9)" : "1px solid rgba(255,255,255,0.3)";
  return (
    <div
      style={{
        width: 440,
        textAlign: "center",
        fontFamily: SANS,
        fontWeight: 700,
        fontSize: FS.button,
        color: state === "dim" ? "rgba(247,242,232,0.42)" : IVORY,
        padding: "22px 18px",
        borderRadius: 20,
        background: bg,
        border,
        transform: "scale(" + (1 - press * 0.06) + ")",
        boxShadow: "0 18px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.45)",
        letterSpacing: 1,
      }}
    >
      {label}
      {state === "hot" ? <span style={{ marginLeft: 10, color: MINT }}>✓</span> : null}
    </div>
  );
};

export const ButtonDock: React.FC<{ opacity: number; drop: number; shake?: number; children: React.ReactNode }> = ({
  opacity,
  drop,
  shake,
  children,
}) => {
  if (opacity <= 0.001) return null;
  return (
    <div
      style={{
        position: "absolute",
        top: BUTTON_Y,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        gap: 24,
        opacity,
        transform: "translateY(" + drop + "px) rotate(" + (shake || 0) + "deg)",
      }}
    >
      {children}
    </div>
  );
};

export const Flash: React.FC<{ alpha: number }> = ({ alpha }) => {
  if (alpha <= 0) return null;
  return <div style={{ position: "absolute", inset: 0, background: "#fff", opacity: alpha, pointerEvents: "none" }} />;
};

export const Vignette: React.FC = () => {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        background: "radial-gradient(ellipse at 50% 42%, transparent 46%, rgba(0,0,0,0.55) 100%)",
      }}
    />
  );
};

export const Grain: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        opacity: 0.09,
        backgroundImage: "radial-gradient(rgba(255,255,255,0.7) 0.6px, transparent 0.7px)",
        backgroundSize: "3px 3px",
        backgroundPosition: (frame % 3) + "px " + ((frame * 2) % 5) + "px",
      }}
    />
  );
};
