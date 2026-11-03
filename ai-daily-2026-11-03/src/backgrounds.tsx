import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { BGS } from "./timing";
import { CYAN, GOLD, MINT, bandOpacity } from "./ui";

const Drift: React.FC<{ children: React.ReactNode; frame: number; tint?: string }> = ({ children, frame, tint }) => {
  const x = Math.sin(frame / 74) * 12;
  const y = Math.cos(frame / 96) * 8;
  return (
    <AbsoluteFill style={{ transform: "translate(" + x + "px," + y + "px) scale(1.06)", background: tint }}>
      {children}
    </AbsoluteFill>
  );
};

const Pool: React.FC<{ x: string; y: string; color: string; size?: number }> = ({ x, y, color, size }) => {
  const s = size || 780;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: s,
        height: s,
        marginLeft: -s / 2,
        marginTop: -s / 2,
        borderRadius: "50%",
        background: "radial-gradient(circle, " + color + " 0%, transparent 68%)",
        pointerEvents: "none",
      }}
    />
  );
};

const Monitor: React.FC<{ left: number; top: number; w: number; h: number; hue: string; lines: number[][] }> = ({
  left,
  top,
  w,
  h,
  hue,
  lines,
}) => {
  const frame = useCurrentFrame();
  const blink = frame % 20 < 10 ? 1 : 0.25;
  return (
    <div
      style={{
        position: "absolute",
        left,
        top,
        width: w,
        height: h,
        borderRadius: 16,
        background: "linear-gradient(180deg, #0e141c, #1a2432)",
        border: "8px solid #2a313c",
        boxShadow: "0 24px 50px rgba(0,0,0,0.35), 0 0 40px " + hue,
        overflow: "hidden",
      }}
    >
      <div style={{ height: 28, background: "#121820", display: "flex", gap: 6, alignItems: "center", paddingLeft: 12 }}>
        <i style={{ width: 8, height: 8, borderRadius: 8, background: "#e07a6a", display: "block" }} />
        <i style={{ width: 8, height: 8, borderRadius: 8, background: "#e2c16a", display: "block" }} />
        <i style={{ width: 8, height: 8, borderRadius: 8, background: "#7dcea0", display: "block" }} />
      </div>
      <div style={{ padding: 14 }}>
        {lines.map((row, ri) => (
          <div key={ri} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
            {row.map((width, ci) => (
              <div
                key={ci}
                style={{
                  width,
                  height: 10,
                  borderRadius: 6,
                  background: ci % 3 === 0 ? CYAN : ci % 3 === 1 ? GOLD : MINT,
                  opacity: 0.75,
                }}
              />
            ))}
          </div>
        ))}
        <div style={{ width: 10, height: 16, background: CYAN, opacity: blink, marginTop: 6 }} />
      </div>
      <div
        style={{
          position: "absolute",
          top: -20,
          left: interpolateSafe(frame),
          width: 80,
          height: h + 40,
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.14), transparent)",
          transform: "skewX(-16deg)",
        }}
      />
    </div>
  );
};

function interpolateSafe(frame: number): number {
  return -40 + ((frame * 3) % 420);
}

const Desk: React.FC<{ frame: number; night: boolean; low?: boolean }> = ({ frame, night, low }) => {
  const monTop = low ? 40 : 150;
  const monH = low ? 150 : 250;
  return (
    <Drift frame={frame} tint={night ? "#182230" : "#1c2634"}>
      <Pool x="18%" y="22%" color="rgba(120,180,220,0.28)" size={640} />
      <Pool x="78%" y="78%" color="rgba(232,180,110,0.22)" size={700} />
      <Monitor
        left={70}
        top={monTop}
        w={low ? 380 : 420}
        h={monH}
        hue="rgba(120,200,255,0.35)"
        lines={low ? [[80, 100], [40, 140], [90, 70]] : [[90, 140, 60], [40, 180, 100], [120, 70, 150], [80, 200]]}
      />
      <Monitor
        left={low ? 560 : 560}
        top={monTop + 24}
        w={low ? 340 : 380}
        h={monH - 20}
        hue="rgba(232,196,138,0.25)"
        lines={low ? [[70, 90], [120, 40]] : [[70, 120], [160, 50, 80], [40, 140, 90]]}
      />
      <div
        style={{
          position: "absolute",
          left: -40,
          right: -40,
          top: 1180,
          height: 820,
          background: "linear-gradient(180deg, #3a3128 0%, #2a241e 40%, #1c1916 100%)",
          transform: "perspective(900px) rotateX(18deg)",
          boxShadow: "inset 0 1px 0 rgba(255,220,180,0.25)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 80,
          right: 80,
          top: 1210,
          height: 2,
          background: "linear-gradient(90deg, transparent, rgba(255,220,180,0.45), transparent)",
        }}
      />
    </Drift>
  );
};

