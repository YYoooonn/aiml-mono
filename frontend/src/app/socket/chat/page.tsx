"use client";

import { useState, useEffect } from "react";
import { socket } from "@/socket";

const Chat = () => {
  const [username, setUsername] = useState<string>("");
  const [isConnected, setIsConnected] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    console.log("inside", socket.connected);

    const receiveMessage = (data: any) => {
      console.log("message received ", data);
      setMessages((prevMsg) => [...prevMsg, data.message]);
    };

    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("receiveMessage", receiveMessage);
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    // unmount connection
    return () => {
      socket.off("message", receiveMessage);
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      console.log("message socket off");
    };
  }, [socket]);

  const sendMessage = (e: React.MouseEvent) => {
    e.preventDefault();
    if (message) {
      console.log("message emitted");
      socket.emit("sendMessage", { message: message });
      setMessage("");
    }
  };

  return (
    <div>
      <p>Status: {isConnected ? "connected" : "disconnected"}</p>
      <h1>실시간 채팅</h1>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <input
        type="text"
        placeholder="사용자 이름"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="메시지"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>전송</button>
    </div>
  );
};

export default Chat;
