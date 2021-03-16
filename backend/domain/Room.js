const GameStateEnum = require('./Enum/GameStateEnum');
const VoteHandler = require('./VoteHandler');

const INITIAL_GAME_STATE = GameStateEnum.NIGHTTIME;
const INITIAL_ROUND_NUMBER = 0;

class Room {
    constructor() {
        // Initialize a roomID
        this.roomID = this.getRandomID();

        // Default game settings.
        this.gameState = INITIAL_GAME_STATE;
        this.maxPlayerCount = 6;
        this.players = new Array();
        this.roundNumber = INITIAL_ROUND_NUMBER;

        // Handler used to keep track of votes and calculate tallies
        this.voteHandler = new VoteHandler();
        
        this.voteMapping = {};
        this.host = null;
    }

    getRoomID() {
        return this.roomID;
    }

    getGameState() {
        return this.gameState;
    }

    setGameState(gameState) {
        this.gameState = gameState;
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
    
    getHost() {
        return this.Host;
    }

    addPlayer(player) {
        if (player !== null && this.players.length < this.maxPlayerCount) {
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
        this.setGameState(INITIAL_GAME_STATE);
        this.roundNumber = INITIAL_ROUND_NUMBER;
        for (let i = 0; i < this.players.length; i++) {
            if (this.players[i]) {
                this.players[i].resetPlayer();
            }
        }
    }

    resetVoteMapping() {
        this.voteMapping = {};
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
