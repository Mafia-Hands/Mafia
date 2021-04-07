const Player = require('../../domain/Player');
const Room = require('../../domain/Room');
const PlayerStatus = require('../../domain/Enum/PlayerStatus');
const Role = require('../../domain/Enum/Role');

describe('Domain Model tests', () => {
    test('room domain six model object', (done) => {
        const player1 = new Player('00001', 'room1', 'nickname1');
        const player2 = new Player('00002', 'room1', 'nickname2');
        const player3 = new Player('00003', 'room1', 'nickname3');
        const player4 = new Player('00004', 'room1', 'nickname4');
        const player5 = new Player('00005', 'room1', 'nickname5');
        const player6 = new Player('00006', 'room1', 'nickname6');

        const room = new Room();

        room.addPlayer(player1);
        room.addPlayer(player2);
        room.addPlayer(player3);
        room.addPlayer(player4);
        room.addPlayer(player5);
        room.addPlayer(player6);

        if (room.players.length === 6) {
            done();
        }
    });

    test('room domain max model object', (done) => {
        const player1 = new Player('00001', 'room1', 'nickname1');
        const player2 = new Player('00002', 'room1', 'nickname2');
        const player3 = new Player('00003', 'room1', 'nickname3');
        const player4 = new Player('00004', 'room1', 'nickname4');
        const player5 = new Player('00005', 'room1', 'nickname5');
        const player6 = new Player('00006', 'room1', 'nickname6');
        const player7 = new Player('00007', 'room1', 'nickname7');

        const room = new Room();

        room.addPlayer(player1);
        room.addPlayer(player2);
        room.addPlayer(player3);
        room.addPlayer(player4);
        room.addPlayer(player5);
        room.addPlayer(player6);
        room.addPlayer(player7);

        if (room.players.length === 7) {
            done();
        }
    });

    test('room domain model 1 object', (done) => {
        const player1 = new Player('00001', 'room1', 'nickname1');

        const room = new Room();

        room.addPlayer(player1);

        if (room.players.length === 1) {
            done();
        }
    });
});

describe('winning role tests', () => {
    let room;
    let jester;
    let civilian1;
    let civilian2;
    let mafia;
    let medic;
    let detective;

    beforeEach(() => {
        jester = new Player('00001', 'room1', 'nickname1', Role.JESTER, true);
        civilian1 = new Player('00002', 'room1', 'nickname2', Role.CIVILIAN, false);
        civilian2 = new Player('00003', 'room1', 'nickname3', Role.CIVILIAN, false);
        mafia = new Player('00004', 'room1', 'nickname4', Role.MAFIA, false);
        medic = new Player('00005', 'room1', 'nickname5', Role.MEDIC, false);
        detective = new Player('00006', 'room1', 'nickname6', Role.DETECTIVE, false);

        room = new Room();
        room.addPlayer(jester);
        room.addPlayer(civilian1);
        room.addPlayer(civilian2);
        room.addPlayer(mafia);
        room.addPlayer(medic);
        room.addPlayer(detective);
    });

    test('jester wins by getting killed in a trial', (done) => {
        expect(jester.status).toBe(PlayerStatus.ALIVE);

        let winningRole = room.getWinningRole();
        expect(winningRole).toBeNull();

        jester.status = PlayerStatus.KILLED_BY_TOWN;
        winningRole = room.getWinningRole();
        expect(winningRole).toBe(Role.JESTER);

        done();
    });

    test('civilians win by eliminating mafia', (done) => {
        mafia.status = PlayerStatus.KILLED_BY_TOWN;
        const winningRole = room.getWinningRole();
        expect(winningRole).toBe(Role.CIVILIAN);

        done();
    });

    test('mafia wins by eliminating everyone except one', (done) => {
        // Two good players still alive - game should not be over yet.
        civilian1.status = PlayerStatus.KILLED_BY_MAFIA;
        civilian2.status = PlayerStatus.KILLED_BY_TOWN;
        medic.status = PlayerStatus.KILLED_BY_MAFIA;

        let winningRole = room.getWinningRole();
        expect(winningRole).toBeNull();

        // Mafia kills detective and only jester remians - mafia should win.
        detective.status = PlayerStatus.KILLED_BY_MAFIA;

        winningRole = room.getWinningRole();
        expect(winningRole).toBe(Role.MAFIA);

        done();
    });

    test('jester does not win if killed by mafia', (done) => {
        jester.status = PlayerStatus.KILLED_BY_MAFIA;

        let winningRole = room.getWinningRole();
        expect(winningRole).toBeNull();

        done();
    });
});
