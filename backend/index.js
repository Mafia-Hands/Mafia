const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  // Set up of CORS settings for socket.io server
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});
const MafiaGame = require("./domain/MafiaGame");
const Player = require("./domain/Player");

// Listen for a "connection" event for incoming sockets.
io.on("connection", (socket) => {
  console.log("User has connected");
  // create new Mafia game server
  let mafiaGame = new MafiaGame();
  /*********************  Create Lobby and lobby code *******/
  socket.on("create-lobby", (nickname) => {
    // create room  and assign host player to the room
    let roomID = mafiaGame.newGame();
    let host = new Player(socket.id, roomID, nickname);
    mafiaGame.gameRoomsDict[roomID].addPlayer(host);
    // Join room
    socket.join(roomID);
    //Send to all clients + sender with  room ID.
    io.in(roomID).emit("create-lobby", roomID);
  });
  /*********************  Create Lobby and lobby code *******/
});

// Start the server on our predetermined port number.
const port = process.env.PORT || 4001;
server.listen(port, () => {
  console.log("Listening on *:" + port);
});
