/**
 * UnitTestHelpers contains useful set up and tear down functions for setting up a unit test.
 */
const Client = require('socket.io-client');

function setUpClient(port, done) {
    // Create a new client, and connect it to the server via a socket
    const clientSocket = new Client(`http://localhost:${port}`);
    clientSocket.on('connect', done);

    return clientSocket;
}

function cleanUpTest(io) {
    // Disconnect each socket connected to the server
    const { sockets } = io.sockets;
    sockets.forEach((socket) => {
        socket.disconnect(true);
    });
}

function cleanUpTestWithMafiaMock(MafiaGameMock, io, roomID) {
    // Disconnect each socket connected to the server
    const { sockets } = io.sockets;
    sockets.forEach((socket) => {
        socket.disconnect(true);
    });

    MafiaGameMock.resetRoom(roomID);
}

function cleanUpAllTests(socketIOServer) {
    // Close the server once all tests are done
    socketIOServer.close();
}

module.exports = {
    setUpClient,
    cleanUpTest,
    cleanUpTestWithMafiaMock,
    cleanUpAllTests,
};
