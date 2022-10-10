/* eslint-disable */
import { Canvas, useLoader } from "@react-three/fiber";
import axios from "axios";
import type { Character, CharacterAttr, Accessories, Accessory } from "./types/Character";
import type { User, UserAttr } from "./types/Appusers";
import { Scene } from "./components/threescene/Scene";
import { Suspense } from "react";

export default function App() {
  return (
    <div id="canvas-container">
      <Suspense>
        <Canvas>
          <Scene />
        </Canvas>
      </Suspense>
    </div>
  );
}
