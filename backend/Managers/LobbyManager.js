const MafiaGame = require("../domain/MafiaGame");
const Player = require("../domain/Player");
const Room = require("../domain/Room");

/*
 * This function adds the joining player to a room matching the roomCode provided.
 * It also sends back a message to every player in the room with updated player information.
 * It also sends the host of a room a lobby-ready message to indicate a full room.
 * It also sends back a message to the playing trying to join if and error has occured in the joining process.
 * Params: nickname: nickname of player joining, roomCode: room player wants to join,
 * io: io connection, socket: socket connection to player, mafiaGame: mafiaGame instance
 * Returns:
 */
const joinLobbyFunction = (nickname, io, socket, mafiaGame) => {
    const room = mafiaGame.gameRoomsDict[socket.player.roomID];
    let player = new Player(socket.id, socket.player.roomID, nickname, false);
    const reason = room.addPlayer(player);
    if (!reason) {
        socket.join(roomCode);
        io.in(roomCode).emit("lobby-join", room.players);
        if (len(room.players == 6)) {
            const host = room.players.find((element) => {
                element.isHost == true;
            });
            io.to(host.socketID).emit("lobby-ready");
        }
    } else {
        socket.emit("failed-join", reason);
    }
};

module.exports = joinLobbyFunction;
