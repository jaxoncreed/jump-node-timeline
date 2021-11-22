import { FunctionComponent } from "react";

import { StarSystemBarycenter } from "../../entities/entityTypes";
import StarSystemBodyNav from "./StarSystemBodyNav";

const StarSystemNav: FunctionComponent<{ data: StarSystemBarycenter }> = ({
  data,
}) => {
  return (
    <div>
      <h2 style={{ color: "white" }}>{data.name}</h2>
      {data.orbitedBy.map((entity) => {
        return <StarSystemBodyNav data={entity} key={entity.id} />;
      })}
    </div>
  );
};

export default StarSystemNav;
