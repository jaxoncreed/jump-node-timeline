import { FunctionComponent } from "react";

import { useTimeline } from "./businessLogic/timelineGlobalHook";

const Test: FunctionComponent = () => {
  const thing = useTimeline();
  console.log(thing);
  console.log(this);

  return null;
};

export default Test;
