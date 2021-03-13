const { createServer } = require("http");
const { Server } = require("socket.io");
const Client = require("socket.io-client");
const MafiaGame = require("../domain/MafiaGame");
const Player = require("../domain/Player");
const CreateLobbyDTO = require("../DTO/request/CreateLobbyDTO");
const server = require("../index")

describe("Socket.IO Event Tests", () => {
    let serverIO, serverSocket, clientSocket;

    beforeAll((done) => {
        // server.start();
        // const httpServer = createServer();
        // io = new Server(httpServer);
        // httpServer.listen(() => {
        //     const port = 4001;
        //     io.on("connection", (socket) => {
            //         serverSocket = socket;
            //     });
            //     clientSocket.on("connect", done);
            // });
        // serverSocket = server;
        // serverIO = io;
        clientSocket = new Client(`http://localhost:4001`);
        done();
    });

    afterAll((done) => {
        // clientSocket.close();
        server.close(done);
        // clientSocket.
        // serverSocket.close();
        // serverSocket.destroy();
        
    });

    test("Create-lobby event", (done) => {
        done();
        // let createLobbyDTO = new CreateLobbyDTO("Anmol");
        
        // clientSocket.on("lobby-code", (lobbyCodeDTOString) => {
        //     let lobbyCodeDTO = JSON.parse(lobbyCodeDTOString)
        //     expect(lobbyCodeDTO.code).toBeDefined();
        //     done();
        // });

        // // Request to create a new lobby
        // clientSocket.emit("create-lobby", JSON.stringify(createLobbyDTO));
    });
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