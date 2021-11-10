import {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
  MouseEvent,
  useRef,
} from "react";

import { useTimeline } from "../businessLogic/timelineGlobalHook";

const END_OF_TIMELINE = 60 * 60 * 24 * 365.25 * 10;

const Timeline: FunctionComponent = () => {
  const [timelineTickPosition, setTimelineTickPosition] = useState(0);
  const {
    setSpeedMultiplier,
    curClockTimeRef,
    getCurrentUniverseTime,
    setUniverseTime,
  } = useTimeline();
  const isDraggingCursorRef = useRef(false);

  useEffect(() => {
    const timeout = setInterval(() => {
      const curUniverseTime = getCurrentUniverseTime(curClockTimeRef.current);
      setTimelineTickPosition(
        curUniverseTime === 0 ? 0 : (curUniverseTime / END_OF_TIMELINE) * 100
      );
    }, 100);
    return () => {
      clearInterval(timeout);
    };
  }, [curClockTimeRef, getCurrentUniverseTime]);

  const updateUniverseTime = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (isDraggingCursorRef.current) {
        // @ts-ignore
        const timelinePercent = e.pageX / e.target.clientWidth;
        const newUniverseTime = timelinePercent * END_OF_TIMELINE;
        setUniverseTime(newUniverseTime);
        setTimelineTickPosition(
          timelinePercent === 0 ? 0 : timelinePercent * 100
        );
      }
    },
    [setUniverseTime]
  );

  const onTimelineMouseDown = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      isDraggingCursorRef.current = true;
      updateUniverseTime(e);
    },
    [updateUniverseTime]
  );

  const onTimelineMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      updateUniverseTime(e);
    },
    [updateUniverseTime]
  );

  const onTimelineMouseUp = useCallback(() => {
    isDraggingCursorRef.current = false;
  }, []);

  const onTimelineMouseOut = useCallback(() => {
    isDraggingCursorRef.current = false;
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 100,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
      }}
    >
      <div style={{ position: "absolute", bottom: 100 }}>
        <button onClick={() => setSpeedMultiplier(0)}>Pause</button>
        <button onClick={() => setSpeedMultiplier(60 * 60 * 24)}>
          1 day per second
        </button>
        <button onClick={() => setSpeedMultiplier(60 * 60 * 24 * 30)}>
          1 month per second
        </button>
        <button onClick={() => setSpeedMultiplier(60 * 60 * 24 * 365)}>
          1 year per second
        </button>
      </div>
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          overflow: "hidden",
        }}
        onMouseDown={onTimelineMouseDown}
        onMouseUp={onTimelineMouseUp}
        onMouseMove={onTimelineMouseMove}
        onMouseOut={onTimelineMouseOut}
      >
        <div
          style={{
            position: "absolute",
            height: "100%",
            borderLeft: "1px solid #FFF",
            left: `${timelineTickPosition}%`,
            pointerEvents: "none",
          }}
        />
      </div>
    </div>
  );
};

export default Timeline;
