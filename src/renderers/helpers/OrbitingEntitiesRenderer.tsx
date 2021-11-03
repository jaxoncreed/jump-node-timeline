import { useFrame } from "@react-three/fiber";
import orb from "orbjs";
import { FunctionComponent, useCallback, useRef } from "react";
import { Vector3, BufferGeometry } from "three";

import { useTimeline } from "../../businessLogic/timelineGlobalHook";
import { OrbitingEntity } from "../../entities/entityTypes";

export const OrbitingEntityRenderer: FunctionComponent<{
  entity: OrbitingEntity;
  parentPosition: Vector3;
}> = ({ entity }) => {
  const getCartisianCoordinates = useCallback(
    (time: number, differentMeanAnolaly?: number): Vector3 => {
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
      const offsetVector = entity.orbiting.position
        ? entity.orbiting.position
        : new Vector3(0, 0, 0);

      return new Vector3(...position).add(offsetVector);
    },
    [
      entity.keplerianElements.argumentOfPeriapsis,
      entity.keplerianElements.eccentricity,
      entity.keplerianElements.inclination,
      entity.keplerianElements.longitudeOfAscendingNode,
      entity.keplerianElements.meanAnomalyAtEpoch,
      entity.keplerianElements.semimajorAxis,
      entity.mass,
      entity.orbiting,
    ]
  );

  const lineRef = useRef<any>();
  const { getCurrentUniverseTime } = useTimeline();

  useFrame((state, delta) => {
    const elapsedTime = getCurrentUniverseTime(state.clock.getElapsedTime());
    const points = [];
    for (let i = 0; i <= 360; i += 10) {
      points.push(getCartisianCoordinates(elapsedTime, i));
    }
    const geometry = new BufferGeometry().setFromPoints(points);

    if (lineRef.current) {
      lineRef.current.geometry = geometry;
    }
  });

  return (
    <>
      {/* @ts-ignore */}
      <line ref={lineRef}>
        <lineBasicMaterial
          attach="material"
          color={"#9c88ff"}
          linewidth={10}
          linecap={"round"}
          linejoin={"round"}
        />
      </line>
    </>
  );
};


// PARENT POSITION SHOULD BE A REF (for next time)
const OrbitingEntitiesRenderer: FunctionComponent<{
  entities: OrbitingEntity[];
  parentPosition: Vector3;
}> = () => {};

export default OrbitingEntitiesRenderer;
