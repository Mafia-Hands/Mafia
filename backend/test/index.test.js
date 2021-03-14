const Client = require("socket.io-client");
const CreateLobbyDTO = require("../domain/DTO/request/CreateLobbyDTO");
const config = require("../config.json");
const SocketIOServer = require("../index");


describe("Create-lobby event test", () => {
  let clientSocket;
  const port = process.env.PORT || config.local_port;

  beforeEach((done) => {
    clientSocket = new Client(`http://localhost:` + port);
    clientSocket.on("connect", done);
  });

  // Disconnect each socket connected to the server
  afterEach((done) => {
    var sockets = SocketIOServer.io.sockets.sockets;

    // Iterate through each connected client and disconnect them.
    sockets.forEach(function (socket, key) {
      socket.disconnect(true);
    });

    done();
  });

  // Close the server once all tests are done
  afterAll(() => {
    SocketIOServer.server.close();
  });

  test("Simple create lobby events", (done) => {
    let createLobbyDTO = new CreateLobbyDTO("Anmol");

    // Subscribe to lobby-code
    clientSocket.on("lobby-code", (lobbyCodeDTO) => {
      expect(lobbyCodeDTO.code).toBeDefined();
      done();
    });

    // Request to create a new lobby
    clientSocket.emit("create-lobby", createLobbyDTO);
  });


  test("Two hosts with two rooms", (done) => {
    let createLobbyDTO = new CreateLobbyDTO("Anmol");

    // Client 1 to subscribe to lobby-code
    clientSocket.on("lobby-code", (lobbyCodeDTO) => {
      expect(lobbyCodeDTO.code).toBeDefined();
      // Wait for the other client to throw errors, if there are any.
      setTimeout(function () {
        done();
      }, 1000);
    });

    let clientSocket2 = new Client(`http://localhost:4001`);
    // Client 2 to subscribe to lobby-code
    clientSocket2.on("lobby-code", (lobbyCodeDTOString) => {
      throw new Error("Client 2 shouldn't receive a lobby code");
    });

    // Request to create a new lobby
    clientSocket.emit("create-lobby", createLobbyDTO);
  });


  test("should start game event", (done) => {

    let createLobbyDTO = new CreateLobbyDTO("Anmol");

    // Request to create a new lobby
    // this will set the socket id to the host to be tested.
    clientSocket.emit("create-lobby", createLobbyDTO);
    
    // Subscribe to game start event
    // server should send this event back once host clicks start.
    // Client to subscribe to "game-start"
    clientSocket.on("game-start", () => {
        done();
      });

    // Request to server that game is ready to be started.
    clientSocket.emit("start-game");
  });



  test("host starts game event", (done) => {

    let createLobbyDTO = new CreateLobbyDTO("Anmol");

    // Request to create a new lobby
    // this will set the socket id to the host to be tested.
    clientSocket.emit("create-lobby", createLobbyDTO);

    // Host client should subscribe to confirm-game-start - this is the host client.
    clientSocket.on("confirm-game-start", () => {
        // Host should receive a different event than the client
        done();
    });

    // todo: doesnt work until justin pushes his code in.
    // // Or Client should recieve a to game-ready - this is the non-host client.
    // clientSocket.on("game-ready", () => {
    //     // Host should receive a different event than the client
    //     done();
    // });

    // Request to server that lobby is full.
    clientSocket.emit("lobby-ready", createLobbyDTO);
  });


});
