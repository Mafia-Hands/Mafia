class Player {
    constructor(socketID, roomID, nickname) {
        this.socketID = socketID;
        this.roomID = roomID;
        this.nickname = nickname;
        this.role;
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
    setRole(role) {
        this.role = role;
    }

    getIsAlive() {
        return this.isAlive;
    }

    setIsAlive(isAlive) {
        this.isAlive = isAlive;
    }

}

module.exports = Player;