import React, { useEffect, useState } from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  Sequence,
  continueRender,
  delayRender,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { F, FPS, ITEM_ORDER, ItemId, TOTAL, itemWindow } from "./cuts";

const FONT = '"DailySans", "WenQuanYi Micro Hei", "Noto Sans CJK SC", sans-serif';
const CYAN = "#3CE0FF";
const WHITE = "#F4F7FB";
const MUTED = "#93A0B2";
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

let fontsPromise: Promise<void> | null = null;

const loadFonts = (): Promise<void> => {
  if (fontsPromise) return fontsPromise;
  const handle = delayRender("daily-fonts");
  const faces: Array<[string, string, string]> = [
    ["400", "fonts/NotoSansSC-400.woff", "U+3000-303F, U+3400-9FFF, U+F900-FAFF, U+FF00-FFEF"],
    ["500", "fonts/NotoSansSC-500.woff", "U+3000-303F, U+3400-9FFF, U+F900-FAFF, U+FF00-FFEF"],
    ["700", "fonts/NotoSansSC-700.woff", "U+3000-303F, U+3400-9FFF, U+F900-FAFF, U+FF00-FFEF"],
    ["400", "fonts/NotoSansSC-latin-400.woff", "U+0000-00FF, U+0131, U+2010-2027"],
    ["500", "fonts/NotoSansSC-latin-500.woff", "U+0000-00FF, U+0131, U+2010-2027"],
    ["700", "fonts/NotoSansSC-latin-700.woff", "U+0000-00FF, U+0131, U+2010-2027"],
  ];
  fontsPromise = Promise.all(
    faces.map(async ([weight, file, unicodeRange]) => {
      const face = new FontFace("DailySans", `url(${staticFile(file)})`, { weight, unicodeRange });
      const loaded = await face.load();
      (document.fonts as unknown as { add: (font: FontFace) => void }).add(loaded);
    })
  ).then(
    () => continueRender(handle),
    () => continueRender(handle)
  );
  return fontsPromise;
};

type Card = {
  id: ItemId;
  n: number;
  category: string;
  title: string;
  sub?: string;
  judgment: string;
  phrases: string[];
  image: string;
  url: string;
  page: string;
  chrome: string;
  urlBg: string;
  urlColor: string;
  focus: string;
  fit: "cover" | "contain";
};

const CARDS: Card[] = [
  {
    id: "item1",
    n: 1,
    category: "DEV TIPS",
    title: "线程 · 首字约少三成五",
    judgment: "旧内容不用整包再传",
    phrases: ["少三成五", "不用整包再传"],
    image: "evidence/anthropic.png",
    url: "claude.com/resources/articles/message-threads",
    page: "#F4F1EA",
    chrome: "#E7E2D8",
    urlBg: "#FBF9F5",
    urlColor: "#5C656E",
    focus: "center top",
    fit: "cover",
  },
  {
    id: "item2",
    n: 2,
    category: "MODELS",
    title: "LongCat 2.5 · 总参约 1.6 万亿",
    sub: "真正开动约 480 亿",
    judgment: "整项目写代码，接口已开",
    phrases: ["1.6万亿", "480亿", "接口已开"],
    image: "evidence/longcat.png",
    url: "tech.meituan.com/2026/11/02/Meituan-LongCat-2.5",
    page: "#FFFFFF",
    chrome: "#F2F3F5",
    urlBg: "#FFFFFF",
    urlColor: "#5C656E",
    focus: "center top",
    fit: "cover",
  },
  {
    id: "item3",
    n: 3,
    category: "AI PRODUCTS",
    title: "SenseNova 6.8 Flash",
    judgment: "办公交接、动态海报都能交",
    phrases: ["办公交接", "现在就能用"],
    image: "evidence/sensenova.png",
    url: "sensetime.com/cn/news/sensenova-6-8-flash",
    page: "#F7F6F4",
    chrome: "#EEECE8",
    urlBg: "#FFFFFF",
    urlColor: "#5C656E",
    focus: "center top",
    fit: "contain",
  },
  {
    id: "item4",
    n: 4,
    category: "AI PRODUCTS",
    title: "Qovest 邀测 · 约 99 元起",
    judgment: "一句话出研报",
    phrases: ["邀测", "一句话研报"],
    image: "evidence/qovest.png",
    url: "ithome.com/1/021/071.htm",
    page: "#FFFFFF",
    chrome: "#F2F3F5",
    urlBg: "#FFFFFF",
    urlColor: "#5C656E",
    focus: "center top",
    fit: "contain",
  },
  {
    id: "item5",
    n: 5,
    category: "INDUSTRY",
    title: "GDPx · 约 12%",
    judgment: "演示好看，活没干完",
    phrases: ["12%", "演示≠干完"],
    image: "evidence/gdpx.png",
    url: "gdpx.semianalysis.com",
    page: "#0D1016",
    chrome: "#161B22",
    urlBg: "#0F1318",
    urlColor: "#C5D0DC",
    focus: "center top",
    fit: "contain",
  },
];

