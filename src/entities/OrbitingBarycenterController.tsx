import { Object3DNode } from "@react-three/fiber";
import { forwardRef } from "react";

import AbstractOribitingEntity from "./AbstractOrbitingEntityController";
import { OrbitingBarycenter } from "./entityTypes";

export default class OrbitingBarycenterController
  extends AbstractOribitingEntity
  implements OrbitingBarycenter
{
  public type: "OrbitingBarycenter" = "OrbitingBarycenter";
  public mass: 0 = 0;

  public renderVisualization = forwardRef<Object3DNode<any, any> | undefined>(
    (props, ref) => {
      return null;
    }
  );
}
