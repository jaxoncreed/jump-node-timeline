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

  renderVisualization: FunctionComponent = () => {
    return <li>Star: {this.name}</li>;
  };
}
