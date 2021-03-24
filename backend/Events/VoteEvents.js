
const ListVoteDTO = require('../domain/DTO/response/ListVoteDTO');
const MafiaGame = require('../domain/MafiaGame');

/**
 * Event handler and logic for `day-vote`
 * The goal of these vote events is to allow a player to vote for another player and every
 * other player to receive a list of votes.
 * @param {any} io
 * @param {any} socket
 * @param {MafiaGame} mafiaGame
 */
function voteDay(io, socket, mafiaGame) {
    socket.on('day-vote', (voteForDTO) => {
        const room = mafiaGame.gameRoomsDict[socket.player.roomID];
        const voter = socket.player;
        const votee = voteForDTO.votingFor;
        room.voteHandler.daytimeVoteMap[voter.nickname] = room.getPlayerByNickname(votee);
        io.in(socket.player.roomID).emit('day-vote-update', new ListVoteDTO(room.voteHandler.daytimeVoteMap));
    });
}

/**
 * Event handler and logic for `trail-vote`
 * The goal of these vote events is to allow a player to vote for another player and every
 * other player to receive a list of votes.
 * @param {any} io: server socket instance
 * @param {any} socket client socket connection to the server
 * @param {MafiaGame} mafiaGame: Object mirroring the real world Mafia game
 */
function voteTrial(io, socket, mafiaGame) {
    socket.on('trial-vote', (voteForDTO) => {
        const room = mafiaGame.gameRoomsDict[socket.player.roomID];
        const voter = socket.player;
        const votee = voteForDTO.votingFor;
        room.voteHandler.trialVoteMap[voter.nickname] = votee === 'abstain Vote' ? 'abstain Vote' : room.getPlayerByNickname(votee);
        io.in(socket.player.roomID).emit('trial-vote-update', new ListVoteDTO(room.voteHandler.trialVoteMap));
    });
}

/**
 * Event handlers and logic for all of the vote-related events
 * Current namespaces: day-vote, trail-vote
 * @param {any} io: server socket instance
 * @param {any} socket client socket connection to the server
 * @param {MafiaGame} mafiaGame: Object mirroring the real world Mafia game
 */
module.exports = function (io, socket, mafiaGame) {
    voteDay(io, socket, mafiaGame);
    voteTrial(io, socket, mafiaGame);
};