const Ide: React.FC<{ frame: number }> = ({ frame }) => {
  return (
    <Drift frame={frame} tint="#1a2634">
      <Pool x="50%" y="40%" color="rgba(90,160,210,0.22)" size={900} />
      <Pool x="20%" y="78%" color="rgba(80,140,190,0.16)" size={520} />
    </Drift>
  );
};

const ThreadBg: React.FC<{ frame: number }> = ({ frame }) => {
  const slide = (frame * 6) % 1080;
  return (
    <Drift frame={frame} tint="#162433">
      <Pool x="30%" y="46%" color="rgba(80,210,255,0.22)" size={860} />
      <Pool x="80%" y="30%" color="rgba(180,140,255,0.12)" size={500} />
      <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
        <path d="M40 760 C 280 700, 520 820, 1040 740" stroke="rgba(154,223,255,0.85)" strokeWidth={3} fill="none" />
        <path d="M40 760 C 280 700, 520 820, 1040 740" stroke="rgba(154,223,255,0.25)" strokeWidth={16} fill="none" />
        <circle cx={80 + slide * 0.85} cy={750} r={7} fill="#f7f2e8" />
      </svg>
    </Drift>
  );
};

const Assist: React.FC<{ frame: number }> = ({ frame }) => {
  return (
    <Drift frame={frame} tint="#182e30">
      <Pool x="70%" y="38%" color="rgba(120,230,190,0.2)" size={760} />
      <Pool x="24%" y="72%" color="rgba(80,160,170,0.14)" size={520} />
    </Drift>
  );
};

const Lab: React.FC<{ frame: number }> = ({ frame }) => {
  return (
    <Drift frame={frame} tint="#1e2c36">
      <Pool x="50%" y="22%" color="rgba(210,230,240,0.28)" size={900} />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 1180,
          height: 280,
          background: "linear-gradient(180deg, #5c6c78, #3a4852 40%, #1c262e)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6)",
        }}
      />
    </Drift>
  );
};

const ScrollRoom: React.FC<{ frame: number }> = ({ frame }) => {
  return (
    <Drift frame={frame} tint="#241e18">
      <Pool x="50%" y="48%" color="rgba(232,196,150,0.28)" size={860} />
      <div
        style={{
          position: "absolute",
          left: 160,
          top: 380,
          width: 760,
          height: 980,
          borderRadius: 40,
          background: "linear-gradient(180deg, rgba(80,62,44,0.2), rgba(40,30,22,0.45))",
          border: "1px solid rgba(255,220,180,0.2)",
        }}
      />
    </Drift>
  );
};

