if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const router = require("./router");
const errorHandlers = require("./middleware/errorHandlers");
const app = express();
const cors = require("cors");

// Start of Socket Settings
const { createServer } = require("http");
const { Server } = require("socket.io");
// End of Socket Settings

// Start of Socket Settings
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});
// End of Socket Settings

const port = 3000;

// Start of Socket Settings
let users = [];
const allUsers = {};
const allRooms = [];

io.on("connection", (socket) => {
  allUsers[socket.id] = {
    socket: socket,
    online: true,
  };

  // console.log("New user connected!", socket.id);
  // console.log("username :", socket.handshake.auth.username);

  if (socket.handshake.auth.username) {
    users.push({
      id: socket.id,
      username: socket.handshake.auth.username,
    });
  }

  console.log(users);

  //socket.emit infoin ke orang yang connect kalau dia dapat message
  socket.emit("message", "Welcome to the socket server" + socket.id);

  //io.emit info ke semua orang kalo ada user yang connect
  io.emit("users:online", users);

  socket.on("messages:new", (newMessage) => {
    io.emit("messages:info", newMessage);
  });

  socket.on("disconnect", () => {
    users = users.filter((user) => user.id !== socket.id);
    io.emit("users:online", users);
  });

  socket.on("request_to_play", (data) => {
    const currentUser = allUsers[socket.id];
    currentUser.playerName = data.playerName;

    let opponentPlayer;

    for (const key in allUsers) {
      const user = allUsers[key];
      if (user.online && !user.playing && socket.id !== key) {
        opponentPlayer = user;
        break;
      }
    }

    if (opponentPlayer) {
      allRooms.push({
        player1: opponentPlayer,
        player2: currentUser,
      });

      currentUser.socket.emit("OpponentFound", {
        opponentName: opponentPlayer.playerName,
        playingAs: "circle",
      });

      opponentPlayer.socket.emit("OpponentFound", {
        opponentName: currentUser.playerName,
        playingAs: "cross",
      });

      currentUser.socket.on("playerMoveFromClient", (data) => {
        opponentPlayer.socket.emit("playerMoveFromServer", {
          ...data,
        });
      });

      opponentPlayer.socket.on("playerMoveFromClient", (data) => {
        currentUser.socket.emit("playerMoveFromServer", {
          ...data,
        });
      });
    } else {
      currentUser.socket.emit("OpponentNotFound");
    }
  });

  socket.on("disconnect", function () {
    const currentUser = allUsers[socket.id];
    currentUser.online = false;
    currentUser.playing = false;

    for (let index = 0; index < allRooms.length; index++) {
      const { player1, player2 } = allRooms[index];

      if (player1.socket.id === socket.id) {
        player2.socket.emit("opponentLeftMatch");
        break;
      }

      if (player2.socket.id === socket.id) {
        player1.socket.emit("opponentLeftMatch");
        break;
      }
    }
  });
});
// End of Socket Settings

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// Testing Site
app.get("/", (req, res) => {
  res.send("Hello World! Testing");
});
// Testing Site

// Using router
app.use(router);

// Using error handlers
app.use(errorHandlers);

// Start of Socket Settings
httpServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
// End of Socket Settings

// module.exports = app;
