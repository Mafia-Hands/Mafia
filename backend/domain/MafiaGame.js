const Room = require('./Room');

/**
 * A "manager" class that keeps track of all the active rooms on the server.
 * Keeps track of all the rooms and identifies them by their unique lobby code.
 * Rooms can be accessed, reset, added, or deleted via this class.
 */
class MafiaGame {
    constructor() {
        // Acts as a mapping for roomID keys to their game room.
        this.gameRoomsDict = {};
    }

    /**
     * Create a new game by creating a new room
     * @returns roomID : String - The newly generated room.
     */
    newGame() {
        // Create a new room and add it to existing rooms
        const room = this.createNewRoom();
        this.gameRoomsDict[room.roomID] = room;
        return room.roomID;
    }

    /**
     * Close a game by deleting its room in memory
     * @param {number} roomID
     */
    closeGame(roomID) {
        delete this.gameRoomsDict[roomID];
    }

    /**
     * Create a new room with a unique ID
     * @returns A newly created room
     */
    /* eslint class-methods-use-this: ["error", { "exceptMethods": ["createNewRoom"] }] */
    createNewRoom() {
        return new Room();
    }

    resetGame(roomID) {
        this.gameRoomsDict[roomID].resetGame();
    }
}

module.exports = MafiaGame;
