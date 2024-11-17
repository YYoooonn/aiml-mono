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

  // FIXME using any type
  let usersRoom: any = {};

  function getRoomUsersArray() {
    return Object.keys(usersRoom).map((id) => ({ id, userId: usersRoom[id] }));
  }

  const room = io.of("/room");

  // NAMESPACE ROOM
  room.on("connection", (socket) => {
    // request uri from client
    const req = socket.request;
    const {
      headers: { referer },
    } = req;

    // parse info from uri
    const roomId = referer
      ? referer.split("/")[referer.split("/").length - 1].replace(/\?.+/, "")
      : "default";
    //console.debug(roomId);

    // join room
    socket.join(roomId);
    // send message to room in namespace
    socket.to(roomId).emit("join", {
      user: "system",
      chat: `user joined`,
    });
    room.to(roomId).emit("users", getRoomUsersArray());

    socket.on("cameraTracking", (status: { userId: string; cam: any }) => {
      room.to(roomId).emit("cameraTracking", status);
    });

    socket.on("join", (status: { userId: string; cam: any }) => {
      //console.debug("join", status);
      if (!usersRoom[socket.id]) {
        usersRoom[socket.id] = status.userId;
        room.to(roomId).emit("users", getRoomUsersArray());
      }
    });

    // on disconnect message
    socket.on("disconnect", () => {
      console.log("disconnect to room namespace");
      socket.leave(roomId);

      const username = usersRoom[socket.id];
      delete usersRoom[socket.id];
      room.to(roomId).emit("users", getRoomUsersArray());
    });
  });

  // FIXME using any type
  let usersChat: {[key: string] : Array<{socketId : string, username: string}>} = {"default" : []};

  function getChatUsersArray(roomId: string) {
    if(!usersChat[roomId]){
      return []
    }
    return usersChat[roomId].map((id) => ({
      username : id.username,
    }))
  }

  const chat = io.of("/chat");

  // NAMESPACE CHAT
  chat.on("connection", (socket) => {
    console.debug(`User connected to chat namespace : ${socket.id}`);

    // request uri from client
    const req = socket.request;
    const {
      headers: { referer },
    } = req;

    // parse info from uri
    const roomId = referer
      ? referer.split("/")[referer.split("/").length - 1].replace(/\?.+/, "")
      : "default";
    //console.debug(roomId);

    // join room
    socket.join(roomId);
    // send message to room in namespace
    socket.to(roomId).emit("join", {
      user: "system",
      chat: `user joined`,
    });
    chat.to(roomId).emit("users", getChatUsersArray(roomId));

    // chat messages
    socket.on("chatMessage", (msg: { username: string; message: string }) => {
      //console.debug("message", msg);
      chat.to(roomId).emit("chatMessage", msg);
    });

    socket.on("join", (msg: { username: string; type: string }) => {
      // console.debug("join", msg);
      if(!(roomId in usersChat)){
        usersChat[roomId] = []
      }
      const found = socket.id in usersChat[roomId]
      if (msg.type === "join" && !found) {
        chat.to(roomId).emit("chatMessage", `${msg.username} joined the room`);
        usersChat[roomId].push({socketId: socket.id, username : msg.username})
        chat.to(roomId).emit("users", getChatUsersArray(roomId));
        console.log(usersChat[roomId])
      }
    });

    // on disconnect message
    socket.on("disconnect", () => {
      console.log("disconnect to room namespace");
      socket.leave(roomId);

      const user = usersChat[roomId].find((val) => val.socketId === socket.id);
      chat.to(roomId).emit("chatMessage", `${user?.username} leaved the room`);
      usersChat[roomId] = usersChat[roomId].filter((ele) => ele.socketId !== socket.id);
      chat.to(roomId).emit("users", getChatUsersArray(roomId));
    });
  });

  io.on("connection", (socket) => {
    // ...
    // console.debug(`User connected : ${socket.id}`);

    // Join and Leave alert
    socket.on("joinAndLeave", (msg: { type: string; username: string }) => {
      if (msg.type === "join" && !usersChat[socket.id]) {
        io.emit("chatMessage", `${msg.username} exited the room`);
      }
      //console.debug("joinAndLeave", msg.type, msg.username);
    });

    socket.on("sendMessage", (data) => {
      //console.debug(data);
      io.emit("receiveMessage", data);
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      //console.debug(`> Ready on http://${hostname}:${port}`);
    });
});
