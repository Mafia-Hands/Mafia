const Client = require("socket.io-client");
const CreateLobbyDTO = require("../domain/DTO/request/CreateLobbyDTO");
const server = require("../index")

describe("Create-lobby event test", () => {
    let clientSocket;

    beforeAll((done) => {
        clientSocket = new Client(`http://localhost:4001`);
        done();
    });

    afterAll((done) => {
        server.close(done);
    });

    test("Simple Create-lobby event", (done) => {
        let createLobbyDTO = new CreateLobbyDTO("Anmol");
        
        // Subscribe to lobby-code
        clientSocket.on("lobby-code", (lobbyCodeDTOString) => {
            let lobbyCodeDTO = JSON.parse(lobbyCodeDTOString)
            expect(lobbyCodeDTO.code).toBeDefined();
            done();
        });

        // Request to create a new lobby
        clientSocket.emit("create-lobby", JSON.stringify(createLobbyDTO));
    });

    test("Two hosts with two rooms", (done) => {
        let createLobbyDTO = new CreateLobbyDTO("Anmol");
        
        // Client 1 to subscribe to lobby-code
        clientSocket.on("lobby-code", (lobbyCodeDTOString) => {
            let lobbyCodeDTO = JSON.parse(lobbyCodeDTOString)
            expect(lobbyCodeDTO.code).toBeDefined();
            // Wait for the other client to throw errors, if there are any.
            setTimeout(function() { done(); }, 1000);
        });

        let clientSocket2 = new Client(`http://localhost:4001`);
        // Client 2 to subscribe to lobby-code
        clientSocket2.onAny("lobby-code", (lobbyCodeDTOString) => {
            throw new Error("Client 2 shouldn't receive a lobby code");
        });

        // Request to create a new lobby
        clientSocket.emit("create-lobby", JSON.stringify(createLobbyDTO));
    });
});