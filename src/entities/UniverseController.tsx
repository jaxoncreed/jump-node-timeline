import { Canvas } from "@react-three/fiber";
import React, { FunctionComponent } from "react";

import CameraControls from "../util/CameraControls";
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
      <Canvas style={{ backgroundColor: "black" }}>
        <CameraControls />
        <ambientLight intensity={0.5} />
        {this.entities.map((entity) => {
          const EntityComponent = entity.render;
          return <EntityComponent key={entity.id} />;
        })}
      </Canvas>
    );
  };
}