const Vault: React.FC<{ frame: number }> = ({ frame }) => {
  const ajar = 8 + Math.sin(frame / 40) * 2;
  return (
    <Drift frame={frame} tint="#1c2226">
      <Pool x="50%" y="46%" color="rgba(232,170,90,0.16)" size={700} />
      <div
        style={{
          position: "absolute",
          left: 250,
          top: 200,
          width: 580,
          height: 580,
          borderRadius: "50%",
          background: "radial-gradient(circle at 40% 40%, #6a737a, #2a3136 62%, #15191c)",
          boxShadow: "0 30px 80px rgba(0,0,0,0.4), inset 0 0 0 18px #1b2126",
          transform: "rotate(" + ajar + "deg)",
        }}
      >
        {new Array(10).fill(0).map((_, i) => {
          const ang = (i / 10) * Math.PI * 2;
          return (
            <i
              key={i}
              style={{
                position: "absolute",
                left: 270 + Math.cos(ang) * 236,
                top: 270 + Math.sin(ang) * 236,
                width: 22,
                height: 22,
                borderRadius: 22,
                background: "radial-gradient(circle at 35% 35%, #d5dde2, #5c666c)",
              }}
            />
          );
        })}
        <div
          style={{
            position: "absolute",
            left: 400,
            top: 210,
            width: 28,
            height: 160,
            borderRadius: 8,
            background: "linear-gradient(90deg, #c8a15a, #8a6a32)",
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          left: 860,
          top: 420,
          width: 40,
          height: 520,
          background: "linear-gradient(90deg, rgba(255,200,120,0.0), rgba(255,190,100,0.55), rgba(255,200,120,0))",
          filter: "blur(6px)",
        }}
      />
    </Drift>
  );
};

const Recap: React.FC<{ frame: number }> = ({ frame }) => {
  return (
    <Drift frame={frame} tint="#1a2432">
      <Pool x="30%" y="42%" color="rgba(120,170,220,0.2)" />
      <Pool x="72%" y="48%" color="rgba(232,180,90,0.16)" />
      <div style={{ position: "absolute", left: 90, top: 520, width: 380, height: 28, borderRadius: 20, background: "rgba(255,255,255,0.08)" }} />
      <div style={{ position: "absolute", right: 90, top: 520, width: 380, height: 28, borderRadius: 20, background: "rgba(255,255,255,0.08)" }} />
    </Drift>
  );
};

const Cabinet: React.FC<{ frame: number }> = ({ frame }) => {
  return (
    <Drift frame={frame} tint="#24323c">
      <Pool x="50%" y="30%" color="rgba(230,240,245,0.35)" size={980} />
      <div
        style={{
          position: "absolute",
          left: 180,
          top: 280,
          width: 720,
          height: 860,
          borderRadius: 24,
          background: "linear-gradient(180deg, rgba(255,255,255,0.16), rgba(180,200,210,0.05))",
          border: "2px solid rgba(255,255,255,0.38)",
          boxShadow: "inset 0 0 80px rgba(255,255,255,0.12), 0 30px 60px rgba(0,0,0,0.25)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 220,
          top: 320,
          width: 18,
          height: 760,
          background: "linear-gradient(180deg, rgba(255,255,255,0.45), transparent)",
        }}
      />
    </Drift>
  );
};

const Gate: React.FC<{ frame: number }> = ({ frame }) => {
  return (
    <Drift frame={frame} tint="#1e2830">
      <Pool x="50%" y="24%" color="rgba(200,220,230,0.22)" size={800} />
      <div
        style={{
          position: "absolute",
          left: -80,
          right: -80,
          top: 1080,
          height: 900,
          background: "linear-gradient(180deg, #3e4850, #1a2024)",
          transform: "perspective(800px) rotateX(28deg)",
        }}
      />
      <div style={{ position: "absolute", left: 250, top: 640, width: 46, height: 460, borderRadius: 10, background: "linear-gradient(90deg, #d5dde2, #6d787f)" }} />
      <div style={{ position: "absolute", left: 784, top: 640, width: 46, height: 460, borderRadius: 10, background: "linear-gradient(90deg, #d5dde2, #6d787f)" }} />
    </Drift>
  );
};

const Office: React.FC<{ frame: number }> = ({ frame }) => {
  const sun = 280 + Math.sin(frame / 80) * 70;
  return (
    <Drift frame={frame} tint="#2a2018">
      <Pool x={sun + "px"} y="220px" color="rgba(255,214,160,0.38)" size={860} />
      <div
        style={{
          position: "absolute",
          left: -40,
          right: -40,
          top: 1120,
          height: 860,
          background: "linear-gradient(180deg, #6a4630, #3e291c 50%, #24160f)",
          transform: "perspective(900px) rotateX(16deg)",
          boxShadow: "inset 0 1px 0 rgba(255,230,200,0.35)",
        }}
      />
      </Drift>
  );
};

