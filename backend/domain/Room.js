const GameStateEnum = require("./Enum/GameState");
class Room {
    constructor() {
        // function to initialise a roomID
        this.roomID = this.setRoomID();

        // default values given.
        this.gamestate = GameStateEnum.DAYTIME;
        this.maxPlayerCount = 6;
        this.players = [];
        this.roundNumber = 0;
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
        if (player !== null &&
            this.players.length <= this.maxPlayerCount) {
            this.players.push(player);
        }
    }

    getRoundNumber() {
        return this.roundNumber;
    }

    incrementRoundNumber() {
        this.roundNumber++;
    }
    // TODO: Change random generation if needed
    setRoomID() {
         return Math.random().toString(36).substring(7);
        
    }

}

module.exports = Room;