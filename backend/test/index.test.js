const Client = require('socket.io-client');
const CreateLobbyDTO = require('../domain/DTO/request/CreateLobbyDTO');
const config = require('../config.json');
const SocketIOServer = require('../index');

describe('Create-lobby event test', () => {
    let clientSocket;
    const port = process.env.PORT || config.local_port;

    beforeEach((done) => {
        clientSocket = new Client(`http://localhost:` + port);
        clientSocket.on('connect', done);
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

    test('Simple create lobby events', (done) => {
        let createLobbyDTO = new CreateLobbyDTO('Anmol');

        // Subscribe to lobby-code
        clientSocket.on('lobby-code', (lobbyCodeDTO) => {
            expect(lobbyCodeDTO.code).toBeDefined();
            done();
        });

        // Request to create a new lobby
        clientSocket.emit('create-lobby', createLobbyDTO);
    });

    test('Two hosts with two rooms', (done) => {
        let createLobbyDTO = new CreateLobbyDTO('Anmol');

        // Client 1 to subscribe to lobby-code
        clientSocket.on('lobby-code', (lobbyCodeDTO) => {
            expect(lobbyCodeDTO.code).toBeDefined();
            // Wait for the other client to throw errors, if there are any.
            setTimeout(function () {
                done();
            }, 1000);
        });

        let clientSocket2 = new Client(`http://localhost:4001`);
        // Client 2 to subscribe to lobby-code
        clientSocket2.on('lobby-code', (lobbyCodeDTOString) => {
            throw new Error("Client 2 shouldn't receive a lobby code");
        });

        // Request to create a new lobby
        clientSocket.emit('create-lobby', createLobbyDTO);
    });

    test('Reset lobby', (done) => {
        let createLobbyDTO = new CreateLobbyDTO('Anmol');

        // Subscribe to lobby-code
        clientSocket.on('lobby-code', (lobbyCodeDTO) => {
            expect(lobbyCodeDTO.code).toBeDefined();
            // Only emit reset-lobby once lobby code has been received
            clientSocket.emit('reset-lobby');
        });

        // Finish test once reset-lobby-update has been received
        clientSocket.on('reset-lobby-update', () => {
            done();
        });

        // Request to create a new lobby
        clientSocket.emit('create-lobby', createLobbyDTO);
    });
});
