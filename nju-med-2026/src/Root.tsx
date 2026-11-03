import React from "react";
import { Composition } from "remotion";
import { NjuMed, TOTAL } from "./NjuMed";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="NjuMed"
      component={NjuMed}
      durationInFrames={TOTAL}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
