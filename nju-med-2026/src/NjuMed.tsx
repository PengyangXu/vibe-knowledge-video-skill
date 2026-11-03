import React from "react";
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { FONT } from "./font";
import { Btn, CINNABAR, CREAM, Card, Dock, FPS, Hero, INK, MUTED, Plate, Stage, Sub, appear } from "./ui";

export const TOTAL = Math.ceil(157.728 * FPS);

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

type Shot = {
  id: string;
  t0: number;
  t1: number;
  bg: string;
  scrim: "dark" | "mid";
  push: number;
};

const SHOTS: Shot[] = [
  { id: "s01a", t0: 0, t1: 3.35, bg: "bg-campus-night.jpg", scrim: "dark", push: 1 },
  { id: "s01b", t0: 3.35, t1: 8.38, bg: "bg-med-building.jpg", scrim: "dark", push: 1 },
  { id: "s02a", t0: 8.38, t1: 18.65, bg: "bg-desk-lamp.jpg", scrim: "mid", push: -1 },
  { id: "s02b", t0: 18.65, t1: 32, bg: "bg-paper.jpg", scrim: "mid", push: 1 },
  { id: "s02c", t0: 32, t1: 41.74, bg: "bg-lab.jpg", scrim: "mid", push: 1 },
  { id: "s03a", t0: 41.74, t1: 55.5, bg: "bg-study-room.jpg", scrim: "dark", push: 1 },
  { id: "s03b", t0: 55.5, t1: 66.09, bg: "bg-river.jpg", scrim: "dark", push: -1 },
  { id: "s04a", t0: 66.09, t1: 73.72, bg: "bg-dim.jpg", scrim: "dark", push: 1 },
  { id: "s04b", t0: 73.72, t1: 84, bg: "bg-hospital.jpg", scrim: "dark", push: 1 },
  { id: "s04c", t0: 84, t1: 87.97, bg: "bg-clinic.jpg", scrim: "dark", push: -1 },
  { id: "s04d", t0: 87.97, t1: 95.75, bg: "bg-exam.jpg", scrim: "dark", push: 1 },
  { id: "s05a", t0: 95.75, t1: 106.54, bg: "bg-paper.jpg", scrim: "mid", push: -1 },
  { id: "s05b", t0: 106.54, t1: 116.56, bg: "bg-med-building.jpg", scrim: "dark", push: 1 },
  { id: "s05c", t0: 116.56, t1: 126.45, bg: "bg-study-room.jpg", scrim: "dark", push: -1 },
  { id: "s06a", t0: 126.45, t1: 134.14, bg: "bg-desk-lamp.jpg", scrim: "mid", push: 1 },
  { id: "s06b", t0: 134.14, t1: 138.6, bg: "bg-lab.jpg", scrim: "mid", push: 1 },
  { id: "s06c", t0: 138.6, t1: 143.83, bg: "bg-river.jpg", scrim: "dark", push: 1 },
  { id: "s06d", t0: 143.83, t1: 147.83, bg: "bg-dim.jpg", scrim: "dark", push: -1 },
  { id: "s07", t0: 147.83, t1: 157.728, bg: "bg-campus-night.jpg", scrim: "dark", push: -1 },
];

const SFX: { t: number; name: string; volume: number }[] = [
  { t: 3.35, name: "thud", volume: 0.34 },
  { t: 5.01, name: "thud", volume: 0.36 },
  { t: 6.71, name: "boom", volume: 0.32 },
  { t: 7.15, name: "pop", volume: 0.2 },
  { t: 41.74, name: "whoosh", volume: 0.12 },
  { t: 45.81, name: "tick", volume: 0.26 },
  { t: 47.57, name: "tick", volume: 0.24 },
  { t: 50.31, name: "tick", volume: 0.24 },
  { t: 53.03, name: "tick", volume: 0.22 },
  { t: 58.2, name: "pop", volume: 0.2 },
  { t: 92.29, name: "thud", volume: 0.38 },
  { t: 95.75, name: "whoosh", volume: 0.12 },
  { t: 99.74, name: "note_1", volume: 0.14 },
  { t: 101.21, name: "note_3", volume: 0.14 },
  { t: 103.4, name: "note_5", volume: 0.14 },
  { t: 104.86, name: "note_6", volume: 0.14 },
  { t: 145.4, name: "pop", volume: 0.16 },
  { t: 146.2, name: "pop", volume: 0.16 },
  { t: 147.83, name: "shimmer", volume: 0.2 },
  { t: 153.81, name: "shimmer", volume: 0.18 },
];

