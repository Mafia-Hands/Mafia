const Client = require('socket.io-client');
const config = require('../../config.json');
const SocketIOServer = require('../../index');
const CreateLobbyDTO = require('../../domain/DTO/request/CreateLobbyDTO');
const JoinLobbyDTO = require('../../domain/DTO/request/JoinLobbyDTO');

describe('night time vote event tests', () => {
    let clientSockets;
    const port = process.env.PORT || config.local_port;
    beforeAll((done) => {
        // create 6 client servers to replicate 6 players
        clientSockets = [
            new Client(`http://localhost:${port}`), // Anmol
            new Client(`http://localhost:${port}`), // justin
            new Client(`http://localhost:${port}`), // Homer
            new Client(`http://localhost:${port}`), // James
            new Client(`http://localhost:${port}`), // Jen
            new Client(`http://localhost:${port}`), // Leon
        ];
        // connect all clients
        clientSockets.forEach((clientSocket) => {
            clientSocket.on('connect', done);
        });
    });

    // Disconnect each socket connected to the server
    afterEach((done) => {
        const { sockets } = SocketIOServer.io.sockets;
        sockets.forEach((socket, key) => {
            socket.disconnect(true);
        });
        done();
    });
    // close servers after all tests
    afterAll(() => {
        SocketIOServer.server.close();
        clientSockets.forEach((clientSocket) => {
            clientSocket.close();
        });
    });
});
