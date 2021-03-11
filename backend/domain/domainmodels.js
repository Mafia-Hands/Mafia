class Room {
    constructor() {

        this.roomName = this.setRoomName(); // some function to initialise a roomID

        // default values given.
        this.gamestate = GameStateEnum["Day Time"];

        this.maxPlayerCount = 6;

        this.players = new Array(maxPlayerCount);

        this.roundNumber = 0;

        this.getRoomName = function () {
            return this.roomName;
        };

        this.getGamestate = function () {
            return this.gamestate;
        };

        this.setGamestate = function (gamestate) {
            this.gamestate = gamestate;
        };

        this.getPlayers = function () {
            return this.players;
        };

        this.addPlayer = function (player) {
            if (player !== null &&
                this.getPlayers.length <= maxPlayerCount) {
                this.players.push(player);
            }
        };

        this.getRoundNumber = function () {
            return this.roundNumber;
        };

        this.incrementRoundNumber = function () {
            this.roundNumber++;
        };

        this.setRoomName = function () {
            return 0; //some function to initialise a roomID. Must discuss how to do this at a later date.
        };

    }
}

class Player {
    constructor(socketID, nickname, role) {

        this.socketID = socketID;
        this.nickname = nickname;
        this.role = role;
        this.isAlive = true;

        this.getName = function () {
            return this.name;
        };

        this.getNickname = function () {
            return this.nickname;
        };

        this.getRole = function () {
            return this.role;
        };

        this.getIsAlive = function () {
            return this.isAlive;
        };

        this.setIsAlive = function () {
            this.isAlive = !this.isAlive;
        };

    }
} 

class MafiaGame {
    constructor() {

        // Acts  as a mapping
        const dict = {};
        this.gameCount = 0;

        this.newGame = function () {
            incrementGameCoutner();
            newRoom = new Room();
            gameID = newRoom.getRoomName();
            dict[gameID] = newRoom;
        };

        this.closeGame = function (gameID) {
            decrementGameCoutner();
            delete dict[gameID];
        };

        this.incrementGameCoutner = function () {
            this.gameCount++;
        };

        this.decrementGameCoutner = function () {
            this.gameCount--;
        };
    }
}

// Enums for Roles and states.
// Can be developed into classes if functionality is required.  
const RoleEnum = {"Civilian":1, "Mafia":2, "Medic":3, "Detective":4}
Object.freeze(RoleEnum)

const GameStateEnum = {"Night Time":1, "Day Time":2, "Initial Vote":3, "Trial":4}
Object.freeze(GameStateEnum)