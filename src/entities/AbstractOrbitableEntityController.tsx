import React, { FunctionComponent } from "react";

import AbstractEntityController from "./AbstractEntityController";
import { excludeMethods, OrbitableEntity, OrbitingEntity } from "./entityTypes";

export default abstract class AbstractOrbitableEntityController<
    OrbitedBy extends OrbitingEntity = OrbitingEntity
  >
  extends AbstractEntityController
  implements OrbitableEntity<OrbitedBy>
{
  public orbitedBy: OrbitedBy[];

  constructor(input: excludeMethods<OrbitableEntity<OrbitedBy>>) {
    super(input);
    this.orbitedBy = input.orbitedBy;
  }

  public addOrbitingBodies(...bodies: OrbitedBy[]): void {
    this.orbitedBy = this.orbitedBy.concat(bodies);
  }

  public abstract renderSelf: FunctionComponent;

  public render: FunctionComponent = () => {
    const RenderSelfComponent = this.renderSelf;
    return (
      <ul>
        <RenderSelfComponent />
        {this.orbitedBy.map((orbitingBody) => {
          const Component = orbitingBody.render;
          return <Component key={orbitingBody.id} />;
        })}
      </ul>
    );
  };
}
