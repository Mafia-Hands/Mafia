const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
    // Set up of CORS settings for socket.io server
    cors: {
        origin: [
            "*" // Allow all origin to access the website's data
            // Reason for this is for the ease of development, since we might have various local/cloud website setup for testing purposes.
            // While allowing all origins may pose a security thread for a banking website, as any site can make a request using the same session
            // This won't be a problem in our website, as there are no local session/cookies returned to the user. 
            // Please refer to the post: https://stackoverflow.com/questions/12001269/what-are-the-security-risks-of-setting-access-control-allow-origin
        ],
        methods: ["GET", "POST"]
    }
});
const port = process.env.PORT || 4001;

// Listen for a "connection" event for incoming sockets.
io.on("connection", (socket) => {
    console.log("User has connected");
});

// Start the server on our predetermined port number.
server.listen(port, () => {
    console.log("Listening on *:" + port);
})