import { FunctionComponent, MutableRefObject } from "react";
import { Vector3 } from "three";

import { Entity } from "../entities/entityTypes";

export interface EntityRendererProps<EntityType extends Entity = Entity> {
  data: EntityType;
  parentPositionRef?: MutableRefObject<Vector3 | undefined>;
}
type EntityRenderer<EntityType extends Entity = Entity> = FunctionComponent<
  EntityRendererProps<EntityType>
>;
export default EntityRenderer;
