class Room {
    constructor() {
        // function to initialise a roomID
        this.roomID = this.setRoomID();

        // default values given.
        this.gamestate = GameStateEnum.DAYTIME;
        this.maxPlayerCount = 6;
        this.players = new Array(maxPlayerCount);
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
        if (player !== null && this.players.length <= this.maxPlayerCount) {
            if (!this.players.includes(player.nickname)) {
                this.players.push(player);
            } else {
                return { reason: "Cannot join because name already taken" };
            }
        } else {
            return { reason: "Cannot join because room is full" };
        }
    }

    getRoundNumber() {
        return this.roundNumber;
    }

    incrementRoundNumber() {
        this.roundNumber++;
    }
    // TODO: some function to initialise a roomID. Must discuss how to do this at a later date.
    setRoomID() {
        return 0;
    }
}

module.export = Room;
