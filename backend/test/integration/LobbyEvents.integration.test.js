const config = require('../../config.json');
const SocketIOServer = require('../../index');
const { connectAndCreateLobby, connectAndJoin, getRoles, checkRoles } = require('./IntegrationTestHelpers');

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
     * These are the integration tests for all lobby events.
     * They encompass creating a game, Max players joining and reseting the game
     */

    for (let playerCount = 6; playerCount <= 15; playerCount += 1) {
        test('X person lobby events intergration test', async (done) => {
            // connect players to lobby
            for (let i = 1; i <= playerCount - 1; i += 1) {
                await connectAndJoin(clientSockets, i, port, lobbyCode);
            }
            await resetLobby();
            done();
        });
    }

    test('Min person lobby start game roles', async (done) => {
        const roles = await getRoles(6, clientSockets, port, lobbyCode);

        expect(roles.total).toBe(6);

        checkRoles({
            roles,
            expectedMafiaCount: 1,
            expectedDetectivesCount: 1,
            expectedMedicsCount: 1,
            expectedJesterCount: 1,
            expectedCiviliansCount: 2,
        });

        await resetLobby();
        done();
    });

    test('7 person lobby start game roles', async (done) => {
        const roles = await getRoles(7, clientSockets, port, lobbyCode);

        expect(roles.total).toBe(7);

        checkRoles({
            roles,
            expectedMafiaCount: 2,
            expectedDetectivesCount: 1,
            expectedMedicsCount: 1,
            expectedJesterCount: 1,
            expectedCiviliansCount: 2,
        });

        await resetLobby();
        done();
    });

    test('10 person lobby start game roles', async (done) => {
        const roles = await getRoles(10, clientSockets, port, lobbyCode);

        expect(roles.total).toBe(10);

        checkRoles({
            roles,
            expectedMafiaCount: 2,
            expectedDetectivesCount: 1,
            expectedMedicsCount: 1,
            expectedJesterCount: 1,
            expectedCiviliansCount: 5,
        });

        await resetLobby();
        done();
    });

    test('11 person lobby start game roles', async (done) => {
        const roles = await getRoles(11, clientSockets, port, lobbyCode);

        expect(roles.total).toBe(11);

        checkRoles({
            roles,
            expectedMafiaCount: 2,
            expectedDetectivesCount: 2,
            expectedMedicsCount: 2,
            expectedJesterCount: 1,
            expectedCiviliansCount: 4,
        });

        await resetLobby();
        done();
    });

    test('14 person lobby start game roles', async (done) => {
        const roles = await getRoles(14, clientSockets, port, lobbyCode);

        expect(roles.total).toBe(14);

        checkRoles({
            roles,
            expectedMafiaCount: 2,
            expectedDetectivesCount: 2,
            expectedMedicsCount: 2,
            expectedJesterCount: 1,
            expectedCiviliansCount: 7,
        });

        await resetLobby();
        done();
    });

    test('Max person lobby start game roles', async (done) => {
        const roles = await getRoles(15, clientSockets, port, lobbyCode);

        expect(roles.total).toBe(15);

        checkRoles({
            roles,
            expectedMafiaCount: 2,
            expectedDetectivesCount: 2,
            expectedMedicsCount: 2,
            expectedJesterCount: 2,
            expectedCiviliansCount: 7,
        });

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
