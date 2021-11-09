import React, { useRef } from "react";

import { Planet } from "../entities/entityTypes";
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
      <mesh scale={data.radius * 1000} ref={planetRef}>
        <sphereGeometry args={[1]} />
        <meshStandardMaterial color={"red"} />
      </mesh>
      <OrbitingEntities
        entities={data.orbitedBy}
        parentPositionRef={positionRef}
      />
    </>
  );
};

export default PlanetRenderer;
