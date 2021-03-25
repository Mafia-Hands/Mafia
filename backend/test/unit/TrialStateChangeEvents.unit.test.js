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
        sockets.forEach((socket) => {
            socket.disconnect(true);
        });

        MafiaGameMock.resetRoom(roomElements.roomID);

        done();
    });

    // Close the server once all tests are done
    afterAll(() => {
        roomElements.socketIOServer.close();
    });

    test('trial-start successful call, no votes, winning condition is not fulfilled', (done) => {
        const playerA = new Player(null, null, 'a', roles.MAFIA, true);
        const playerB = new Player(null, null, 'b', roles.JESTER, true);
        const playerC = new Player(null, null, 'c', roles.CIVILIAN, true);

        MafiaGameMock.addPlayer(playerA, roomElements.roomID);
        MafiaGameMock.addPlayer(playerB, roomElements.roomID);
        MafiaGameMock.addPlayer(playerC, roomElements.roomID);

        // Register mock event handlers for the events that the backend emits - assertions for the DTOs
        clientSocket.on('trial-start', (trialStartDTO) => {
            expect(trialStartDTO.timeToVote).toBe(config.trial_total_vote_time_in_milliseconds);
        });
        clientSocket.on('trial-end', (trialEndDTO) => {
            expect(trialEndDTO.playerKilled).toBe('abstain Vote');
            expect(trialEndDTO.isGameOver).toBe(false);
            done();
        });

        // Imitate the start of the trial
        clientSocket.emit('start-trial');
    });

    test('trial-start successful call, someone is killed, winning condition is not fulfilled', (done) => {
        const playerA = new Player(null, null, 'a', roles.MAFIA, true);
        const playerB = new Player(null, null, 'b', roles.CIVILIAN, true);
        const playerC = new Player(null, null, 'c', roles.JESTER, true);
        const playerD = new Player(null, null, 'd', roles.CIVILIAN, true);

        MafiaGameMock.addPlayer(playerA, roomElements.roomID);
        MafiaGameMock.addPlayer(playerB, roomElements.roomID);
        MafiaGameMock.addPlayer(playerC, roomElements.roomID);
        MafiaGameMock.addPlayer(playerD, roomElements.roomID);

        MafiaGameMock.addTrialVote(playerA, playerD, roomElements.roomID); // Vote to kill off a civilian

        // Register mock event handlers for the events that the backend emits - assertions for the DTOs
        clientSocket.on('trial-start', (trialStartDTO) => {
            expect(trialStartDTO.timeToVote).toBe(config.trial_total_vote_time_in_milliseconds);
        });
        clientSocket.on('trial-end', (trialEndDTO) => {
            expect(trialEndDTO.playerKilled).toBe('d');
            expect(trialEndDTO.isGameOver).toBe(false);
            done();
        });

        // Imitate the start of the trial
        clientSocket.emit('start-trial');
    });

    test('trial-start successful call, someone is killed, winning condition is fulfilled', (done) => {
        const playerA = new Player(null, null, 'a', roles.MAFIA, true);
        const playerB = new Player(null, null, 'b', roles.CIVILIAN, true);
        const playerC = new Player(null, null, 'c', roles.CIVILIAN, true);

        MafiaGameMock.addPlayer(playerA, roomElements.roomID);
        MafiaGameMock.addPlayer(playerB, roomElements.roomID);
        MafiaGameMock.addPlayer(playerC, roomElements.roomID);

        MafiaGameMock.addTrialVote(playerB, playerC, roomElements.roomID); // Vote to kill a civilian

        // Register mock event handlers for the events that the backend emits - assertions for the DTOs
        clientSocket.on('trial-start', (trialStartDTO) => {
            expect(trialStartDTO.timeToVote).toBe(config.trial_total_vote_time_in_milliseconds);
        });
        clientSocket.on('trial-end', (trialEndDTO) => {
            expect(trialEndDTO.playerKilled).toBe('c');
            expect(trialEndDTO.isGameOver).toBe(true);
            done();
        });

        // Imitate the start of the trial
        clientSocket.emit('start-trial');
    });
});
