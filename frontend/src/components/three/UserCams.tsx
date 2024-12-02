"use client";

import { camMaterial } from "@/assets/material";
import { urlCam } from "@/assets/models";
import { useParticipants } from "@/hook/useParticipants";
import { Instance, Instances, useGLTF } from "@react-three/drei";
import { useEffect, useState } from "react";

export function UserCams() {
  const { nodes } = useGLTF(urlCam);
  const cameras = useParticipants((state) => state.cameras);

  return (
    <group>
      {cameras.map((cam, i) => {
        return (
          <mesh
            scale={300}
            rotation={cam.rotation as any}
            key={i}
            position={cam.position as any}
            geometry={nodes.mesh_0.geometry as any}
            material={camMaterial}
          />
        );
      })}
    </group>
  );
}
