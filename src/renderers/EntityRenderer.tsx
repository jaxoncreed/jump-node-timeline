import { FunctionComponent } from "react";

import { Entity } from "../entities/entityTypes";
import JumpNodeRenderer from "./JumpNodeRenderer";
import OrbitingBarycenterRenderer from "./OrbitingBarycenterRenderer";
import PlanetRenderer from "./PlanetRenderer";
import StarRenderer from "./StarRenderer";
import StarSystemBarycenterRenderer from "./StarSystemBarycenterRenderer";

const entityTypeMap: Record<string, FunctionComponent<{ data: Entity }>> = {
  JumpNode: JumpNodeRenderer,
  OrbitingBarrycenter: OrbitingBarycenterRenderer,
  Planet: PlanetRenderer,
  Star: StarRenderer,
  StarSystemBarrycenter: StarSystemBarycenterRenderer,
};

const EntityRenderer: FunctionComponent<{ data: Entity }> = ({ data }) => {
  const Renderer = entityTypeMap[data.type];
  if (!Renderer) {
    return null;
  }
  return <Renderer data={data} />;
};

export default EntityRenderer;
