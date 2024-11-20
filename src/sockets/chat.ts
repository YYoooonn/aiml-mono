"use client";

import { io } from "socket.io-client";
import dotenv from "dotenv";

const dev = process.env.NODE_ENV !== "production";

dotenv.config(dev ? { path: ".env.local" } : { path: ".env.production.local" });

export const socket = io(`http://${process.env.NEXT_PUBLIC_HOSTNAME}/chat`, {
  path: "/socket.io/",
});
