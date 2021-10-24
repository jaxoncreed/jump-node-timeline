import React, { FunctionComponent } from "react";

import AbstractOribitingEntity from "./AbstractOrbitingEntityController";
import { OrbitingBarycenter } from "./entityTypes";

export default class OrbitingBarycenterController
  extends AbstractOribitingEntity
  implements OrbitingBarycenter
{
  public type: "OrbitingBarycenter" = "OrbitingBarycenter";

  renderVisualization: FunctionComponent = () => {
    return <li>OrbitingBarycenter: {this.name}</li>;
  };
}
