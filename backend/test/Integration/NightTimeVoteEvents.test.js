const Client = require('socket.io-client');
const config = require('../../config.json');
const SocketIOServer = require('../../index');
const CreateLobbyDTO = require('../../domain/DTO/request/CreateLobbyDTO');
const JoinLobbyDTO = require('../../domain/DTO/request/JoinLobbyDTO');
const NightTimeVoteDTO = require('../../domain/DTO/request/NightTimeVoteDTO');
const RoleEnum = require('../../domain/Enum/Role');

describe('night time vote event tests', () => {
    let clientSockets;
    const port = process.env.PORT || config.local_port;
    beforeAll((done) => {
        // create 6 client servers to replicate 6 players
        clientSockets = [
            new Client(`http://localhost:${port}`), // Anmol
            new Client(`http://localhost:${port}`), // justin
            new Client(`http://localhost:${port}`), // Homer
            new Client(`http://localhost:${port}`), // James
            new Client(`http://localhost:${port}`), // Jen
            new Client(`http://localhost:${port}`), // Leon
        ];
        // connect all clients
        clientSockets.forEach((clientSocket) => {
            clientSocket.on('connect', done);
        });
    });

    // Disconnect each socket connected to the server
    afterEach((done) => {
        const { sockets } = SocketIOServer.io.sockets;
        sockets.forEach((socket, key) => {
            socket.disconnect(true);
        });
        done();
    });
    // close servers after all tests
    afterAll(() => {
        SocketIOServer.server.close();
        clientSockets.forEach((clientSocket) => {
            clientSocket.close();
        });
    });
    /**
     * This is a integration test for night time voting events.
     * It goes through stariting a game to checking mafia vote
     *
     */
    test('Night time Vote events', (done) => {
        let LOBBYCODE;
        // Create game & assign roles to players
        // will be used for all tests!!!
        // Request to create a new lobby  and send host nickname DTO
        // client[0] is the host
        const createLobbyDTO = new CreateLobbyDTO('Anmol');
        clientSockets[0].emit('create-lobby', createLobbyDTO);
        // send lobby host adress
        clientSockets[0].on('lobby-code', (lobbyCodeDTO) => {
            expect(lobbyCodeDTO.code).toBeDefined();
            LOBBYCODE = lobbyCodeDTO.code; // used for future cases

            // join 5 more players to lobby
            const joinLobbyDTO = [
                new JoinLobbyDTO('Justin', LOBBYCODE),
                new JoinLobbyDTO('Homer', LOBBYCODE),
                new JoinLobbyDTO('James', LOBBYCODE),
                new JoinLobbyDTO('Jen', LOBBYCODE),
                new JoinLobbyDTO('Leon', LOBBYCODE),
            ];
            //join players a lobby
            for (let i = 1; i < clientSockets.length; i++) {
                clientSockets[i].emit('join-lobby', joinLobbyDTO[i - 1]);
            }
            // check client for max players (lobby-ready) from host
            clientSockets[0].on('lobby-ready', () => {
                console.log('MAX PLAYERS REACHED: LOBBY READY');
                // send start game and assign roles to players from server side
                clientSockets[0].emit('start-game');
                let isMafia = false; // keep track if tester is mafia
                for (let i = 0; i < clientSockets.length; i++) {
                    clientSockets[i].on('game-start', (gameStartDTO) => {
                        // check if socket 1 is mafia or jester
                        if (i === 1) {
                            isMafia = gameStartDTO.role === RoleEnum.MAFIA || gameStartDTO.role === RoleEnum.JESTER;
                        }
                        // esnure a role is recieved for each player 
                        expect(gameStartDTO.role).toBeTruthy();
                        console.log(gameStartDTO.role);
                        // host sends vote for Justin
                        clientSockets[0].emit('detective-vote', new NightTimeVoteDTO('Justin'));
                        // check if mafia or not
                        clientSockets[0].on('suspect-reveal', (suspectRevealDTO) => {
                            expect(suspectRevealDTO.nickname).toBe('Justin');
                            expect(suspectRevealDTO.isMafia).toBe(isMafia);
                            done();
                        });
                    });
                }
            });
        });
    });
});
