import React, { useRef } from "react";

import { useNav } from "../businessLogic/navGlobalHook";
import { Planet } from "../entities/entityTypes";
import CameraControls from "../util/CameraControls";
import EntityRenderer from "./EntityRenderer";
import {
  OrbitingEntities,
  OrbitPath,
  useOrbitPositionRef,
} from "./helpers/orbitalPositionHelpers";

const PlanetRenderer: EntityRenderer<Planet> = ({
  data,
  parentPositionRef,
}) => {
  const planetRef = useRef();
  const positionRef = useOrbitPositionRef(data, parentPositionRef, planetRef);
  return (
    <>
      <OrbitPath orbitingEntity={data} parentPositionRef={parentPositionRef} />
      <group ref={planetRef}>
        <mesh scale={data.radius * 1000}>
          <sphereGeometry args={[1]} />
          <meshStandardMaterial color={"red"} />
        </mesh>
      </group>
      <OrbitingEntities
        entities={data.orbitedBy}
        parentPositionRef={positionRef}
      />
    </>
  );
};

export default PlanetRenderer;
