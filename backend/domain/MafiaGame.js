const Room = require("./Room");
class MafiaGame {
    constructor() {
        // Acts  as a mapping for gameID keys to their gameroom.
        this.gameRoomsDict = {};
    }

    newGame() {
        let newRoom = new Room();
        let roomID = newRoom.getRoomID();
        this.gameRoomsDict[roomID] = newRoom;
        return roomID;
    }

    closeGame(gameID) {
        delete gameRoomsDict[gameID];
    }

}

module.exports = MafiaGame;