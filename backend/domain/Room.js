const GameStateEnum = require("./Enum/GameState");
class Room {
  constructor(gameRoomsDict) {
    // function to initialise a roomID
    this.roomID = this.setRoomID(gameRoomsDict);

    // default values given.
    this.gamestate = GameStateEnum.DAYTIME;
    this.maxPlayerCount = 6;
    this.players = [];
    this.roundNumber = 0;
  }

  getRoomID() {
    return this.roomID;
  }

  getGamestate() {
    return this.gamestate;
  }

  setGamestate(gamestate) {
    this.gamestate = gamestate;
  }

  getPlayers() {
    return this.players;
  }

  addPlayer(player) {
    if (player !== null && this.players.length <= this.maxPlayerCount) {
      this.players.push(player);
    }
  }

  getRoundNumber() {
    return this.roundNumber;
  }

  incrementRoundNumber() {
    this.roundNumber++;
  }
  // Generates random room name with 6 characters

  setRoomID(gameRoomsDict) {
    // check return if room code not existing
    let code;
    while (!code) {
      code = Math.random().toString(36).substring(7);
      if (gameRoomsDict[code] == undefined) {
        return code;
      }
    }
  }
}

module.exports = Room;
