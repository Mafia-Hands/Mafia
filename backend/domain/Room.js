const GameStateEnum = require('./Enum/GameStateEnum');

class Room {
    constructor() {
        // Initialize a roomID
        this.roomID = this.getRandomID();

        // Default game settings.
        this.gameState = GameStateEnum.NIGHTTIME;
        this.maxPlayerCount = 6;
        this.players = new Array(this.maxPlayerCount);
        this.roundNumber = 0;

        // Specific player objects, storing references to the players that have been chosen by
        // mafia/medic players in the night time voting period.
        this.mafiaChosenPlayer = null;
        this.medicChosenPlayer = null;
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

    getPlayerByNickname(nickname) {
        for (player of this.players) {
            if (player.nickname == nickname) {
                return player;
            }
        }
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

    /**
     * Generate a random alphanumeric id
     * @returns {string} a random alphanumeric id
     */
    getRandomID() {
        return Math.random().toString(36).substring(7);
    }
}

module.exports = Room;
