module.exports = function (io, socket) {
    socket.on('message', (message) => {
        io.emit('message', `${socket.player.nickname}: ${message}`);
    });
};
