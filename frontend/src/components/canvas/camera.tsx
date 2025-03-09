"use client";

import { EditorProps, useEditor } from "@/hook/useEditor";
import { CameraControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";

export default function Camera({ props }: { props: EditorProps["cam"] }) {
  const { camera } = useThree();
  const cameraRef = useRef<CameraControls>(null);
  useEffect(() => {
    cameraRef.current?.setPosition(
      props.position[0],
      props.position[1],
      props.position[2],
      true,
    );
    cameraRef.current?.zoomTo(props.zoom, true);
  }, [props]);

  return <CameraControls ref={cameraRef} />;
}
