class Room {
    constructor() {
        // function to initialise a roomID
        this.roomName = this.setRoomName();

        // default values given.
        this.gamestate = GameStateEnum["Day Time"];
        this.maxPlayerCount = 6;
        this.players = new Array(maxPlayerCount);
        this.roundNumber = 0;
    }

    getRoomName() {
        return this.roomName;
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

    setRoomName() {
        return 0; //some function to initialise a roomID. Must discuss how to do this at a later date.
    }

}