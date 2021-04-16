module.exports = function (io, socket) {
    socket.on('message', (message) => {
        io.in(socket.player.roomID).emit('message', `${socket.player.nickname}: ${message}`);
    });
};
