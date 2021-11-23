import React, { useRef } from "react";

import { Planet } from "../entities/entityTypes";
import { WORLD_LOCATION_MULTIPLIER } from "../util/contants";
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
  console.log(data.radius * WORLD_LOCATION_MULTIPLIER);
  return (
    <>
      <OrbitPath orbitingEntity={data} parentPositionRef={parentPositionRef} />
      <group ref={planetRef}>
        <mesh scale={data.radius * WORLD_LOCATION_MULTIPLIER}>
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
