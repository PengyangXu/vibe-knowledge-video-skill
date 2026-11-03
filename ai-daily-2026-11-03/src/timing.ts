// Voice-locked cut list for Maia VO (119.496s). Background beats stay ≤ 15s.
// XOR: a button window and a conclusion window never overlap, with ≥ 0.2s gap.

export const FPS = 30;
export const DURATION_SEC = 119.496;
export const TOTAL = Math.round(DURATION_SEC * FPS);
export const W = 1080;
export const H = 1920;
export const TOP_SAFE = 140;
export const BOTTOM_THIRD = 1280;
export const BUTTON_Y = 1688;

export function fsec(t: number): number {
  return Math.round(t * FPS);
}

export type Range = [number, number];

export type XorWindow = {
  id: string;
  buttons: Range | null;
  conclusion: Range | null;
};

export const XOR: XorWindow[] = [
  { id: "S01", buttons: [4.28, 6.42], conclusion: null },
  { id: "S02", buttons: [13.22, 15.96], conclusion: [16.28, 38.9] },
  { id: "S03", buttons: [39.2, 42.85], conclusion: [43.2, 47.15] },
  { id: "S04", buttons: null, conclusion: null },
  { id: "S05", buttons: null, conclusion: null },
  { id: "S06", buttons: [101.4, 108.05], conclusion: [108.42, 110.62] },
  { id: "S07", buttons: null, conclusion: [116.55, 119.496] },
];

export type BgSeg = { id: string; from: number; to: number };

export const BGS: BgSeg[] = [
  { id: "desk", from: 0, to: 6.9 },
  { id: "ide", from: 6.9, to: 16.0 },
  { id: "thread", from: 16.0, to: 28.7 },
  { id: "assist", from: 28.7, to: 38.9 },
  { id: "lab", from: 38.9, to: 48.5 },
  { id: "scroll", from: 48.5, to: 56.2 },
  { id: "vault", from: 56.2, to: 64.9 },
  { id: "recap", from: 64.9, to: 69.44 },
  { id: "cabinet", from: 69.44, to: 79.7 },
  { id: "gate", from: 79.7, to: 86.8 },
  { id: "office", from: 86.8, to: 100.62 },
  { id: "confetti", from: 100.62, to: 103.3 },
  { id: "kanban", from: 103.3, to: 110.62 },
  { id: "desk2", from: 110.62, to: 119.496 },
];

export const SCENES: { id: string; from: number; to: number }[] = [
  { id: "S01", from: 0, to: 6.9 },
  { id: "S02", from: 6.9, to: 38.9 },
  { id: "S03", from: 38.9, to: 69.44 },
  { id: "S04", from: 69.44, to: 86.8 },
  { id: "S05", from: 86.8, to: 100.62 },
  { id: "S06", from: 100.62, to: 110.62 },
  { id: "S07", from: 110.62, to: 119.496 },
];

function overlap(a: Range, b: Range): boolean {
  return a[0] < b[1] && b[0] < a[1];
}

function assertCuts(): void {
  for (let i = 0; i < XOR.length; i++) {
    const w = XOR[i];
    if (w.buttons && w.conclusion && overlap(w.buttons, w.conclusion)) {
      throw new Error("XOR overlap in " + w.id);
    }
    if (w.buttons && w.conclusion && w.conclusion[0] < w.buttons[1] + 0.2) {
      throw new Error("XOR gap under 0.2s in " + w.id);
    }
  }
  for (let i = 0; i < XOR.length; i++) {
    for (let j = 0; j < XOR.length; j++) {
      const b = XOR[i].buttons;
      const c = XOR[j].conclusion;
      if (b && c && overlap(b, c)) {
        throw new Error("XOR cross overlap " + XOR[i].id + " / " + XOR[j].id);
      }
    }
  }
  for (let i = 0; i < BGS.length; i++) {
    const dur = BGS[i].to - BGS[i].from;
    if (dur > 15.001) {
      throw new Error("background over 15s: " + BGS[i].id);
    }
    if (i > 0 && Math.abs(BGS[i].from - BGS[i - 1].to) > 0.02) {
      throw new Error("background seam: " + BGS[i].id);
    }
  }
}

assertCuts();

export function xorOf(id: string): XorWindow {
  for (let i = 0; i < XOR.length; i++) {
    if (XOR[i].id === id) return XOR[i];
  }
  throw new Error("missing xor " + id);
}

export function sceneOf(id: string): { id: string; from: number; to: number } {
  for (let i = 0; i < SCENES.length; i++) {
    if (SCENES[i].id === id) return SCENES[i];
  }
  throw new Error("missing scene " + id);
}
