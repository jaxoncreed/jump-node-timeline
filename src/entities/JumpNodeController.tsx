import { FunctionComponent } from "react";

import AbstractOribitingEntity from "./AbstractOrbitingEntityController";
import { excludeMethods, JumpNode } from "./entityTypes";

export default class JumpNodeController
  extends AbstractOribitingEntity
  implements JumpNode
{
  public type: "JumpNode" = "JumpNode";
  public linksTo: JumpNode;
  public mass: 0 = 0;
  public radius: number;
  public orbitedBy: [] = [];

  constructor(input: excludeMethods<JumpNode>) {
    super(input);
    this.linksTo = input.linksTo;
    this.radius = input.radius;
  }

  renderVisualization: FunctionComponent = () => {
    return null;
  };
}
