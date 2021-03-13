class MafiaGame {
  constructor() {
    // Acts  as a mapping for gameID keys to their gameroom.
    const gameRoomsDict = {};
  }

  newGame() {
    let newRoom = new Room();
    let gameID = newRoom.getRoomName();
    gameRoomsDict[gameID] = newRoom;
  }

  closeGame(gameID) {
    delete gameRoomsDict[gameID];
  }
}

module.export = MafiaGame;
