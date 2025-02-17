import { useEffect, useState } from "react";
import { useThree } from "@react-three/fiber";
import { useCameraInfo } from "@/hook/useCameraInfo";

function CamTracker() {
  const { camera } = useThree();
  const [isDragging, setIsDragging] = useState(false);
  const setCamPosition = useCameraInfo((state) => state.setPosition);
  const setCamRotation = useCameraInfo((state) => state.setRotation);

  useEffect(() => {
    const handleMouseDown = () => setIsDragging(true);
    const handleMouseUp = () => setIsDragging(false);

    const handleMouseMove = () => {
      if (isDragging) {
        // console.log(`Camera Position: ${camera.position.toArray()}`);
        setCamPosition(camera.position.toArray());
        setCamRotation(camera.rotation.toArray());
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

  return null; // No visual output
}

export default CamTracker;
