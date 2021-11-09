import { Object3DNode, useFrame } from "@react-three/fiber";
import orb from "orbjs";
import { FunctionComponent, useRef } from "react";
import { Vector3, BufferGeometry } from "three";

import { useTimeline } from "../businessLogic/timelineGlobalHook";
import AbstractOrbitableEntityController from "./AbstractOrbitableEntityController";
import { excludeMethods, OrbitableEntity, OrbitingEntity } from "./entityTypes";

export default abstract class AbstractOribitingEntity
  extends AbstractOrbitableEntityController
  implements OrbitingEntity
{
  public orbiting: OrbitableEntity<OrbitingEntity>;
  public orbitedBy: OrbitingEntity[];
  public keplerianElements: {
    semimajorAxis: number;
    eccentricity: number;
    inclination: number;
    longitudeOfAscendingNode: number;
    argumentOfPeriapsis: number;
    meanAnomalyAtEpoch: number;
  };
  public mass: number;
  public position: Vector3 | undefined;
  public stop: boolean = false;

  constructor(input: excludeMethods<OrbitingEntity>) {
    super(input);
    this.orbiting = input.orbiting;
    this.orbitedBy = input.orbitedBy;
    this.keplerianElements = input.keplerianElements;
    this.mass = input.mass;
  }

  abstract renderVisualization: FunctionComponent;

  private getCartisianCoordinates(
    time: number,
    differentMeanAnolaly?: number
  ): Vector3 {
    const meanAnomalyAtEpoch =
      differentMeanAnolaly !== undefined
        ? differentMeanAnolaly
        : this.keplerianElements.meanAnomalyAtEpoch;
    const [position] = orb.position.keplerian(
      this.keplerianElements.semimajorAxis,
      this.keplerianElements.eccentricity,
      orb.common.deg2rad(this.keplerianElements.inclination),
      orb.common.deg2rad(this.keplerianElements.longitudeOfAscendingNode),
      orb.common.deg2rad(this.keplerianElements.argumentOfPeriapsis),
      time,
      0,
      orb.common.deg2rad(meanAnomalyAtEpoch),
      (this.orbiting as OrbitingEntity).mass
        ? (this.orbiting as OrbitingEntity).mass
        : 0,
      this.mass
    );
    const offsetVector = this.orbiting.position
      ? this.orbiting.position
      : new Vector3(0, 0, 0);

    return new Vector3(...position).add(offsetVector);
  }

  private renderOrbitLine: FunctionComponent = () => {
    const lineRef = useRef<any>();
    const thing = useTimeline();
    console.log(thing);

    // useFrame((state, delta) => {
    //   const elapsedTime = getCurrentUniverseTime(state.clock.getElapsedTime());
    //   const points = [];
    //   for (let i = 0; i <= 360; i += 10) {
    //     points.push(this.getCartisianCoordinates(elapsedTime, i));
    //   }
    //   const geometry = new BufferGeometry().setFromPoints(points);

    //   if (lineRef.current) {
    //     lineRef.current.geometry = geometry;
    //   }
    // });

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

  public renderSelf: FunctionComponent = () => {
    const VisualizationComponent = this.renderVisualization;
    const OrbitComponent = this.renderOrbitLine;

    const orbitingBodyRef = useRef<Object3DNode<any, any>>();
    const { getCurrentUniverseTime } = useTimeline();

    useFrame((state, delta) => {
      const elapsedTime = getCurrentUniverseTime(state.clock.getElapsedTime());
      this.position = this.getCartisianCoordinates(elapsedTime);
      if (orbitingBodyRef.current && orbitingBodyRef.current.position) {
        (orbitingBodyRef.current.position as Vector3).set(
          this.position.x,
          this.position.y,
          this.position.z
        );
      }
    });

    return (
      <>
        <OrbitComponent />
        <group ref={orbitingBodyRef}>
          <VisualizationComponent />
        </group>
      </>
    );
  };
}
