import React, { FunctionComponent } from "react";

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

  renderVisualization: FunctionComponent = () => {
    return <li>Planet: {this.name}</li>;
  };
}
