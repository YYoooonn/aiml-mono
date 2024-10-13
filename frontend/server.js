import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import dotenv from "dotenv";

// environment check
const dev = process.env.NODE_ENV !== "production";

// environment variable setting for node
dotenv.config(dev ? { path: ".env.local" } : { path: ".env.production.local" });

const hostname = process.env.URL_HOSTNAME;
const port = process.env.PORT;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    // ...
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
