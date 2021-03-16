const config = require('../../config.json');
const NightStateChangeEvents = require('../../Events/GameStateEvents/NightStateChangeEvents');
const MafiaGame = require('../../domain/MafiaGame');
const Room = require('../../domain/Room');
const Player = require('../../domain/Player');

const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: config.cors_origin,
    },
});

module.exports.createMafiaGameWithOnePlayerMock = function (port) {
    const mafiaGame = new MafiaGame();
    const roomID = mafiaGame.newGame();
    mafiaGame.gameRoomsDict[roomID] = new Room();

    io.on('connection', (socket) => {
        NightStateChangeEvents.eventHandlersRegistration(io, socket, mafiaGame);
        socket.player = new Player(socket.id, roomID, '', '');
        socket.join(roomID);
    });

    beforeAll((done) => {
        server.listen(port, () => {
            done();
        });
    });

    return { io: io, mafiaGame: mafiaGame, socketIOServer: server };
};
