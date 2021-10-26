import { Object3DNode } from "@react-three/fiber";
import { forwardRef } from "react";

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

  public renderVisualization = forwardRef<Object3DNode<any, any> | undefined>(
    (props, ref) => {
      return null;
    }
  );
}
