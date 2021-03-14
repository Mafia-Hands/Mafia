const MafiaGame = require("../domain/MafiaGame");
const Player = require("../domain/Player");
const Room = require("../domain/Room");
const VoteTimer = require("../Utilities/VoteTimer");

/*
 * This function is to handle the day vote event. It stores the players votes and
 * broadcasts it to other players in the room.
 * Params: votingFor: person player voted for, roomCode: room code, io: io connection
 * socket: socket connection to client, mafiaGame: the mafiaGame instance
 * Returns:
 */


/*
 * This function is to handle the trail vote event. It stores the players votes and
 * broadcasts it to other players in the room.
 * Params: votingFor: person player voted for, roomCode: room code, io: io connection
 * socket: socket connection to client, mafiaGame: the mafiaGame instance
 * Returns:
 */


module.exports = dayVoteFunction;
module.exports = trailVoteFunction;
