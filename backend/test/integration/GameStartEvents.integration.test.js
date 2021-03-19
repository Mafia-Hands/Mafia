const Client = require('socket.io-client');
const SocketIOServer = require('../../index');
const config = require('../../config.json');
const CreateLobbyDTO = require('../../domain/DTO/request/CreateLobbyDTO');
const JoinLobbyDTO = require('../../domain/DTO/request/JoinLobbyDTO');

describe('game-start integration tests', () => {
    const port = process.env.PORT || config.local_port;

    let clientSockets = [];

    // Create a new client, and connect it to the server via a socket
    beforeEach(async (done) => {
        // Host creates lobby
        async function connectAndCreateLobby() {
            return new Promise((resolve) => {
                clientSockets[0] = new Client(`http://localhost:` + port);
                clientSockets[0].on('connect', () => {
                    clientSockets[0].emit('create-lobby', new CreateLobbyDTO('Leon'));
                    clientSockets[0].on('lobby-code', (createLobbyDTO) => {
                        resolve(createLobbyDTO.code);
                    });
                });
            });
        }

        lobbyCode = await connectAndCreateLobby();
        done();
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

    test('tests roles distributed on game start', async (done) => {
        // Connect to lobby created in before each with 5 other players
        async function connectAndJoin(index) {
            return new Promise((resolve) => {
                clientSockets[index] = new Client(`http://localhost:` + port);
                clientSockets[index].on('connect', () => {
                    clientSockets[index].emit('join-lobby', new JoinLobbyDTO('Leon' + index.toString(), lobbyCode));
                    clientSockets[index].once('lobby-join', () => {
                        resolve();
                    });
                });
            });
        }

        // Start the game
        async function startGame() {
            return new Promise((resolve) => {
                // Start the game
                let socketResponseCount = 0;
                clientSockets[0].emit('start-game');
                for (let i = 0; i < clientSockets.length; i++) {
                    clientSockets[i].once('game-start', (gameStartDTO) => {
                        expect(gameStartDTO.role).toBeDefined();
                        socketResponseCount++;
                        // Only end test if all 6 responses are received
                        if (socketResponseCount >= 6) {
                            resolve();
                        }
                    });
                }
            });
        }

        for (let i = 1; i < 6; i++) {
            await connectAndJoin(i);
        }
        await startGame();

        done();
    });
});
