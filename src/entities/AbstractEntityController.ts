import { FunctionComponent } from "react";

import { Entity, excludeMethods } from "./entityTypes";

export default abstract class AbstractEntityController implements Entity {
  public id: string;
  public type: string = "Entity";
  public name: string;
  public description: string;

  constructor(input: excludeMethods<Entity>) {
    this.id = input.id;
    this.name = input.name;
    this.description = input.description;
  }

  public abstract render: FunctionComponent;
}
