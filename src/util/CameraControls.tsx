import { extend, useFrame, useThree } from "@react-three/fiber";
import { FunctionComponent, useMemo, useRef } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { useNav } from "../businessLogic/navGlobalHook";

// Extend will make OrbitControls available as a JSX element called orbitControls for us to use.
extend({ OrbitControls });

const CameraControls: FunctionComponent = () => {
  // Get a reference to the Three.js Camera, and the canvas html element.
  // We need these to setup the OrbitControls component.
  // https://threejs.org/docs/#examples/en/controls/OrbitControls
  const {
    camera,
    gl: { domElement },
  } = useThree();
  const { focusVectorRef } = useNav();
  // Ref to the controls, so that we can update them on every frame using useFrame
  const controls = useRef<any>();

  const fakeCamera = useMemo(() => {
    return camera.clone();
  }, [camera]);
  useFrame(() => {
    // @ts-ignore
    camera.copy(fakeCamera).position.add(focusVectorRef.current);
    controls.current.update();
  });

  return (
    // @ts-ignore
    <orbitControls
      ref={controls}
      args={[fakeCamera, domElement]}
      enablePan={false}
    />
  );
};

export default CameraControls;
