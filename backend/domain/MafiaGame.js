class MafiaGame {
    constructor() {
        // Acts  as a mapping
        const dict = {};
        this.gameCount = 0;
    }

    newGame() {
        incrementGameCounter();
        let newRoom = new Room();
        let gameID = newRoom.getRoomName();
        dict[gameID] = newRoom;
    }

    closeGame(gameID) {
        decrementGameCounter();
        delete dict[gameID];
    }

    incrementGameCounter() {
        this.gameCount++;
    }

    decrementGameCounter() {
        this.gameCount--;
    }

}