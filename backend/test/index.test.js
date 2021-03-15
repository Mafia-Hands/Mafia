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
        clientSocket = new Client(`http://localhost:` + port);
        clientSocket.on('connect', done);
    });

    // Disconnect each socket connected to the server
    afterEach((done) => {
        var sockets = SocketIOServer.io.sockets.sockets;

        // Iterate through each connected client and disconnect them.
        sockets.forEach(function (socket, key) {
            socket.disconnect(true);
        });

        done();
    });

    // Close the server once all tests are done
    afterAll(() => {
        SocketIOServer.server.close();
    });

    test('Simple create lobby events', (done) => {
        let createLobbyDTO = new CreateLobbyDTO('Anmol');

        // Subscribe to lobby-code
        clientSocket.on('lobby-code', (lobbyCodeDTO) => {
            expect(lobbyCodeDTO.code).toBeDefined();
            done();
        });

        // Request to create a new lobby
        clientSocket.emit('create-lobby', createLobbyDTO);
    });

    test('Two hosts with two rooms', (done) => {
        let createLobbyDTO = new CreateLobbyDTO('Anmol');

        // Client 1 to subscribe to lobby-code
        clientSocket.on('lobby-code', (lobbyCodeDTO) => {
            expect(lobbyCodeDTO.code).toBeDefined();
            // Wait for the other client to throw errors, if there are any.
            setTimeout(function () {
                done();
            }, 1000);
        });

        let clientSocket2 = new Client(`http://localhost:4001`);
        // Client 2 to subscribe to lobby-code
        clientSocket2.on('lobby-code', (lobbyCodeDTOString) => {
            throw new Error("Client 2 shouldn't receive a lobby code");
        });

        // Request to create a new lobby
        clientSocket.emit('create-lobby', createLobbyDTO);
    });

    test('Reset lobby', (done) => {
        let createLobbyDTO = new CreateLobbyDTO('Anmol');

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
        let createLobbyDTO = new CreateLobbyDTO('Anmol');

        clientSocket.on('lobby-code', (lobbyCodeDTO) => {
            expect(lobbyCodeDTO.code).toBeDefined();
            lobbyCode = lobbyCodeDTO.code;

            let joinLobbyDTO = new JoinLobbyDTO('Justin', lobbyCode);

            // Subscribe to lobby-join
            clientSocket.on('lobby-join', (lobbyJoinDTO) => {
                expect(lobbyJoinDTO.players.length).toBe(2);
                expect(lobbyJoinDTO.players).toEqual(['Anmol', 'Justin']);
                done();
            });

            // Request to join a lobby
            clientSocket.emit('join-lobby', joinLobbyDTO);
        });

        // Request to create a new lobby
        clientSocket.emit('create-lobby', createLobbyDTO);
    });

    test('join lobby 2', (done) => {
        let joinLobbyDTO = new JoinLobbyDTO('Homer', lobbyCode);

        // Subscribe to lobby-join
        clientSocket.on('lobby-join', (lobbyJoinDTO) => {
            expect(lobbyJoinDTO.players.length).toBe(3);
            expect(lobbyJoinDTO.players).toEqual(['Anmol', 'Justin', 'Homer']);
            done();
        });

        // Request to join a lobby
        clientSocket.emit('join-lobby', joinLobbyDTO);
    });

    test('day vote test', (done) => {
        let createLobbyDTO = new CreateLobbyDTO('Anmol');

        clientSocket.on('lobby-code', (lobbyCodeDTO) => {
            expect(lobbyCodeDTO.code).toBeDefined();
            lobbyCode = lobbyCodeDTO.code;

            let joinLobbyDTO = new JoinLobbyDTO('Justin', lobbyCode);

            // Subscribe to lobby-join
            clientSocket.on('lobby-join', (lobbyJoinDTO) => {
                expect(lobbyJoinDTO.players.length).toBe(2);
                expect(lobbyJoinDTO.players).toEqual(['Anmol', 'Justin']);
                done();
            });

            // Request to join a lobby
            clientSocket.emit('join-lobby', joinLobbyDTO);

            //vote test begins
            let voteForDTO = new VoteForDTO('Justin');
            clientSocket.emit('day-vote', voteForDTO);

            // Subscribe to day-vote-update
            clientSocket.on('day-vote-update', (listVoteDTO) => {
                //Justin vote for Justin because nickname of clientSocket is Justin since thats the last joined player
                expect(listVoteDTO).toEqual({ voteMap: { Justin: 'Justin' } });
                done();
            });
        });

        // Request to create a new lobby
        clientSocket.emit('create-lobby', createLobbyDTO);
    });

    test('trail vote test', (done) => {
        let createLobbyDTO = new CreateLobbyDTO('Anmol');

        clientSocket.on('lobby-code', (lobbyCodeDTO) => {
            expect(lobbyCodeDTO.code).toBeDefined();
            lobbyCode = lobbyCodeDTO.code;

            let joinLobbyDTO = new JoinLobbyDTO('Justin', lobbyCode);

            // Subscribe to lobby-join
            clientSocket.on('lobby-join', (lobbyJoinDTO) => {
                expect(lobbyJoinDTO.players.length).toBe(2);
                expect(lobbyJoinDTO.players).toEqual(['Anmol', 'Justin']);
                done();
            });

            // Request to join a lobby
            clientSocket.emit('join-lobby', joinLobbyDTO);

            //vote test begins
            let voteForDTO = new VoteForDTO('Justin');
            clientSocket.emit('trial-vote', voteForDTO);

            // Subscribe to day-vote-update
            clientSocket.on('trial-vote-update', (listVoteDTO) => {
                //Justin vote for Justin because nickname of clientSocket is Justin since thats the last joined player
                expect(listVoteDTO).toEqual({ voteMap: { Justin: 'Justin' } });
                done();
            });
        });

        // Request to create a new lobby
        clientSocket.emit('create-lobby', createLobbyDTO);
    });
});
