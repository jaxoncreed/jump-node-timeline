import { FunctionComponent } from "react";

import { StarSystemBarycenter, Universe } from "../../entities/entityTypes";
import StarSystemNav from "./StarSystemNav";

const NavMenu: FunctionComponent<{ data: Universe }> = ({ data }) => {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 100,
        left: 0,
        top: 0,
        width: 300,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        overflow: "auto",
        padding: 10,
      }}
    >
      {data.entities.map((entity) => {
        if (entity.type === "StarSystemBarycenter") {
          return (
            <StarSystemNav
              data={entity as StarSystemBarycenter}
              key={entity.id}
            />
          );
        }
        return undefined;
      })}
    </div>
  );
};

export default NavMenu;
