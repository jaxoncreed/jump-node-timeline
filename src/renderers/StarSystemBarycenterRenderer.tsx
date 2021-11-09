import { FunctionComponent, useRef } from "react";

import { StarSystemBarycenter } from "../entities/entityTypes";
import { OrbitingEntities } from "./helpers/orbitalPositionHelpers";

const StarSystemBarycenterRenderer: FunctionComponent<{
  data: StarSystemBarycenter;
}> = ({ data }) => {
  const positionRef = useRef(data.position);
  return (
    <OrbitingEntities
      entities={data.orbitedBy}
      parentPositionRef={positionRef}
    />
  );
};

export default StarSystemBarycenterRenderer;
