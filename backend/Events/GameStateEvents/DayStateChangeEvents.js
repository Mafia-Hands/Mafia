const config = require('../../config.json');
const GameStateEnum = require('../../domain/Enum/GameStateEnum');

const MafiaGame = require('../../domain/MafiaGame');
const DayStartDTO = require('../../domain/DTO/response/DayStartDTO');
const DiscussionEndDTO = require('../../domain/DTO/response/DiscussionEndDTO');

/**
 * Event handlers and logic for `start-day`
 * When the client invokes this event handler, the game state will change in-game, the day voting timer
 * will start, and the server will emit `day-start` to the client, indicating that the day has begun.
 * @param {any} io
 * @param {any} socket
 * @param {MafiaGame} mafiaGame
 */
function startDay(io, socket, mafiaGame) {
    socket.on('start-day', () => {
        const { roomID } = socket.player;
        const room = mafiaGame.gameRoomsDict[roomID];
        const TIME_TO_VOTE = config.day_total_vote_time_in_milliseconds;

        room.gameState = GameStateEnum.DAY_TIME;

        io.in(roomID).emit('day-start', new DayStartDTO(TIME_TO_VOTE));

        setTimeout(() => endDiscussion(io, socket, mafiaGame), TIME_TO_VOTE);
    });
}

/**
 * Emits a `discussion-end` event to the clients. The discussion has ended, and the client can move to the trial
 *  if they wish...
 * @param {any} io
 * @param {any} socket
 * @param {MafiaGame} mafiaGame
 */
function endDiscussion(io, socket, mafiaGame) {
    const { roomID } = socket.player;
    const room = mafiaGame.gameRoomsDict[roomID];

    const playerChosen = room.voteHandler.getDaytimeVotedPlayer();

    io.in(roomID).emit('discussion-end', new DiscussionEndDTO(playerChosen));
    room.voteHandler.resetVotes();
}

/**
 * Event handlers and logic for all of the lobby-related event
 * Current namespaces: start-day
 * @param {any} io
 * @param {any} socket
 * @param {MafiaGame} mafiaGame
 */
module.exports.eventHandlersRegistration = function (io, socket, mafiaGame) {
    startDay(io, socket, mafiaGame);
};
