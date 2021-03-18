const config = require('../../config.json');

const loadLobbyEvents = require('../../Events/LobbyEvents');
const loadVoteEvents = require('../../Events/VoteEvents');
const loadGameStartEvents = require('../../Events/GameStartEvents');
const { loadNightTimeEvents } = require('../../Events/NightTimeVoteEvents');
const loadStateChangeEvents = require('../../Events/GameStateEvents/StateChangeEvents');

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
let testPlayerSocket;

module.exports.createMafiaGameWithOnePlayerMock = function (port) {
    mafiaGame = new MafiaGame();
    const roomID = mafiaGame.newGame();
    mafiaGame.gameRoomsDict[roomID] = new Room();
    const hostPlayer = new Player(null, roomID, 'a', 'mafia', true);

    io.on('connection', (socket) => {
        loadLobbyEvents(io, socket, mafiaGame);
        loadVoteEvents(io, socket, mafiaGame);
        loadGameStartEvents(io, socket, mafiaGame);
        loadNightTimeEvents(io, socket, mafiaGame);
        loadStateChangeEvents(io, socket, mafiaGame);
        socket.player = hostPlayer;
        testPlayerSocket = socket;
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

module.exports.addPlayers = function (players, roomID) {
    const room = mafiaGame.gameRoomsDict[roomID];
    for (player of players) {
        room.addPlayer(player);
    }
};

module.exports.switchPlayer = function (nickname, roomID) {
    const room = mafiaGame.gameRoomsDict[roomID];
    testPlayerSocket.player = room.getPlayerByNickname(nickname);
};
