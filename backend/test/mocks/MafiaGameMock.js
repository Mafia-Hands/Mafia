const config = require('../../config.json');
const loadLobbyEvents = require('../../events/LobbyEvents');
const loadVoteEvents = require('../../events/VoteEvents');
const loadGameStartEvents = require('../../events/GameStartEvents');
const { loadNightTimeEvents } = require('../../events/NightTimeVoteEvents');
const loadStateChangeEvents = require('../../events/game-state-events/StateChangeEvents');

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

/**
 * This is a mock of a MafiaGame, which will help us write unit tests without setting up the MafiaGame itself.
 * It will create a new game with a new room, and open a websocket server over Express.
 * Room elements will be useful elements that unit tests can access to, e.g. the random roomID created for the mock MafiaGame.
 */
function createMafiaGameWithOnePlayerMock(port) {
    mafiaGame = new MafiaGame();
    const roomID = mafiaGame.newGame();
    mafiaGame.gameRoomsDict[roomID] = new Room();
    const hostPlayer = new Player(null, roomID, 'mafiaPlayer', 'mafia', true);
    addPlayer(hostPlayer, roomID);

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

    return { io, mafiaGame, socketIOServer: server, roomID, hostPlayer };
}

function addPlayer(player, roomID) {
    let room = mafiaGame.gameRoomsDict[roomID];

    room.addPlayer(player);
}

function addPlayers(players, roomID) {
    const room = mafiaGame.gameRoomsDict[roomID];
    for (let player of players) {
        room.addPlayer(player);
    }
}

function getHostPlayer(roomID) {
    const room = mafiaGame.gameRoomsDict[roomID];
    return room.players[0];
}

function addMafiaVote(voter, votedFor, roomID) {
    const room = mafiaGame.gameRoomsDict[roomID];
    const { mafiaVoteMap } = room.voteHandler;

    mafiaVoteMap[voter.nickname] = votedFor;
}

function addDayVote(voter, votedFor, roomID) {
    const room = mafiaGame.gameRoomsDict[roomID];
    const { daytimeVoteMap } = room.voteHandler;

    daytimeVoteMap[voter.nickname] = votedFor;
}

function addTrialVote(voter, votedFor, roomID) {
    const room = mafiaGame.gameRoomsDict[roomID];
    const { trialVoteMap } = room.voteHandler;

    trialVoteMap[voter.nickname] = votedFor;
}

/**
 * Switch the current player (socket.player)
 * @param {*} nickname
 * @param {*} roomID
 */
function switchPlayer(nickname, roomID) {
    const room = mafiaGame.gameRoomsDict[roomID];
    testPlayerSocket.player = room.getPlayerByNickname(nickname);
}

function resetRoom(roomID) {
    const room = mafiaGame.gameRoomsDict[roomID];
    room.resetGame();
    room.players = [];
    room.host = null;
    room.voteHandler.resetVotes();

    const hostPlayer = new Player(null, roomID, 'mafiaPlayer', 'mafia', true);
    addPlayer(hostPlayer, roomID);
}

module.exports = {
    createMafiaGameWithOnePlayerMock,
    addPlayer,
    addPlayers,
    getHostPlayer,
    addMafiaVote,
    addDayVote,
    addTrialVote,
    switchPlayer,
    resetRoom,
};
