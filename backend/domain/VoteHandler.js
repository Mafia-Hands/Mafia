/**
 * A class used to handle any voting related events or calculations for a Room.
 * This includes tallying votes, and figuring out who the most voted player is.
 */
class VoteHandler {
    constructor() {
        this.daytimeVoteMap = {};
        this.mafiaVoteMap = {};
        this.trialVoteMap = {};
        this.medicChosenPlayer = null;
    }

    getMafiaVotedPlayer() {
        const mafiaChosenPlayer = this.getVotedPlayer(this.mafiaVoteMap);
        if (this.medicChosenPlayer && mafiaChosenPlayer === this.medicChosenPlayer.nickname) {
            return null;
        }
        return mafiaChosenPlayer;
    }

    getDaytimeVotedPlayer() {
        return this.getVotedPlayer(this.daytimeVoteMap);
    }

    getTrialVotedPlayer() {
        return this.getVotedPlayer(this.trialVoteMap, true);
    }

    getVotedPlayer(voteMap, isTrial) {
        // Generate map of players who have been voted for, and the number of votes they have.
        const voteTally = {};
        voteTally['abstain Vote'] = 0;
        for (const [voter, chosenPlayer] of Object.entries(voteMap)) {
            if (chosenPlayer === 'abstain Vote') {
                voteTally['abstain Vote']++;
            } else if (voteTally.hasOwnProperty(chosenPlayer.nickname)) {
                voteTally[chosenPlayer.nickname]++;
            } else {
                voteTally[chosenPlayer.nickname] = 1;
            }
        }

        // Get the player with the most votes. In the event of a tie, we just select the first player to get that number of votes
        let maxVotes = 0;
        let votedPlayer = null;
        for (const [player, numVotes] of Object.entries(voteTally)) {
            if ((numVotes > maxVotes) || (isTrial && player == 'abstain Vote' && numVotes == maxVotes)) {
                maxVotes = numVotes;
                votedPlayer = player;
            }
        }

        if (votedPlayer === null) {
            // TODO: should discuss what to do in this case, probably just return random player
            return votedPlayer;
        }
        return votedPlayer;
    }

    resetVotes() {
        this.daytimeVoteMap = {};
        this.mafiaVoteMap = {};
        this.trialVoteMap = {};
        this.medicChosenPlayer = null;
    }
}

module.exports = VoteHandler;
