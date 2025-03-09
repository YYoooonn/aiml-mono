"use client";

import { Canvas } from "@react-three/fiber";
import { ProjectObjects } from "../three/ProjectObjects";
import { ObjectInfo } from "@/@types/api";
import { OrbitControls } from "@react-three/drei";

import * as styles from "./canvas.css";

// XXX WORKSPACE PROPS
const DEFAULT = {
  ambientLight: {
    intensity: 1,
  },
  directionalLight: {
    intensity: 5,
    position: [5, 10, 10] as [x: number, y: number, z: number],
  },
  background: {
    color: "#000000",
  },
  orbit: {
    enableZoom: true,
  },
};

export default function Archive({ objts }: { objts?: ObjectInfo[] }) {
  return (
    <div className={styles.canvasWrapper}>
      <Canvas frameloop="demand" shadows>
        <ambientLight intensity={DEFAULT.ambientLight.intensity} />
        <directionalLight
          intensity={DEFAULT.directionalLight.intensity}
          position={DEFAULT.directionalLight.position}
        />
        <color attach="background" args={[DEFAULT.background.color]} />
        {/* <SampleObjects id={id} /> */}

        <ProjectObjects objectInfos={objts} />

        <OrbitControls enableZoom={true} />
        <ambientLight intensity={2} color={"#FFFFFF"} />
      </Canvas>
    </div>
  );
}
