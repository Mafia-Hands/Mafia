const Client = require('socket.io-client');
const MafiaGameMock = require('./mocks/MafiaGameMock');
const config = require('../config.json');
const Player = require('../domain/Player');
const roles = require('../domain/Enum/Role');

describe('start-night unit tests', () => {
    const port = process.env.PORT || config.local_port;

    roomElements = MafiaGameMock.createMafiaGameWithOnePlayerMock(port);

    // Create a new client, and connect it to the server via a socket
    let clientSocket;
    beforeEach((done) => {
        clientSocket = new Client(`http://localhost:` + port);
        clientSocket.on('connect', done);

        jest.useFakeTimers();
    });

    // Disconnect each socket connected to the server
    afterEach((done) => {
        const sockets = roomElements.io.sockets.sockets;
        sockets.forEach(function (socket, key) {
            socket.disconnect(true);
        });

        done();
    });

    // Close the server once all tests are done
    afterAll(() => {
        roomElements.socketIOServer.close();
    });

    test('start-night successful call, no one is killed', (done) => {
        clientSocket.on('night-start', (nightStartDTO) => {
            expect(nightStartDTO.timeToVote).toBeDefined();
        });

        clientSocket.on('night-end', (nightEndDTO) => {
            expect(nightEndDTO.playerKilled).toBeNull();
            done();
        });

        clientSocket.emit('start-night');
    });

    test('start-night successful call, someone is killed', (done) => {
        MafiaGameMock.addMafiaVote(
            new Player(null, null, 'a', roles.MAFIA, true),
            new Player(null, null, 'b', roles.CIVILIAN, false),
            roomElements.roomID
        );

        clientSocket.on('night-start', (nightStartDTO) => {
            expect(nightStartDTO.timeToVote).toBeDefined();
        });

        clientSocket.on('night-end', (nightEndDTO) => {
            expect(nightEndDTO.playerKilled).toBeDefined();
            done();
        });

        clientSocket.emit('start-night');
    });
});
