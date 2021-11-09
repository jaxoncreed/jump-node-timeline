import { useFrame } from "@react-three/fiber";
import orb from "orbjs";
import { FunctionComponent, MutableRefObject, useRef } from "react";
import { BufferGeometry, Vector3 } from "three";

import { useTimeline } from "../../businessLogic/timelineGlobalHook";
import { OrbitingEntity } from "../../entities/entityTypes";
import AggregateEntityRenderer from "../AggregateEntityRenderer";

export function getOrbitalBodyCartisianCoordinates(
  entity: OrbitingEntity,
  parentPosition: Vector3 | undefined,
  time: number,
  differentMeanAnolaly?: number
): Vector3 {
  const meanAnomalyAtEpoch =
    differentMeanAnolaly !== undefined
      ? differentMeanAnolaly
      : entity.keplerianElements.meanAnomalyAtEpoch;
  const [position] = orb.position.keplerian(
    entity.keplerianElements.semimajorAxis,
    entity.keplerianElements.eccentricity,
    orb.common.deg2rad(entity.keplerianElements.inclination),
    orb.common.deg2rad(entity.keplerianElements.longitudeOfAscendingNode),
    orb.common.deg2rad(entity.keplerianElements.argumentOfPeriapsis),
    time,
    0,
    orb.common.deg2rad(meanAnomalyAtEpoch),
    (entity.orbiting as OrbitingEntity).mass
      ? (entity.orbiting as OrbitingEntity).mass
      : 0,
    entity.mass
  );
  const offsetVector = parentPosition ? parentPosition : new Vector3(0, 0, 0);

  return new Vector3(...position).add(offsetVector);
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
