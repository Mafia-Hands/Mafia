const SocketIOServer = require('../../index');
const config = require('../../config.json');
const { connectAndCreateLobby, startGame, connectAndJoin, startGameOnePlayer } = require('./IntegrationTestHelpers');

const port = process.env.PORT || config.local_port;
let clientSockets = [];
let lobbyCode = null;

// Create a new client, and connect it to the server via a socket
beforeEach(async (done) => {
    // Setting lobby code field
    lobbyCode = await connectAndCreateLobby(clientSockets, port);
    done();
});

// Disconnect each socket connected to the server
afterEach((done) => {
    const { sockets } = SocketIOServer.io.sockets;
    sockets.forEach((socket) => {
        socket.disconnect(true);
    });
    clientSockets = [];
    done();
});

// Close the server once all tests are done
afterAll(() => {
    SocketIOServer.server.close();
});

/** -----------------TESTS------------------*/
describe('NightStateChangeEvents integration tests', () => {
    test('integration test start-night 6 players', async (done) => {
        // Start the night
        async function startNight() {
            return new Promise((resolve) => {
                let socketResponseCount = 0;
                // Start the night when response retrieved
                clientSockets[0].emit('start-night');
                // Attach handlers to night-start and night-end. In total should be 12 responses
                for (let i = 0; i < 6; i += 1) {
                    clientSockets[i].once('night-start', (nightStartDTO) => {
                        expect(nightStartDTO.timeToVote).toBeDefined();
                        socketResponseCount += 1;
                        if (socketResponseCount >= 12) {
                            resolve();
                        }
                    });
                    clientSockets[i].once('night-end', (nightEndDTO) => {
                        // Player killed should be null, as no one voted
                        expect(nightEndDTO.playerKilled).toBeNull();
                        socketResponseCount += 1;
                        if (socketResponseCount >= 12) {
                            resolve();
                        }
                    });
                }
            });
        }

        for (let i = 1; i < 6; i += 1) {
            await connectAndJoin(clientSockets, i, port, lobbyCode);
        }
        await startGame(clientSockets);
        await startNight();

        done();
    });

    test('integration test night-start 1 player', async (done) => {
        // Single player should immediately win as only player left
        // May be invalid in the future if we decide to enforce starts with more than 3 players

        // Start the night
        async function startNight() {
            return new Promise((resolve) => {
                // Start the night when response retrieved
                clientSockets[0].emit('start-night');
                // Attach handlers to night-start and night-end. In total should be 12 responses
                clientSockets[0].once('night-start', (nightStartDTO) => {
                    expect(nightStartDTO.timeToVote).toBeDefined();
                });
                clientSockets[0].once('night-end', (nightEndDTO) => {
                    // Player killed should be null, as no one voted
                    expect(nightEndDTO.playerKilled).toBeNull();
                });
                clientSockets[0].once('game-over', (gameOverDTO) => {
                    // Player killed should be null, as no one voted
                    expect(gameOverDTO.winningRole).toBeDefined();
                    expect(gameOverDTO.winners).toBeDefined();
                    resolve();
                });
            });
        }

        await startGameOnePlayer(clientSockets);
        await startNight();

        done();
    });
});

describe('DayStateEvents integration tests', () => {
    test('integration test start-day 6 players', async (done) => {
        // Start the day
        async function startDay() {
            return new Promise((resolve) => {
                let socketResponseCount = 0;
                // Start the day when response retrieved
                clientSockets[0].emit('start-day');
                // Attach handlers to day-start and discussion-end. In total should be 12 responses
                for (let i = 0; i < 6; i += 1) {
                    clientSockets[i].once('day-start', (dayStartDTO) => {
                        expect(dayStartDTO.timeToVote).toBeDefined();
                        socketResponseCount += 1;
                        if (socketResponseCount >= 12) {
                            resolve();
                        }
                    });
                    clientSockets[i].once('discussion-end', (discussionEndDTO) => {
                        // Player chosen should be null, as no one voted
                        expect(discussionEndDTO.playerOnTrial).toBeNull();
                        socketResponseCount += 1;
                        if (socketResponseCount >= 12) {
                            resolve();
                        }
                    });
                }
            });
        }

        for (let i = 1; i < 6; i += 1) {
            await connectAndJoin(clientSockets, i, port, lobbyCode);
        }
        await startGame(clientSockets);
        await startDay();

        done();
    });
});

describe('TrialStateChangeEvents integration tests', () => {
    test('integration test start-trial 6 players', async (done) => {
        // Start the trial
        async function startTrial() {
            return new Promise((resolve) => {
                let socketResponseCount = 0;
                // Start the trial when response retrieved
                clientSockets[0].emit('start-trial');
                // Attach handlers to trial-start and trial-end. In total should be 12 responses
                for (let i = 0; i < 6; i += 1) {
                    clientSockets[i].once('trial-start', (trialStartDTO) => {
                        expect(trialStartDTO.timeToVote).toBeDefined();
                        socketResponseCount += 1;
                        if (socketResponseCount >= 12) {
                            resolve();
                        }
                    });
                    clientSockets[i].once('trial-end', (trialEndDTO) => {
                        // Player killed should be null, as no one voted
                        expect(trialEndDTO.playerKilled).toBeDefined();
                        socketResponseCount += 1;
                        if (socketResponseCount >= 12) {
                            resolve();
                        }
                    });
                }
            });
        }

        for (let i = 1; i < 6; i += 1) {
            await connectAndJoin(clientSockets, i, port, lobbyCode);
        }
        await startGame(clientSockets);
        await startTrial();

        done();
    });

    test('integration test trial-start 1 player', async (done) => {
        // Single player should immediately win as only player left
        // May be invalid in the future if we decide to enforce starts with more than 3 players

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
                    expect(trialEndDTO.playerKilled).toBeDefined();
                });
                clientSockets[0].once('game-over', (gameOverDTO) => {
                    // Player killed should be null, as no one voted
                    expect(gameOverDTO.winningRole).toBeDefined();
                    expect(gameOverDTO.winners).toBeDefined();
                    resolve();
                });
            });
        }

        await startGameOnePlayer(clientSockets);
        await startTrial();

        done();
    });
});
