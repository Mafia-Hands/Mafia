const MafiaGame = require("../domain/MafiaGame");
const Player = require("../domain/Player");
const Room = require("../domain/Room");
const VoteTimer = require("../Utilities/VoteTimer");

const dayVoteFunction = ({ votingFor, roomCode }, io, socket, mafiaGame) => {
    const room = mafiaGame.gameRoomsDict[roomCode];
    const player = room.players.find((element) => {
        element.socketID == socket.id;
    });
    const voteTimer = room.getVoteTimer(io);
    voteTimer.votes[player.nickname] = votingFor;
    io.in(room.roomID).emit("day-vote-update", voteTimer.votes);
};

const trailVoteFunction = ({ votingFor, roomCode }, io, socket, mafiaGame) => {
    const room = mafiaGame.gameRoomsDict[roomCode];
    const player = room.players.find((element) => {
        element.socketID == socket.id;
    });
    const voteTimer = room.getVoteTimer(io);
    voteTimer.votes[player.nickname] = votingFor;
    io.in(room.roomID).emit("trail-vote-update", voteTimer.votes);
};

module.exports = dayVoteFunction;
module.exports = trailVoteFunction;
