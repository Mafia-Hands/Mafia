const config = require('../../config.json');
const GameStateEnum = require('../../domain/Enum/GameStateEnum');

const TrialStartDTO = require('../../domain/DTO/response/DayStartDTO');
const TrialEndDTO = require('../../domain/DTO/response/TrialEndDTO');
const GameOverDTO = require('../../domain/DTO/response/GameOverDTO');

/**
 * Event handlers and logic for `start-trial`
 * When the client invokes this event handler, the game state will change in-game, the trial voting timer
 * will start, and the server will emit `trial-start` to the client, indicating that the trial has begun.
 * @param {any} io
 * @param {any} socket
 * @param {MafiaGame} mafiaGame
 */
function startTrial(io, socket, mafiaGame) {
    socket.on('start-trial', () => {
        const { roomID } = socket.player;
        const room = mafiaGame.gameRoomsDict[roomID];
        const TIME_TO_VOTE = config.trial_total_vote_time_in_milliseconds;

        room.gameState = GameStateEnum.TRIAL;

        io.in(roomID).emit('trial-start', new TrialStartDTO(TIME_TO_VOTE));

        setTimeout(() => endTrial(io, socket, mafiaGame), TIME_TO_VOTE);
    });
}

/**
 * Emits a `trial-end` event to the clients. The trial has ended, and the client can move to the night
 *  if they wish...
 * @param {any} io
 * @param {any} socket
 * @param {MafiaGame} mafiaGame
 */
function endTrial(io, socket, mafiaGame) {
    const { roomID } = socket.player;
    const room = mafiaGame.gameRoomsDict[roomID];

    const playerChosen = room.voteHandler.getTrialVotedPlayer();

    if (playerChosen && playerChosen !== 'abstain Vote') {
        room.getPlayerByNickname(playerChosen).isAlive = false;
    }

    const winningRole = room.getWinningRole();

    if (winningRole !== null) {
        io.in(roomID).emit('trial-end', new TrialEndDTO(playerChosen, true));
        io.in(roomID).emit(
            'game-over',
            new GameOverDTO(
                winningRole,
                room.getWinningPlayers(winningRole).map((p) => p.nickname)
            )
        );
    } else {
        io.in(roomID).emit('trial-end', new TrialEndDTO(playerChosen, false));
    }
    room.voteHandler.resetVotes();
}

/**
 * Event handlers and logic for all of the lobby-related event
 * Current namespaces: start-trial
 * @param {any} io
 * @param {any} socket
 * @param {MafiaGame} mafiaGame
 */
module.exports.eventHandlersRegistration = function (io, socket, mafiaGame) {
    startTrial(io, socket, mafiaGame);
};
