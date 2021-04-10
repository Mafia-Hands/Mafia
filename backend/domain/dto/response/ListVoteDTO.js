const VoteType = require('../../../../common/enum/Vote');

class ListVoteDTO {
    constructor(votes) {
        const nicknameVoteMap = {};
        for (const [voter, chosenPlayer] of Object.entries(votes)) {
            nicknameVoteMap[voter] =
                chosenPlayer === VoteType.NoConfidenceVote ? VoteType.NoConfidenceVote : chosenPlayer.nickname;
        }
        this.voteMap = nicknameVoteMap;
    }
}

module.exports = ListVoteDTO;
