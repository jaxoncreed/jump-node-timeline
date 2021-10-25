import { Vector3 } from "@react-three/fiber";
import { FunctionComponent } from "react";

import AbstractOrbitableEntityController from "./AbstractOrbitableEntityController";
import {
  excludeMethods,
  PoliticalEntity,
  Star,
  StarSystemBarycenter,
} from "./entityTypes";

export default class StarSystemBarycenterController
  extends AbstractOrbitableEntityController<Star>
  implements StarSystemBarycenter
{
  position: Vector3;
  ownedBy: PoliticalEntity[];
  public type: "StarSystemBarycenter" = "StarSystemBarycenter";

  constructor(input: excludeMethods<StarSystemBarycenter>) {
    super(input);
    this.position = input.position;
    this.ownedBy = input.ownedBy;
  }

  renderSelf: FunctionComponent = () => {
    return null;
  };
}
