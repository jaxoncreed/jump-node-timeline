import React, { FunctionComponent } from "react";
import { Vector3 } from "three";

import { TimelineProvider } from "./businessLogic/timelineGlobalHook";
import OrbitingBarycenterController from "./entities/OrbitingBarycenterController";
import PlanetController from "./entities/PlanetController";
import StarController from "./entities/StarController";
import StarSystemBarycenterController from "./entities/StarSystemBarycenterController";
import UniverseController from "./entities/UniverseController";
import { PoliticalEntity } from "./entities/entityTypes";
import Test from "./Test";
import UniverseRenderer from "./renderers/UniverseRenderer";

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
  position: new Vector3(0, 0, 0),
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
  radius: 0.00465,
  mass: 1.989e30,
  keplerianElements: {
    semimajorAxis: 0.00000001,
    eccentricity: 0,
    inclination: 0,
    longitudeOfAscendingNode: 0,
    argumentOfPeriapsis: 0,
    meanAnomalyAtEpoch: 0,
  },
});
sol.addOrbitingBodies(sun);

const mercury = new PlanetController({
  id: "p1",
  name: "Mercury",
  description: "",
  radius: 1.63e-5,
  mass: 3.285e23,
  orbitedBy: [],
  orbiting: sun,
  ownedBy: [],
  keplerianElements: {
    semimajorAxis: 0.3816,
    eccentricity: 0.2056,
    inclination: 3.38,
    longitudeOfAscendingNode: 48.331,
    argumentOfPeriapsis: 29.124,
    meanAnomalyAtEpoch: 174.796,
  },
});
sun.addOrbitingBodies(mercury);

const venus = new PlanetController({
  id: "p2",
  name: "Venus",
  description: "",
  radius: 4.04e-5,
  mass: 4.867e24,
  orbitedBy: [],
  orbiting: sun,
  ownedBy: [],
  keplerianElements: {
    semimajorAxis: 0.723,
    eccentricity: 0.006772,
    inclination: 3.86,
    longitudeOfAscendingNode: 76.68,
    argumentOfPeriapsis: 54.884,
    meanAnomalyAtEpoch: 50.115,
  },
});
sun.addOrbitingBodies(venus);

const earth = new PlanetController({
  id: "p3",
  name: "Earth",
  description: "",
  radius: 4.26e-5,
  mass: 1.989e30,
  orbitedBy: [],
  orbiting: sun,
  ownedBy: [un],
  keplerianElements: {
    semimajorAxis: 1,
    eccentricity: 0.0167086,
    inclination: 7.155,
    longitudeOfAscendingNode: -11.26064,
    argumentOfPeriapsis: 114.208,
    meanAnomalyAtEpoch: 358.617,
  },
});
sun.addOrbitingBodies(earth);
const luna = new PlanetController({
  id: "p3-1",
  name: "Luna",
  description: "",
  radius: 1.16e-5,
  mass: 7.347e22,
  orbitedBy: [],
  orbiting: earth,
  ownedBy: [un],
  keplerianElements: {
    semimajorAxis: 0.2, // 2.57e-3,
    eccentricity: 0.0549,
    inclination: 5.145,
    longitudeOfAscendingNode: 28.6,
    argumentOfPeriapsis: 318.15,
    meanAnomalyAtEpoch: 0,
  },
});
earth.addOrbitingBodies(luna);

const mars = new PlanetController({
  id: "p4",
  name: "Mars",
  description: "",
  radius: 2.27e-5,
  mass: 6.39e23,
  orbitedBy: [],
  orbiting: sun,
  ownedBy: [mcr],
  keplerianElements: {
    semimajorAxis: 1.52,
    eccentricity: 0.0934,
    inclination: 5.65,
    longitudeOfAscendingNode: 49.558,
    argumentOfPeriapsis: 286.502,
    meanAnomalyAtEpoch: 19.412,
  },
});
sun.addOrbitingBodies(mars);
const marsMoons = new OrbitingBarycenterController({
  id: "p4-0",
  name: "Mars Moons",
  description: "",
  orbitedBy: [],
  orbiting: mars,
  keplerianElements: {
    semimajorAxis: 0.2, // 2e-3,
    eccentricity: 0,
    inclination: 0,
    longitudeOfAscendingNode: 0,
    argumentOfPeriapsis: 0,
    meanAnomalyAtEpoch: 0,
  },
  mass: 0,
});
mars.addOrbitingBodies(marsMoons);
const phobos = new PlanetController({
  id: "p4-1",
  name: "Phobos",
  description: "",
  radius: 8.35e-8,
  mass: 10.6e15,
  orbitedBy: [],
  orbiting: marsMoons,
  ownedBy: [mcr],
  keplerianElements: {
    semimajorAxis: 0.1, // 1e-3,
    eccentricity: 0,
    inclination: 0,
    longitudeOfAscendingNode: 0,
    argumentOfPeriapsis: 0,
    meanAnomalyAtEpoch: 0,
  },
});
const deimos = new PlanetController({
  id: "p4-2",
  name: "Deimos",
  description: "",
  radius: 4.01e-8,
  mass: 1.8e15,
  orbitedBy: [],
  orbiting: marsMoons,
  ownedBy: [mcr],
  keplerianElements: {
    semimajorAxis: 0.05, // 0.5e-3,
    eccentricity: 0,
    inclination: 0,
    longitudeOfAscendingNode: 0,
    argumentOfPeriapsis: 0,
    meanAnomalyAtEpoch: 0,
  },
});
marsMoons.addOrbitingBodies(phobos, deimos);

const universe = new UniverseController({
  id: "1",
  name: "Expanse Universe",
  description: "The world from James A. Corey's Expanse series",
  entities: [sol],
});

const App: FunctionComponent = () => {
  return (
    <div style={{ height: "100vh" }}>
      <TimelineProvider>
        <UniverseRenderer data={universe} />
      </TimelineProvider>
    </div>
  );
};

export default App;
