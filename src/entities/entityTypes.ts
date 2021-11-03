/**
 * General Items
 */
import { Vector3 } from "three";

export interface Entity {
  id: string;
  type: string;
  name: string;
  description: string;
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
    semimajorAxis: number;
    eccentricity: number;
    inclination: number;
    longitudeOfAscendingNode: number;
    argumentOfPeriapsis: number;
    meanAnomalyAtEpoch: number;
  };
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
