const GameStateEnum = require('./Enum/GameStateEnum');
const VoteHandler = require('./VoteHandler');
const roles = require('./Enum/Role');

const INITIAL_GAME_STATE = GameStateEnum.WAITINGLOBBY;
const INITIAL_ROUND_NUMBER = 0;

/**
 * Represents a Mafia game room.
 * The room keeps track of all the players that have joined the game.
 * Is also manages the general state of the game (round number, winning players, votes, etc.)
 */
class Room {
    constructor() {
        // Initialize a roomID
        this.roomID = this.getRandomID();

        // Default game settings.
        this.gameState = INITIAL_GAME_STATE;
        this.maxPlayerCount = 6;
        this.players = [];
        this.roundNumber = INITIAL_ROUND_NUMBER;

        // Handler used to keep track of votes and calculate tallies
        this.voteHandler = new VoteHandler();
        this.host = null;
    }

    /**
     * Gets the player in the game matching the specified nickname.
     * @param {String} nickname The player's nickname
     * @returns The player with the specified nickname, or 'undefined' if they are not found.
     */
    getPlayerByNickname(nickname) {
        let returnedPlayer;

        this.players.forEach((player) => {
            if (player.nickname === nickname) {
                returnedPlayer = player;
            }
        });

        return returnedPlayer;
    }

    /**
     * Get all players matching a specified role
     * @param {Role} role
     * @returns All players with that role, or an empty list if none are found.
     */
    getPlayersByRole(role) {
        const playersOfTheRole = [];
        this.players.forEach((player) => {
            if (player.role === role) {
                playersOfTheRole.push(player);
            }
        });

        return playersOfTheRole;
    }

    /**
     * Gets the winning players for the game, given a role. If the specified role is CIVILIAN, medics and detectives are included.
     * @param {Role} role The winning role: either CIVILIAN, MAFIA or JESTER
     * @returns The list of winning players , depending on the winning role provided.
     */
    getWinningPlayers(role) {
        let playersOfTheRole = [];
        if (role === roles.CIVILIAN) {
            playersOfTheRole = [
                ...this.getPlayersByRole(roles.CIVILIAN),
                ...this.getPlayersByRole(roles.MEDIC),
                ...this.getPlayersByRole(roles.DETECTIVE),
            ];
        } else {
            playersOfTheRole = this.getPlayersByRole(role);
        }
        return playersOfTheRole;
    }

    /**
     * Add a new player to the game. The player is not added if the max player count has already been met.
     * @param {Player} player The player to add to the game.
     */
    addPlayer(player) {
        if (player !== null && this.players.length < this.maxPlayerCount) {
            this.players.push(player);
        }
    }

    /**
     * Moves on to the next round of this room's game.
     */
    incrementRoundNumber() {
        this.roundNumber += 1;
    }

    /**
     * Checks the win conditions for each role to determine which role has won the game, if any.
     * @returns The winning role, or null if no role has won.
     */
    getWinningRole() {
        const numOfMafiaAlive = this.getPlayersByRole(roles.MAFIA).filter((player) => player.isAlive).length;
        const numOfJesterAlive = this.getPlayersByRole(roles.JESTER).filter((player) => player.isAlive).length;
        const numOfCiviliansAlive = [
            ...this.getPlayersByRole(roles.CIVILIAN),
            ...this.getPlayersByRole(roles.MEDIC),
            ...this.getPlayersByRole(roles.DETECTIVE),
        ].filter((player) => player.isAlive).length;

        if (numOfMafiaAlive === 0) {
            return roles.CIVILIAN;
        }
        if (numOfMafiaAlive === numOfCiviliansAlive + numOfJesterAlive) {
            return roles.MAFIA;
        }
        if (numOfJesterAlive === 0) {
            return roles.JESTER;
        }

        return null;
    }

    /**
     * Reset the game state. Used when the game for this room is restarted, or when the game ends.
     */
    resetGame() {
        this.gameState = INITIAL_GAME_STATE;
        this.roundNumber = INITIAL_ROUND_NUMBER;
        for (let i = 0; i < this.players.length; i += 1) {
            if (this.players[i]) {
                this.players[i].resetPlayer();
            }
        }
    }

    /**
     * Generate a random alphanumeric id
     * @returns {string} a random alphanumeric id
     */
    // eslint-disable-next-line class-methods-use-this
    getRandomID() {
        return Math.random().toString(36).substring(7);
    }
}

module.exports = Room;