const capsuleCount = (durS: number, kinds: number): number => {
  let n = Math.max(kinds, Math.round(durS / 1.85));
  while (durS / n > 2) n += 1;
  while (n > kinds && durS / n < 1.5) n -= 1;
  return n;
};

const Bg: React.FC = () => (
  <AbsoluteFill
    style={{
      background:
        "radial-gradient(ellipse at 50% 12%, #17324c 0%, #0c1828 46%, #070b12 100%)",
    }}
  />
);

const Footer: React.FC = () => (
  <div
    style={{
      position: "absolute",
      left: 72,
      right: 72,
      bottom: 64,
      display: "flex",
      justifyContent: "space-between",
      fontFamily: FONT,
      fontSize: 22,
      letterSpacing: 3,
      color: "rgba(244,247,251,0.62)",
      zIndex: 4,
    }}
  >
    <span>AI DAILY</span>
    <span>11.03</span>
  </div>
);

const Progress: React.FC<{ active: number }> = ({ active }) => (
  <div
    style={{
      position: "absolute",
      left: 72,
      right: 72,
      bottom: 108,
      display: "flex",
      gap: 8,
      zIndex: 4,
    }}
  >
    {[0, 1, 2, 3, 4].map((i) => {
      const on = i <= active;
      return (
        <div
          key={i}
          style={{
            flex: 1,
            height: 10,
            borderRadius: 99,
            background: on ? CYAN : "rgba(255,255,255,0.34)",
            boxShadow: i === active ? "0 0 16px rgba(60,224,255,0.9)" : "none",
          }}
        />
      );
    })}
  </div>
);

const Dots: React.FC = () => (
  <div style={{ display: "flex", gap: 6 }}>
    {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
      <div key={c} style={{ width: 10, height: 10, borderRadius: 99, background: c }} />
    ))}
  </div>
);

