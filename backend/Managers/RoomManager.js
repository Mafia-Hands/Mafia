const MafiaGame = require("../domain/MafiaGame");
const Player = require("../domain/Player");
const Room = require("../domain/Room");

const joinLobbyFunction = ({ nickname, roomCode }, io, socket, mafiaGame) => {
    const room = mafiaGame.gameRoomsDict[roomCode];
    let player = new Player(socket.id, roomCode, nickname, false);
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
