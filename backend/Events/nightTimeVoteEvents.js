const RoleEnum = require('../domain/Enum/Role');
const SuspectRevealDTO = require('../domain/DTO/response/SuspectRevealDTO');

/**
 * Event handlers and logic for `mafia-vote`, 'medic-vote' and `detective-vote`
 * This involves the functionality for night-time voting, which includes:
 * - Mafia choosing who to kill before the next round
 * - Medics choosing who to save
 * - Detectives choosing who to suspect
 * @param {any} io
 * @param {any} socket
 * @param {MafiaGame} mafiaGame
 */
exports.nightTimeEvents = (io, socket, mafiaGame) => {
    /**
     * Handler for 'mafia-vote', sets the chosen player for the Mafia to the player specified in the message.
     * In future iterations, this will be changed to tally votes from mafia members before setting the chosen player.
     */
    socket.on('mafia-vote', (mafiaVoteObj) => {
        let room = socket.player.roomID;
        room.mafiaChosenPlayer = room.getPlayerByNickname(
            mafiaVoteObj.votingFor
        );
    });

    /**
     * Handler for 'medic-vote', pretty much the same logic as the mafia vote, except it sets the chosen player for the Medics.
     */
    socket.on('medic-vote', (medicVoteObj) => {
        let room = socket.player.roomID;
        room.medicChosenPlayer = room.getPlayerByNickname(
            mafiaVoteObj.votingFor
        );
    });

    /**
     * Handler for detective vote. Retrieves the player specified in the message, checks their role, and replies with a
     * SuspectRevealDTO that reveals whether the chosen player is Mafia or not.
     */
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
