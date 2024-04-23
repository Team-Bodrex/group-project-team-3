if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const router = require('./router');
const app = express();

// Start of Socket Settings
const { createServer } = require("http");
const { Server } = require("socket.io");
// End of Socket Settings

// Start of Socket Settings
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5173"
    }
});
// End of Socket Settings

const port = 3000

// Start of Socket Settings
let users = []


io.on("connection", (socket) => {
    // console.log("New user connected!", socket.id);
    // console.log("username :", socket.handshake.auth.username);

    if (socket.handshake.auth.username) {
        users.push({
            id: socket.id,
            username: socket.handshake.auth.username
        })
    }

    console.log(users);


    socket.emit("message", "Welcome to the socket server" + socket.id)

    socket.on("disconnect", () => {
        users = users.filter(user => user.id !== socket.id)
    })

});
// End of Socket Settings


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Testing Site
app.get('/', (req, res) => {
    res.send('Hello World! Testing')
})
// Testing Site


// Start of Socket Settings
httpServer.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
// End of Socket Settings


app.use(router)

// module.exports = app;
