import {
  useCallback,
  useMemo,
  useRef,
  useState,
  MutableRefObject,
} from "react";

import { createGlobalHook } from "../util/createGlobalHook";

interface TimelineHookReturn {
  setUniverseTime: (time: number) => void;
  setSpeedMultiplier: (multiplier: number) => void;
  getCurrentUniverseTime: (currentClockTime: number) => number;
  curClockTimeRef: MutableRefObject<number>;
}

function timelineGlobalHookFunc(): TimelineHookReturn {
  // The clock at the time that last update was made
  const [epochClockTime, setEpochClockTime] = useState<number>(0);
  // The time in the universe at the time the last update was made
  const [epochUniverseTime, setEpochUniverseTime] = useState<number>(0);
  // How fast the simulation is going
  const [internalSpeedMultiplier, setInternalSpeedMultiplier] =
    useState<number>(60 * 60 * 24 * 30);
  const curClockTimeRef = useRef<number>(0);

  // Get the current time in the simulation
  const getCurrentUniverseTime = useCallback(
    (currentClockTime: number) => {
      const clockTimeElapsedSinceEpoch = currentClockTime - epochClockTime;
      const universeTimeElapsedSinceEpoch =
        clockTimeElapsedSinceEpoch * internalSpeedMultiplier;
      const currentUniverseTime =
        universeTimeElapsedSinceEpoch + epochUniverseTime;
      return currentUniverseTime;
    },
    [epochClockTime, epochUniverseTime, internalSpeedMultiplier]
  );

  const setUniverseTime = useCallback((time: number) => {
    setEpochUniverseTime(time);
    setEpochClockTime(curClockTimeRef.current);
  }, []);

  const setSpeedMultiplier = useCallback(
    (speedMultiplier: number) => {
      const curClockTime = curClockTimeRef.current;
      const curUniverseTime = getCurrentUniverseTime(curClockTime);
      setEpochUniverseTime(curUniverseTime);
      setEpochClockTime(curClockTime);
      setInternalSpeedMultiplier(speedMultiplier);
    },
    [getCurrentUniverseTime]
  );

  const toReturn = useMemo(
    () => ({
      setUniverseTime,
      setSpeedMultiplier,
      getCurrentUniverseTime,
      curClockTimeRef,
    }),
    [getCurrentUniverseTime, setSpeedMultiplier, setUniverseTime]
  );
  return toReturn;
}

const timelineGlobalHook = createGlobalHook(timelineGlobalHookFunc);

export const TimelineContext = timelineGlobalHook.Context;
export const TimelineProvider = timelineGlobalHook.Provider;
export const useTimeline = timelineGlobalHook.useGlobal;
