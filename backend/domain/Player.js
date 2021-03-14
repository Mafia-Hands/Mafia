class Player {
    constructor(socketID, roomID, nickname, role, isHost) {
        this.socketID = socketID;
        this.roomID = roomID;
        this.nickname = nickname;
        this.role = role;
        this.isAlive = true;
        this.isHost = isHost;
    }

    getRoomID() {
        return this.roomID;
    }

    getNickname() {
        return this.nickname;
    }

    getRole() {
        return this.role;
    }

    getIsAlive() {
        return this.isAlive;
    }

    setIsAlive(isAlive) {
        this.isAlive = isAlive;
    }
}

module.exports = Player;
