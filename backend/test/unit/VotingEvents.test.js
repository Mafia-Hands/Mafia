const Client = require('socket.io-client');
const CreateLobbyDTO = require('../../domain/DTO/request/CreateLobbyDTO');
const JoinLobbyDTO = require('../../domain/DTO/request/JoinLobbyDTO');
const VoteForDTO = require('../../domain/DTO/request/VoteForDTO');
const config = require('../../config.json');
const SocketIOServer = require('../../index');

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

describe('voting-events tests', () => {
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
                expect(listVoteDTO).toEqual({ voteMap: { Justin: 'Justin' } });
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
                expect(listVoteDTO).toEqual({ voteMap: { Justin: 'Justin' } });
                done();
            });
        });

        // Request to create a new lobby
        clientSocket.emit('create-lobby', createLobbyDTO);
    });
});
