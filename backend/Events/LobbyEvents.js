const Player = require("../domain/Player");
const LobbyCodeDTO = require("../domain/DTO/response/LobbyCodeDTO");
const MafiaGame = require("../domain/MafiaGame");
const Room = require("../domain/Room");
/**
 * Event handlers and logic for `create-lobby` and `lobby-code`
 * The goal of these lobby events is to allow a host to create a game and receive a new room id.
 * @param {any} io
 * @param {any} socket
 * @param {MafiaGame} mafiaGame
 */
module.exports = function (io, socket, mafiaGame) {
  socket.on("create-lobby", (createLobbyDTO) => {
    console.log("New room request received");
    // Create room and assign host player to the room
    let roomID = mafiaGame.newGame();
    let host = new Player(socket.id, roomID, createLobbyDTO.nickname);
    mafiaGame.gameRoomsDict[roomID].addPlayer(host);

    // Subscribe to the room events
    socket.join(roomID);

    // Add player information to the host socket
    socket.player = host;

    // Send room ID back to host.
    io.in(roomID).emit("lobby-code", new LobbyCodeDTO(roomID));
  });

    // this overlaps with justins code.
    // This code acts to send messages to the host and all players in a room.
    socket.on("lobby-ready", () => {
      let roomID = socket.player.roomID;

      let mafiaGameRoom = mafiaGame.gameRoomsDict[roomID];

      let hostsocketID = mafiaGameRoom.players[0].socketID; //(host is first person)
      let mafiaGamePlayers = mafiaGameRoom.players;

      // message should show the confirmation button only for the host.
      io.to(hostsocketID).emit("confirm-game-start");

      // to all other members tell them that game is ready
      // host is position 0, so skip.
      for (i = 1; i < mafiaGamePlayers.length; i++) {
        let player = mafiaGamePlayers[i];
        io.to(hostsocketID).emit("game-ready");
      }
    });

    // host has clicked start game
    socket.on("start-game", () => {
 
        let roomID = socket.player.roomID;

        // sending to all clients in "game" room, including sender
        io.in(roomID).emit("game-start");

    });


  
};

