const Player = require("../domain/Player");
const LobbyCodeDTO = require("../domain/DTO/response/LobbyCodeDTO");
const MafiaGame = require("../domain/MafiaGame");
const Room = require("../domain/Room");

describe("Domain Model tests", () => {
  test("test room domain max model object", (done) => {
    let player1 = new Player("00001", "room1", "nickname1");
    let player2 = new Player("00002", "room1", "nickname2");
    let player3 = new Player("00003", "room1", "nickname3");
    let player4 = new Player("00004", "room1", "nickname4");
    let player5 = new Player("00005", "room1", "nickname5");
    let player6 = new Player("00006", "room1", "nickname6");

    let room = new Room();

    room.addPlayer(player1);
    room.addPlayer(player2);
    room.addPlayer(player3);
    room.addPlayer(player4);
    room.addPlayer(player5);
    room.addPlayer(player6);

    if (room.players.length === 6) {
      done();
    }
  });

  test("test room domain model 1 object", (done) => {
    let player1 = new Player("00001", "room1", "nickname1");

    let room = new Room();

    room.addPlayer(player1);

    if (room.players.length === 1) {
      done();
    }
  });
});
