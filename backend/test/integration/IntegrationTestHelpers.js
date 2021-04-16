const Client = require('socket.io-client');
const CreateLobbyDTO = require('../../domain/dto/request/CreateLobbyDTO');
const JoinLobbyDTO = require('../../domain/dto/request/JoinLobbyDTO');
const Role = require('../../domain/enum/Role');

/**
 * Host connects and creates lobby
 * @param {*} clientSockets clientsockets used for each test
 * @param {*} port Port the client socket will run on
 * @returns Promise reslvong and returning the lobby code
 */
async function connectAndCreateLobby(clientSockets, port) {
    return new Promise((resolve) => {
        clientSockets[0] = new Client(`http://localhost:${port}`);
        clientSockets[0].on('connect', () => {
            clientSockets[0].emit('create-lobby', new CreateLobbyDTO('Leon'));
            clientSockets[0].on('lobby-code', (createLobbyDTO) => {
                resolve(createLobbyDTO.code);
            });
        });
    });
}
/**
 * Connects and joins 6 players to lobby
 * @param {*} clientSockets clientsockets used for each test
 * @param {*} index The index of clientsockets array
 * @param {*} port Port the client socket will run on
 * @param {*} lobbyCode The lobby code of the room
 * @returns A promise resolving
 */
async function connectAndJoin(clientSockets, index, port, lobbyCode) {
    return new Promise((resolve) => {
        clientSockets[index] = new Client(`http://localhost:${port}`);
        clientSockets[index].on('connect', () => {
            clientSockets[index].emit('join-lobby', new JoinLobbyDTO(`Leon${index.toString()}`, lobbyCode));
            clientSockets[index].once('lobby-join', () => {
                resolve();
            });
        });
    });
}

/**
 * Starts game assigning roles to each player
 * @param {*} clientSockets Each client socket in the room
 * @returns Promise with resolve returning role of host player
 */
let hostRole;
async function startGame(clientSockets, lobbySize) {
    let roles = [];
    return new Promise((resolve) => {
        // Start the game
        let socketResponseCount = 0;
        clientSockets[0].emit('start-game');
        for (let i = 0; i < clientSockets.length; i += 1) {
            clientSockets[i].once('game-start', (gameStartDTO) => {
                expect(gameStartDTO.role).toBeDefined();
                socketResponseCount += 1;
                // return the host role
                if (i === 0) {
                    hostRole = gameStartDTO.role;
                }
                roles.push(gameStartDTO.role);

                // Only end test if all 6 responses are received
                if (socketResponseCount >= lobbySize) {
                    resolve({ hostRole, roles });
                }
            });
        }
    });
}

async function startGameOnePlayer(clientSockets) {
    return new Promise((resolve) => {
        // Start the game
        clientSockets[0].emit('start-game');
        clientSockets[0].on('game-start', () => {
            resolve();
        });
    });
}

async function getRoles(playerCount, clientSockets, port, lobbyCode) {
    // connect players to lobby
    for (let i = 1; i <= playerCount - 1; i += 1) {
        await connectAndJoin(clientSockets, i, port, lobbyCode);
    }

    const { roles } = await startGame(clientSockets, playerCount);
    expect(roles.length).toBe(playerCount);

    let roleCounts = {
        total: 0,
    };
    roles.forEach((role) => {
        roleCounts.total += 1;

        if (roleCounts[role]) {
            roleCounts[role] += 1;
        } else {
            roleCounts[role] = 1;
        }
    });

    return roleCounts;
}

function checkRoles({
    roles,
    expectedMafiaCount,
    expectedDetectivesCount,
    expectedMedicsCount,
    expectedJesterCount,
    expectedCiviliansCount,
}) {
    expect(roles[Role.MAFIA]).toBe(expectedMafiaCount);
    expect(roles[Role.DETECTIVE]).toBe(expectedDetectivesCount);
    expect(roles[Role.MEDIC]).toBe(expectedMedicsCount);
    expect(roles[Role.JESTER]).toBe(expectedJesterCount);
    expect(roles[Role.CIVILIAN]).toBe(expectedCiviliansCount);
}

module.exports = {
    connectAndCreateLobby,
    connectAndJoin,
    startGame,
    startGameOnePlayer,
    getRoles,
    checkRoles,
};
