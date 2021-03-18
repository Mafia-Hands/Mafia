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
    let beforeSocketResponseCount = 0;
    beforeEach((done) => {
        // Create 6 clients to mock game every state
        clientSockets[0] = new Client(`http://localhost:` + port);
        // Create host first
        clientSockets[0].on('connect', () => {
            clientSockets[0].emit('create-lobby', new CreateLobbyDTO('Leon'));
        });

        // Once lobby code recieved, create other players and join lobby
        clientSockets[0].on('lobby-code', (createLobbyDTO) => {
            let lobbyCode = createLobbyDTO.code;
            for (let i = 1; i < 6; i++) {
                clientSockets[i] = new Client(`http://localhost:` + port);
                clientSockets[i].on('connect', () => {
                    clientSockets[i].emit('join-lobby', new JoinLobbyDTO('Leon' + i.toString(), lobbyCode));
                });
                clientSockets[i].once('lobby-join', () => {
                    beforeSocketResponseCount++;
                    if (beforeSocketResponseCount >= 5) {
                        // Only end setup once all responses received
                        done();
                    }
                });
            }
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

    test('tests roles distributed on game start', (done) => {
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

        clientSockets[0].emit('start-game');
    });
});
