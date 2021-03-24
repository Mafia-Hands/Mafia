const Room = require('./Room');

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
    createNewRoom() {
        let room;
        while (!room) {
            room = new Room();
            // Create a new room if a room that has the same ID already exist
            if (this.gameRoomsDict[room.roomID] !== undefined) {
                // Room already exists, create the room again using the loop
                room = null;
            }
        }
        return room;
    }

    resetGame(roomID) {
        this.gameRoomsDict[roomID].resetGame();
    }
}

module.exports = MafiaGame;
