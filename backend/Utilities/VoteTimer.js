/*
 * This class stores the votes of a room and holds the timer of the voting period.
 * When the voting period of 30 seconds is over it will boardcast the votes to every player in the room.
 */
class VoteTimer {
    constructor(io, room) {
        this.io = io;
        this.room = room;

        const votes = {}; //A dictionary to hold all the votes. Key: voter nickname, value: votee nickname

        //Sets a timer which counts down from 30 seconds at which it will boardcast the votes to every player in the room
        const timer = setTimeout(() => {
            io.in(room.roomID).emit("time-up-update", voteTimer.votes);
            this.room.voteTimer = null; //Reset the room attribute so that another voting phase can be started in the future
        }, 30000);
    }
}

module.export = VoteTimer;
