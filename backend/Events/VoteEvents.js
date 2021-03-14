const Player = require("../domain/Player");
const LobbyCodeDTO = require("../domain/DTO/response/LobbyCodeDTO");
const MafiaGame = require("../domain/MafiaGame");
const VoteTimer = require("../Utilities/VoteTimer");

/**
 * Event handlers and logic for `create-lobby` and `lobby-code` and `join-lobby`
 * The goal of these lobby events is to allow a host to create a game and receive a new room id.
 * @param {any} io
 * @param {any} socket
 * @param {MafiaGame} mafiaGame
 */
module.exports = function (io, socket, mafiaGame) {
    //on day vote message event will call day vote event handler
    socket.on("day-vote", (voteForDTO) => {
        const room = mafiaGame.gameRoomsDict[socket.player.roomID];
        const player = socket.player;
        const voteTimer = room.getVoteTimer(io, false);
        voteTimer.votes[player.nickname] = voteForDTO.voteFor;
        io.in(socket.player.roomID).emit(
            "day-vote-update",
            new ListVoteDTO(voteTimer.votes)
        );
    });

    //on trail vote message event will call trail vote event handler
    socket.on("trial-vote", (voteForDTO) => {
        const room = mafiaGame.gameRoomsDict[socket.player.roomID];
        const player = socket.player;
        const voteTimer = room.getVoteTimer(io, true);
        voteTimer.votes[player.nickname] = voteForDTO.voteFor;
        io.in(socket.player.roomID).emit(
            "trail-vote-update",
            new ListVoteDTO(voteTimer.votes)
        );
    });
};
