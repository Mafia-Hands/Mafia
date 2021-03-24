class Player {
    constructor(socketID, roomID, nickname, role, isHost) {
        this.socketID = socketID;
        this.roomID = roomID;
        this.nickname = nickname;
        this.role = role;
        this.isAlive = true;
        this.isHost = isHost;
    }

    resetPlayer() {
        this.role = null;
        this.isAlive = true;
    }
}

module.exports = Player;
