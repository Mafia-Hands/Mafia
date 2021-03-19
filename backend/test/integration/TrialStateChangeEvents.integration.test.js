const Client = require('socket.io-client');
const SocketIOServer = require('../../index');
const config = require('../../config.json');
const CreateLobbyDTO = require('../../domain/DTO/request/CreateLobbyDTO');
const JoinLobbyDTO = require('../../domain/DTO/request/JoinLobbyDTO');

describe('TrialStateChangeEvents integration tests', () => {
    const port = process.env.PORT || config.local_port;

    let clientSockets = [];
    let lobbyCode = null;

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

    test('integration test start-trial 6 players', async (done) => {
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
                clientSockets[0].emit('start-game');
                clientSockets[0].on('game-start', () => {
                    resolve();
                });
            });
        }

        // Start the trial
        async function startTrial() {
            return new Promise((resolve) => {
                let socketResponseCount = 0;
                // Start the trial when response retrieved
                clientSockets[0].emit('start-trial');
                // Attach handlers to trial-start and trial-end. In total should be 12 responses
                for (let i = 0; i < 6; i++) {
                    clientSockets[i].once('trial-start', (trialStartDTO) => {
                        expect(trialStartDTO.timeToVote).toBeDefined();
                        socketResponseCount++;
                        if (socketResponseCount >= 12) {
                            resolve();
                        }
                    });
                    clientSockets[i].once('trial-end', (trialEndDTO) => {
                        // Player killed should be null, as no one voted
                        expect(trialEndDTO.playerKilled).toBeNull();
                        socketResponseCount++;
                        if (socketResponseCount >= 12) {
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
        await startTrial();

        done();
    });

    test('integration test trial-start 1 player', async (done) => {
        // Single player should immediately win as only player left
        // May be invalid in the future if we decide to enforce starts with more than 3 players

        // Start the game
        async function startGame() {
            return new Promise((resolve) => {
                // Start the game
                clientSockets[0].emit('start-game');
                clientSockets[0].on('game-start', () => {
                    resolve();
                });
            });
        }

        // Start the trial
        async function startTrial() {
            return new Promise((resolve) => {
                // Start the trial when response retrieved
                clientSockets[0].emit('start-trial');
                // Attach handlers to trial-start and trial-end. In total should be 12 responses
                clientSockets[0].once('trial-start', (trialStartDTO) => {
                    expect(trialStartDTO.timeToVote).toBeDefined();
                });
                clientSockets[0].once('trial-end', (trialEndDTO) => {
                    // Player killed should be null, as no one voted
                    expect(trialEndDTO.playerKilled).toBeNull();
                });
                clientSockets[0].once('game-over', (gameOverDTO) => {
                    // Player killed should be null, as no one voted
                    expect(gameOverDTO.winningRole).toBeDefined();
                    expect(gameOverDTO.winners).toBeDefined();
                    resolve();
                });
            });
        }

        await startGame();
        await startTrial();

        done();
    });
});
