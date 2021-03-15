class VoteHandler {
    constructor() {
        this.daytimeVoteMap = {};
        this.mafiaVoteMap = {};
        this.medicChosenPlayer = null;
    }

    addDaytimeVote(voter, chosenPlayer) {
        this.daytimeVoteMap[voter] = chosenPlayer;
    }

    addMafiaVote(voter, chosenPlayer) {
        this.mafiaVoteMap[voter] = chosenPlayer;
    }

    setMedicChosenPlayer(player) {
        this.medicChosenPlayer = player;
    }

    getMafiaVotedPlayer() {
        mafiaChosenPlayer = this.getVotedPlayer(this.mafiaVoteMap);
        if (mafiaChosenPlayer === medicChosenPlayer) {
            return null;
        } else {
            return mafiaChosenPlayer;
        }
    }

    getVotedPlayer(voteMap) {
        // Generate map of players who have been voted for, and the number of votes they have.
        let voteTally = {};
        for (const [voter, chosenPlayer] of Object.entries(voteMap)) {
            if (voteTally.hasOwnProperty(chosenPlayer)) {
                voteTally[chosenPlayer]++;
            } else {
                voteTally[chosenPlayer] = 1;
            }
        }

        // Get the player with the most votes. In the event of a tie, we just select the first player to get that number of votes
        let maxVotes = 0;
        let votedPlayer;
        for (const [player, numVotes] of Object.entries(voteTally)) {
            if (numVotes > maxVotes) {
                votedPlayer = player;
            }
        }

        if (votedPlayer === undefined) {
            // Just return random player?
        } else {
            return votedPlayer;
        }
    }
}

module.exports = VoteHandler;
