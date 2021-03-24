const Client = require('socket.io-client');
const MafiaGameMock = require('../mocks/MafiaGameMock');
const config = require('../../config.json');
const Player = require('../../domain/Player');
const roles = require('../../domain/Enum/Role');

describe('start-day unit tests', () => {
    const port = process.env.PORT || config.local_port;
    const roomElements = MafiaGameMock.createMafiaGameWithOnePlayerMock(port);

    // Create a new client, and connect it to the server via a socket
    let clientSocket;
    beforeEach((done) => {
        clientSocket = new Client(`http://localhost:${port}`);
        clientSocket.on('connect', done);
    });

    // Disconnect each socket connected to the server
    afterEach((done) => {
        const { sockets } = roomElements.io.sockets;
        sockets.forEach((socket, key) => {
            socket.disconnect(true);
        });

        done();
    });

    // Close the server once all tests are done
    afterAll(() => {
        roomElements.socketIOServer.close();
    });

    test('start-day successful call, no player on trial', (done) => {
        clientSocket.on('day-start', (dayStartDTO) => {
            expect(dayStartDTO.timeToVote).toBe(config.day_total_vote_time_in_milliseconds);
        });

        clientSocket.on('discussion-end', (discussionEndDTO) => {
            expect(discussionEndDTO.playerOnTrial).toBeNull();
            done();
        });

        clientSocket.emit('start-day');
    });

    test('start-day successful call, someone is put on trial', (done) => {
        const playerA = new Player(null, null, 'a', roles.MAFIA, true);
        const playerB = new Player(null, null, 'b', roles.CIVILIAN, true);

        MafiaGameMock.addPlayer(playerA, roomElements.roomID);
        MafiaGameMock.addPlayer(playerB, roomElements.roomID);

        MafiaGameMock.addDayVote(playerA, playerB, roomElements.roomID);

        clientSocket.on('day-start', (dayStartDTO) => {
            expect(dayStartDTO.timeToVote).toBe(config.day_total_vote_time_in_milliseconds);
        });

        clientSocket.on('discussion-end', (discussionEndDTO) => {
            expect(discussionEndDTO.playerOnTrial).toBe('b');
            done();
        });

        clientSocket.emit('start-day');
    });
});
