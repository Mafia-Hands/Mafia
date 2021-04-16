const config = require('../../config.json');
const GameStateEnum = require('../../domain/enum/GameStateEnum');
const PlayerStatus = require('../../domain/enum/PlayerStatus');

const DayStartDTO = require('../../domain/dto/response/DayStartDTO');
const DiscussionEndDTO = require('../../domain/dto/response/DiscussionEndDTO');

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

        let timer = setTimeout(() => {
            endDiscussion(io, socket, mafiaGame);
        }, TIME_TO_VOTE);

        room.currentTimer = timer;
    });

    // Is called whenever a vote occurs during the day, and terminates the timer if all possible votes have been cast
    socket.on('day-vote', () => {
        const { roomID } = socket.player;
        const room = mafiaGame.gameRoomsDict[roomID];
        const numAlive = room.players.filter((player) => player.status === PlayerStatus.ALIVE).length;
        const numVotes = Object.keys(room.voteHandler.daytimeVoteMap).length;
        if (numAlive === numVotes) {
            clearTimeout(room.currentTimer);
            endDiscussion(io, socket, mafiaGame);
        }
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
