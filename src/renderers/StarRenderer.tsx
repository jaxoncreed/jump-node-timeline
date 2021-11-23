import React, { useRef } from "react";

import { Star } from "../entities/entityTypes";
import { WORLD_LOCATION_MULTIPLIER } from "../util/contants";
import EntityRenderer from "./EntityRenderer";
import {
  OrbitingEntities,
  OrbitPath,
  useOrbitPositionRef,
} from "./helpers/orbitalPositionHelpers";

const StarRenderer: EntityRenderer<Star> = ({ data, parentPositionRef }) => {
  const starRef = useRef();
  const positionRef = useOrbitPositionRef(data, parentPositionRef, starRef);
  return (
    <>
      <OrbitPath orbitingEntity={data} parentPositionRef={parentPositionRef} />
      <group ref={starRef}>
        <mesh scale={data.radius * WORLD_LOCATION_MULTIPLIER}>
          <sphereGeometry args={[1]} />
          <meshStandardMaterial color={data.color} />
        </mesh>
        <pointLight />
      </group>
      <OrbitingEntities
        entities={data.orbitedBy}
        parentPositionRef={positionRef}
      />
    </>
  );
};

export default StarRenderer;
