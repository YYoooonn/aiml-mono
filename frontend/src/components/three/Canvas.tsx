"use client";

import * as styles from "./canvas.css";
import { Canvas } from "@react-three/fiber";

import { Center, OrbitControls } from "@react-three/drei";
// import { useProjectInfo } from "@/hook/useProjectInfo";
// import { ProjectSocket } from "../socket/ProjectSocket";
import CamTracker from "./CamTracker";
import { UserCams } from "./UserCams";
import { ProjectObjects } from "./ProjectObjects";
import { useProjectInfo } from "@/hook/useProjectInfo";
import { useSelected } from "@/hook/useSelected";
import { Suspense } from "react";

export default function DefaultCanvas({ id }: { id: string }) {
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
