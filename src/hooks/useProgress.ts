import { useEffect, useState } from "react";

export const useProgress = (
  start: number,
  timestamp: number,
  interval: number = 1000
): number => {
  const [time, setTime] = useState<number>();
  const [progress, setProgress] = useState<number>(start);

  useEffect(() => {
    if (time !== timestamp) {
      setTime(timestamp);
      setProgress(start);
    }
  }, [start, timestamp]);

  useEffect(() => {
    if (!start) return;
    const intervalId = setInterval(() => {
      setProgress((currentProgress) => {
        if (time !== timestamp) {
          setTime(timestamp);
          return start;
        }
        return currentProgress ? currentProgress + interval : start;
      });
    }, interval);

    return () => clearInterval(intervalId);
  }, [start, setProgress, time, timestamp]);

  return progress;
};