const laid = (() => {
  let cursor = 0;
  return SHOTS.map((s, i) => {
    const end = i === SHOTS.length - 1 ? TOTAL : Math.round(s.t1 * FPS);
    const from = cursor;
    cursor = end;
    const last = i === SHOTS.length - 1;
    return { ...s, from, plateDur: end - from + (last ? 0 : 8), contentDur: end - from, hold: last };
  });
})();

const LineRows: React.FC<{ frame: number; t0: number; footnote?: boolean; footOut?: number }> = ({
  frame,
  t0,
  footnote = false,
  footOut = 0,
}) => {
  const rows = [
    { start: 18.65, name: "学硕", score: "300", detail: "政50 · 外50 · 业180" },
    { start: 23.92, name: "临床专硕", score: "360", detail: "政55 · 外55" },
    { start: 28.68, name: "口腔专硕", score: "370", detail: "" },
    { start: 30.71, name: "护理专硕", score: "310", detail: "" },
  ];
  return (
    <Card enter={1} tilt={-0.3}>
      <Hero size={62} align="left">
        校线（学校自划）
      </Hero>
      <div style={{ height: 14 }} />
      {rows.map((r) => {
        const e = appear(frame, t0, r.start);
        if (e <= 0.01) return null;
        return (
          <div key={r.name} style={{ opacity: Math.min(1, e), transform: `translateY(${(1 - Math.min(1, e)) * 16}px)`, marginTop: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span style={{ fontSize: 46 }}>{r.name}</span>
              <span style={{ fontSize: 64, color: CINNABAR }}>{r.score}</span>
            </div>
            {r.detail ? <div style={{ fontSize: 36, color: MUTED, marginTop: 2 }}>{r.detail}</div> : null}
            <div style={{ height: 1, marginTop: 10, background: "rgba(80,50,30,0.12)" }} />
          </div>
        );
      })}
      {footnote ? (
        <div
          style={{
            marginTop: 16,
            fontSize: 36,
            color: MUTED,
            opacity: interpolate(footOut, [0, 1], [1, 0], clamp),
            transform: `translateY(${-footOut * 28}px)`,
          }}
        >
          国家线约 294｜院线可能更高
        </div>
      ) : null}
    </Card>
  );
};

const Bars: React.FC<{ frame: number; t0: number; full?: boolean }> = ({ frame, t0, full = false }) => {
  const rows = [
    { start: 45.81, name: "南大", value: 60, label: "60", hot: true },
    { start: 47.57, name: "华科", value: 45, label: "~45", hot: false },
    { start: 50.31, name: "首医", value: 30, label: "~30", hot: false },
    { start: 53.03, name: "北医", value: 0, label: "0", hot: false },
  ];
  return (
    <Card tone="glass" enter={1}>
      <Hero size={62} align="left" color={CREAM}>
        学硕 → 专硕 差距
      </Hero>
      <div style={{ height: 8 }} />
      {rows.map((r) => {
        const e = full ? 1 : appear(frame, t0, r.start);
        if (e <= 0.01) return null;
        const w = r.value === 0 ? 0.05 : r.value / 60;
        return (
          <div key={r.name} style={{ marginTop: 14, opacity: Math.min(1, e) }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 40, color: CREAM }}>
              <span>{r.name}</span>
              <span style={{ color: r.hot ? "#ffb199" : CREAM }}>{r.label}</span>
            </div>
            <div
              style={{
                marginTop: 8,
                height: 22,
                borderRadius: 12,
                background: "rgba(255,255,255,0.08)",
                boxShadow: "inset 0 2px 5px rgba(0,0,0,0.35)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${Math.min(1, e) * w * 100}%`,
                  height: "100%",
                  borderRadius: 12,
                  background: r.hot
                    ? "linear-gradient(90deg, #8a2618, #e15a3a)"
                    : "linear-gradient(90deg, #8d735c, #d9c3a4)",
                }}
              />
            </div>
          </div>
        );
      })}
    </Card>
  );
};

const Trend: React.FC<{ frame: number; t0: number }> = ({ frame, t0 }) => {
  const series = [
    { name: "临床专硕", tag: "高位回落", color: "#c4452d", ys: [365, 370, 360], start: 99.74 },
    { name: "临床学硕", tag: "抬头", color: "#1d3e68", ys: [317, 329, 357], start: 101.21 },
    { name: "口腔", tag: "过山车", color: "#b86a12", ys: [390, 340, 370], start: 103.4 },
    { name: "护理", tag: "企稳", color: "#1f6b4a", ys: [330, 310, 310], start: 104.86 },
  ];
  const left = 64;
  const right = 800;
  const top = 28;
  const bottom = 400;
  const minV = 290;
  const maxV = 410;
  const xAt = (i: number) => left + (i * (right - left)) / 2;
  const yAt = (v: number) => top + ((maxV - v) / (maxV - minV)) * (bottom - top);
  return (
    <Card enter={1} tilt={0.4} style={{ padding: "26px 22px 20px" }}>
      <Hero size={62}>实际复试线 · 院线波动</Hero>
      <svg width="100%" viewBox="0 0 860 500" style={{ marginTop: 8 }}>
        <line x1={left} y1={bottom} x2={right} y2={bottom} stroke="rgba(70,48,28,0.28)" strokeWidth={3} />
        {[2024, 2025, 2026].map((y, i) => (
          <text key={y} x={xAt(i)} y={472} textAnchor="middle" fontSize={36} fontWeight={700} fill={MUTED} fontFamily={FONT}>
            {y}
          </text>
        ))}
        {series.map((s) => {
          const e = Math.min(1, Math.max(0, appear(frame, t0, s.start)));
          const d = s.ys
            .map((v, i) => `${i === 0 ? "M" : "L"} ${xAt(i).toFixed(1)} ${yAt(v).toFixed(1)}`)
            .join(" ");
          return (
            <g key={s.name}>
              <path
                d={d}
                fill="none"
                stroke={s.color}
                strokeWidth={8}
                strokeLinecap="round"
                strokeLinejoin="round"
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={1 - e}
              />
              {s.ys.map((v, i) => (
                <g key={i} opacity={e > i / 2 ? 1 : 0}>
                  <circle cx={xAt(i)} cy={yAt(v)} r={7} fill={s.color} />
                </g>
              ))}
            </g>
          );
        })}
      </svg>
      <div style={{ display: "flex", flexDirection: "column", gap: 4, marginTop: 2 }}>
        {series.map((s) => {
          const e = Math.min(1, Math.max(0, appear(frame, t0, s.start)));
          return (
            <div
              key={s.name}
              style={{
                opacity: e,
                fontSize: 36,
                color: s.color,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>{s.name}</span>
              <span>{s.tag}</span>
              <span>{s.ys[2]}</span>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

const View: React.FC<{ id: string; t0: number }> = ({ id, t0 }) => {
  const frame = useCurrentFrame();
  const abs = t0 + frame / FPS;

  if (id === "s01a") {
    const e = appear(frame, t0, 0.15);
    return (
      <Stage>
        <Card enter={e} tilt={-0.6}>
          <Hero size={68}>同一年 · 差六十分</Hero>
        </Card>
      </Stage>
    );
  }

  if (id === "s01b") {
    const nums = [
      { start: 3.35, k: "学硕校线", n: "300" },
      { start: 5.01, k: "临床专硕", n: "360" },
      { start: 6.71, k: "口腔专硕", n: "370" },
    ];
    const showDiff = abs >= 6.9;
    const dock = abs >= 7.15 && abs < 8.3;
    const dockOp = interpolate(abs, [7.15, 7.35, 8.05, 8.3], [0, 1, 1, 0], clamp);
    return (
      <>
        <div style={{ position: "absolute", top: 168, left: 68, right: 68 }}>
          {nums.map((n, i) => {
            const e = appear(frame, t0, n.start);
            if (e <= 0.01) return null;
            return (
              <Card key={n.n} enter={e} tilt={i === 1 ? 0.4 : -0.3} style={{ marginTop: i === 0 ? 0 : 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span style={{ fontSize: 46 }}>{n.k}</span>
                  <span style={{ fontSize: 96, color: CINNABAR, lineHeight: 1 }}>{n.n}</span>
                </div>
              </Card>
            );
          })}
          {showDiff ? (
            <Card enter={appear(frame, t0, 6.9)} style={{ marginTop: 18 }}>
              <Hero size={66}>
                差 <span style={{ color: CINNABAR, fontSize: 92 }}>60</span> 分
              </Hero>
            </Card>
          ) : null}
        </div>
        {dock ? (
          <Dock opacity={dockOp}>
            <Btn label="这正常吗？" />
          </Dock>
        ) : null}
      </>
    );
  }

  if (id === "s02a") {
    const e1 = appear(frame, t0, 8.38);
    const e2 = appear(frame, t0, 9.94);
    const e3 = appear(frame, t0, 14.06);
    return (
      <Stage justify="flex-start">
        <div style={{ height: 40 }} />
        <Card enter={e1} tilt={-0.5}>
          <div style={{ fontSize: 40, color: MUTED }}>先说校线</div>
          <Hero size={66} align="left">
            学校自己划的门槛
          </Hero>
          <div style={{ height: 8 }} />
          <Sub size={48} align="left" color={INK}>
            比国家线更高
          </Sub>
        </Card>
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 12, opacity: Math.min(1, e3) }}>
          <div
            style={{
              width: 196,
              height: 196,
              borderRadius: 98,
              background: "radial-gradient(circle at 35% 30%, #f3d7a4, #d4533a 55%, #8d2a1c)",
              color: "#fff8f2",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              transform: `rotate(-8deg) scale(${0.9 + Math.min(1, e3) * 0.1})`,
              boxShadow: "0 18px 36px rgba(0,0,0,0.35)",
            }}
          >
            <div style={{ fontSize: 32 }}>国家线</div>
            <div style={{ fontSize: 68, lineHeight: 1 }}>294</div>
          </div>
        </div>
        <div style={{ opacity: Math.min(1, e2) }} />
      </Stage>
    );
  }

  if (id === "s02b") {
    return (
      <Stage justify="flex-start">
        <div style={{ height: 24 }} />
        <LineRows frame={frame} t0={t0} />
      </Stage>
    );
  }

  if (id === "s02c") {
    const foot = abs >= 33.25 && abs < 38.7;
    const footOut = interpolate(abs, [36.6, 37.7], [0, 1], clamp);
    const tableOp = interpolate(abs, [38.35, 38.9], [1, 0], clamp);
    const showEnd = abs >= 38.95;
    return (
      <Stage justify="flex-start">
        <div style={{ height: 12 }} />
        {tableOp > 0.02 ? (
          <div style={{ opacity: tableOp }}>
            <LineRows frame={frame} t0={t0} footnote={foot} footOut={footOut} />
          </div>
        ) : null}
        {showEnd ? (
          <Card enter={appear(frame, t0, 38.95)} tilt={-0.4}>
            <Hero size={64}>别只看校线就填志愿</Hero>
          </Card>
        ) : null}
      </Stage>
    );
  }

  if (id === "s03a") {
    return (
      <Stage justify="flex-start">
        <div style={{ height: 80 }} />
        <Bars frame={frame} t0={t0} />
      </Stage>
    );
  }

  if (id === "s03b") {
    const showSide = abs >= 57.55;
    const showEnd = abs >= 59.25;
    const dock = abs >= 55.65 && abs < 59.15;
    const dockOp = interpolate(abs, [55.65, 55.95, 58.8, 59.15], [0, 1, 1, 0], clamp);
    const hot = abs >= 58.15;
    return (
      <>
        <div style={{ position: "absolute", top: 150, left: 68, right: 68 }}>
          <Bars frame={frame} t0={t0} full />
          {showSide ? (
            <Card enter={appear(frame, t0, 57.55)} tone="paper" style={{ marginTop: 16 }} tilt={0.4}>
              <Sub size={46} align="left">
                临床专硕
              </Sub>
              <Hero size={62} align="left">
                浙大 ~380
              </Hero>
              <Sub size={48} align="left" color={MUTED}>
                南大 / 武大 ~360
              </Sub>
            </Card>
          ) : null}
          {showEnd ? (
            <Card enter={appear(frame, t0, 59.25)} style={{ marginTop: 16 }}>
              <Hero size={64}>
                南大剪刀差 <span style={{ color: CINNABAR }}>60 分</span>
              </Hero>
            </Card>
          ) : null}
        </div>
        {dock ? (
          <Dock opacity={dockOp} question="哪家差最大？">
            <Btn label="南大" hot={hot} />
            <Btn label="华科" dim={hot} />
            <Btn label="首医" dim={hot} />
            <Btn label="北医" dim={hot} />
          </Dock>
        ) : null}
      </>
    );
  }

  if (id === "s04a") {
    return (
      <Stage>
        <Card enter={appear(frame, t0, 66.09)} tilt={-0.4}>
          <Hero size={64}>学硕 300 ＝ 偏冷</Hero>
          <div style={{ height: 8 }} />
          <Sub size={50}>不是简单</Sub>
        </Card>
        {abs >= 69.91 ? (
          <Card enter={appear(frame, t0, 69.91)} tone="glass">
            <Sub size={46} color={CREAM}>
              主力挤专硕 · 学硕偏科研
            </Sub>
          </Card>
        ) : null}
      </Stage>
    );
  }

  if (id === "s04b") {
    return (
      <Stage>
        <Card enter={appear(frame, t0, 73.72)} tilt={0.3}>
          <Hero size={64}>360 ＝ 牌子 + 规培平台</Hero>
        </Card>
        {abs >= 76.45 ? (
          <Card enter={appear(frame, t0, 76.45)} tone="glass">
            <Sub size={46} color={CREAM}>
              鼓楼医院 · 东部战区总医院
            </Sub>
          </Card>
        ) : null}
        {abs >= 80.62 ? (
          <Card enter={appear(frame, t0, 80.62)}>
            <Sub size={46}>不完全等于学科全国排名</Sub>
          </Card>
        ) : null}
      </Stage>
    );
  }

  if (id === "s04c") {
    return (
      <Stage>
        <Card enter={appear(frame, t0, 84)} tilt={-0.5}>
          <Hero size={64}>口腔 370</Hero>
          <div style={{ height: 8 }} />
          <Sub size={50}>≈ 名额少 · 波动大</Sub>
        </Card>
      </Stage>
    );
  }

  if (id === "s04d") {
    const dock = abs >= 89.1 && abs < 92.2;
    const dockOp = interpolate(abs, [89.1, 89.35, 91.85, 92.2], [0, 1, 1, 0], clamp);
    const showAns = abs >= 92.29;
    const stamp = appear(frame, t0, 92.29);
    return (
      <>
        <div style={{ position: "absolute", top: 180, left: 68, right: 68 }}>
          <Card enter={appear(frame, t0, 87.97)}>
            <Hero size={64}>英语 50–55</Hero>
            <div style={{ height: 8 }} />
            <Sub size={50}>＝ 隐形否决</Sub>
          </Card>
          {showAns ? (
            <Card enter={stamp} style={{ marginTop: 18 }}>
              <Hero size={64}>单科卡死照样挂</Hero>
            </Card>
          ) : null}
        </div>
        {showAns ? (
          <div
            style={{
              position: "absolute",
              right: 90,
              top: 860,
              opacity: Math.min(1, stamp),
              transform: `rotate(${interpolate(Math.min(1, stamp), [0, 1], [-24, -8])}deg) scale(${0.8 + Math.min(1, stamp) * 0.2})`,
            }}
          >
            <svg width={250} height={250} viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="34" fill="none" stroke={CINNABAR} strokeWidth="5" />
              <path d="M34 34 L66 66 M66 34 L34 66" stroke={CINNABAR} strokeWidth="5" strokeLinecap="round" />
            </svg>
          </div>
        ) : null}
        {dock ? (
          <Dock opacity={dockOp}>
            <Btn label="总分高就稳？" />
          </Dock>
        ) : null}
      </>
    );
  }

  if (id === "s05a") {
    return (
      <Stage justify="flex-start">
        <div style={{ height: 20 }} />
        <Trend frame={frame} t0={t0} />
      </Stage>
    );
  }

  if (id === "s05b") {
    return (
      <Stage>
        <Card enter={appear(frame, t0, 106.54)} tilt={-0.35}>
          <Hero size={64}>院线在抖 · 不是校线三百在晃</Hero>
        </Card>
        {abs >= 111.84 ? (
          <Card enter={appear(frame, t0, 111.84)} tone="glass">
            <Sub size={48} color={CREAM}>
              名额少 → 按历史最高线准备更稳
            </Sub>
          </Card>
        ) : null}
      </Stage>
    );
  }

  if (id === "s05c") {
    return (
      <Stage>
        <Card enter={appear(frame, t0, 116.56)} tone="glass">
          <Sub size={48} color={CREAM}>
            C9 · 985 · 分数线自己划
          </Sub>
        </Card>
        {abs >= 120.41 ? (
          <Card enter={appear(frame, t0, 120.41)} tilt={0.4}>
            <Hero size={62}>统考坑位 = 计划 − 推免</Hero>
            <div style={{ height: 8 }} />
            <Sub size={46} color={MUTED}>
              医学院小而精 · 推免占比高
            </Sub>
          </Card>
        ) : null}
      </Stage>
    );
  }

  if (id === "s06a") {
    return (
      <Stage>
        <Card enter={appear(frame, t0, 126.45)} tilt={-0.3}>
          <Hero size={62}>英55+ · 总分冲380</Hero>
          <div style={{ height: 10 }} />
          <Sub size={48}>可谈临床专硕（查院线）</Sub>
        </Card>
      </Stage>
    );
  }

  if (id === "s06b") {
    return (
      <Stage>
        <Card enter={appear(frame, t0, 134.14)}>
          <Hero size={64}>科研申博</Hero>
          <div style={{ height: 8 }} />
          <Sub size={50}>学硕门槛低 + 平台</Sub>
        </Card>
      </Stage>
    );
  }

  if (id === "s06c") {
    return (
      <Stage>
        <Card enter={appear(frame, t0, 138.6)} tilt={0.35}>
          <Hero size={64}>长三角就业</Hero>
          <div style={{ height: 8 }} />
          <Sub size={50}>牌子 + 规培组合</Sub>
        </Card>
      </Stage>
    );
  }

  if (id === "s06d") {
    const dock = abs >= 144.5 && abs < 147.45;
    const dockOp = interpolate(abs, [144.5, 144.8, 147.1, 147.45], [0, 1, 1, 0], clamp);
    const hotA = abs >= 145.4;
    const hotB = abs >= 146.2;
    return (
      <>
        <div style={{ position: "absolute", top: 200, left: 68, right: 68 }}>
          <Card enter={appear(frame, t0, 143.83)}>
            <Hero size={62}>英语弱 / 只求上岸</Hero>
            <div style={{ height: 8 }} />
            <Sub size={50}>谨慎或换校</Sub>
          </Card>
        </div>
        {dock ? (
          <Dock opacity={dockOp} question="你更接近哪类？">
            <Btn label="冲临床" hot={hotA} />
            <Btn label="科研申博" hot={hotB} />
            <Btn label="长三角" dim={hotB} />
            <Btn label="只求上岸" dim={hotB} />
          </Dock>
        ) : null}
      </>
    );
  }

  const second = abs >= 153.81;
  return (
    <Stage>
      <Card enter={appear(frame, t0, 147.83)} tilt={-0.3}>
        <Hero size={68}>300｜360｜370</Hero>
        <div style={{ height: 8 }} />
        <Sub size={50}>先看剪刀差</Sub>
      </Card>
      {second ? (
        <Card enter={appear(frame, t0, 153.81)}>
          <Hero size={62}>
            校线不够 →
            <br />
            查院线 · 查统考名额
          </Hero>
        </Card>
      ) : null}
    </Stage>
  );
};

export const NjuMed: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#120e0b", fontFamily: FONT, fontWeight: 700 }}>
      <Audio src={staticFile("vo-maia-full.mp3")} volume={2.4} />
      <Audio
        src={staticFile("music.mp3")}
        volume={(f) => {
          const inn = interpolate(f, [0, 24], [0, 1], clamp);
          const out = interpolate(f, [TOTAL - 30, TOTAL], [1, 0], clamp);
          return 0.3 * inn * out;
        }}
      />
      {laid.map((s) => (
        <Sequence key={`${s.id}-bg`} from={s.from} durationInFrames={Math.max(1, s.plateDur)} name={`${s.id}-bg`}>
          <Plate src={s.bg} dur={s.plateDur} push={s.push} scrim={s.scrim} hold={s.hold} />
        </Sequence>
      ))}
      {laid.map((s) => (
        <Sequence key={s.id} from={s.from} durationInFrames={Math.max(1, s.contentDur)} name={s.id}>
          <View id={s.id} t0={s.from / FPS} />
        </Sequence>
      ))}
      {SFX.map((x, i) => (
        <Sequence key={`${x.name}-${i}`} from={Math.round(x.t * FPS)} durationInFrames={40}>
          <Audio src={staticFile(`sfx/${x.name}.wav`)} volume={x.volume} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
