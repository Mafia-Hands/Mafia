const Player = require("../domain/Player");
const LobbyCodeDTO = require("../domain/DTO/response/LobbyCodeDTO");
const MafiaGame = require("../domain/MafiaGame");

/**
 * Event handlers and logic for `create-lobby` and `lobby-code`
 * The goal of these lobby events is to allow a host to create a game and receive a new room id. 
 * @param {any} io 
 * @param {any} socket 
 * @param {MafiaGame} mafiaGame 
 */
exports.load_lobby_events = function(io, socket, mafiaGame){
    socket.on("create-lobby", (createLobbyDTO) => {
        console.log("New room request received");
        // Create room and assign host player to the room
        let roomID = mafiaGame.newGame();
        let host = new Player(socket.id, roomID, createLobbyDTO.nickname);
        mafiaGame.gameRoomsDict[roomID].addPlayer(host);

        // Subscribe to the room events
        socket.join(roomID);

        // Send room ID back to host.
        io.in(roomID).emit("lobby-code", JSON.stringify(new LobbyCodeDTO(roomID)));
    });
};

