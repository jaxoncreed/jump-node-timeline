import { FunctionComponent } from "react";

import { useTimeline } from "./businessLogic/timelineGlobalHook";

const Test: FunctionComponent<{ name: string }> = ({ name }) => {
  const thing = useTimeline();
  console.log(name, thing);

  return null;
};

export default Test;
