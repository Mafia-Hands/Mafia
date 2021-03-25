const MafiaGameMock = require('../mocks/MafiaGameMock');
const config = require('../../config.json');
const Player = require('../../domain/Player');
const roles = require('../../domain/Enum/Role');
const UnitTestHelpers = require('./UnitTestHelpers');

describe('start-night unit tests', () => {
    const port = process.env.PORT || config.local_port;
    const roomElements = MafiaGameMock.createMafiaGameWithOnePlayerMock(port);
    let clientSocket;

    beforeEach((done) => {
        clientSocket = UnitTestHelpers.setUpClient(port, done);
    });

    afterEach((done) => {
        UnitTestHelpers.cleanUpTest(MafiaGameMock, roomElements);
        done();
    });

    afterAll((done) => {
        UnitTestHelpers.cleanUpAllTests(roomElements);
        done();
    });

    test('start-night successful call, no one is killed', (done) => {
        // Registering mock event handlers for the events that the backend emits when the night starts
        clientSocket.on('night-start', (nightStartDTO) => {
            expect(nightStartDTO.timeToVote).toBe(config.night_total_vote_time_in_milliseconds);
        });
        clientSocket.on('night-end', (nightEndDTO) => {
            expect(nightEndDTO.playerKilled).toBeNull();
            done();
        });

        // Imitate the start of a night
        clientSocket.emit('start-night');
    });

    test('start-night successful call, someone is killed', (done) => {
        const mafiaPlayer = new Player(null, null, 'a', roles.MAFIA, true);
        const civilianPlayer = new Player(null, null, 'b', roles.CIVILIAN, true);

        MafiaGameMock.addPlayer(mafiaPlayer, roomElements.roomID);
        MafiaGameMock.addPlayer(civilianPlayer, roomElements.roomID);

        MafiaGameMock.addMafiaVote(mafiaPlayer, civilianPlayer, roomElements.roomID); // Mafia kills civilian

        // Registering mock event handlers for the events that the backend emits when the night starts
        clientSocket.on('night-start', (nightStartDTO) => {
            expect(nightStartDTO.timeToVote).toBe(config.night_total_vote_time_in_milliseconds);
        });
        clientSocket.on('night-end', (nightEndDTO) => {
            expect(nightEndDTO.playerKilled).toBe('b');
            done();
        });

        // Imitate the start of a night
        clientSocket.emit('start-night');
    });
});
