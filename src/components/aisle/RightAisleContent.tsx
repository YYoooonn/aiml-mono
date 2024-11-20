"use client";

import { useChat } from "@/hook/useChat";
import { ChatSocket } from "../socket/ChatSocket";
import { useUserInfo } from "@/hook/useUserInfo";

export default function RightAisleCotents() {
  const chatOn = useChat((state) => state.isChatOn);
  const username = useUserInfo((state) => state.username);
  return <>{chatOn ? <ChatSocket {...{ username: username }} /> : <></>}</>;
}
