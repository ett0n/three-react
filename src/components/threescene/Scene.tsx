import { Canvas, useLoader } from "@react-three/fiber";
import { useState } from "react";
import { useGLTF, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Hero } from "./Hero";
import { TextureLoader } from "three";
import * as THREE from "three";

export function Scene(props: any) {
  //ground map
  const solMap = useLoader(TextureLoader, "/assets/ground/grass.jpg");
  solMap.wrapS = solMap.wrapT = THREE.RepeatWrapping;
  solMap.repeat.set(50, 50);
  solMap.anisotropy = 16;

  //skybox
  const [getBackground, setBackground] = useState<string>("/assets/accessories/backgrounds/sky-1.png");
  const skyBox = useLoader(TextureLoader, getBackground);

  return (
    <>
      {/* global scene controls */}
      <ambientLight intensity={0.5} />
      <OrbitControls target={[0, 0, 0]} maxPolarAngle={1.45} />
      {/* skybox */}
      <mesh scale={21} position={[0, 0, 0]}>
        <sphereGeometry />
        <meshStandardMaterial map={skyBox} side={THREE.DoubleSide} />
      </mesh>
      {/* ground mesh */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[20, 50]} />
        <meshStandardMaterial attach="material" color="darkgreen" map={solMap} roughness={5} />
      </mesh>
      <Hero></Hero>
    </>
  );
}
