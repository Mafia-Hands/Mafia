const config = require('../../config.json');
const SocketIOServer = require('../../index');
const NightTimeVoteDTO = require('../../domain/DTO/request/NightTimeVoteDTO');
const RoleEnum = require('../../domain/Enum/Role');
const { connectAndCreateLobby, connectAndJoin, startGame } = require('./IntegrationTestHelpers');

describe('night time vote event tests', () => {
    let clientSockets = [];
    let lobbyCode;
    const port = process.env.PORT || config.local_port;

    beforeEach(async (done) => {
        lobbyCode = await connectAndCreateLobby(clientSockets, port);
        done();
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
    });
    /**
     * This is a integration test for night time voting events.
     * It goes through stariting a game to checking mafia vote
     *
     */
    test('Night time Vote events', async (done) => {
        let hostRole;

        for (let i = 1; i < 6; i++) {
            await connectAndJoin(clientSockets, i, port, lobbyCode);
        }
        hostRole = await startGame(clientSockets);
        await nightTimeVote(hostRole);
        done();
    });

    /**
     * This function votes for a player and checks if they are mafia
     * @returns A promise resolving on the suspect reveal
     */
    async function nightTimeVote(hostRole) {
        return new Promise((resolve) => {
            let isMafia = false;
            // check if host is mafia
            if (hostRole === RoleEnum.JESTER || hostRole === RoleEnum.MAFIA) {
                isMafia = true;
            }
            // check if receiving suspect reveal
            clientSockets[1].on('suspect-reveal', (suspectRevealDTO) => {
                expect(suspectRevealDTO.nickname).toBe('Leon');
                expect(suspectRevealDTO.isMafia).toBe(isMafia);
                resolve();
            });
            // check if leon is mafia or jester
            clientSockets[1].emit('detective-vote', new NightTimeVoteDTO('Leon'));
        });
    }
});
