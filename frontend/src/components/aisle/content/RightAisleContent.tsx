"use client";

import { useChat } from "@/hook/useChat";
// import { ChatSocket } from "../socket/ChatSocket";
import { useUserInfo } from "@/hook/useUserInfo";
import { ProjectSocket } from "../../socket/ProjectSocket";
import { ChatSocket } from "../../socket/ChatSocket";
import * as styles from "../aisle.css";

export default function RightAisleCotents() {
  const chatOn = useChat((state) => state.isChatOn);
  const username = useUserInfo((state) => state.username);
  return (
    <div>
      {chatOn ? <ProjectSocket {...{ username: username }} /> : <></>}
      {chatOn ? <ChatSocket {...{ username: username }} /> : <></>}
    </div>
  );
}
