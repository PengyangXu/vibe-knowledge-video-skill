import { continueRender, delayRender, staticFile } from "remotion";

const FONT = "Noto Sans SC";

if (typeof document !== "undefined") {
  const handle = delayRender("Loading Noto Sans SC");
  const jobs: { weight: string; file: string }[] = [
    { weight: "400", file: "fonts/NotoSansSC-400.woff2" },
    { weight: "700", file: "fonts/NotoSansSC-700.woff2" },
  ];
  Promise.all(
    jobs.map(({ weight, file }) => {
      const face = new FontFace(FONT, `url(${staticFile(file)}) format("woff2")`, {
        weight,
        style: "normal",
      });
      return face.load().then((loaded) => {
        (document.fonts as unknown as { add: (font: FontFace) => void }).add(loaded);
      });
    })
  )
    .then(() => continueRender(handle))
    .catch((err) => {
      console.error(err);
      continueRender(handle);
    });
}

export const FONT_FAMILY =
  '"Noto Sans SC","WenQuanYi Micro Hei","Droid Sans Fallback",sans-serif';
