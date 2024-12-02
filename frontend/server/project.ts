import { Server } from "socket.io";

type Position = Array<number>;
type Rotation = Array<number | string | undefined>;

// Users in a room
let userCamPosition: {
  [key: string]: {
    [socketId: string]: { position: Position; rotation: Rotation };
  };
} = {};

function getUsers(roomId: string) {
  // XXX: if roomId doesn't exist
  if (!userCamPosition[roomId]) {
    return [];
  }
  return Object.keys(userCamPosition[roomId]);
}

export const ProjectSocket = (io: Server, name: string) => {
  const namespace = io.of(`/${name}`);

  // NAMESPACE
  namespace.on("connection", (socket) => {
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
    // send message to room in the namespace
    socket.to(roomId).emit("join", {
      user: "system",
      chat: `user joined`,
    });

    //
    namespace.to(roomId).emit("users", getUsers(roomId));
    // debug
    console.debug(userCamPosition[roomId]);

    // on camera update
    socket.on(
      "updateCam",
      (data: {
        userId: string;
        username: string;
        position: Position;
        rotation: Rotation;
      }) => {
        //console.debug("message", msg);
        namespace.to(roomId).emit("updateCam", data);
        userCamPosition[roomId][socket.id] = {
          position: data.position,
          rotation: data.rotation,
        };
      },
    );

    socket.on(
      "join",
      (data: {
        username: string;
        type: string;
        position: Position;
        rotation: Rotation;
      }) => {
        console.debug("join", data);
        if (!(roomId in userCamPosition)) {
          userCamPosition[roomId] = {};
        }
        const found = socket.id in userCamPosition[roomId];
        if (data.type === "join" && !found) {
          namespace.to(roomId).emit("updateCam", {
            userId: socket.id,
            username: data.username,
            postion: data.position,
          });
          userCamPosition[roomId][socket.id] = {
            position: data.position,
            rotation: data.rotation,
          };
          namespace.to(roomId).emit("users", getUsers(roomId));
          console.debug(userCamPosition[roomId]);
        }
      },
    );

    // on disconnect message
    socket.on("disconnect", () => {
      console.log("disconnect to room namespace");
      socket.leave(roomId);

      if (socket.id in userCamPosition[roomId]) {
        delete userCamPosition[roomId][socket.id];
      }

      namespace.to(roomId).emit("users", getUsers(roomId));
    });
  });
};
