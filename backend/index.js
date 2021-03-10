const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
    // Set up of CORS settings for socket.io server
    cors: {
        origin: [
            "http://localhost:3000"
        ],
        methods: ["GET", "POST"]
    }
});
const port = 4001;


// Listen for a "connection" event for incoming sockets.
io.on("connection", (socket) => {
    console.log("User has connected");
});

// Start the server on our predetermined port number.
server.listen(port, () => {
    console.log("Listening on *:" + port);
})