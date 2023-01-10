import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";

function MyRotatingBox() {
  const myMesh = useRef();

  useFrame(({ clock }) => {
    const a = clock.getElapsedTime();
    myMesh.current.rotation.x = a;
  });

  return (
    <mesh ref={myMesh}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={0xdddddd} />
    </mesh>
  );
}

export default function CubeRender() {
  return (
    <Canvas>
      <ambientLight intensity={0.1} />

      <MyRotatingBox />
      <directionalLight />
    </Canvas>
  );
}
