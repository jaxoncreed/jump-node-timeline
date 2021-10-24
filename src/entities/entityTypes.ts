/**
 * General Items
 */

import { FunctionComponent } from "react";

export interface Entity {
  id: string;
  type: string;
  name: string;
  description: string;
  render: FunctionComponent;
}

export interface StationaryEntity<
  OrbitedBy extends OrbitingEntity = OrbitingEntity
> extends Entity,
    OrbitableEntity<OrbitedBy> {
  position: number[];
}

export interface OrbitableEntity<
  OrbitedBy extends OrbitingEntity = OrbitingEntity
> extends Entity {
  orbitedBy: OrbitedBy[];
  renderSelf: FunctionComponent;
}

export interface OrbitingEntity extends Entity, OrbitableEntity {
  orbiting: OrbitableEntity;
  renderVisualization: FunctionComponent;
}

export interface SphericalBody {
  radius: number;
  mass: number;
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
