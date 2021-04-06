const evotes = require('../../../../common/Enum/Vote');

class ListVoteDTO {
    constructor(votes) {
        const nicknameVoteMap = {};
        for (const [voter, chosenPlayer] of Object.entries(votes)) {
            nicknameVoteMap[voter] =
                chosenPlayer === evotes.NoConfidenceVote ? evotes.NoConfidenceVote : chosenPlayer.nickname;
        }
        this.voteMap = nicknameVoteMap;
    }
}

module.exports = ListVoteDTO;
