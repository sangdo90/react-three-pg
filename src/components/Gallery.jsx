import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  useCursor,
  MeshReflectorMaterial,
  Image,
  Text,
  Environment,
  Text3D,
  Center,
} from "@react-three/drei";
import { useRoute, useLocation } from "wouter";
import { easing } from "maath";
import getUuid from "uuid-by-string";
import { getNftApi } from "../api";
import axios from "axios";
import { Stars } from "./Stars";

const GOLDENRATIO = 1.61803398875;

const defaultUrl =
  "https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";

const imgs = [
  {
    position: [-0.65, 0, 0.75],
    rotation: [0, 0, 0],
    url: defaultUrl,
  },
  {
    position: [0.65, 0, 0.75],
    rotation: [0, 0, 0],
    url: defaultUrl,
  },
  // Left
  {
    position: [-1.75, 0, 1.25],
    rotation: [0, Math.PI / 7, 0],
    url: defaultUrl,
  },
  {
    position: [-2.5, 0, 2.25],
    rotation: [0, Math.PI / 3.5, 0],
    url: defaultUrl,
  },
  // Right

  {
    position: [1.75, 0, 1.25],
    rotation: [0, -Math.PI / 7, 0],
    url: defaultUrl,
  },
  {
    position: [2.5, 0, 2.25],
    rotation: [0, -Math.PI / 3.5, 0],
    url: defaultUrl,
  },
];

export const Gallery = () => {
  const [images, setImages] = useState(imgs);

  const init = async () => {
    const res = await getNftApi();
    const newImgs = [...imgs];

    if (res.length === 0) return;

    for (let i = 0; i < res.length || res.length < 6; i++) {
      const tokenData = await axios.get(res[i].tokenUri);

      newImgs[i].url = tokenData.data.image;
      newImgs[i].name = tokenData.data.name;
      newImgs[i].attrs = tokenData.data.attributes;
    }
    setImages(newImgs);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <Canvas camera={{ position: [0, 1, 1] }}>
        <Stars />
        <fog attach="fog" args={["#191919", 0, 15]} />
        <group position={[0, -0.5, 0]}>
          <Frames images={images} />
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[50, 50]} />
            <MeshReflectorMaterial
              blur={[300, 50]}
              resolution={2048}
              mixBlur={1}
              mixStrength={25}
              roughness={1}
              depthScale={1.2}
              minDepthThreshold={0.4}
              maxDepthThreshold={1.4}
              color="#0d0d0d"
              metalness={0}
            />
          </mesh>
        </group>
        <Environment preset="warehouse" />
      </Canvas>
    </>
  );
};

function Frames({
  images,
  q = new THREE.Quaternion(),
  p = new THREE.Vector3(),
}) {
  const ref = useRef();
  const clicked = useRef();
  const [, params] = useRoute("/item/:id");
  const [, setLocation] = useLocation();

  useEffect(() => {
    clicked.current = ref.current.getObjectByName(params?.id);
    if (clicked.current) {
      clicked.current.parent.updateWorldMatrix(true, true);
      clicked.current.parent.localToWorld(p.set(0, GOLDENRATIO / 2, 1.25));
      clicked.current.parent.getWorldQuaternion(q);
    } else {
      p.set(0, 0, 5.5);
      q.identity();
    }
  });
  useFrame((state, dt) => {
    easing.damp3(state.camera.position, p, 0.4, dt);
    easing.dampQ(state.camera.quaternion, q, 0.4, dt);
  });
  return (
    <group
      ref={ref}
      onClick={(e) => {
        e.stopPropagation();
        setLocation(
          clicked.current === e.object ? "/" : "/item/" + e.object.name
        );
      }}
      onPointerMissed={() => setLocation("/")}
    >
      {images.map((props) => (
        <Frame key={props.url} {...props} />
      ))}
    </group>
  );
}

function Frame({
  attrs,
  url,
  name: imageName,
  c = new THREE.Color(),
  ...props
}) {
  const image = useRef();
  const frame = useRef();
  const [, params] = useRoute("/item/:id");
  const [hovered, hover] = useState(false);
  const name = getUuid(url);
  const isActive = params?.id === name;

  useCursor(hovered);
  useFrame((state, dt) => {
    easing.damp3(
      image.current.scale,
      [
        0.9 * (!isActive && hovered ? 0.9 : 1),
        0.9 * (!isActive && hovered ? 0.9 : 1),
        1,
      ],
      0.2,
      dt
    );
    easing.dampC(
      frame.current.material.color,
      hovered ? "#4980F7" : "white",
      0.1,
      dt
    );
  });
  return (
    <>
      <group {...props}>
        <mesh
          name={name}
          onPointerOver={(e) => (e.stopPropagation(), hover(true))}
          onPointerOut={() => hover(false)}
          scale={[1, GOLDENRATIO, 0.02]}
          position={[0, GOLDENRATIO / 2, 0]}
        >
          <boxGeometry />
          <meshStandardMaterial
            color="#151515"
            metalness={0.5}
            roughness={0.5}
            envMapIntensity={2}
          />
          <mesh
            ref={frame}
            raycast={() => null}
            scale={[0.95, 0.95, 0.95]}
            position={[0, 0, 0.2]}
          >
            <boxGeometry />
            <meshBasicMaterial toneMapped={false} fog={false} />
          </mesh>
          <Image
            raycast={() => null}
            ref={image}
            position={[0, 0, 0.7]}
            url={url}
          />
        </mesh>
        <Text
          font={"/NotoSansKR-Regular.otf"}
          maxWidth={0.2}
          anchorX="cetner"
          anchorY="top"
          position={[-0.45, 0.2, 0.1]}
          fontSize={0.2}
          color="#ffffff"
        >
          {`${imageName}`}
        </Text>
        <Text
          font={"/NotoSansKR-Regular.otf"}
          maxWidth={0.3}
          anchorX="left"
          anchorY="top"
          position={[0.55, GOLDENRATIO, 0]}
          fontSize={0.025}
        >
          {attrs?.map((attr) => {
            return `${attr.value}\n`;
          })}
        </Text>
      </group>
    </>
  );
}
