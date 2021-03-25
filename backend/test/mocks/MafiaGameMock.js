/**
 * Mocks a MafiaGame and creates a websocket server over Express.
 * You can add players, votes and reset the room easily.
 */

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

let mafiaGame = null; // The mafia game that we will mock around
let testHostPlayerSocket;

function createMafiaGameWithOnePlayerMock(port) {
    mafiaGame = new MafiaGame();

    // Create a new room
    const roomID = mafiaGame.newGame();
    mafiaGame.gameRoomsDict[roomID] = new Room();

    // Create a host player for the room
    const hostPlayer = new Player(null, roomID, 'a', 'mafia', true);

    io.on('connection', (socket) => {
        // Register all event handlers to be unit tested
        loadLobbyEvents(io, socket, mafiaGame);
        loadVoteEvents(io, socket, mafiaGame);
        loadGameStartEvents(io, socket, mafiaGame);
        loadNightTimeEvents(io, socket, mafiaGame);
        loadStateChangeEvents(io, socket, mafiaGame);

        socket.player = hostPlayer;
        testHostPlayerSocket = socket;
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

function addMafiaVote(voter, votedFor, roomID) {
    const room = mafiaGame.gameRoomsDict[roomID];
    const { mafiaVoteMap } = room.voteHandler;

    mafiaVoteMap[voter.nickname] = votedFor;
}

function addTrialVote(voter, votedFor, roomID) {
    const room = mafiaGame.gameRoomsDict[roomID];
    const { trialVoteMap } = room.voteHandler;

    trialVoteMap[voter.nickname] = votedFor;
}

function addPlayers(players, roomID) {
    const room = mafiaGame.gameRoomsDict[roomID];
    for (let player of players) {
        room.addPlayer(player);
    }
}

function switchHostPlayer(nickname, roomID) {
    const room = mafiaGame.gameRoomsDict[roomID];
    testHostPlayerSocket.player = room.getPlayerByNickname(nickname);
}

function resetRoom(roomID) {
    const room = mafiaGame.gameRoomsDict[roomID];
    room.resetGame();
    room.players = [];
    room.host = null;
    room.voteHandler.resetVotes();
}

module.exports = {
    createMafiaGameWithOnePlayerMock,
    addPlayer,
    addMafiaVote,
    addTrialVote,
    addPlayers,
    switchHostPlayer,
    resetRoom,
};
