const Client = require('socket.io-client');
const SocketIOServer = require('../../index');
const config = require('../../config.json');
const Player = require('../../domain/Player');
const roles = require('../../domain/Enum/Role');
const CreateLobbyDTO = require('../../domain/DTO/request/CreateLobbyDTO');
const JoinLobbyDTO = require('../../domain/DTO/request/JoinLobbyDTO');

describe('game-start integration tests', () => {
    const port = process.env.PORT || config.local_port;

    // Create a new client, and connect it to the server via a socket
    let clientSockets = [];
    let lobbyCode = [];
    beforeEach((done) => {
        // Create 6 clients to mock game every state
        clientSockets[0] = new Client(`http://localhost:` + port);
        // Create host first
        clientSockets[0].on('connect', () => {
            clientSockets[0].emit('create-lobby', new CreateLobbyDTO('Leon'));
            clientSockets[0].on('lobby-code', (createLobbyDTO) => {
                lobbyCode = createLobbyDTO.code;
            });
        });
    });

    // Disconnect each socket connected to the server
    afterEach((done) => {
        const sockets = SocketIOServer.io.sockets.sockets;
        sockets.forEach(function (socket, key) {
            socket.disconnect(true);
        });
        done();
    });

    // Close the server once all tests are done
    afterAll(() => {
        SocketIOServer.server.close();
    });

    test('test night-end sent', (done) => {
        // Once lobby code recieved, create other players and join lobby
        let socketResponseCount = 0;

        for (let i = 1; i < 6; i++) {
            clientSockets[i] = new Client(`http://localhost:` + port);
            clientSockets[i].on('connect', () => {
                clientSockets[i].emit('join-lobby', new JoinLobbyDTO('Leon' + i.toString(), lobbyCode));
            });
            clientSockets[i].once('lobby-join', () => {
                socketResponseCount++;
                if (socketResponseCount >= 5) {
                    // Only end setup once all responses received
                    clientSockets[0].emit('start-game');
                    clientSockets[0].on('game-start', () => {
                        clientSockets[0].emit('night-start');
                        socketResponseCount = 0;
                        for (let j = 0; j < clientSockets.length; j++) {}
                    });
                }
            });
        }

        let socketResponseCount = 0;
        for (let i = 0; i < clientSockets.length; i++) {
            clientSockets[i].once('game-start', (gameStartDTO) => {
                expect(gameStartDTO.role).toBeDefined();
                socketResponseCount++;
                // Only end test if all 6 responses are received
                if (socketResponseCount >= 6) {
                    done();
                }
            });
        }
    });
});
