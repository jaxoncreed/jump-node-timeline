import { FunctionComponent, useCallback } from "react";

import { useNav } from "../../businessLogic/navGlobalHook";
import { Entity, OrbitableEntity } from "../../entities/entityTypes";

const StarSystemBodyNav: FunctionComponent<{ data: Entity }> = ({ data }) => {
  const { setFocusEntityId } = useNav();

  const onPress = useCallback(() => {
    setFocusEntityId(data.id);
  }, [data.id, setFocusEntityId]);

  return (
    <>
      <button onClick={onPress}>{data.name}</button>
      {(data as OrbitableEntity).orbitedBy
        ? (data as OrbitableEntity).orbitedBy.map((entity) => {
            return <StarSystemBodyNav data={entity} key={entity.id} />;
          })
        : undefined}
    </>
  );
};

export default StarSystemBodyNav;
