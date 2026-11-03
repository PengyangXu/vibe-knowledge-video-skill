import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame } from "remotion";
import { FONT } from "./font";

export const FPS = 30;
export const INK = "#2a1b12";
export const CINNABAR = "#c4452d";
export const CREAM = "#f7f1e6";
export const MUTED = "#6d5848";

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

export function appear(frame: number, t0: number, start: number): number {
  const delay = Math.round((start - t0) * FPS);
  if (delay <= 0) return 1;
  return spring({
    frame: frame - delay,
    fps: FPS,
    config: { damping: 14, stiffness: 140, mass: 0.62 },
  });
}

export const Card: React.FC<{
  children: React.ReactNode;
  enter?: number;
  tone?: "paper" | "glass";
  style?: React.CSSProperties;
  tilt?: number;
}> = ({ children, enter = 1, tone = "paper", style, tilt = 0 }) => {
  const e = Math.max(0, enter);
  const shown = Math.min(1, e);
  const paper = tone === "paper";
  return (
    <div
      style={{
        opacity: shown,
        transform: `translateY(${(1 - shown) * 28}px) rotate(${tilt}deg) scale(${0.96 + shown * 0.04})`,
        background: paper
          ? "linear-gradient(180deg, #fffaf3 0%, #f4e7d4 100%)"
          : "linear-gradient(180deg, rgba(24,16,12,0.92), rgba(14,10,8,0.88))",
        color: paper ? INK : CREAM,
        borderRadius: 28,
        padding: "22px 26px",
        boxShadow: paper
          ? "0 24px 50px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.9)"
          : "0 24px 50px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.16)",
        border: paper
          ? "1px solid rgba(90,60,30,0.16)"
          : "1px solid rgba(255,226,196,0.18)",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export const Hero: React.FC<{
  children: React.ReactNode;
  size?: number;
  color?: string;
  align?: "left" | "center";
}> = ({ children, size = 66, color, align = "center" }) => (
  <div
    style={{
      fontFamily: FONT,
      fontWeight: 700,
      fontSize: size,
      lineHeight: 1.22,
      textAlign: align,
      color,
    }}
  >
    {children}
  </div>
);

export const Sub: React.FC<{
  children: React.ReactNode;
  size?: number;
  color?: string;
  align?: "left" | "center";
}> = ({ children, size = 48, color, align = "center" }) => (
  <div
    style={{
      fontFamily: FONT,
      fontWeight: 700,
      fontSize: size,
      lineHeight: 1.3,
      textAlign: align,
      color,
    }}
  >
    {children}
  </div>
);

export const Plate: React.FC<{
  src: string;
  dur: number;
  push?: number;
  scrim?: "dark" | "mid";
  hold?: boolean;
}> = ({ src, dur, push = 1, scrim = "dark", hold = false }) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, Math.max(dur, 1)], [1.05, 1.14], clamp);
  const drift = interpolate(frame, [0, Math.max(dur, 1)], [0, -48 * push], clamp);
  const fadeIn = interpolate(frame, [0, 8], [0, 1], clamp);
  const fadeOut = hold ? 1 : interpolate(frame, [dur - 10, dur], [1, 0], clamp);
  const wash =
    scrim === "dark"
      ? "linear-gradient(180deg, rgba(7,5,4,0.5) 0%, rgba(7,5,4,0.08) 34%, rgba(7,5,4,0.12) 62%, rgba(7,5,4,0.52) 100%)"
      : "linear-gradient(180deg, rgba(28,16,8,0.42) 0%, rgba(28,16,8,0.12) 34%, rgba(28,16,8,0.16) 68%, rgba(28,16,8,0.5) 100%)";
  return (
    <div style={{ position: "absolute", inset: 0, opacity: Math.min(fadeIn, fadeOut), overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: -60 }}>
        <Img
          src={staticFile(`bg/${src}`)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `scale(${scale}) translateY(${drift}px)`,
          }}
        />
      </div>
      <div style={{ position: "absolute", inset: 0, background: wash }} />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 42%, rgba(255,186,110,0.16), transparent 58%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${staticFile("grain.png")})`,
          backgroundSize: "180px 180px",
          opacity: 0.2,
          mixBlendMode: "overlay",
        }}
      />
    </div>
  );
};

export const Dock: React.FC<{
  opacity?: number;
  question?: string;
  children: React.ReactNode;
}> = ({ opacity = 1, question, children }) => (
  <div
    style={{
      position: "absolute",
      left: 72,
      right: 72,
      bottom: 300,
      opacity,
      display: "flex",
      flexDirection: "column",
      gap: 14,
    }}
  >
    {question ? (
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 700,
          fontSize: 48,
          textAlign: "center",
          color: CREAM,
          textShadow: "0 8px 24px rgba(0,0,0,0.45)",
        }}
      >
        {question}
      </div>
    ) : null}
    {children}
  </div>
);

export const Btn: React.FC<{ label: string; hot?: boolean; dim?: boolean }> = ({
  label,
  hot = false,
  dim = false,
}) => (
  <div
    style={{
      height: 78,
      borderRadius: 40,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: FONT,
      fontWeight: 700,
      fontSize: 38,
      color: hot ? "#fff8f4" : INK,
      background: hot
        ? "linear-gradient(180deg, #e4634a 0%, #b43322 100%)"
        : "linear-gradient(180deg, #fffaf3 0%, #eadcc6 100%)",
      boxShadow: hot
        ? "0 14px 28px rgba(160,40,20,0.35), inset 0 1px 0 rgba(255,255,255,0.35)"
        : "0 12px 24px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.9)",
      transform: hot ? "scale(0.98)" : "scale(1)",
      opacity: dim ? 0.45 : 1,
    }}
  >
    {label}
  </div>
);

export const Stage: React.FC<{
  children: React.ReactNode;
  top?: number;
  justify?: "center" | "flex-start";
}> = ({ children, top = 150, justify = "center" }) => (
  <div
    style={{
      position: "absolute",
      top,
      left: 68,
      right: 68,
      bottom: 300,
      display: "flex",
      flexDirection: "column",
      justifyContent: justify,
      gap: 18,
    }}
  >
    {children}
  </div>
);
