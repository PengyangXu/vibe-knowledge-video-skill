import React from "react";
import { Composition } from "remotion";
import { Daily } from "./Daily";
import { FPS, H, TOTAL, W } from "./timing";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="Daily"
      component={Daily}
      durationInFrames={TOTAL}
      fps={FPS}
      width={W}
      height={H}
    />
  );
};
