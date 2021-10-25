import { Vector3 } from "@react-three/fiber";
import orb from "orbjs";
import { FunctionComponent } from "react";

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

  constructor(input: excludeMethods<OrbitingEntity>) {
    super(input);
    this.orbiting = input.orbiting;
    this.orbitedBy = input.orbitedBy;
    this.keplerianElements = input.keplerianElements;
    this.mass = input.mass;
  }

  abstract renderVisualization: FunctionComponent<{ position: Vector3 }>;

  public renderSelf: FunctionComponent = () => {
    const VisualizationComponent = this.renderVisualization;

    const [position] = orb.position.keplerian(
      this.keplerianElements.semimajorAxis,
      this.keplerianElements.eccentricity,
      this.keplerianElements.inclination,
      this.keplerianElements.longitudeOfAscendingNode,
      this.keplerianElements.argumentOfPeriapsis,
      0,
      0,
      this.keplerianElements.meanAnomalyAtEpoch,
      (this.orbiting as OrbitingEntity).mass
        ? (this.orbiting as OrbitingEntity).mass
        : 0,
      this.mass
    );

    return <VisualizationComponent position={position as Vector3} />;
  };
}
