import Test from "../Test";
import EntityRenderer from "./EntityRenderer";
import JumpNodeRenderer from "./JumpNodeRenderer";
import OrbitingBarycenterRenderer from "./OrbitingBarycenterRenderer";
import PlanetRenderer from "./PlanetRenderer";
import StarRenderer from "./StarRenderer";
import StarSystemBarycenterRenderer from "./StarSystemBarycenterRenderer";

const entityTypeMap: Record<string, EntityRenderer<any>> = {
  JumpNode: JumpNodeRenderer,
  OrbitingBarycenter: OrbitingBarycenterRenderer,
  Planet: PlanetRenderer,
  Star: StarRenderer,
  StarSystemBarycenter: StarSystemBarycenterRenderer,
};

const AggregateEntityRenderer: EntityRenderer = ({
  data,
  parentPositionRef,
}) => {
  console.log("Aggregate");
  const Renderer = entityTypeMap[data.type];
  if (!Renderer) {
    return null;
  }
  return <Renderer data={data} parentPositionRef={parentPositionRef} />;
};

export default AggregateEntityRenderer;
