"use client";

import { useChat } from "@/hook/useChat";
// import { ChatSocket } from "../socket/ChatSocket";
import { useUserInfo } from "@/hook/useUserInfo";
import { ProjectSocket } from "../socket/ProjectSocket";

export default function RightAisleCotents() {
  const chatOn = useChat((state) => state.isChatOn);
  const username = useUserInfo((state) => state.username);
  return <>{chatOn ? <ProjectSocket {...{ username: username }} /> : <></>}</>;
}
