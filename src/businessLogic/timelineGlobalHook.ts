import { useCallback, useMemo, useState } from "react";

import { createGlobalHook } from "../util/createGlobalHook";

interface TimelineHookReturn {
  setEpochClockTime: React.Dispatch<React.SetStateAction<number>>;
  setEpochUniverseTime: React.Dispatch<React.SetStateAction<number>>;
  setSpeedMultiplier: React.Dispatch<React.SetStateAction<number>>;
  getCurrentUniverseTime: (currentClockTime: number) => number;
}

function timelineGlobalHookFunc(): TimelineHookReturn {
  // The clock at the time that last update was made
  const [epochClockTime, setEpochClockTime] = useState<number>(0);
  // The time in the universe at the time the last update was made
  const [epochUniverseTime, setEpochUniverseTime] = useState<number>(0);
  // How fast the simulation is going
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(
    60 * 60 * 24 * 30
  );

  // Get the current time in the simulation
  const getCurrentUniverseTime = useCallback(
    (currentClockTime: number) => {
      const clockTimeElapsedSinceEpoch = currentClockTime - epochClockTime;
      const universeTimeElapsedSinceEpoch =
        clockTimeElapsedSinceEpoch * speedMultiplier;
      const currentUniverseTime =
        universeTimeElapsedSinceEpoch + epochUniverseTime;
      return currentUniverseTime / 100000000000000000;
    },
    [epochClockTime, epochUniverseTime, speedMultiplier]
  );

  const toReturn = useMemo(
    () => ({
      setEpochClockTime,
      setEpochUniverseTime,
      setSpeedMultiplier,
      getCurrentUniverseTime,
    }),
    [getCurrentUniverseTime]
  );
  return toReturn;
}

const timelineGlobalHook = createGlobalHook(timelineGlobalHookFunc);

export const TimelineContext = timelineGlobalHook.Context;
export const TimelineProvider = timelineGlobalHook.Provider;
export const useTimeline = timelineGlobalHook.useGlobal;
