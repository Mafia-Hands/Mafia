const Client = require('socket.io-client');
const MafiaGameMock = require('../mocks/MafiaGameMock');
const config = require('../../config.json');
const Player = require('../../domain/Player');
const roles = require('../../domain/Enum/Role');

describe('trial-start unit tests', () => {
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

    test('trial-start successful call, abstain vote', (done) => {
        clientSocket.on('trial-start', (trialStartDTO) => {
            expect(trialStartDTO.timeToVote).toBe(config.trial_total_vote_time_in_milliseconds);
        });

        clientSocket.on('trial-end', (trialStartDTO) => {
            expect(trialStartDTO.playerKilled).toBe('abstain Vote');
            done();
        });

        clientSocket.emit('start-trial');
    });
});
