const Player = require('../domain/Player');
const LobbyCodeDTO = require('../domain/DTO/response/LobbyCodeDTO');
const LobbyJoinDTO = require('../domain/DTO/response/LobbyJoinDTO');
/**
 * Event handlers and logic for `create-lobby` and `lobby-code`
 * The goal of these lobby events is to allow a host to create a game and receive a new room id.
 * @param {any} io
 * @param {any} socket
 * @param {MafiaGame} mafiaGame
 */
function createLobby(io, socket, mafiaGame) {
    socket.on('create-lobby', (createLobbyDTO) => {
        // Create room and assign host player to the room
        const roomID = mafiaGame.newGame();
        const host = new Player(socket.id, roomID, createLobbyDTO.nickname, null, true);
        mafiaGame.gameRoomsDict[roomID].host = host;
        mafiaGame.gameRoomsDict[roomID].addPlayer(host);

        // Subscribe to the room events
        socket.join(roomID);

        // Add player information to the host socket
        socket.player = host;
        socket.player.isHost = true;

        // Send room ID back to host.
        io.in(roomID).emit('lobby-code', new LobbyCodeDTO(roomID));
    });
}

/**
 * Event handlers and logic for `join-lobby`
 * The goal of these join events is to allow a player to join a game room and receive a confirmation.
 * @param {any} io
 * @param {any} socket
 * @param {MafiaGame} mafiaGame
 */
function joinLobby(io, socket, mafiaGame) {
    // on join lobby message event will call join lobby event handler
    socket.on('join-lobby', (joinLobbyDTO) => {
        const room = mafiaGame.gameRoomsDict[joinLobbyDTO.roomCode];
        if (room === undefined) {
            // TODO: Handle non-existent room after MVP is done.
            // eslint-disable-next-line no-console
            console.log(`Lobby ${joinLobbyDTO.roomCode} doesn't exist`);
            return;
        }

        const player = new Player(socket.id, joinLobbyDTO.roomCode, joinLobbyDTO.nickname, null, false);
        room.addPlayer(player);
        socket.player = player;

        socket.join(player.roomID);

        io.in(socket.player.roomID).emit('lobby-join', new LobbyJoinDTO(room.players.map((player) => player.nickname)));
        if (room.players.length === 6) {
            io.to(room.host.socketID).emit('lobby-ready');
        }
    });
}

/**
 * Event handlers and logic for `reset-lobby` and `reset-lobby-update`
 * The goal of these events is to allow the host to reset the lobby, as well
 * as to send the update to reset to all connected players.
 * @param {any} io
 * @param {any} socket
 * @param {MafiaGame} mafiaGame
 */
function resetLobby(io, socket, mafiaGame) {
    socket.on('reset-lobby', () => {
        mafiaGame.resetGame(socket.player.roomID);

        // Emit "reset-lobby-update" to all players in room
        io.in(socket.player.roomID).emit('reset-lobby-update');
    });
}

/**
 * Event handlers and logic for all of the lobby-related event
 * Current namespaces: create-lobby, lobby-code, reset-lobby, reset-lobby-update
 * @param {any} io
 * @param {any} socket
 * @param {MafiaGame} mafiaGame
 */
module.exports = function (io, socket, mafiaGame) {
    createLobby(io, socket, mafiaGame);
    resetLobby(io, socket, mafiaGame);
    joinLobby(io, socket, mafiaGame);
};
