const config = require("../../config.json");
const NightStateChangeEvents = require("../../Events/GameStateEvents/NightStateChangeEvents");
const MafiaGame = require("../../domain/MafiaGame");
const Room = require("../../domain/Room");
const Player = require("../../domain/Player");

const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: config.cors_origin,
  },
});

module.exports.initialiseServerMock = function (port, roomID) {
  const mafiaGame = new MafiaGame();
  mafiaGame.newGame();
  mafiaGame.gameRoomsDict[roomID] = new Room();

  io.on("connection", (socket) => {
    NightStateChangeEvents.eventHandlersRegistration(io, socket, mafiaGame);
    socket.player = new Player(socket.id, roomID, "", "");
    socket.join(roomID);
  });

  let socketIOServer;
  beforeAll((done) => {
    socketIOServer = server.listen(port, () => {
      done();
    });
  });

  return { io: io, mafiaGame: mafiaGame, socketIOServer: server };
};
