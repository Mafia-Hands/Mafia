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
        sockets.forEach((socket) => {
            socket.disconnect(true);
        });

        done();
    });

    // Close the server once all tests are done
    afterAll(() => {
        roomElements.socketIOServer.close();
    });

    test('start-day successful call, no player on trial', (done) => {
        // Registering mock event handlers that would respond to emits emitted by the backend
        clientSocket.on('day-start', (dayStartDTO) => {
            expect(dayStartDTO.timeToVote).toBe(config.day_total_vote_time_in_milliseconds);
        });
        clientSocket.on('discussion-end', (discussionEndDTO) => {
            expect(discussionEndDTO.playerOnTrial).toBeNull();
            done();
        });

        // Imitate the start of a day discussion
        clientSocket.emit('start-day');
    });

    test('start-day successful call, someone is put on trial', (done) => {
        const mafiaPlayer = new Player(null, null, 'a', roles.MAFIA, true);
        const civilianPlayer = new Player(null, null, 'b', roles.CIVILIAN, true);

        MafiaGameMock.addPlayer(mafiaPlayer, roomElements.roomID);
        MafiaGameMock.addPlayer(civilianPlayer, roomElements.roomID);

        MafiaGameMock.addDayVote(mafiaPlayer, civilianPlayer, roomElements.roomID); // Mafia votes for civilian

        // Registering mock event handlers that would respond to emits emitted by the backend
        clientSocket.on('day-start', (dayStartDTO) => {
            expect(dayStartDTO.timeToVote).toBe(config.day_total_vote_time_in_milliseconds);
        });
        clientSocket.on('discussion-end', (discussionEndDTO) => {
            expect(discussionEndDTO.playerOnTrial).toBe('b');
            done();
        });

        // Imitate the start of a day discussion
        clientSocket.emit('start-day');
    });
});
