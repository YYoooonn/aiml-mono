import { useCameraInfo } from "@/hook/useCameraInfo";
import { PerspectiveCamera } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

export function RootCamera() {
  const position = useCameraInfo((state) => state.position);

  // const rotation = useCameraInfo((state) => state.rotation)
  return <PerspectiveCamera makeDefault={true} position={position} />;
}

export default RootCamera;
