import { useFrame } from "@react-three/fiber";
import orb from "orbjs";
import {
  FunctionComponent,
  MutableRefObject,
  useCallback,
  useRef,
} from "react";
import { Vector3, BufferGeometry } from "three";

import { useTimeline } from "../../businessLogic/timelineGlobalHook";
import { OrbitingEntity } from "../../entities/entityTypes";
import EntityRenderer from "../AggregateEntityRenderer";

export const OrbitingEntityRenderer: FunctionComponent<{
  entity: OrbitingEntity;
  parentPositionRef?: MutableRefObject<Vector3>;
}> = ({ entity, parentPositionRef }) => {
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
      const offsetVector =
        parentPositionRef && parentPositionRef.current
          ? parentPositionRef.current
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
      parentPositionRef,
    ]
  );

  const lineRef = useRef<any>();
  const orbitingBodyRef = useRef<any>();
  const orbitalBodyPositionRef = useRef<Vector3>();
  const { getCurrentUniverseTime } = useTimeline();

  useFrame((state, delta) => {
    // Set Orbit Line
    const elapsedTime = getCurrentUniverseTime(state.clock.getElapsedTime());
    const points = [];
    for (let i = 0; i <= 360; i += 10) {
      points.push(getCartisianCoordinates(elapsedTime, i));
    }
    const geometry = new BufferGeometry().setFromPoints(points);

    if (lineRef.current) {
      lineRef.current.geometry = geometry;
    }

    // Set Oribital Body Position
    orbitalBodyPositionRef.current = getCartisianCoordinates(elapsedTime);
    if (orbitingBodyRef.current && orbitingBodyRef.current.position) {
      (orbitingBodyRef.current.position as Vector3).set(
        orbitalBodyPositionRef.current.x,
        orbitalBodyPositionRef.current.y,
        orbitalBodyPositionRef.current.z
      );
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
      <group ref={orbitingBodyRef}>
        <EntityRenderer data={entity} />
      </group>
    </>
  );
};

const OrbitingEntitiesRenderer: FunctionComponent<{
  entities: OrbitingEntity[];
  parentPositionRef?: MutableRefObject<Vector3>;
}> = ({ entities, parentPositionRef }) => {
  return (
    <>
      {entities.map((entity) => {
        return (
          <OrbitingEntityRenderer
            entity={entity}
            parentPositionRef={parentPositionRef}
          />
        );
      })}
    </>
  );
};

export default OrbitingEntitiesRenderer;
