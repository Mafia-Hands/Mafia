/**
 * A class used to handle any voting related events or calculations for a Room.
 * This includes tallying votes, and figuring out who the most voted player is.
 * The vote handler keeps track of vote maps. These are JSON objects where each key is a player nickname, and each value is the Player object that was voted for.
 */
class VoteHandler {
    /**
     * Constructor: mainly just initialises the vote maps as empty JSON objects.
     */
    constructor() {
        this.daytimeVoteMap = {};
        this.mafiaVoteMap = {};
        this.trialVoteMap = {};
        this.medicChosenPlayer = null;
    }

    /**
     * Gets the player voted for by the mafia, based on the mafia vote map.
     * Compares the voted player with the player that the medic has chosen to save, to check if they are the same player.
     * @returns The player that has been killed by the mafia, or null if the medic has saved the right player.
     */
    getMafiaVotedPlayer() {
        const mafiaChosenPlayer = this.getVotedPlayer(this.mafiaVoteMap);
        if (this.medicChosenPlayer && mafiaChosenPlayer === this.medicChosenPlayer.nickname) {
            return null;
        }
        return mafiaChosenPlayer;
    }

    /**
     * Gets the most voted player from the discussion period of the game.
     * @returns The player selected for trial.
     */
    getDaytimeVotedPlayer() {
        return this.getVotedPlayer(this.daytimeVoteMap);
    }

    /**
     * Gets the most voted player from the trial period of the game.
     * @returns The player that has been executed in the trial.
     */
    getTrialVotedPlayer() {
        return this.getVotedPlayer(this.trialVoteMap, true);
    }

    // eslint-disable-next-line class-methods-use-this
    getVotedPlayer(voteMap, isTrial) {
        // Generate map of players who have been voted for, and the number of votes they have.
        const voteTally = {};
        voteTally['abstain Vote'] = 0;
        for (const [, chosenPlayer] of Object.entries(voteMap)) {
            if (chosenPlayer === 'abstain Vote') {
                voteTally['abstain Vote'] += 1;
            } else if (Object.prototype.hasOwnProperty.call(voteTally, chosenPlayer.nickname)) {
                voteTally[chosenPlayer.nickname] += 1;
            } else {
                voteTally[chosenPlayer.nickname] = 1;
            }
        }

        // Get the player with the most votes. In the event of a tie, we just select the first player to get that number of votes
        let maxVotes = 0;
        let votedPlayer = null;
        for (const [player, numVotes] of Object.entries(voteTally)) {
            if (numVotes > maxVotes || (isTrial && player === 'abstain Vote' && numVotes === maxVotes)) {
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
