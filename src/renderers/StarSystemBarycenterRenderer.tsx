import { FunctionComponent } from "react";

import { StarSystemBarycenter } from "../entities/entityTypes";
import OrbitingEntitiesRenderer from "./helpers/OrbitingEntitiesRenderer";

const StarSystemBarycenterRenderer: FunctionComponent<{
  data: StarSystemBarycenter;
}> = ({ data }) => {
  return (
    <OrbitingEntitiesRenderer
      entities={data.orbitedBy}
      parentPosition={data.position}
    />
  );
};

export default StarSystemBarycenterRenderer;
