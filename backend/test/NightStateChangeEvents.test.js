const Client = require("socket.io-client");
const ServerMock = require("./mocks/ServerMock");

describe("start-night unit tests", () => {
  const uniqueSocketPort = 6000;

  serverMockArguments = ServerMock.initialiseServerMock(uniqueSocketPort, "THX_DANIEL_FOR_PAIR_PROGRAMMING");

  jest.useFakeTimers();

  // Create a new client, and connect it to the server via a socket
  let clientSocket;
  beforeEach((done) => {
    clientSocket = new Client(`http://localhost:` + uniqueSocketPort);
    clientSocket.on("connect", done);
  });

  // Disconnect each socket connected to the server
  afterEach((done) => {
    const sockets = serverMockArguments.io.sockets.sockets;
    sockets.forEach(function (socket, key) {
      socket.disconnect(true);
    });

    done();
  });

  // Close the server once all tests are done
  afterAll(() => {
    serverMockArguments.socketIOServer.close();
  });

  test("start-night successful call", (done) => {
    clientSocket.on("night-start", (nightStartDTO) => {
      expect(nightStartDTO.timeToVote).toBeDefined();
    });

    clientSocket.on("night-end", (nightEndDTO) => {
      expect(nightEndDTO.playerKilled).toBeDefined();
      done();
    });

    clientSocket.emit("start-night");
  });
});
