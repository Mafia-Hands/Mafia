const MafiaGame = require("../domain/MafiaGame");
const roles = require("../domain/Enum/Role");
const GameStartDTO = require("../domain/DTO/response/GameStartDTO");
const config = require("../config.json");

/**
 * Event handler of `start-game`
 * The game has started! Broadcast individual roles to everyone.
 * @param {any} socket
 * @param {mafiaGame} mafiaGame
 */
function startGame(socket, mafiaGame) {
  socket.on("start-game", () => {
    const room = mafiaGame.gameRoomsDict[socket.player.roomID];
    const players = room.players;
    const availableRoles = getAvailableRolesToAssign(players.length);

    broadcastRandomRoleToEachPlayer(players, availableRoles);
  });
}

function broadcastRandomRoleToEachPlayer(players, availableRoles) {
  const playersDeepCopy = JSON.parse(JSON.stringify(players));

  while (playersDeepCopy.length > 0) {
    // Determine random indices to help allocate a random role to a random player
    let randomRoleIndex = Math.floor(Math.random() * availableRoles.length);
    let randomPlayerIndex = Math.floor(Math.random() * playersDeepCopy.length);

    const role = availableRoles[randomRoleIndex];
    const player = playersDeepCopy[randomPlayerIndex];

    player.role = role;
    socket.broadcast.to(player.socketID).emit("game-start", new GameStartDTO(role));

    // Delete the player and the role which was just allocated
    availableRoles.splice(randomRoleIndex, 1);
    playersDeepCopy.splice(randomPlayerIndex, 1);
  }
}

function getAvailableRolesToAssign(numOfPlayers) {
  const roleLogic = config.role_distribution_logic;

  // Calculate the number of roles available of each type
  let numOfMafia;
  if (numOfPlayers < roleLogic.mafia_role_threshold) {
    numOfMafia = ceil(numOfPlayers / roleLogic.mafia_divisor_1);
  } else {
    numOfMafia = ceil(numOfPlayers / roleLogic.mafia_divisor_2);
  }
  const numOfDetectives = ceil(numOfPlayers / roleLogic.detective_divisor);
  const numOfMedics = ceil(numOfPlayers / roleLogic.medic_divisor);
  const numOfJesterss = ceil(numOfPlayers / roleLogic.jester_divisor);
  const numOfVillagers = numOfPlayers - (numOfMafia + numOfDetectives + numOfMedics + numOfJesterss);

  // Return an array of roles, with each role occuring once or more depending on the number of players
  // playing the game
  return [
    ...Array(numOfMafia).fill(roles.MAFIA),
    ...Array(numOfDetectives).fill(roles.DETECTIVE),
    ...Array(numOfMedics).fill(roles.MEDIC),
    ...Array(numOfJesterss).fill(roles.JESTER),
    ...Array(numOfVillagers).fill(roles.CIVILIAN),
  ];
}

/**
 * Event handlers and logic for all of the game start related events
 * Current namespaces: start-game
 * @param {any} socket
 * @param {MafiaGame} mafiaGame
 */
module.exports = function (socket, mafiaGame) {
  startGame(socket, mafiaGame);
};
