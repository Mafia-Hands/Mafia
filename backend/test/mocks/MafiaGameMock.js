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

let mafiaGame = null;

module.exports.createMafiaGameWithOnePlayerMock = function (port) {
    mafiaGame = new MafiaGame();
    const roomID = mafiaGame.newGame();
    mafiaGame.gameRoomsDict[roomID] = new Room();
    const hostPlayer = new Player(null, roomID, 'a', 'mafia', true);

    io.on('connection', (socket) => {
        NightStateChangeEvents.eventHandlersRegistration(io, socket, mafiaGame);
        socket.player = hostPlayer;
        socket.join(roomID);
    });

    beforeAll((done) => {
        server.listen(port, () => {
            done();
        });
    });

    return { io: io, mafiaGame: mafiaGame, socketIOServer: server, roomID: roomID, hostPlayer: hostPlayer };
};

module.exports.addPlayer = function (player, roomID) {
    room = mafiaGame.gameRoomsDict[roomID];

    room.addPlayer(player);
};

module.exports.addMafiaVote = function (voter, votedFor, roomID) {
    const room = mafiaGame.gameRoomsDict[roomID];
    const { mafiaVoteMap } = room.voteHandler;

    mafiaVoteMap[voter] = votedFor;
};
