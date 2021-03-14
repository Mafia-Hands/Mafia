const Player = require("../domain/Player");
const LobbyCodeDTO = require("../domain/DTO/response/LobbyCodeDTO");
const MafiaGame = require("../domain/MafiaGame");

/**
 * Event handlers and logic for `create-lobby` and `lobby-code` and `join-lobby`
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

    //on join lobby message event will call join lobby event handler
    socket.on("join-lobby", (joinLobbyDTO) => {
        const room = mafiaGame.gameRoomsDict[socket.player.roomID];
        let player = new Player(
            socket.id,
            socket.player.roomID,
            joinLobbyDTO.nickname,
            null,
            false
        );
        const reason = room.addPlayer(player);
        if (!reason) {
            socket.join(socket.player.roomID);
            io.in(socket.player.roomID).emit(
                "lobby-join",
                new LobbyJoinDTO(room.players)
            );
            if (len(room.players == 6)) {
                const host = room.players.find((element) => {
                    element.isHost == true;
                });
                io.to(host.socketID).emit("lobby-ready");
            }
        } else {
            socket.emit("failed-join", reason);
        }
    });
};
