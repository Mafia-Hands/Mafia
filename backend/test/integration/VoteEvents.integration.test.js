const SocketIOServer = require('../../index');
const config = require('../../config.json');
const { connectAndCreateLobby, startGame, connectAndJoin } = require('./IntegrationTestHelpers');
const VoteForDTO = require('../../domain/DTO/request/VoteForDTO');

describe('day & trial vote integration tests', () => {
    const port = process.env.PORT || config.local_port;

    const clientSockets = [];
    let lobbyCode = '';

    // Create a new client, and connect it to the server via a socket
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

    test('day/trial vote test', async (done) => {
        // join to server
        for (let i = 1; i < 6; i += 1) {
            await connectAndJoin(clientSockets, i, port, lobbyCode);
        }
        // start game
        await startGame(clientSockets);

        // vote for players and check map is filled out appropriately
        const voteMap = { Leon: 'Leon1' };
        for (let i = 1; i < 5; i += 1) {
            voteMap[`Leon${i}`] = await voting(i);
            expect(voteMap[`Leon${i}`]).toBe(`Leon${i + 1}`);
        }
        done();
    });

    /**
     * This function is used to create votes for people and return the vote map
     * @param {*} clientSockets The client sockets
     * @param {*} index The index of player in the room
     * @returns The existing vote map
     */
    async function voting(index) {
        return new Promise((resolve) => {
            clientSockets[0].on('day-vote-update', (listVoteDTO) => {
                resolve(listVoteDTO.voteMap[`Leon${index}`]);
            });
            // send votes to server
            clientSockets[index].emit('day-vote', new VoteForDTO(`Leon${index + 1}`));
        });
    }
});
