const GameStateEnum = require('./Enum/GameStateEnum');
const VoteHandler = require('./VoteHandler');
const roles = require('./Enum/Role');

const INITIAL_GAME_STATE = GameStateEnum.WAITINGLOBBY;
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
        let returnedPlayer;

        this.players.forEach((player) => {
            if (player.nickname === nickname) {
                returnedPlayer = player;
            }
        });

        return returnedPlayer;
    }

    getPlayersByRole(role) {
        const playersOfTheRole = [];
        this.players.forEach((player) => {
            if (player.role === role) {
                playersOfTheRole.push(player);
            }
        });

        return playersOfTheRole;
    }

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

    resetGame() {
        this.setGameState(INITIAL_GAME_STATE);
        this.roundNumber = INITIAL_ROUND_NUMBER;
        for (let i = 0; i < this.players.length; i++) {
            if (this.players[i]) {
                this.players[i].resetPlayer();
            }
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
