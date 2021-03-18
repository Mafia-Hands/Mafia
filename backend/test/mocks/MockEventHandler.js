/**
 * Mock Handler to help with the MockMafiaGame component
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
