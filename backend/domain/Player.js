/**
 * Represents a player in a game of Mafia.
 * A player is part of a room, and they are tied to a socket that is connected to the server.
 * Players are identified by a unique nickname within their room.
 */
class Player {
    constructor(socketID, roomID, nickname, role, isHost) {
        this.socketID = socketID;
        this.roomID = roomID;
        this.nickname = nickname;
        this.role = role;
        this.isAlive = true;
        this.isHost = isHost;
    }

    /**
     * Resets the state of a player by bringing them back to life with a 'null' role.
     */
    resetPlayer() {
        this.role = null;
        this.isAlive = true;
    }
}

module.exports = Player;
