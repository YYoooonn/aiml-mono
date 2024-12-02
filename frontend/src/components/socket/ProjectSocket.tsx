"use client";

// import { MainLayout } from '@/layout/MainLayout';
import { v4 as uuidv4 } from "uuid";
// import { faker } from '@faker-js/faker';
import * as styles from "./socket.css";
import { useEffect, useState } from "react";
import { socket } from "@/sockets/project";
import { useCameraInfo } from "@/hook/useCameraInfo";
import { useParticipants } from "@/hook/useParticipants";

type Position = Array<number>;
type Rotation = Array<number | string | undefined>;

interface UserCamera {
  [username: string]: { position: Position };
}

interface SocketProps {
  roomId?: string;
  username?: string;
}

export function ProjectSocket(props: SocketProps) {
  const [username, setUsername] = useState(
    props.username ? props.username : "anonymous",
  );
  //   const [userId, setUserId] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");

  const camPosition = useCameraInfo((state) => state.position);
  const camRotation = useCameraInfo((state) => state.rotation);
  const participants = useParticipants((state) => state.participants);
  const setParticipant = useParticipants((state) => state.setParticipant);
  const setParticipants = useParticipants((state) => state.setParticipants);

  const [isDragging, setIsDragging] = useState(false);

  // track mouse movement
  useEffect(() => {
    const handleMouseDown = () => setIsDragging(true);
    const handleMouseUp = () => setIsDragging(false);

    const handleMouseMove = () => {
      if (isDragging) {
        console.debug(username, camPosition);
        socket.emit("updateCam", {
          userId: socket.id,
          username: username,
          position: camPosition,
          rotation: camRotation,
        });
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
  }, [camPosition, isDragging]);

  useEffect(() => {
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
      socket.emit("join", {
        type: "join",
        username: username,
        position: camPosition,
        rotation: camRotation,
      });
      console.debug(socket.id);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    function onSetCameraPosition(data: {
      userId: string;
      username: string;
      position: Position;
      rotation: Rotation;
    }) {
      //console.debug(msg);
      // console.log("setlog");
      if (data.userId !== socket.id) {
        setParticipant(data.userId, data.username, {
          position: data.position,
          rotation: data.rotation,
        });
      }
    }

    socket.on("updateCam", onSetCameraPosition);

    function onUsers(newUsers: Array<string>) {
      console.debug(newUsers);
      setParticipants(newUsers.filter((val) => val !== socket.id));
    }
    socket.on("users", onUsers);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("updateCam", onSetCameraPosition);
      socket.off("users", onUsers);
    };
  }, [username]);

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatHeaderContainer}>
        <p>Status: {isConnected ? "connected" : "disconnected"}</p>
        <p>Transport : {transport}</p>
      </div>

      <div>
        <div className={styles.userHeaderContainer}>
          <h3>Users</h3>
          {participants &&
            Object.values(participants).map((val, i) => (
              <p key={i}>
                {val.username} :
                {` ${val.camera.position
                  ?.map((val) => val.toFixed(2))
                  .join(", ")}`}
              </p>
            ))}
        </div>
      </div>
    </div>
  );
}
