import React from "react";

import { OrbitingBarycenter } from "../entities/entityTypes";
import EntityRenderer from "./EntityRenderer";
import {
  OrbitingEntities,
  useOrbitPositionRef,
} from "./helpers/orbitalPositionHelpers";

const OrbitingBarycenterRenderer: EntityRenderer<OrbitingBarycenter> = ({
  data,
  parentPositionRef,
}) => {
  const positionRef = useOrbitPositionRef(data, parentPositionRef);
  return (
    <OrbitingEntities
      entities={data.orbitedBy}
      parentPositionRef={positionRef}
    />
  );
};

export default OrbitingBarycenterRenderer;
