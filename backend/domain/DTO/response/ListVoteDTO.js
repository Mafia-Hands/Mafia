class ListVoteDTO {
    constructor(votes) {
        const nicknameVoteMap = {};
        for (const [voter, chosenPlayer] of Object.entries(votes)) {
            nicknameVoteMap[voter] = chosenPlayer === 'abstain Vote' ? 'abstain Vote' : chosenPlayer.nickname;
        }
        this.voteMap = nicknameVoteMap;
    }
}

module.exports = ListVoteDTO;
