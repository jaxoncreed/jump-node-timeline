import { Object3DNode } from "@react-three/fiber";
import React, { forwardRef } from "react";

import AbstractOribitingEntity from "./AbstractOrbitingEntityController";
import { excludeMethods, Planet, PoliticalEntity } from "./entityTypes";

export default class PlanetController
  extends AbstractOribitingEntity
  implements Planet
{
  public radius: number;
  public mass: number;
  public ownedBy: PoliticalEntity[];
  public type: "Planet" = "Planet";

  constructor(input: excludeMethods<Planet>) {
    super(input);
    this.radius = input.radius;
    this.mass = input.mass;
    this.ownedBy = input.ownedBy;
  }

  public renderVisualization = forwardRef<Object3DNode<any, any> | undefined>(
    (props, ref) => {
      return (
        <mesh scale={this.radius * 1000} ref={ref}>
          <sphereGeometry args={[1]} />
          <meshStandardMaterial color={"red"} />
        </mesh>
      );
    }
  );
}
