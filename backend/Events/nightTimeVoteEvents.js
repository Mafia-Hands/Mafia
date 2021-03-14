const RoleEnum = require('../domain/Enum/Role');
const SuspectRevealDTO = require('../domain/DTO/response/SuspectRevealDTO');

/**
 *
 */
exports.nightTimeEvents = (io, socket, mafiaGame) => {
    socket.on('mafia-vote', (mafiaVoteObj) => {
        let room = socket.player.roomID;
        room.mafiaChosenPlayer = room.getPlayerByNickname(
            mafiaVoteObj.votingFor
        );
    });

    socket.on('medic-vote', (medicVoteObj) => {
        let room = socket.player.roomID;
        room.medicChosenPlayer = room.getPlayerByNickname(
            mafiaVoteObj.votingFor
        );
    });

    socket.on('detective-vote', (detectiveVoteObj) => {
        let room = socket.player.roomID;

        let suspect = room.getPlayerByNickname(detectiveVoteObj.votingFor);
        let isMafia = false;
        if (suspect.role == RoleEnum.MAFIA) {
            isMafia = true;
        }

        socket.emit(
            'suspect-reveal',
            new SuspectRevealDTO(suspect.nickname, isMafia)
        );
    });
};
