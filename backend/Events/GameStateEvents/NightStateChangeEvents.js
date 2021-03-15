const config = require("../../config.json");
const GameStateEnum = require("../../domain/Enum/GameStateEnum");

const MafiaGame = require("../../domain/MafiaGame");
const NightStartDTO = require("../../domain/DTO/response/NightStartDTO");
const NightEndDTO = require("../../domain/DTO/response/NightEndDTO");

/**
 * Event handlers and logic for `start-night`
 * When the client invokes this event handler, the game state will change in-game, the night voting timer
 * will start, and the server will emit `night-start` to the client, indicating that the night has begun.
 * @param {any} io
 * @param {any} socket
 * @param {MafiaGame} mafiaGame
 */
function startNight(io, socket, mafiaGame) {
  socket.on("start-night", () => {
    const roomID = socket.player.roomID;
    const room = mafiaGame.gameRoomsDict[roomID];
    const TIME_TO_VOTE = config.night_total_vote_time_in_milliseconds;

    room.gameState = GameStateEnum.NIGHT_TIME;

    io.in(roomID).emit("night-start", new NightStartDTO(TIME_TO_VOTE));

    setTimeout(endNight(io, socket, mafiaGame), TIME_TO_VOTE);
  });
}

/**
 * Emits a `night-end` event to the clients. The night has ended, and the client can move to the day
 * discussion if they wish...
 * @param {any} io
 * @param {any} socket
 * @param {MafiaGame} mafiaGame
 */
function endNight(io, socket, mafiaGame) {
  const roomID = socket.player.roomID;
  const room = mafiaGame.gameRoomsDict[roomID];

  let playerKilled = null;
  //TODO: calculate which player has been been murdered.

  io.in(roomID).emit("night-end", new NightEndDTO(playerKilled));
}

/**
 * Event handlers and logic for all of the lobby-related event
 * Current namespaces: start-night
 * @param {any} io
 * @param {any} socket
 * @param {MafiaGame} mafiaGame
 */
module.exports = function (io, socket, mafiaGame) {
  startNight(io, socket, mafiaGame);
};
