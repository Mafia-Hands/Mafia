const { createServer } = require("http");
const { Server } = require("socket.io");
const Client = require("socket.io-client");
const MafiaGame = require("../domain/MafiaGame");
const Player = require("../domain/Player");

describe("my awesome project", () => {
  let io, serverSocket, clientSocket;

  beforeAll((done) => {
    const httpServer = createServer();
    io = new Server(httpServer);
    httpServer.listen(() => {
      const port = httpServer.address().port;
      clientSocket = new Client(`http://localhost:${port}`);
      io.on("connection", (socket) => {
        serverSocket = socket;
      });
      clientSocket.on("connect", done);
    });
  });

  afterAll(() => {
    io.close();
    clientSocket.close();
  });

  /****************Create lobby functionality test***************** */
  test("create lobby functionality", (done) => {
    // emit name
    clientSocket.emit("create-lobby", "Anmol");
    //Create game and check if recieved and send
    createGameTest(io, serverSocket);
    // check if client recieved functionaity
    clientSocket.on("create-lobby", (roomID) => {
      console.log(roomID);
      expect(roomID).toBeDefined();
      done();
    });
  });
  /****************Create lobby functionality test***************** */
});
/**
 * This function takes a host name from the client side and sets up the mafia game with a room.
 * It then sends back the randomly generated roomID.
 * @param {*} io The the io server
 * @param {*} serverSocket The socket from the
 */
function createGameTest(io, serverSocket) {
  serverSocket.on("create-lobby", (nickname) => {
    expect(nickname).toBe("Anmol"); // check if nickname recieved
    // create game and assign first player to the room
    let mafiaGame = new MafiaGame();
    let roomID = mafiaGame.newGame();
    let host = new Player(serverSocket.id, roomID, nickname);
    mafiaGame.gameRoomsDict[roomID].addPlayer(host);
    // Join room
    serverSocket.join(roomID);
    //Send to all clients + sender with  room ID.
    io.in(roomID).emit("create-lobby", roomID);
  });
}
