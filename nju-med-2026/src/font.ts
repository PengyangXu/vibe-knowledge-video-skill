import { continueRender, delayRender, staticFile } from "remotion";

export const FONT =
  '"Noto Sans SC", "WenQuanYi Micro Hei", "Droid Sans Fallback", sans-serif';

const handle = delayRender("Loading Noto Sans SC");
const face = new FontFace(
  "Noto Sans SC",
  `url(${staticFile("fonts/NotoSansSC-700.woff2")}) format("woff2")`,
  { weight: "700", style: "normal" },
);
face
  .load()
  .then((loaded) => {
    (document.fonts as unknown as { add: (face: FontFace) => void }).add(loaded);
    continueRender(handle);
  })
  .catch((err) => {
    console.warn("font load failed", err);
    continueRender(handle);
  });