const Evidence: React.FC<{ card: Card }> = ({ card }) => (
  <div
    style={{
      position: "absolute",
      top: 468,
      left: 64,
      width: 952,
      height: 1088,
      borderRadius: 22,
      overflow: "hidden",
      background: card.page,
      border: "1px solid rgba(255,255,255,0.08)",
      boxShadow: "0 28px 70px rgba(0,0,0,0.42)",
      zIndex: 2,
    }}
  >
    <div
      style={{
        height: 54,
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "0 14px",
        background: card.chrome,
      }}
    >
      <Dots />
      <div
        style={{
          flex: 1,
          height: 30,
          borderRadius: 8,
          background: card.urlBg,
          color: card.urlColor,
          fontFamily: FONT,
          fontSize: 18,
          display: "flex",
          alignItems: "center",
          padding: "0 12px",
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        {card.url}
      </div>
    </div>
    <Img
      src={staticFile(card.image)}
      style={{
        width: 952,
        height: 1034,
        objectFit: card.fit,
        objectPosition: card.focus,
      }}
    />
  </div>
);

const Capsule: React.FC<{ phrases: string[]; dur: number }> = ({ phrases, dur }) => {
  const frame = useCurrentFrame();
  const n = capsuleCount(dur / FPS, phrases.length);
  const step = dur / n;
  const idx = Math.min(n - 1, Math.floor(frame / step));
  const age = frame - idx * step;
  const opacity = interpolate(age, [0, 4], [0, 1], clamp);
  const rise = interpolate(age, [0, 4], [8, 0], clamp);
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 1596,
        height: 96,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 4,
      }}
    >
      <div
        style={{
          opacity,
          transform: `translateY(${rise}px)`,
          fontFamily: FONT,
          fontWeight: 700,
          fontSize: 38,
          color: WHITE,
          background: "rgba(8, 22, 34, 0.92)",
          border: `2px solid ${CYAN}`,
          borderRadius: 999,
          padding: "12px 36px",
          letterSpacing: 1,
          boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
        }}
      >
        {phrases[idx % phrases.length]}
      </div>
    </div>
  );
};

const Wipe: React.FC = () => {
  const frame = useCurrentFrame();
  if (frame > 8) return null;
  const p = interpolate(frame, [0, 8], [-0.15, 1.15], clamp);
  return (
    <AbsoluteFill
      style={{
        zIndex: 6,
        background: `linear-gradient(90deg, rgba(60,224,255,0) ${(p - 0.08) * 100}%, rgba(60,224,255,0.92) ${p * 100}%, rgba(60,224,255,0) ${(p + 0.08) * 100}%)`,
      }}
    />
  );
};

const ItemView: React.FC<{ card: Card }> = ({ card }) => {
  const frame = useCurrentFrame();
  const win = itemWindow(card.id);
  const appear = interpolate(frame, [0, 5], [0, 1], clamp);
  return (
    <AbsoluteFill style={{ opacity: appear, fontFamily: FONT }}>
      <Bg />
      <div
        style={{
          position: "absolute",
          right: 18,
          top: 150,
          fontSize: 280,
          lineHeight: 0.82,
          fontWeight: 700,
          color: "transparent",
          WebkitTextStroke: "3px rgba(60,224,255,0.22)",
          zIndex: 0,
          letterSpacing: -10,
        }}
      >
        {String(card.n).padStart(2, "0")}
      </div>
      <div style={{ position: "absolute", top: 120, left: 72, right: 72, zIndex: 3 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 22, letterSpacing: 3, color: "rgba(244,247,251,0.72)" }}>AI DAILY · 11.03</div>
          <div
            style={{
              fontSize: 20,
              letterSpacing: 1.5,
              color: CYAN,
              border: `1px solid rgba(60,224,255,0.55)`,
              borderRadius: 999,
              padding: "6px 14px",
              fontWeight: 700,
            }}
          >
            {card.category}
          </div>
        </div>
        <div style={{ marginTop: 12, fontSize: 26, fontWeight: 700, color: CYAN }}>
          提速三成五
          <span style={{ color: "rgba(60,224,255,0.45)" }}> ｜ </span>
          国产 LongCat 上桌
        </div>
        <div style={{ marginTop: 26, fontSize: 28, fontWeight: 700, color: CYAN, letterSpacing: 2 }}>
          第 {card.n} 件
        </div>
        <div style={{ marginTop: 6, fontSize: 50, fontWeight: 700, color: WHITE, lineHeight: 1.22 }}>{card.title}</div>
        <div style={{ marginTop: 6, height: 42, fontSize: 34, fontWeight: 700, color: "#B8F3FF" }}>{card.sub ?? ""}</div>
        <div style={{ marginTop: 2, fontSize: 30, color: MUTED }}>{card.judgment}</div>
      </div>
      <Evidence card={card} />
      <Capsule phrases={card.phrases} dur={win.dur} />
      <Progress active={card.n - 1} />
      <Footer />
      <Wipe />
    </AbsoluteFill>
  );
};

