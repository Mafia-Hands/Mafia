class ListVoteDTO {
    constructor(votes) {
        const nicknameVoteMap = {};
        for (const [voter, chosenPlayer] of Object.entries(votes)) {
            nicknameVoteMap[voter] = chosenPlayer === 'no Confidence' ? 'no Confidence' : chosenPlayer.nickname;
        }
        this.voteMap = nicknameVoteMap;
    }
}

module.exports = ListVoteDTO;
