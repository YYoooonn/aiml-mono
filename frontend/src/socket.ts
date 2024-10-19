"use client";

import { io } from "socket.io-client";
import dotenv from "dotenv";

dotenv.config({ path: ".env.production.local" });

export const socket = io(`http://${process.env.NEXT_PUBLIC_HOSTNAME}`, {
  path: "/socket.io/",
});
