/** Cuts follow Maia v4 speech onsets (10 ms RMS, threshold −34 dB), not the old ~97 s track. */
export const FPS = 30;

export const HOOK_S = {
  open: 0,
  item1: 3.05,
  item2: 14.61,
  item3: 26.98,
  item4: 37.69,
  item5: 46.17,
  close: 56.13,
  /** Decoded wav length. The mp3 container is 58.368 s including encoder delay. */
  audioEnd: 58.32,
};

export const secToFrame = (t: number): number => Math.round(t * FPS);

export const F = {
  open: secToFrame(HOOK_S.open),
  item1: secToFrame(HOOK_S.item1),
  item2: secToFrame(HOOK_S.item2),
  item3: secToFrame(HOOK_S.item3),
  item4: secToFrame(HOOK_S.item4),
  item5: secToFrame(HOOK_S.item5),
  close: secToFrame(HOOK_S.close),
};

export const TOTAL = Math.ceil(HOOK_S.audioEnd * FPS);

export type ItemId = "item1" | "item2" | "item3" | "item4" | "item5";

export const ITEM_ORDER: ItemId[] = ["item1", "item2", "item3", "item4", "item5"];

export const itemWindow = (id: ItemId): { from: number; dur: number; startS: number; endS: number } => {
  const starts: Record<ItemId, number> = {
    item1: F.item1,
    item2: F.item2,
    item3: F.item3,
    item4: F.item4,
    item5: F.item5,
  };
  const ends: Record<ItemId, number> = {
    item1: F.item2,
    item2: F.item3,
    item3: F.item4,
    item4: F.item5,
    item5: F.close,
  };
  const from = starts[id];
  const to = ends[id];
  return { from, dur: to - from, startS: from / FPS, endS: to / FPS };
};
