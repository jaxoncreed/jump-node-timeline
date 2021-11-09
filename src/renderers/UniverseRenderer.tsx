import { useContextBridge, Stars } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import React, { FunctionComponent } from "react";

import {
  TimelineContext,
  useTimeline,
} from "../businessLogic/timelineGlobalHook";
import { Universe } from "../entities/entityTypes";
import CameraControls from "../util/CameraControls";
import AggregateEntityRenderer from "./AggregateEntityRenderer";
import EntityRenderer from "./EntityRenderer";

const UniverseScene: EntityRenderer<Universe> = ({ data: { entities } }) => {
  const { curClockTimeRef } = useTimeline();
  useFrame(({ clock }) => {
    curClockTimeRef.current = clock.elapsedTime;
  });

  return (
    <>
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
      />
      <CameraControls />
      <ambientLight intensity={0.5} />
      {entities.map((entity) => (
        <AggregateEntityRenderer key={entity.id} data={entity} />
      ))}
    </>
  );
};

const UniverseRenderer: FunctionComponent<{ data: Universe }> = ({ data }) => {
  const ContextBridge = useContextBridge(TimelineContext);
  return (
    <>
      <Canvas style={{ backgroundColor: "black" }}>
        <ContextBridge>
          <UniverseScene data={data} />
        </ContextBridge>
      </Canvas>
    </>
  );
};

export default UniverseRenderer;
