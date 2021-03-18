const Client = require('socket.io-client');
const CreateLobbyDTO = require('../domain/DTO/request/CreateLobbyDTO');
const JoinLobbyDTO = require('../domain/DTO/request/JoinLobbyDTO');
const VoteForDTO = require('../domain/DTO/request/VoteForDTO');
const config = require('../config.json');
const SocketIOServer = require('../index');

describe('Create-lobby event test', () => {
    let clientSocket;
    const port = process.env.PORT || config.local_port;

    beforeEach((done) => {
        clientSocket = new Client(`http://localhost:${port}`);
        clientSocket.on('connect', done);
    });

    // Disconnect each socket connected to the server
    afterEach((done) => {
        const { sockets } = SocketIOServer.io.sockets;

        // Iterate through each connected client and disconnect them.
        sockets.forEach((socket, key) => {
            socket.disconnect(true);
        });

        done();
    });

    // Close the server once all tests are done
    afterAll(() => {
        SocketIOServer.server.close();
    });

    test('Simple create lobby events', (done) => {
        const createLobbyDTO = new CreateLobbyDTO('Anmol');

        // Subscribe to lobby-code
        clientSocket.on('lobby-code', (lobbyCodeDTO) => {
            expect(lobbyCodeDTO.code).toBeDefined();
            done();
        });

        // Request to create a new lobby
        clientSocket.emit('create-lobby', createLobbyDTO);
    });

    test('Two hosts with two rooms', (done) => {
        const createLobbyDTO = new CreateLobbyDTO('Anmol');

        // Client 1 to subscribe to lobby-code
        clientSocket.on('lobby-code', (lobbyCodeDTO) => {
            expect(lobbyCodeDTO.code).toBeDefined();
            // Wait for the other client to throw errors, if there are any.
            setTimeout(() => {
                done();
            }, 1000);
        });

        const clientSocket2 = new Client(`http://localhost:4001`);
        // Client 2 to subscribe to lobby-code
        clientSocket2.on('lobby-code', (lobbyCodeDTOString) => {
            throw new Error("Client 2 shouldn't receive a lobby code");
        });

        // Request to create a new lobby
        clientSocket.emit('create-lobby', createLobbyDTO);
    });

    test('Host starts game event', (done) => {
        const createLobbyDTO = new CreateLobbyDTO('Anmol');

        // Request to create a new lobby
        // this will set the socket id to the host to be tested.
        clientSocket.emit('create-lobby', createLobbyDTO);

        // Subscribe to game start event
        // server should send this event back once host clicks start.
        // Client to subscribe to "game-start"
        clientSocket.on('game-start', () => {
            done();
        });

        // Request to server that game is ready to be started.
        clientSocket.emit('start-game');
    });

    test('Reset lobby', (done) => {
        const createLobbyDTO = new CreateLobbyDTO('Anmol');

        // Subscribe to lobby-code
        clientSocket.on('lobby-code', (lobbyCodeDTO) => {
            expect(lobbyCodeDTO.code).toBeDefined();
            // Only emit reset-lobby once lobby code has been received
            clientSocket.emit('reset-lobby');
        });

        // Finish test once reset-lobby-update has been received
        clientSocket.on('reset-lobby-update', () => {
            done();
        });

        // Request to create a new lobby
        clientSocket.emit('create-lobby', createLobbyDTO);
    });

    let lobbyCode;
    test('join lobby', (done) => {
        const createLobbyDTO = new CreateLobbyDTO('Anmol');

        clientSocket.on('lobby-code', (lobbyCodeDTO) => {
            expect(lobbyCodeDTO.code).toBeDefined();
            lobbyCode = lobbyCodeDTO.code;

            const joinLobbyDTO = new JoinLobbyDTO('Justin', lobbyCode);

            // Subscribe to lobby-join
            clientSocket.on('lobby-join', (lobbyJoinDTO) => {
                expect(lobbyJoinDTO.playerNames.length).toBe(2);
                expect(lobbyJoinDTO.playerNames).toEqual(['Anmol', 'Justin']);
                done();
            });

            // Request to join a lobby
            clientSocket.emit('join-lobby', joinLobbyDTO);
        });

        // Request to create a new lobby
        clientSocket.emit('create-lobby', createLobbyDTO);
    });

    test('join lobby 2', (done) => {
        const joinLobbyDTO = new JoinLobbyDTO('Homer', lobbyCode);

        // Subscribe to lobby-join
        clientSocket.on('lobby-join', (lobbyJoinDTO) => {
            expect(lobbyJoinDTO.playerNames.length).toBe(3);
            expect(lobbyJoinDTO.playerNames).toEqual(['Anmol', 'Justin', 'Homer']);
            done();
        });

        // Request to join a lobby
        clientSocket.emit('join-lobby', joinLobbyDTO);
    });

    test('day vote test', (done) => {
        const createLobbyDTO = new CreateLobbyDTO('Anmol');

        clientSocket.on('lobby-code', (lobbyCodeDTO) => {
            expect(lobbyCodeDTO.code).toBeDefined();
            lobbyCode = lobbyCodeDTO.code;

            const joinLobbyDTO = new JoinLobbyDTO('Justin', lobbyCode);

            // Subscribe to lobby-join
            clientSocket.on('lobby-join', (lobbyJoinDTO) => {
                expect(lobbyJoinDTO.playerNames.length).toBe(2);
                expect(lobbyJoinDTO.playerNames).toEqual(['Anmol', 'Justin']);
                done();
            });

            // Subscribe to day-vote-update
            clientSocket.on('day-vote-update', (listVoteDTO) => {
                // Justin vote for Justin because nickname of clientSocket is Justin since thats the last joined player
                expect(listVoteDTO.voteMap.Justin).toBeInstanceOf(Object);
                done();
            });

            // Request to join a lobby
            clientSocket.emit('join-lobby', joinLobbyDTO);

            // vote test begins
            const voteForDTO = new VoteForDTO('Justin');
            clientSocket.emit('day-vote', voteForDTO);
        });

        // Request to create a new lobby
        clientSocket.emit('create-lobby', createLobbyDTO);
    });

    test('trial vote test', (done) => {
        const createLobbyDTO = new CreateLobbyDTO('Anmol');

        clientSocket.on('lobby-code', (lobbyCodeDTO) => {
            expect(lobbyCodeDTO.code).toBeDefined();
            const lobbyCode = lobbyCodeDTO.code;

            const joinLobbyDTO = new JoinLobbyDTO('Justin', lobbyCode);

            // Subscribe to lobby-join
            clientSocket.on('lobby-join', (lobbyJoinDTO) => {
                expect(lobbyJoinDTO.playerNames.length).toBe(2);
                expect(lobbyJoinDTO.playerNames).toEqual(['Anmol', 'Justin']);
                done();
            });

            // Request to join a lobby
            clientSocket.emit('join-lobby', joinLobbyDTO);

            // vote test begins
            const voteForDTO = new VoteForDTO('Justin');
            clientSocket.emit('trial-vote', voteForDTO);

            // Subscribe to day-vote-update
            clientSocket.on('trial-vote-update', (listVoteDTO) => {
                // Justin vote for Justin because nickname of clientSocket is Justin since thats the last joined player
                expect(listVoteDTO.voteMap.Justin).toBeInstanceOf(Object);
                done();
            });
        });

        // Request to create a new lobby
        clientSocket.emit('create-lobby', createLobbyDTO);
    });
});
