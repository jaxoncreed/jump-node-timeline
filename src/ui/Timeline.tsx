import { FunctionComponent } from "react";

import { useTimeline } from "../businessLogic/timelineGlobalHook";

const Timeline: FunctionComponent = () => {
  const { setSpeedMultiplier } = useTimeline();

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
  );
};

export default Timeline;
