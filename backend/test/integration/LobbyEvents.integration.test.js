const config = require('../../config.json');
const SocketIOServer = require('../../index');
const { connectAndCreateLobby, connectAndJoin } = require('./IntegrationTestHelpers');

describe('lobby events tests', () => {
    const clientSockets = [];
    let lobbyCode;
    const port = process.env.PORT || config.local_port;

    beforeEach(async (done) => {
        // connect to lobby and create game
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
    // close server after all tests
    afterAll(() => {
        SocketIOServer.server.close();
    });
    /**
     * This is a integration test for all lobby events.
     * It encompases creating a game, Max players joining and reseting the game
     */
    test('full lobby events intergration test', async (done) => {
        // connect players to lobby
        for (let i; i < 6; i += 1) {
            await connectAndJoin(clientSockets, i, port, lobbyCode);
        }
        await resetLobby();
        done();
    });

    /**
     * This function tests the reset lobby function
     * @returns A promise that resloves after lobby is reset
     */
    async function resetLobby() {
        return new Promise((resolve) => {
            clientSockets[0].on('reset-lobby-update', () => {
                // eslint-disable-next-line no-console
                console.log('RESET LOBBY');
                resolve();
            });
            clientSockets[0].emit('reset-lobby');
        });
    }
});
