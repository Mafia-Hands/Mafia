const Player = require('../domain/Player');
const LobbyCodeDTO = require('../domain/DTO/response/LobbyCodeDTO');
const MafiaGame = require('../domain/MafiaGame');

/**
 * Event handlers and logic for `create-lobby` and `lobby-code`
 * The goal of these lobby events is to allow a host to create a game and receive a new room id.
 * @param {any} io
 * @param {any} socket
 * @param {MafiaGame} mafiaGame
 */
function createLobby(io, socket, mafiaGame) {
    socket.on('create-lobby', (createLobbyDTO) => {
        console.log('New room request received');
        // Create room and assign host player to the room
        const roomID = mafiaGame.newGame();
        const host = new Player(socket.id, roomID, createLobbyDTO.nickname);
        mafiaGame.gameRoomsDict[roomID].addPlayer(host);

        // Subscribe to the room events
        socket.join(roomID);

        // Add player information to the host socket
        socket.player = host;

        // Send room ID back to host.
        io.in(roomID).emit('lobby-code', new LobbyCodeDTO(roomID));
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
};
