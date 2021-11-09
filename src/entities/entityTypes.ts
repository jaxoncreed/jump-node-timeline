/**
 * General Items
 */
import { FunctionComponent } from "react";
import { Vector3 } from "three";

export interface Entity {
  id: string;
  type: string;
  name: string;
  description: string;
  // TODO: Remove this
  render: FunctionComponent;
}

export interface StationaryEntity<
  OrbitedBy extends OrbitingEntity = OrbitingEntity
> extends Entity,
    OrbitableEntity<OrbitedBy> {
  position: Vector3;
}

export interface OrbitableEntity<
  OrbitedBy extends OrbitingEntity = OrbitingEntity
> extends Entity {
  orbitedBy: OrbitedBy[];
  position?: Vector3;
}

export interface OrbitingEntity extends Entity, OrbitableEntity {
  orbiting: OrbitableEntity;
  keplerianElements: {
    // Semimajor axis is AU
    semimajorAxis: number;
    // Eccentricity in ratio
    eccentricity: number;
    // Inclanation in deg
    inclination: number;
    // Logitude of Acending node in deg
    longitudeOfAscendingNode: number;
    // Argument of Pariapsis in deg
    argumentOfPeriapsis: number;
    // Mean anomaly in deg
    meanAnomalyAtEpoch: number;
  };
  // Mass in kg
  mass: number;
}

export interface SphericalBody {
  radius: number;
}

export interface Ownable {
  ownedBy: PoliticalEntity[];
}

/**
 * Specific Items
 */
export interface Universe extends Entity {
  type: "Universe";
  entities: StationaryEntity[];
}

export interface PoliticalEntity extends Entity {
  type: "PoliticalEntity";
  symbol: string;
}

export interface StarSystemBarycenter extends StationaryEntity<Star>, Ownable {
  type: "StarSystemBarycenter";
}

export interface Star extends OrbitingEntity, SphericalBody {
  type: "Star";
  color: string;
}

export interface Planet extends OrbitingEntity, SphericalBody, Ownable {
  type: "Planet";
}

export interface OrbitingBarycenter extends OrbitingEntity {
  type: "OrbitingBarycenter";
  mass: 0;
}

export interface JumpNode extends OrbitingEntity, SphericalBody {
  type: "JumpNode";
  linksTo: JumpNode;
  mass: 0;
  orbitedBy: [];
}

/**
 * Utility Types
 */
export type excludeMethods<T> = Omit<
  T,
  "render" | "renderSelf" | "renderVisualization" | "type"
>;
