const MafiaGame = require("../domain/MafiaGame");
const Player = require("../domain/Player");
const Room = require("../domain/Room");
const VoteTimer = require("../Utilities/VoteTimer");

/*
 * This function is to handle the day vote event. It stores the players votes and
 * broadcasts it to other players in the room.
 * Params: votingFor: person player voted for, roomCode: room code, io: io connection
 * socket: socket connection to client, mafiaGame: the mafiaGame instance
 * Returns:
 */
const dayVoteFunction = (votingFor, io, socket, mafiaGame) => {
    const room = mafiaGame.gameRoomsDict[socket.player.roomID];
    const player = socket.player;
    const voteTimer = room.getVoteTimer(io, false);
    voteTimer.votes[player.nickname] = votingFor;
    io.in(socket.player.roomID).emit("day-vote-update", voteTimer.votes);
};

/*
 * This function is to handle the trail vote event. It stores the players votes and
 * broadcasts it to other players in the room.
 * Params: votingFor: person player voted for, roomCode: room code, io: io connection
 * socket: socket connection to client, mafiaGame: the mafiaGame instance
 * Returns:
 */
const trailVoteFunction = (votingFor, io, socket, mafiaGame) => {
    const room = mafiaGame.gameRoomsDict[socket.player.roomID];
    const player = socket.player;
    const voteTimer = room.getVoteTimer(io, true);
    voteTimer.votes[player.nickname] = votingFor;
    io.in(socket.player.roomID).emit("trail-vote-update", voteTimer.votes);
};

module.exports = dayVoteFunction;
module.exports = trailVoteFunction;
