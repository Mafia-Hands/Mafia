const config = require('../../config.json');
const SocketIOServer = require('../../index');
const NightTimeVoteDTO = require('../../domain/dto/request/NightTimeVoteDTO');
const RoleEnum = require('../../domain/enum/Role');
const { connectAndCreateLobby, connectAndJoin, startGame } = require('./IntegrationTestHelpers');

describe('night time vote event tests', () => {
    const clientSockets = [];
    let lobbyCode;
    const port = process.env.PORT || config.local_port;

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
    // close servers after all tests
    afterAll(() => {
        SocketIOServer.server.close();
    });
    /**
     * These are integration tests for night time voting events for a 6 and 7 person game.
     * It goes through stariting a game to checking mafia vote
     *
     */
    for (let playerCount = 6; playerCount <= 15; playerCount += 1) {
        test('Night time X Player Vote events', async (done) => {
            for (let i = 1; i < playerCount; i += 1) {
                await connectAndJoin(clientSockets, i, port, lobbyCode);
            }
            let { hostRole } = await startGame(clientSockets, playerCount);
            await nightTimeVote(hostRole);
            done();
        });
    }

    /**
     * This function votes for a player and checks if they are mafia
     * @returns A promise resolving on the suspect reveal
     */
    async function nightTimeVote(hostRole) {
        return new Promise((resolve) => {
            let isMafia = false;
            // check if host is mafia
            if (hostRole === RoleEnum.MAFIA) {
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
