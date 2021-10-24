import { FunctionComponent } from "react";

import AbstractOrbitableEntityController from "./AbstractOrbitableEntityController";
import { excludeMethods, OrbitableEntity, OrbitingEntity } from "./entityTypes";

export default abstract class AbstractOribitingEntity
  extends AbstractOrbitableEntityController
  implements OrbitingEntity
{
  public orbiting: OrbitableEntity<OrbitingEntity>;
  public orbitedBy: OrbitingEntity[];

  constructor(input: excludeMethods<OrbitingEntity>) {
    super(input);
    this.orbiting = input.orbiting;
    this.orbitedBy = input.orbitedBy;
  }

  abstract renderVisualization: FunctionComponent;

  public renderSelf: FunctionComponent = () => {
    // Positioning based on location
    const Component = this.renderVisualization;
    return <Component />;
  };
}
