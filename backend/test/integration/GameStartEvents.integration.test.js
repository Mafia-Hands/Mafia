const SocketIOServer = require('../../index');
const config = require('../../config.json');
const { connectAndCreateLobby, startGame, connectAndJoin } = require('./IntegrationTestHelpers');

describe('GameStartEvents integration tests', () => {
    const port = process.env.PORT || config.local_port;

    const clientSockets = [];
    let lobbyCode = '';

    // Create a new client, and connect it to the server via socket.io
    beforeEach(async (done) => {
        lobbyCode = await connectAndCreateLobby(clientSockets, port);
        done();
    });

    // Disconnect each socket connected to the server
    afterEach((done) => {
        const { sockets } = SocketIOServer.io.sockets;
        sockets.forEach((socket) => {
            socket.disconnect(true);
        });
        done();
    });

    // Close the server once all tests are done
    afterAll(() => {
        SocketIOServer.server.close();
    });

    test('integration test start-game 6 players', async (done) => {
        /* eslint-disable no-await-in-loop */
        for (let i = 1; i < 6; i += 1) {
            await connectAndJoin(clientSockets, i, port, lobbyCode);
        }
        /* eslint-enable no-await-in-loop */
        await startGame(clientSockets);
        done();
    });
});
