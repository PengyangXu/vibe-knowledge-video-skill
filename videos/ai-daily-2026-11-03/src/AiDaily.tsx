import React from "react";
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import {
  AnthropicCard,
  CardShell,
  GdpxCard,
  LongCatCard,
  QovestCard,
  SenseCard,
} from "./cards";
import { FONT_FAMILY } from "./fonts";
import { CARD_H, CARD_TOP, CYAN, GRAY, INK, MUTED, WHITE, clamp } from "./theme";
import {
  FPS,
  HITS,
  ITEMS,
  OPEN_END,
  OUTRO,
  SLAM,
  TOTAL_FRAMES,
  capAt,
  itemAt,
  sec,
} from "./timing";

const ease = (t: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, t)), 3);

export const AiDaily: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const item = itemAt(t);
  const outro = t >= OUTRO;

  return (
    <AbsoluteFill style={{ background: INK, fontFamily: FONT_FAMILY, overflow: "hidden" }}>
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse 980px 820px at 50% 38%, #1a3c52 0%, #102433 42%, #071018 78%)",
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(61,220,255,0.05) 0%, rgba(0,0,0,0) 18%, rgba(0,0,0,0.18) 100%)",
        }}
      />
      {item ? <ItemView itemId={item.id} t={t} frame={frame} /> : null}
      {outro ? <Outro frame={frame - sec(OUTRO)} /> : null}
      {t < OPEN_END ? <Open frame={frame} /> : null}
      {item && t < item.start ? <Hook n={item.id} local={frame - sec(item.hook)} /> : null}
      <Dock t={t} />
      <Audio src={staticFile("vo.mp3")} />
      <Audio
        src={staticFile("music.wav")}
        volume={(f) => {
          const inn = interpolate(f, [0, 10], [0, 1], clamp);
          const out = interpolate(f, [TOTAL_FRAMES - 18, TOTAL_FRAMES], [1, 0], clamp);
          return 0.11 * inn * out;
        }}
      />
      {HITS.map((h, i) => (
        <Sequence key={i} from={sec(h.at)} durationInFrames={36}>
          <Audio src={staticFile(`sfx/${h.name}.wav`)} volume={h.volume} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};

const Open: React.FC<{ frame: number }> = ({ frame }) => {
  const a = (from: number) => ease(interpolate(frame, [from, from + 6], [0, 1], clamp));
  return (
    <AbsoluteFill style={{ zIndex: 6, alignItems: "center" }}>
      <div style={{ marginTop: 470, textAlign: "center", width: 940 }}>
        <div
          style={{
            opacity: a(0),
            transform: `translateY(${(1 - a(0)) * -16}px)`,
            color: CYAN,
            fontSize: 32,
            fontWeight: 700,
            letterSpacing: 8,
          }}
        >
          DAILY BRIEFING
        </div>
        <div
          style={{
            marginTop: 28,
            opacity: a(3),
            transform: `scale(${0.96 + 0.04 * a(3)})`,
            color: WHITE,
            fontSize: 92,
            fontWeight: 700,
            letterSpacing: 1,
            lineHeight: 1.05,
          }}
        >
          AI日报 11.03
        </div>
        <div style={{ marginTop: 18, opacity: a(6), color: GRAY, fontSize: 36, fontWeight: 700 }}>
          星期二
        </div>
        <div
          style={{
            margin: "36px auto 0",
            width: 860 * a(8),
            height: 3,
            background: CYAN,
            boxShadow: "0 0 16px rgba(61,220,255,0.8)",
          }}
        />
        <div
          style={{
            marginTop: 36,
            opacity: a(9),
            transform: `translateY(${(1 - a(9)) * 18}px)`,
            color: WHITE,
            fontSize: 44,
            fontWeight: 700,
          }}
        >
          国产 LongCat 上桌
        </div>
        <div
          style={{
            marginTop: 14,
            opacity: a(12),
            transform: `translateY(${(1 - a(12)) * 18}px)`,
            color: CYAN,
            fontSize: 44,
            fontWeight: 700,
          }}
        >
          干活评测卡 12%
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Hook: React.FC<{ n: number; local: number }> = ({ n, local }) => {
  const p = ease(interpolate(local, [0, 14], [0, 1], clamp));
  const text = ease(interpolate(local, [1, 5, 10, 16], [0, 1, 1, 0], clamp));
  return (
    <AbsoluteFill style={{ zIndex: 8, pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          left: `${p * 100}%`,
          right: 0,
          top: 0,
          bottom: 210,
          background: "#061018",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: `calc(${p * 100}% - 16px)`,
          top: 0,
          bottom: 210,
          width: 22,
          background: CYAN,
          boxShadow: "0 0 28px #3DDCFF",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 700,
          textAlign: "center",
          opacity: text,
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "8px 36px 14px",
            borderRadius: 22,
            background: "rgba(5,12,20,0.88)",
            border: "2px solid rgba(61,220,255,0.55)",
            transform: `scale(${0.94 + 0.06 * text})`,
            color: WHITE,
            fontSize: 96,
            fontWeight: 700,
            letterSpacing: 6,
            boxShadow: "0 16px 40px rgba(0,0,0,0.45)",
          }}
        >
          第<span style={{ color: CYAN }}>{n}</span>件
        </div>
      </div>
    </AbsoluteFill>
  );
};

const ItemView: React.FC<{ itemId: 1 | 2 | 3 | 4 | 5; t: number; frame: number }> = ({
  itemId,
  t,
  frame,
}) => {
  const item = ITEMS[itemId - 1];
  const shown = capAt(item, t);
  const enter = ease(interpolate(frame, [sec(item.hook), sec(item.hook) + 7], [0, 1], clamp));
  return (
    <AbsoluteFill style={{ zIndex: 2, opacity: enter, transform: `translateY(${(1 - enter) * 18}px)` }}>
      <Giant n={item.id} />
      <div style={{ position: "absolute", top: 148, left: 72 }}>
        <div
          style={{
            height: 50,
            padding: "0 18px",
            borderRadius: 8,
            border: "1.5px solid rgba(61,220,255,0.75)",
            background: "rgba(61,220,255,0.08)",
            color: CYAN,
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: 2.5,
            display: "flex",
            alignItems: "center",
          }}
        >
          {item.category}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: 216,
          left: 72,
          width: 936,
          color: WHITE,
          fontSize: 50,
          fontWeight: 700,
          lineHeight: 1.22,
          letterSpacing: 0.2,
          textShadow: "0 2px 16px rgba(0,0,0,0.65)",
        }}
      >
        {item.title}
      </div>
      <div style={{ position: "absolute", top: CARD_TOP, left: 72 }}>
        <CardShell
          frame={frame}
          url={
            item.id === 1
              ? "docs.anthropic.com"
              : item.id === 2
                ? "longcat.ai"
                : item.id === 3
                  ? "sensetime.com/sensenova"
                  : item.id === 4
                    ? "console.aliyun.com"
                    : "semianalysis.com"
          }
        >
          {item.id === 1 ? <AnthropicCard t={t} /> : null}
          {item.id === 2 ? <LongCatCard t={t} /> : null}
          {item.id === 3 ? <SenseCard /> : null}
          {item.id === 4 ? <QovestCard /> : null}
          {item.id === 5 ? <GdpxCard t={t} /> : null}
        </CardShell>
      </div>
      <div
        style={{
          position: "absolute",
          top: CARD_TOP + CARD_H + 22,
          left: 72,
          width: 936,
          textAlign: "center",
          color: GRAY,
          fontSize: 34,
          fontWeight: 700,
          zIndex: 3,
        }}
      >
        {item.judgment}
      </div>
      {shown ? (
        <div
          style={{
            position: "absolute",
            top: CARD_TOP + CARD_H + 78,
            left: 0,
            width: 1080,
            display: "flex",
            justifyContent: "center",
            zIndex: 4,
          }}
        >
          <Capsule text={shown.cap.text} local={frame - sec(shown.cap.t)} punch={!!shown.cap.punch} />
        </div>
      ) : null}
    </AbsoluteFill>
  );
};

const Giant: React.FC<{ n: number }> = ({ n }) => (
  <div
    style={{
      position: "absolute",
      left: 0,
      right: 0,
      top: 1468,
      textAlign: "center",
      fontSize: 250,
      fontWeight: 700,
      lineHeight: 0.86,
      letterSpacing: -8,
      color: "rgba(61,220,255,0.04)",
      WebkitTextStroke: "3px rgba(125,220,255,0.32)",
      zIndex: 1,
    }}
  >
    0{n}
    <span style={{ fontSize: 72, letterSpacing: 0, WebkitTextStroke: "2px rgba(125,220,255,0.26)" }}>/05</span>
  </div>
);

const Capsule: React.FC<{ text: string; local: number; punch: boolean }> = ({ text, local, punch }) => {
  const a = ease(interpolate(local, [0, 6], [0, 1], clamp));
  const pop = punch ? 1 + 0.06 * (1 - ease(interpolate(local, [0, 8], [0, 1], clamp))) : 1;
  return (
    <div
      style={{
        opacity: a,
        transform: `translateY(${(1 - a) * 16}px) scale(${(0.96 + 0.04 * a) * pop})`,
        height: 100,
        padding: "0 40px",
        borderRadius: 999,
        background: "rgba(6,16,26,0.78)",
        border: "2.5px solid #3DDCFF",
        boxShadow: "0 0 28px rgba(61,220,255,0.32), inset 0 0 16px rgba(61,220,255,0.12)",
        color: WHITE,
        fontSize: 42,
        fontWeight: 700,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        letterSpacing: 0.4,
      }}
    >
      {text}
    </div>
  );
};

const Dock: React.FC<{ t: number }> = ({ t }) => {
  const item = itemAt(t);
  const lit = t >= OUTRO ? 5 : item ? item.id : 0;
  const flash = t >= SLAM && t < SLAM + 0.28 && t < OUTRO;
  return (
    <div style={{ position: "absolute", left: 72, right: 72, top: 1744, zIndex: 12 }}>
      <div style={{ display: "flex", gap: 14 }}>
        {[0, 1, 2, 3, 4].map((i) => {
          const on = flash || i < lit;
          const current = !flash && i === lit - 1;
          return (
            <div
              key={i}
              style={{
                flex: 1,
                height: 16,
                borderRadius: 99,
                background: flash ? "#F4FDFF" : current ? CYAN : on ? "rgba(61,220,255,0.55)" : "rgba(255,255,255,0.14)",
                boxShadow: current || flash ? "0 0 16px rgba(61,220,255,0.85)" : "none",
              }}
            />
          );
        })}
      </div>
      <div
        style={{
          marginTop: 18,
          textAlign: "center",
          color: "#D7E2EC",
          fontSize: 28,
          fontWeight: 700,
          letterSpacing: 3,
        }}
      >
        AI DAILY · 11.03
      </div>
    </div>
  );
};

const Outro: React.FC<{ frame: number }> = ({ frame }) => {
  const a = (from: number) => ease(interpolate(frame, [from, from + 6], [0, 1], clamp));
  const loop = (frame % 48) / 48;
  return (
    <AbsoluteFill style={{ zIndex: 4, alignItems: "center" }}>
      <div style={{ marginTop: 520, width: 920, textAlign: "center" }}>
        <div style={{ opacity: a(0), color: CYAN, fontSize: 30, fontWeight: 700, letterSpacing: 7 }}>
          DAILY BRIEFING
        </div>
        <div style={{ marginTop: 22, opacity: a(2), color: WHITE, fontSize: 84, fontWeight: 700 }}>
          AI日报 11.03
        </div>
        <div
          style={{
            margin: "28px auto 0",
            width: 280,
            height: 3,
            background: CYAN,
            opacity: 0.7 + 0.3 * Math.sin(loop * Math.PI),
            boxShadow: "0 0 16px rgba(61,220,255,0.7)",
          }}
        />
        <div style={{ marginTop: 36, opacity: a(4), color: WHITE, fontSize: 64, fontWeight: 700 }}>
          以上就是今天的 AI 日报
        </div>
        <div style={{ marginTop: 18, opacity: a(6), color: CYAN, fontSize: 40, fontWeight: 700 }}>
          明天继续五件
        </div>
        <div style={{ marginTop: 48, opacity: a(8), color: MUTED, fontSize: 32, fontWeight: 700 }}>
          国产 LongCat 上桌｜干活评测卡 12%
        </div>
      </div>
    </AbsoluteFill>
  );
};
