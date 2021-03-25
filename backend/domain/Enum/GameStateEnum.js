/**
 * Enums for states.
 * Can be developed into classes if functionality is required.
 */
const GameStateEnum = { WAITING_LOBBY: 0, NIGHT_TIME: 1, DAY_TIME: 2, INITIAL_VOTE: 3, TRIAL: 4 };
Object.freeze(GameStateEnum);

module.exports = GameStateEnum;
