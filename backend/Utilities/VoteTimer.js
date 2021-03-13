/*
 * This class stores the votes of a room and holds the timer of the voting period.
 * When the voting period of 30 seconds is over it will boardcast the votes to every player in the room.
 */
class VoteTimer {
    constructor(io, room, isTrail) {
        this.io = io;
        this.room = room;
        this.isTrail = isTrail;

        const votes = {}; //A dictionary to hold all the votes. Key: voter nickname, value: votee nickname

        //Sets a timer which counts down from 30 seconds at which it will boardcast the votes to every player in the room
        const timer = setTimeout(() => {
            io.in(room.roomID).emit("time-up-update", voteTimer.votes);
            if (isTrail) {
                const votees = Object.keys(voteTimer.votes).map((key) => {
                    return dictionary[key];
                });
                const nickname = findMostVotedPlayer(votees);
                const player = room.players.find((element) => {
                    element.nickname == nickname;
                });
                player.isAlive = false;
            }
            this.room.voteTimer = null; //Reset the room attribute so that another voting phase can be started in the future
        }, 30000);
    }
}

const findMostVotedPlayer = (votees) => {
    let mostFrequentCount = 1;
    let count = 0;
    let name;
    for (var i = 0; i < votees.length; i++) {
        for (var j = i; j < votees.length; j++) {
            if (votees[i] == votees[j]) {
                count++;
            }
            if (mostFrequentCount < count) {
                mostFrequentCount = count;
                name = votees[i];
            }
        }
        count = 0;
    }

    return name;
};

module.export = VoteTimer;
