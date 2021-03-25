const MafiaGameMock = require('../mocks/MafiaGameMock');
const config = require('../../config.json');
const Player = require('../../domain/Player');
const roles = require('../../domain/Enum/Role');
const UnitTestHelpers = require('./UnitTestHelpers');

const port = process.env.PORT || config.local_port;
const roomElements = MafiaGameMock.createMafiaGameWithOnePlayerMock(port);
let clientSocket;

beforeEach((done) => {
    clientSocket = UnitTestHelpers.setUpClient(port, done);
});

afterEach((done) => {
    UnitTestHelpers.cleanUpTestWithMafiaMock(MafiaGameMock, roomElements.io, roomElements.roomID);
    done();
});

afterAll((done) => {
    UnitTestHelpers.cleanUpAllTests(roomElements.socketIOServer);
    done();
});

describe('trial-start unit tests', () => {
    test('trial-start successful call, no votes, winning condition is not fulfilled', (done) => {
        const mafiaPlayer = new Player(null, null, 'a', roles.MAFIA, true);
        const jesterPlayer = new Player(null, null, 'b', roles.JESTER, true);
        const civilianPlayer = new Player(null, null, 'c', roles.CIVILIAN, true);

        // Note: that we require a mafia, jester and civilian player in the game, otherwise the game is over
        MafiaGameMock.addPlayer(mafiaPlayer, roomElements.roomID);
        MafiaGameMock.addPlayer(jesterPlayer, roomElements.roomID);
        MafiaGameMock.addPlayer(civilianPlayer, roomElements.roomID);

        // Registering mock event handlers for the events that the backend emits when the trial starts
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

    test('trial-start successful call, one abstain vote, winning condition is fulfilled', (done) => {
        const playerA = new Player(null, null, 'a', roles.MAFIA, true);
        playerA.isAlive = false; // Kill off the mafia player

        MafiaGameMock.addPlayer(playerA, roomElements.roomID);

        MafiaGameMock.addTrialVote(playerA, 'abstain Vote', roomElements.roomID); // Vote to kill off a civilian

        // Registering mock event handlers for the events that the backend emits when the trial starts
        clientSocket.on('trial-start', (trialStartDTO) => {
            expect(trialStartDTO.timeToVote).toBe(config.trial_total_vote_time_in_milliseconds);
        });
        clientSocket.on('trial-end', (trialEndDTO) => {
            expect(trialEndDTO.playerKilled).toBe('abstain Vote');
            expect(trialEndDTO.isGameOver).toBe(true);
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

        // Registering mock event handlers for the events that the backend emits when the trial starts
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

        MafiaGameMock.addPlayer(playerA, roomElements.roomID);
        MafiaGameMock.addPlayer(playerB, roomElements.roomID);

        MafiaGameMock.addTrialVote(playerB, playerA, roomElements.roomID); // Vote to kill the Mafia

        // Registering mock event handlers for the events that the backend emits when the trial starts
        clientSocket.on('trial-start', (trialStartDTO) => {
            expect(trialStartDTO.timeToVote).toBe(config.trial_total_vote_time_in_milliseconds);
        });
        clientSocket.on('trial-end', (trialEndDTO) => {
            expect(trialEndDTO.playerKilled).toBe('a');
            expect(trialEndDTO.isGameOver).toBe(true);
            done();
        });

        // Imitate the start of the trial
        clientSocket.emit('start-trial');
    });
});
