const MafiaGame = require('../domain/MafiaGame');

/**
 * Event handlers and logic for `reset-lobby` and `reset-lobby-update`
 * The goal of these events is to allow the host to reset the lobby, as well
 * as to send the update to reset to all connected players.
 * @param {any} io
 * @param {any} socket
 * @param {MafiaGame} mafiaGame
 */
module.exports = function (io, socket, mafiaGame) {
    socket.on('reset-lobby', () => {
        mafiaGame.resetGame(socket.player.roomID);

        // Emit "reset-lobby-update" to all players in room
        io.in(socket.player.roomID).emit('reset-lobby-update');
    });
};