const Confetti: React.FC<{ frame: number }> = ({ frame }) => {
  const colors = ["#ff5d73", "#ffd166", "#7ae0c2", "#8eb6ff", "#f2f2f2"];
  return (
    <Drift frame={frame} tint="#221820">
      <Pool x="50%" y="40%" color="rgba(255,180,140,0.18)" size={900} />
      {new Array(18).fill(0).map((_, i) => {
        const y = ((frame * (2 + (i % 4)) + i * 90) % 1600) - 200;
        const fade = Math.max(0, 1 - (frame - 100.62 * 30) / 80);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 40 + ((i * 57) % 980),
              top: y,
              width: 16,
              height: 36 + (i % 3) * 10,
              borderRadius: 4,
              background: colors[i % colors.length],
              opacity: 0.85 * (0.4 + fade),
              transform: "rotate(" + (i * 28 + frame) + "deg)",
            }}
          />
        );
      })}
    </Drift>
  );
};

const Kanban: React.FC<{ frame: number }> = ({ frame }) => {
  return (
    <Drift frame={frame} tint="#2c241c">
      <Pool x="50%" y="30%" color="rgba(255,220,180,0.16)" size={800} />
      {[
        [700, 160],
        [860, 240],
        [680, 400],
        [870, 470],
      ].map((spot, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: spot[0],
            top: spot[1] + Math.sin(frame / 30 + i) * 2,
            width: 180,
            height: 130,
            background: "linear-gradient(180deg, #f4ecdf, #e4d8c4)",
            boxShadow: "0 12px 24px rgba(0,0,0,0.25)",
            transform: "rotate(" + ((i - 2) * 2) + "deg)",
          }}
        >
          <div style={{ height: 18, background: i % 2 ? "rgba(226,59,50,0.75)" : "rgba(80,120,160,0.7)" }} />
          <div style={{ margin: 18, height: 8, width: "70%", background: "rgba(40,30,20,0.25)", borderRadius: 4 }} />
          <div style={{ margin: "10px 18px", height: 8, width: "48%", background: "rgba(40,30,20,0.18)", borderRadius: 4 }} />
        </div>
      ))}
    </Drift>
  );
};

const PIECES: { id: string; node: (frame: number) => React.ReactNode }[] = [
  { id: "desk", node: (frame) => <Desk frame={frame} night /> },
  { id: "ide", node: (frame) => <Ide frame={frame} /> },
  { id: "thread", node: (frame) => <ThreadBg frame={frame} /> },
  { id: "assist", node: (frame) => <Assist frame={frame} /> },
  { id: "lab", node: (frame) => <Lab frame={frame} /> },
  { id: "scroll", node: (frame) => <ScrollRoom frame={frame} /> },
  { id: "vault", node: (frame) => <Vault frame={frame} /> },
  { id: "recap", node: (frame) => <Recap frame={frame} /> },
  { id: "cabinet", node: (frame) => <Cabinet frame={frame} /> },
  { id: "gate", node: (frame) => <Gate frame={frame} /> },
  { id: "office", node: (frame) => <Office frame={frame} /> },
  { id: "confetti", node: (frame) => <Confetti frame={frame} /> },
  { id: "kanban", node: (frame) => <Kanban frame={frame} /> },
  { id: "desk2", node: (frame) => <Desk frame={frame} night={false} low /> },
];

export const Backgrounds: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      {PIECES.map((piece, i) => {
        const seg = BGS[i];
        const o = bandOpacity(frame, seg.from, seg.to, i === 0, i === PIECES.length - 1);
        if (o <= 0.001) return null;
        return (
          <AbsoluteFill key={piece.id} style={{ opacity: o }}>
            {piece.node(frame)}
          </AbsoluteFill>
        );
      })}
    </AbsoluteFill>
  );
};
