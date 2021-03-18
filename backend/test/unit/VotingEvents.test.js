const Client = require('socket.io-client');
const VoteForDTO = require('../../domain/DTO/request/VoteForDTO');
const config = require('../../config.json');
const MafiaGameMock = require('../mocks/MafiaGameMock');
const Player = require('../../domain/Player');
const RoleEnum = require('../../domain/Enum/Role');

let clientSocket;
const port = process.env.PORT || config.local_port;
const roomElements = MafiaGameMock.createMafiaGameWithOnePlayerMock(port);

beforeEach((done) => {
    clientSocket = new Client(`http://localhost:${port}`);
    clientSocket.on('connect', done);
});

// Disconnect each socket connected to the server
afterEach((done) => {
    const { sockets } = roomElements.io.sockets;

    // Iterate through each connected client and disconnect them.
    sockets.forEach((socket, key) => {
        socket.disconnect(true);
    });

    done();
});

// Close the server once all tests are done
afterAll(() => {
    roomElements.socketIOServer.close();
});

describe('voting-events tests', () => {
    beforeAll(() => {
        players = [
            new Player(null, roomElements.roomID, 'P0', RoleEnum.CIVILIAN, false),
            new Player(null, roomElements.roomID, 'P1', RoleEnum.CIVILIAN, true),
        ];
        MafiaGameMock.addPlayers(players, roomElements.roomID);
    });

    test('day vote test', (done) => {
        // Subscribe to day-vote-update
        clientSocket.on('day-vote-update', (listVoteDTO) => {
            // Justin vote for Justin because nickname of clientSocket is Justin since thats the last joined player
            expect(listVoteDTO).toEqual({ voteMap: { a: 'P1' } });
            done();
        });

        // vote test begins
        const voteForDTO = new VoteForDTO('P1');
        clientSocket.emit('day-vote', voteForDTO);
    });

    test('trial vote test', (done) => {
        // Subscribe to trial-vote-update
        clientSocket.on('trial-vote-update', (listVoteDTO) => {
            // Justin vote for Justin because nickname of clientSocket is Justin since thats the last joined player
            expect(listVoteDTO).toEqual({ voteMap: { a: 'P1' } });
            done();
        });

        // vote test begins
        const voteForDTO = new VoteForDTO('P1');
        clientSocket.emit('trial-vote', voteForDTO);
    });
});
