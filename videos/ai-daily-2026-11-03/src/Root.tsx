import React from "react";
import { Composition } from "remotion";
import { AiDaily } from "./AiDaily";
import { FPS, TOTAL_FRAMES } from "./timing";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="AiDaily1103"
      component={AiDaily}
      durationInFrames={TOTAL_FRAMES}
      fps={FPS}
      width={1080}
      height={1920}
    />
  );
};
