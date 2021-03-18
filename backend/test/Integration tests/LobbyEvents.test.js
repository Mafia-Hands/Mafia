const Client = require('socket.io-client');
const config = require('../../config.json');
const SocketIOServer = require('../../index');
const CreateLobbyDTO = require('../../domain/DTO/request/CreateLobbyDTO');
const JoinLobbyDTO = require('../../domain/DTO/request/JoinLobbyDTO');
describe('lobby events tests', () => {
    let clientSocket;
    const port = process.env.PORT || config.local_port;

    beforeEach((done) => {
        clientSocket = new Client(`http://localhost:${port}`);
        clientSocket.on('connect', done);
    });
    // Disconnect each socket connected to the server
    afterEach((done) => {
        const { sockets } = SocketIOServer.io.sockets;
        sockets.forEach((socket, key) => {
            socket.disconnect(true);
        });
        done();
    });
    // close server after all tests
    afterAll(() => {
        SocketIOServer.server.close();
        clientSocket.close();
    });
    /**
     * This is a integration test for all lobby events.
     * It encompases creating a game, Max players joining and reseting the game
     */
    test('full lobby events intergration test', (done) => {
        let LOBBYCODE; // will be used for all tests!!!
        // Request to create a new lobby  and send host nickname DTo
        const createLobbyDTO = new CreateLobbyDTO('Anmol');
        clientSocket.emit('create-lobby', createLobbyDTO);
        

        // Subscribe to lobby-code & follow on actions after
        clientSocket.on('lobby-code', (lobbyCodeDTO) => {
            LOBBYCODE = lobbyCodeDTO.code; // used for future cases
            expect(lobbyCodeDTO.code).toBeDefined();
            // add players and check if added correctly
            clientSocket.on('lobby-join', (lobbyJoinDTO) => {
                // check Max 6 players  players
                if (lobbyJoinDTO.playerNames.length === 6) {
                    console.log(lobbyJoinDTO);
                    expect(lobbyJoinDTO.playerNames).toEqual(['Anmol', 'Justin', 'Homer', 'James', 'Jen', 'Leon']);
                }
            });
            // join 5 more players to lobby
            const joinLobbyDTO = [
                new JoinLobbyDTO('Justin', LOBBYCODE),
                new JoinLobbyDTO('Homer', LOBBYCODE),
                new JoinLobbyDTO('James', LOBBYCODE),
                new JoinLobbyDTO('Jen', LOBBYCODE),
                new JoinLobbyDTO('Leon', LOBBYCODE),
            ];
            // Request to join a lobby
            joinLobbyDTO.forEach((dto) => {
                clientSocket.emit('join-lobby', dto);
            });
            // check client for max players (lobby-ready)
            clientSocket.on('lobby-ready', () => {
                console.log('MAX PLAYERS REACHED: LOBBY READY');
                // send back to reset lobby
                clientSocket.emit('reset-lobby');
            });
            // End of test !!! lobby is reset
            clientSocket.on('reset-lobby-update', () => {
                console.log('LOBBY RESET');
                done();
            });
        });
    });
});
