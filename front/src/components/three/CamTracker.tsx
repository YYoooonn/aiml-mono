import { useEffect, useState } from "react";
import { useThree } from "@react-three/fiber";
import { useCameraInfo } from "@/hook/useCameraInfo";
import { EditorProps } from "@/hook/useEditor";

interface CamTrackerProps {
  pos?: EditorProps["cam"]["position"];
}

function CamTracker(props: CamTrackerProps) {
  const { camera } = useThree();
  const [isDragging, setIsDragging] = useState(false);
  const { setPosition, setRotation } = useCameraInfo();

  // track camera on mouse down condition
  useEffect(() => {
    const handleMouseDown = () => setIsDragging(true);
    const handleMouseUp = () => setIsDragging(false);

    const handleMouseMove = () => {
      if (isDragging) {
        // console.log(`Camera Position: ${camera.position.toArray()}`);
        setPosition(camera.position.toArray());
        setRotation(camera.rotation.toArray());
      }
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [camera, isDragging]);

  useEffect(() => {
    props.pos ? setPosition(props.pos) : null;
  }, [props.pos]);

  return null; // No visual output
}

export default CamTracker;
