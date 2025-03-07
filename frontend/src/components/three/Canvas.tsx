"use client";

import * as styles from "./canvas.css";
import { Canvas } from "@react-three/fiber";

import { Center, OrbitControls } from "@react-three/drei";
// import { useProjectInfo } from "@/hook/useProjectInfo";
// import { ProjectSocket } from "../socket/ProjectSocket";
import CamTracker from "./CamTracker";
import { UserCams } from "./UserCams";
import { ProjectObjects } from "./ProjectObjects";
import SampleObjects from "./SampleObjects";
import { ObjectInfo } from "@/@types/api";

export function DefaultCanvas({ id }: { id: string }) {
  return (
    <div className={styles.CanvasContainer}>
      <Canvas frameloop="demand" shadows>
        <ambientLight intensity={1} />
        <directionalLight intensity={5} position={[5, 10, 10]} />
        <color attach="background" args={["#000000"]} />
        {/* <SampleObjects id={id} /> */}

        <ProjectObjects />

        <OrbitControls enableZoom={true} />
        <UserCams />
        <ambientLight intensity={2} color={"#FFFFFF"} />
        <CamTracker />
      </Canvas>
    </div>
  );
}

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

export function ProjectCanvas({ objts }: { objts: ObjectInfo[] }) {
  return (
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
      <UserCams />
      <ambientLight intensity={2} color={"#FFFFFF"} />
      <CamTracker />
    </Canvas>
  );
}
