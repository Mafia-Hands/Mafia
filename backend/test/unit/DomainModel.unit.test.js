const Player = require('../../domain/Player');
const Room = require('../../domain/Room');
const PlayerStatus = require('../../domain/enum/PlayerStatus');
const Role = require('../../domain/enum/Role');

describe('Add Player tests', () => {
    for (let playerCount = 6; playerCount <= 15; playerCount += 1) {
        test('room add X players', () => {
            const room = new Room();

            for (let i = 1; i <= playerCount; i += 1) {
                const player = new Player(`0000${i}`, `room${i}`, `nickname${i}`);
                room.addPlayer(player);
            }

            expect(room.players.length).toBe(playerCount);
        });
    }
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
