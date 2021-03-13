class VoteTimer {
    constructor(io, room) {
        this.io = io;
        this.room = room;

        const votes = {};

        const timer = setTimeout(() => {
            io.in(room.roomID).emit("time-up-update", voteTimer.votes);
            this.room.voteTimer = null;
        }, 30000);
    }
}

module.export = VoteTimer;
