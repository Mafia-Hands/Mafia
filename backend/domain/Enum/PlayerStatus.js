/**
 * Enum for player status.
 * Can be developed into classes if functionality is required.
 */
const PlayerStatus = {
    ALIVE: 'alive',
    KILLED_BY_MAFIA: 'killed_by_mafia',
    KILLED_BY_TOWN: 'killed_by_town',
};
Object.freeze(PlayerStatus);

module.exports = PlayerStatus;
