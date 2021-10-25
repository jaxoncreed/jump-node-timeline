import { FunctionComponent } from "react";

import AbstractOribitingEntity from "./AbstractOrbitingEntityController";
import { OrbitingBarycenter } from "./entityTypes";

export default class OrbitingBarycenterController
  extends AbstractOribitingEntity
  implements OrbitingBarycenter
{
  public type: "OrbitingBarycenter" = "OrbitingBarycenter";
  public mass: 0 = 0;

  renderVisualization: FunctionComponent = () => {
    return null;
  };
}
