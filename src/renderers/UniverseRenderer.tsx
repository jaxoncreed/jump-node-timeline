import { Canvas } from "@react-three/fiber";
import React, { FunctionComponent } from "react";

import { Universe } from "../entities/entityTypes";
import Test from "../Test";
import CameraControls from "../util/CameraControls";
import AggregateEntityRenderer from "./AggregateEntityRenderer";

const UniverseRenderer: FunctionComponent<{ data: Universe }> = ({
  data: { entities },
}) => {
  console.log("Universe");
  return (
    <>
      <Test name="1" />
      <Canvas style={{ backgroundColor: "black" }}>
        <Test name="2" />
        <CameraControls />
        <ambientLight intensity={0.5} />
        {entities.map((entity) => (
          <AggregateEntityRenderer key={entity.id} data={entity} />
        ))}
        <Test name="3" />
      </Canvas>
      <Test name="4" />
    </>
  );
};

export default UniverseRenderer;
