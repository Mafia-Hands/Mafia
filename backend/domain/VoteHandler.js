/**
 * A class used to handle any voting related events or calculations for a Room.
 * This includes tallying votes, and figuring out who the most voted player is.
 */
class VoteHandler {
    constructor() {
        this.daytimeVoteMap = {};
        this.mafiaVoteMap = {};
        this.medicChosenPlayer = null;
    }

    getMafiaVotedPlayer() {
        const mafiaChosenPlayer = this.getVotedPlayer(this.mafiaVoteMap);
        if (mafiaChosenPlayer === this.medicChosenPlayer) {
            return null;
        } else {
            return mafiaChosenPlayer;
        }
    }

    getDaytimeVotedPlayer() {
        return this.getVotedPlayer(this.daytimeVoteMap);
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
        let votedPlayer = null;
        for (const [player, numVotes] of Object.entries(voteTally)) {
            if (numVotes > maxVotes) {
                maxVotes = numVotes;
                votedPlayer = player;
            }
        }

        if (votedPlayer === null) {
            // TODO: should discuss what to do in this case, probably just return random player
            return votedPlayer;
        } else {
            return votedPlayer;
        }
    }
}

module.exports = VoteHandler;
