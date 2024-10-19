"use client";

import { io } from "socket.io-client";

export const socket = io(`http://${process.env.PUBLIC_URL}:3000`, {
  path: "/socket.io/",
});
