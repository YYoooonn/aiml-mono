import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import dotenv from "dotenv";

const dev = process.env.NODE_ENV !== "production";

dotenv.config(dev ? { path: ".env.local" } : { path: ".env.production.local" });

const hostname = dev ? "localhost" : process.env.NEXT_PUBLIC_HOSTNAME;
const port = dev ? 3000 : Number(process.env.PORT || 3000);
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer, {
    path: "/socket.io/",
    cors: {
      origin: [`http://${hostname}`, `http://${hostname}:${port}`],
      methods: ["GET", "POST"],
    },
    // addTrailingSlash: true
  });

  io.on("connection", (socket) => {
    // ...
    console.log(socket.id);
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
