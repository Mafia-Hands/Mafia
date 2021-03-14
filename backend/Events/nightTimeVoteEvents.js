
/**
 * 
 */
exports.nightTimeEvents = (io, socket, mafiaGame) => {

    socket.on("mafia-vote", (mafiaVoteObj) => {
        // Get the Room instance for this player from their info
        let room = mafiaGame.gameRoomsDict[socket.rooms[0]];
        room.mafiaChosenPlayer = room.getPlayerByNickname(mafiaVoteObj.votingFor);
    });

    socket.on("medic-vote", (medicVoteObj) => {
        let room = mafiaGame.gameRoomsDict[socket.rooms[0]];
        room.medicChosenPlayer = room.getPlayerByNickname(mafiaVoteObj.votingFor);
    });

};