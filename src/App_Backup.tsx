import {
  Canvas,
  MeshProps,
  useFrame,
  useThree,
  extend,
} from "@react-three/fiber";
import React, { FunctionComponent, useRef, useState } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import "./App.css";

// Extend will make OrbitControls available as a JSX element called orbitControls for us to use.
extend({ OrbitControls });

const Box: FunctionComponent<MeshProps> = (props) => {
  // This reference will give us direct access to the mesh
  const ref = useRef<MeshProps>();
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    // if (ref.current) {
    //   ref.current.rotation.x += 0.00;
    //   ref.current.rotation.y += 0.00;
    // }
  });
  return (
    <mesh
      {...props}
      ref={ref}
      scale={active ? 1.5 : 1}
      onClick={(e) => setActive(!active)}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
};

const CameraControls = () => {
  // Get a reference to the Three.js Camera, and the canvas html element.
  // We need these to setup the OrbitControls component.
  // https://threejs.org/docs/#examples/en/controls/OrbitControls
  const {
    camera,
    gl: { domElement },
  } = useThree();
  // Ref to the controls, so that we can update them on every frame using useFrame
  const controls = useRef<any>();
  useFrame((state) => controls.current.update());
  // @ts-ignore
  return <orbitControls ref={controls} args={[camera, domElement]} />;
};

const Star: FunctionComponent = () => {
  return (
    <>
      <mesh scale={1} position={[0, 0, 0]}>
        <sphereGeometry args={[1]} />
        <meshStandardMaterial color={"orange"} />
      </mesh>
      <pointLight position={[0, 0, 0]} />
    </>
  );
};

const App: FunctionComponent = () => {
  return (
    <div style={{ height: "100vh" }}>
      <Canvas style={{ backgroundColor: "black" }}>
        <CameraControls />
        <ambientLight intensity={0.05} />
        <Star />
        <Box position={[2, 2, 2]} />
      </Canvas>
    </div>
  );
};

export default App;
