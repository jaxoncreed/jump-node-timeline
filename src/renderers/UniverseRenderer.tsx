import {
  PerspectiveCamera,
  OrbitControls,
  useContextBridge,
  Stars,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { FunctionComponent, useRef } from "react";

import Test from "../Test";
import { TimelineContext } from "../businessLogic/timelineGlobalHook";
import { Universe } from "../entities/entityTypes";
import AggregateEntityRenderer from "./AggregateEntityRenderer";

const UniverseRenderer: FunctionComponent<{ data: Universe }> = ({
  data: { entities },
}) => {
  console.log("Universe");
  const camera = useRef();
  const ContextBridge = useContextBridge(TimelineContext);
  return (
    <>
      <Canvas style={{ backgroundColor: "black" }}>
        <ContextBridge>
          <Stars
            radius={100}
            depth={50}
            count={5000}
            factor={4}
            saturation={0}
            fade
          />
          <PerspectiveCamera ref={camera} />
          <OrbitControls camera={camera.current} />
          <ambientLight intensity={0.5} />
          {entities.map((entity) => (
            <AggregateEntityRenderer key={entity.id} data={entity} />
          ))}
        </ContextBridge>
      </Canvas>
    </>
  );
};

export default UniverseRenderer;
