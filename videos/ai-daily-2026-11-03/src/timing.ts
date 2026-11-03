// Voiceover clock. Phrase edges are from a word-level pass on vo.mp3 (97.416s).
// The 2:00–2:20 shotlist was an estimate; picture length follows the read.
// No on-screen buttons — capsules swap one at a time (XOR).

export const FPS = 30;
export const VO_SEC = 97.416;
export const TOTAL_FRAMES = Math.ceil(VO_SEC * FPS);

export const sec = (s: number) => Math.round(s * FPS);

export type Cap = { t: number; text: string; punch?: boolean };

export type Item = {
  id: 1 | 2 | 3 | 4 | 5;
  hook: number;
  start: number;
  end: number;
  category: string;
  title: string;
  judgment: string;
  caps: Cap[];
};

export const OPEN_END = 2;
export const OUTRO = 93.6;
export const SLAM = 87.32;

export const ITEMS: Item[] = [
  {
    id: 1,
    hook: 2,
    start: 2.88,
    end: 24.3,
    category: "API / PRODUCTS",
    title: "Anthropic 线程 · 首字约少三成五",
    judgment: "长对话变轻了，不是新模型开箱",
    caps: [
      { t: 2.88, text: "少三成五" },
      { t: 6.2, text: "闲≈5分钟" },
      { t: 9.5, text: "计费不变" },
      { t: 12.8, text: "少三成五" },
      { t: 15.2, text: "闲≈5分钟" },
      { t: 17.45, text: "少三成五" },
      { t: 20.05, text: "计费不变" },
      { t: 22.25, text: "闲≈5分钟" },
    ],
  },
  {
    id: 2,
    hook: 24.3,
    start: 25.16,
    end: 44.88,
    category: "CN / MODELS",
    title: "美团 LongCat 2.5 · 总参约 1.6 万亿",
    judgment: "真正开动约 480 亿 · 接口已开",
    caps: [
      { t: 25.16, text: "长程智能体 / 整项目代码" },
      { t: 29.05, text: "总参≈1.6万亿" },
      { t: 32.15, text: "真正开动≈480亿" },
      { t: 35.5, text: "长程智能体 / 整项目代码" },
      { t: 39.2, text: "总参≈1.6万亿" },
      { t: 42.3, text: "真正开动≈480亿" },
    ],
  },
  {
    id: 3,
    hook: 44.88,
    start: 45.8,
    end: 65.1,
    category: "CN / PRODUCTS",
    title: "商汤 SenseNova 6.8 Flash 正式版",
    judgment: "办公协作 · 即日起可体验",
    caps: [
      { t: 45.8, text: "6.8 Flash" },
      { t: 49.4, text: "接设计工具" },
      { t: 53.0, text: "动态 PPT / 海报" },
      { t: 56.6, text: "接设计工具" },
      { t: 60.2, text: "6.8 Flash" },
      { t: 63.4, text: "动态 PPT / 海报" },
    ],
  },
  {
    id: 4,
    hook: 65.1,
    start: 65.98,
    end: 80.4,
    category: "CN / TOOLS",
    title: "阿里云 Qovest · 邀测约 99–199 元/月",
    judgment: "一句话出研报 · 标的可跟踪",
    caps: [
      { t: 65.98, text: "邀测中" },
      { t: 69.4, text: "投研工作台" },
      { t: 73.6, text: "≈99 起" },
      { t: 77.4, text: "邀测中" },
    ],
  },
  {
    id: 5,
    hook: 80.4,
    start: 81.2,
    end: 93.6,
    category: "EVAL / HOT",
    title: "GDPx · 真实工作题最强约 12%",
    judgment: "演示好看 ≠ 活干完",
    caps: [
      { t: 81.2, text: "GDPx≈12%" },
      { t: 84.5, text: "GDPx≈12%" },
      { t: SLAM, text: "GDPx≈12%", punch: true },
      { t: 90.2, text: "演示≠干完" },
    ],
  },
];

export const itemAt = (t: number): Item | null => {
  for (let i = 0; i < ITEMS.length; i++) {
    const it = ITEMS[i];
    if (t >= it.hook && t < it.end) return it;
  }
  return null;
};

export const capAt = (item: Item, t: number): { cap: Cap; idx: number } | null => {
  if (t < item.start) return null;
  let idx = -1;
  for (let i = 0; i < item.caps.length; i++) {
    if (item.caps[i].t <= t + 0.001) idx = i;
  }
  if (idx < 0) return null;
  return { cap: item.caps[idx], idx };
};

export type Hit = { at: number; name: string; volume: number };

export const HITS: Hit[] = [
  { at: 0.05, name: "pop", volume: 0.26 },
  { at: 0.42, name: "shimmer", volume: 0.2 },
  { at: 24.3, name: "whoosh", volume: 0.28 },
  { at: 44.88, name: "whoosh", volume: 0.28 },
  { at: 65.1, name: "whoosh", volume: 0.28 },
  { at: 80.4, name: "whoosh", volume: 0.28 },
  { at: 2.0, name: "whoosh", volume: 0.3 },
  { at: OUTRO, name: "whoosh", volume: 0.24 },
  { at: SLAM, name: "thud", volume: 0.34 },
];

for (let i = 0; i < ITEMS.length; i++) {
  const item = ITEMS[i];
  for (let c = 0; c < item.caps.length; c++) {
    const cap = item.caps[c];
    if (cap.punch) continue;
    HITS.push({ at: cap.t, name: "tick", volume: 0.2 });
  }
}
