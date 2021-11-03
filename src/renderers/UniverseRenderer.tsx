import { Canvas } from "@react-three/fiber";
import React, { FunctionComponent } from "react";

import { Universe } from "../entities/entityTypes";
import CameraControls from "../util/CameraControls";
import EntityRenderer from "./EntityRenderer";

const UniverseRenderer: FunctionComponent<{ data: Universe }> = ({
  data: { entities },
}) => {
  return (
    <Canvas style={{ backgroundColor: "black" }}>
      <CameraControls />
      <ambientLight intensity={0.5} />
      {entities.map((entity) => {
        <EntityRenderer data={entity} />;
      })}
    </Canvas>
  );
};

export default UniverseRenderer;
