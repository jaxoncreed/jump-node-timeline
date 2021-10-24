import React, { FunctionComponent } from "react";

import AbstractEntityController from "./AbstractEntityController";
import {
  excludeMethods,
  OrbitingEntity,
  StationaryEntity,
  Universe,
} from "./entityTypes";

export default class UniverseController
  extends AbstractEntityController
  implements Universe
{
  public type: "Universe" = "Universe";
  public entities: StationaryEntity<OrbitingEntity>[];

  constructor(input: excludeMethods<Universe>) {
    super(input);
    this.entities = input.entities;
  }

  public render: FunctionComponent = () => {
    return (
      <>
        <p>Universe: {this.name}</p>
        <ul>
          {this.entities.map((entity) => {
            const EntityComponent = entity.render;
            return <EntityComponent key={entity.id} />;
          })}
        </ul>
      </>
    );
  };
}
