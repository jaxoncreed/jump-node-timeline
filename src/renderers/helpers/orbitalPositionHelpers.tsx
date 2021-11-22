import { useFrame } from "@react-three/fiber";
import orb from "orbjs";
import { FunctionComponent, MutableRefObject, useRef } from "react";
import { BufferGeometry, Vector3 } from "three";

import { useNav } from "../../businessLogic/navGlobalHook";
import { useTimeline } from "../../businessLogic/timelineGlobalHook";
import { OrbitingEntity } from "../../entities/entityTypes";
import AggregateEntityRenderer from "../AggregateEntityRenderer";

export function getOrbitalBodyCartisianCoordinates(
  // Orbital Entity
  entity: OrbitingEntity,
  // Parent position (in AU)
  parentPosition: Vector3 | undefined,
  // Time in seconds
  time: number,
  differentMeanAnolaly?: number
): Vector3 {
  const meanAnomalyAtEpoch =
    differentMeanAnolaly !== undefined
      ? differentMeanAnolaly
      : entity.keplerianElements.meanAnomalyAtEpoch;
  const [position] = orb.position.keplerian(
    // Semimajor axis in km
    entity.keplerianElements.semimajorAxis * 1.496e8,
    // Eccentricity in Ratio
    entity.keplerianElements.eccentricity,
    // Inclination in Rad
    orb.common.deg2rad(entity.keplerianElements.inclination),
    // Longitude of Ascending Node in Rad
    orb.common.deg2rad(entity.keplerianElements.longitudeOfAscendingNode),
    // Argument of Pariapsis in Rad
    orb.common.deg2rad(entity.keplerianElements.argumentOfPeriapsis),
    // Time in units of 12 hours for some reason...
    time / (60 * 60 * 12),
    0,
    // Mean anomaly at Epoch
    orb.common.deg2rad(meanAnomalyAtEpoch),
    // Orbited Body Mass
    (entity.orbiting as OrbitingEntity).mass
      ? (entity.orbiting as OrbitingEntity).mass
      : 0,
    // Orbiting body Mass
    entity.mass
  );
  const offsetVector = parentPosition ? parentPosition : new Vector3(0, 0, 0);

  return new Vector3(...position).divideScalar(1.496e8).add(offsetVector);
}

/**
 * Returns a ref to update the position of an orbital body
 */
export function useOrbitPositionRef(
  orbitingEntity: OrbitingEntity,
  parentPositionRef?: MutableRefObject<Vector3 | undefined>,
  renderObjectRef?: MutableRefObject<any>
): MutableRefObject<Vector3 | undefined> {
  const positionRef = useRef<Vector3>();
  const { getCurrentUniverseTime } = useTimeline();
  const { focusVectorRef, focusEntityId } = useNav();
  useFrame((state, delta) => {
    const elapsedTime = getCurrentUniverseTime(state.clock.getElapsedTime());
    positionRef.current = getOrbitalBodyCartisianCoordinates(
      orbitingEntity,
      parentPositionRef?.current,
      elapsedTime
    );
    if (renderObjectRef?.current?.position) {
      (renderObjectRef.current.position as Vector3).set(
        positionRef.current.x,
        positionRef.current.y,
        positionRef.current.z
      );
    }

    // Update camera focus
    if (focusEntityId === orbitingEntity.id) {
      focusVectorRef.current = positionRef.current;
    }
  });
  return positionRef;
}

/**
 * Renders the orbital path
 */
export const OrbitPath: FunctionComponent<{
  orbitingEntity: OrbitingEntity;
  parentPositionRef?: MutableRefObject<Vector3 | undefined>;
}> = ({ orbitingEntity, parentPositionRef }) => {
  const lineRef = useRef<any>();

  const { getCurrentUniverseTime } = useTimeline();

  useFrame((state, delta) => {
    const elapsedTime = getCurrentUniverseTime(state.clock.getElapsedTime());
    const points = [];
    for (let i = 0; i <= 360; i += 10) {
      points.push(
        getOrbitalBodyCartisianCoordinates(
          orbitingEntity,
          parentPositionRef?.current,
          elapsedTime,
          i
        )
      );
    }
    const geometry = new BufferGeometry().setFromPoints(points);

    if (lineRef.current) {
      lineRef.current.geometry = geometry;
    }
  });

  return (
    // @ts-ignore
    <line ref={lineRef}>
      <lineBasicMaterial
        attach="material"
        color={"#9c88ff"}
        linewidth={10}
        linecap={"round"}
        linejoin={"round"}
      />
    </line>
  );
};

/**
 * Helper component to render orbiting bodies
 */
export const OrbitingEntities: FunctionComponent<{
  entities: OrbitingEntity[];
  parentPositionRef?: MutableRefObject<Vector3 | undefined>;
}> = ({ entities, parentPositionRef }) => {
  return (
    <>
      {entities.map((entity) => {
        return (
          <AggregateEntityRenderer
            key={entity.id}
            data={entity}
            parentPositionRef={parentPositionRef}
          />
        );
      })}
    </>
  );
};
