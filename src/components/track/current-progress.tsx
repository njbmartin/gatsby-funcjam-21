import { Progress } from "@theme-ui/components";
import React, { FC } from "react";

import { SpotifyCurrent } from "../../types/spotify";
import { useProgress } from "../../hooks/useProgress";

interface CurrentProgressProps {
  current: SpotifyCurrent;
}

export const CurrentProgress: FC<CurrentProgressProps> = ({ current }) => {
  const progress = useProgress(
    current && current.progress_ms,
    current && current.timestamp
  );
  if (!current) return null;

  const { item: track } = current;
  return <Progress max={1} value={progress / track.duration_ms} />;
};
