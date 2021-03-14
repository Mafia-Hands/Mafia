class Player {
    constructor(socketID, roomID, nickname, role) {
        this.socketID = socketID;
        this.roomID = roomID;
        this.nickname = nickname;
        this.role = role;
        this.isAlive = true;
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

    resetPlayer() {
        this.role = null;
        this.setIsAlive(true);
    }
}

module.exports = Player;
