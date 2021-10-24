import React, { FunctionComponent } from "react";

import OrbitingBarycenterController from "./entities/OrbitingBarycenterController";
import PlanetController from "./entities/PlanetController";
import StarController from "./entities/StarController";
import StarSystemBarycenterController from "./entities/StarSystemBarycenterController";
import UniverseController from "./entities/UniverseController";
import { PoliticalEntity } from "./entities/entityTypes";

const un: PoliticalEntity = {
  type: "PoliticalEntity",
  id: "pe1",
  name: "United Nations",
  description: "The United Nations",
  symbol: "",
  render: () => null,
};

const mcr: PoliticalEntity = {
  type: "PoliticalEntity",
  id: "pe2",
  name: "Martian Congressional Republic",
  description: "Martian Congressional Republic",
  symbol: "",
  render: () => null,
};

const opa: PoliticalEntity = {
  type: "PoliticalEntity",
  id: "Outer Planets Alliance",
  name: "Outer Planets Alliance",
  description: "Outer Planets Alliance",
  symbol: "",
  render: () => null,
};

const sol = new StarSystemBarycenterController({
  id: "2",
  name: "Sol",
  description: "The Solar System",
  position: [0, 0, 0],
  orbitedBy: [],
  ownedBy: [un, mcr, opa],
});

const sun = new StarController({
  id: "3",
  name: "The Sun",
  description: "Star at the center of the Sol System",
  color: "yellow",
  orbiting: sol,
  orbitedBy: [],
  radius: 696340,
  mass: 1.989 * Math.pow(10, 30),
});
sol.addOrbitingBodies(sun);

const mercury = new PlanetController({
  id: "p1",
  name: "Mercury",
  description: "",
  radius: 2439,
  mass: 3.285 * Math.pow(10, 23),
  orbitedBy: [],
  orbiting: sun,
  ownedBy: [],
});
sun.addOrbitingBodies(mercury);

const venus = new PlanetController({
  id: "p2",
  name: "Venus",
  description: "",
  radius: 6051,
  mass: 4.867 * Math.pow(10, 24),
  orbitedBy: [],
  orbiting: sun,
  ownedBy: [],
});
sun.addOrbitingBodies(venus);

const earth = new PlanetController({
  id: "p3",
  name: "Earth",
  description: "",
  radius: 6371,
  mass: 5.972 * Math.pow(10, 24),
  orbitedBy: [],
  orbiting: sun,
  ownedBy: [un],
});
sun.addOrbitingBodies(earth);
const luna = new PlanetController({
  id: "p3-1",
  name: "Luna",
  description: "",
  radius: 1737,
  mass: 7.347 * Math.pow(10, 22),
  orbitedBy: [],
  orbiting: earth,
  ownedBy: [un],
});
earth.addOrbitingBodies(luna);

const mars = new PlanetController({
  id: "p4",
  name: "Mars",
  description: "",
  radius: 3389,
  mass: 6.39 * Math.pow(10, 23),
  orbitedBy: [],
  orbiting: sun,
  ownedBy: [mcr],
});
sun.addOrbitingBodies(mars);
const marsMoons = new OrbitingBarycenterController({
  id: "p4-0",
  name: "Mars Moons",
  description: "",
  orbitedBy: [],
  orbiting: mars,
});
mars.addOrbitingBodies(marsMoons);
const phobos = new PlanetController({
  id: "p4-1",
  name: "Phobos",
  description: "",
  radius: 11,
  mass: 10.6 * Math.pow(10, 15),
  orbitedBy: [],
  orbiting: earth,
  ownedBy: [mcr],
});
const deimos = new PlanetController({
  id: "p4-2",
  name: "Deimos",
  description: "",
  radius: 6,
  mass: 1.8 * Math.pow(10, 15),
  orbitedBy: [],
  orbiting: earth,
  ownedBy: [mcr],
});
marsMoons.addOrbitingBodies(phobos, deimos);

const universe = new UniverseController({
  id: "1",
  name: "Expanse Universe",
  description: "The world from James A. Corey's Expanse series",
  entities: [sol],
});

const App: FunctionComponent = () => {
  const UniverseRenderer = universe.render;
  return <UniverseRenderer />;
};

export default App;
