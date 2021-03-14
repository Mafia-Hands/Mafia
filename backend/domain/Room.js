const GameStateEnum = require('./Enum/GameStateEnum');

const INITIAL_GAME_STATE = GameStateEnum.NIGHTTIME;
const INITIAL_ROUND_NUMBER = 0;

class Room {
    constructor() {
        // Initialize a roomID
        this.roomID = this.getRandomID();

        // Default game settings.
        this.gameState = INITIAL_GAME_STATE;
        this.maxPlayerCount = 6;
        this.players = new Array(this.maxPlayerCount);
        this.roundNumber = INITIAL_ROUND_NUMBER;
    }

    getRoomID() {
        return this.roomID;
    }

    getGamestate() {
        return this.gamestate;
    }

    setGamestate(gamestate) {
        this.gamestate = gamestate;
    }

    getPlayers() {
        return this.players;
    }

    addPlayer(player) {
        if (player !== null && this.players.length <= this.maxPlayerCount) {
            this.players.push(player);
        }
    }

    getRoundNumber() {
        return this.roundNumber;
    }

    incrementRoundNumber() {
        this.roundNumber++;
    }

    resetGame() {
        this.gameState = INITIAL_GAME_STATE;
        this.roundNumber = INITIAL_ROUND_NUMBER;
        for (player in this.players) {
            player.resetPlayer();
        }
    }

    /**
     * Generate a random alphanumeric id
     * @returns {string} a random alphanumeric id
     */
    getRandomID() {
        return Math.random().toString(36).substring(7);
    }
}

module.exports = Room;
