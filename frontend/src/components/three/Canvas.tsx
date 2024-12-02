"use client";

import * as styles from "./canvas.css";
import { Canvas } from "@react-three/fiber";

import RootCamera from "./Camera";
import SampleObjects from "./SampleObjects";
import { Center, OrbitControls } from "@react-three/drei";
// import { useProjectInfo } from "@/hook/useProjectInfo";
// import { ProjectSocket } from "../socket/ProjectSocket";
import CamTracker from "./CamTracker";
import { UserCams } from "./UserCams";

export default function DefaultCanvas({ id }: { id: string }) {
  // FIXME test
  // const [active, setActive] = useState(false)
  // const quaternion = useCameraInfo(state=>state.quaternion)
  // const setQuaternion = useCameraInfo(state=>state.setQuaternion)
  // // const setRotationXYZ = useCameraInfo(state=>state.setRotationXYZ)
  // const position = useCameraInfo(state=> state.position)
  // const setPosition = useCameraInfo(state=> state.setPosition)

  // const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
  //   setActive(true)
  // }
  // const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
  //   setActive(false)
  // }
  // const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
  //   if(active){
  //     console.debug(event.movementX)
  //     setQuaternion([quaternion[0]-0.01*event.movementY, quaternion[1]-0.01*event.movementX, quaternion[2], quaternion[3]])
  //     // setRotationXYZ(0.01*event.movementY, 0.01*event.movementX, 0)
  //   }
  // }

  return (
    <div className={styles.CanvasContainer}>
      <Canvas frameloop="demand" shadows>
        <ambientLight intensity={1} />
        <directionalLight />
        <color attach="background" args={["#000000"]} />
        <SampleObjects id={id} />
        <OrbitControls enableZoom={true} />
        {/* <RootCamera /> */}
        {/* <CameraSocket /> */}
        <UserCams />
        <ambientLight intensity={2} color={"#FFFFFF"} />
        <CamTracker />
      </Canvas>
    </div>
  );
}
