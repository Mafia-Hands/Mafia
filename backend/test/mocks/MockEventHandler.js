/**
 * Mock Handler to help with the MockMafiaGame component
 * Assigns a new player to a client socket, so that the socket can take on the role of a different player for testing purposes.
 * @param {any} io
 * @param {any} socket
 * @param {MafiaGame} mafiaGame
 */
exports.loadMockEvents = (io, socket, mafiaGame) => {
    socket.on('assign-player', (assignPlayerObj) => {
        room = mafiaGame.gameRoomsDict[assignPlayerObj.roomID];
        player = room.getPlayerByNickname(assignPlayerObj.nickname);
        socket.player = player;
    });
};