const Open: React.FC = () => {
  const frame = useCurrentFrame();
  const a = interpolate(frame, [4, 14], [0, 1], clamp);
  const b = interpolate(frame, [10, 22], [0, 1], clamp);
  const c = interpolate(frame, [16, 30], [0, 1], clamp);
  const d = interpolate(frame, [24, 36], [0, 1], clamp);
  const beat = frame >= 64 ? Math.floor((frame - 64) / 14) % 2 : -1;
  const hookA = (beat === 1 ? 0.28 : 1) * c;
  const hookB = (beat === 0 ? 0.28 : 1) * d;
  const colorA = beat === 0 ? CYAN : WHITE;
  const colorB = beat === 1 ? CYAN : WHITE;
  return (
    <AbsoluteFill style={{ fontFamily: FONT }}>
      <Bg />
      <div style={{ position: "absolute", top: 128, left: 72, fontSize: 22, letterSpacing: 4, color: "rgba(244,247,251,0.7)" }}>
        AI DAILY
      </div>
      <div
        style={{
          position: "absolute",
          left: 72,
          right: 72,
          top: 700,
        }}
      >
        <div style={{ opacity: a, transform: `translateY(${(1 - a) * 16}px)`, fontSize: 68, fontWeight: 700, color: WHITE }}>
          AI日报
        </div>
        <div style={{ opacity: b, marginTop: 8, fontSize: 92, fontWeight: 700, color: CYAN, letterSpacing: -1 }}>11.03</div>
        <div style={{ marginTop: 36, width: 72, height: 4, background: CYAN, opacity: c }} />
        <div style={{ opacity: hookA, marginTop: 28, fontSize: 52, fontWeight: 700, color: colorA }}>提速三成五</div>
        <div style={{ opacity: hookB, marginTop: 8, fontSize: 52, fontWeight: 700, color: colorB }}>国产 LongCat 上桌</div>
      </div>
      <Progress active={-1} />
      <Footer />
    </AbsoluteFill>
  );
};

const Close: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const inn = interpolate(frame, [0, 6], [0, 1], clamp);
  if (frame > dur - 6) {
    return <AbsoluteFill style={{ background: "#000" }} />;
  }
  return (
    <AbsoluteFill style={{ fontFamily: FONT }}>
      <Bg />
      <div
        style={{
          position: "absolute",
          left: 72,
          right: 72,
          top: 760,
          opacity: inn,
          transform: `translateY(${(1 - inn) * 12}px)`,
        }}
      >
        <div style={{ fontSize: 24, letterSpacing: 4, color: CYAN }}>AI DAILY · 11.03</div>
        <div style={{ marginTop: 24, fontSize: 64, fontWeight: 700, color: WHITE, lineHeight: 1.25 }}>以上，今天的 AI 日报</div>
      </div>
      <Progress active={5} />
      <Footer />
    </AbsoluteFill>
  );
};

export const AIDaily: React.FC = () => {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let live = true;
    loadFonts()
      .then(() => {
        if (live) setReady(true);
      })
      .catch(() => undefined);
    return () => {
      live = false;
    };
  }, []);
  return (
    <AbsoluteFill style={{ background: "#070b12", fontFamily: FONT }}>
      {ready ? (
        <>
          <Audio src={staticFile("mix.wav")} />
          <Sequence from={F.open} durationInFrames={F.item1}>
            <Open />
          </Sequence>
          {ITEM_ORDER.map((id) => {
            const card = CARDS.filter((c) => c.id === id)[0] as Card;
            const win = itemWindow(id);
            return (
              <Sequence key={id} from={win.from} durationInFrames={win.dur}>
                <ItemView card={card} />
              </Sequence>
            );
          })}
          <Sequence from={F.close} durationInFrames={TOTAL - F.close}>
            <Close dur={TOTAL - F.close} />
          </Sequence>
        </>
      ) : null}
    </AbsoluteFill>
  );
};
