"use client";

// import { MainLayout } from '@/layout/MainLayout';
// import { faker } from '@faker-js/faker';
import { useEffect, useState } from "react";
import { socket } from "@/sockets/chat";
import { Instance, Instances } from "@react-three/drei";
import { sampleCam } from "@/assets/geometry";
import { sampleMaterial } from "@/assets/material";
import { useCameraInfo } from "@/hook/useCameraInfo";

interface CamLog {
  userId: string;
  camInfo: any;
}

interface SocketProps {
  // FIXME any type
  camInfo?: any;
  username?: string;
}

export function CameraSocket(props: SocketProps) {
  const position = useCameraInfo((state) => state.position);
  const quaternion = useCameraInfo((state) => state.quaternion);
  const [username, setUsername] = useState(
    props.username ? props.username : "anonymous",
  );
  const [userId, setUserId] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  const [camLogs, setCamLogs] = useState<{ userId: string; cam: any }[]>([]);
  const [camera, setCamera] = useState(props.camInfo);
  const [users, setUsers] = useState<string[]>([]);

  useEffect(() => {
    setUserId(socket.id ? socket.id : "");
    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    socket.io.engine.on("upgrade", (transport) => {
      setTransport(transport.name);
    });

    if (socket.connected) {
      onConnect();
      socket.emit("join", { type: "join", username });
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    function onCameraTrack(camLog: CamLog) {
      // console.debug(camLog);
      setCamLogs((prev) => [
        ...prev,
        { userId: camLog.userId, cam: camLog.camInfo },
      ]);
    }

    socket.on("cameraTracking", onCameraTrack);

    function onUsers(inputUsers: { id: string; username: string }[]) {
      //console.debug({ inputUsers });
      setUsers(inputUsers.map((inputUser) => inputUser.username));
    }
    socket.on("users", onUsers);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("cameraTracking", onCameraTrack);
      socket.off("users", onUsers);
    };
  }, [username]);

  return (
    <Instances
      range={10}
      limit={10}
      geometry={sampleCam}
      material={sampleMaterial}
    >
      {camLogs.map((props, i) => (
        <Instance
          key={i}
          position={props.cam.position}
          quaternion={props.cam.quaternion}
        />
      ))}
    </Instances>
  );
}
