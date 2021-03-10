const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const port = 3000;

// Listen for a "connection" event for incoming sockets.
io.on("connection", (socket) => {
    console.log("User has connected");
});

// Start the server on our predetermined port number.
server.listen(port, () => {
    console.log("Listening on *:3000")
})