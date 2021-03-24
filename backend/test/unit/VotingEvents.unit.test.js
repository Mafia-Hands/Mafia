const Client = require('socket.io-client');
const VoteForDTO = require('../../domain/DTO/request/VoteForDTO');
const config = require('../../config.json');
const MafiaGameMock = require('../mocks/MafiaGameMock');
const Player = require('../../domain/Player');
const RoleEnum = require('../../domain/Enum/Role');
const NightTimeVoteDTO = require('../../domain/DTO/request/NightTimeVoteDTO');
const NightEndDTO = require('../../domain/DTO/response/NightEndDTO');

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
        // Subscribe to day-vote-update, to check that the vote has been registered correctly
        clientSocket.on('day-vote-update', (listVoteDTO) => {
            try {
                expect(listVoteDTO).toEqual({ voteMap: { a: 'P1' } });
                done();
            } catch (error) {
                done.fail(error);
            }
        });

        // Cast vote
        const voteForDTO = new VoteForDTO('P1');
        clientSocket.emit('day-vote', voteForDTO);
    });

    test('trial vote test', (done) => {
        // Subscribe to trial-vote-update
        clientSocket.on('trial-vote-update', (listVoteDTO) => {
            try {
                expect(listVoteDTO).toEqual({ voteMap: { a: 'P1' } });
                done();
            } catch (error) {
                done.fail(error);
            }
        });

        // Cast trial vote
        const voteForDTO = new VoteForDTO('P1');
        clientSocket.emit('trial-vote', voteForDTO);
    });
});

describe('night time voting event tests', () => {
    beforeAll(() => {
        players = [
            new Player(null, roomElements.roomID, 'notMafia', RoleEnum.MAFIA, false),
            new Player(null, roomElements.roomID, 'Doctor', RoleEnum.MEDIC, true),
            new Player(null, roomElements.roomID, 'Sherlock', RoleEnum.DETECTIVE, false),
            new Player(null, roomElements.roomID, 'Dude', RoleEnum.CIVILIAN, true),
        ];
        MafiaGameMock.addPlayers(players, roomElements.roomID);
    });

    test('mafia votes w/ no medic vote', (done) => {
        //Listen for night end to check that player has been killed.
        clientSocket.on('night-end', (nightEndDTO) => {
            try {
                expect(nightEndDTO.playerKilled).toEqual('Dude');
                done();
            } catch (error) {
                done.fail(error);
            }
        });

        // Switch to mafia player to make vote
        MafiaGameMock.switchPlayer('notMafia', roomElements.roomID);
        clientSocket.emit('mafia-vote', new NightTimeVoteDTO('Dude'));

        clientSocket.emit('start-night');
    });

    test('mafia and medic vote same player', (done) => {
        //Listen for night end to check that player has been killed.
        clientSocket.on('night-end', (nightEndDTO) => {
            try {
                expect(nightEndDTO.playerKilled).toEqual(null);
                done();
            } catch (error) {
                done.fail(error);
            }
        });

        // Switch to mafia player to make vote
        MafiaGameMock.switchPlayer('notMafia', roomElements.roomID);
        clientSocket.emit('mafia-vote', new NightTimeVoteDTO('Dude'));

        // Switch to medic to save same player as mafia player
        MafiaGameMock.switchPlayer('Doctor', roomElements.roomID);
        clientSocket.emit('medic-vote', new NightTimeVoteDTO('Dude'));

        clientSocket.emit('start-night');
    });
});
