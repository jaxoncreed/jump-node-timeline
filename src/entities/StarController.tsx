import { Vector3 } from "@react-three/fiber";
import React, { FunctionComponent } from "react";

import AbstractOribitingEntity from "./AbstractOrbitingEntityController";
import { excludeMethods, Star } from "./entityTypes";

export default class StarController
  extends AbstractOribitingEntity
  implements Star
{
  public radius: number;
  public mass: number;
  public type: "Star" = "Star";
  public color: string;

  constructor(input: excludeMethods<Star>) {
    super(input);
    this.radius = input.radius;
    this.mass = input.mass;
    this.color = input.color;
  }

  renderVisualization: FunctionComponent<{ position: Vector3 }> = ({
    position,
  }) => {
    console.log(this.radius * 2);
    return (
      <>
        <mesh scale={this.radius * 10} position={position}>
          <sphereGeometry args={[1]} />
          <meshStandardMaterial color={this.color} />
        </mesh>
        <pointLight position={position} />
      </>
    );
  };
}
