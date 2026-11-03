import React from "react";
import { Composition } from "remotion";
import { AIDaily } from "./Daily";
import { FPS, TOTAL } from "./cuts";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="AIDaily"
      component={AIDaily}
      durationInFrames={TOTAL}
      fps={FPS}
      width={1080}
      height={1920}
    />
  );
};
