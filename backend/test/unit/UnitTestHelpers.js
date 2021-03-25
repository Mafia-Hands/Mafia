const Client = require('socket.io-client');

function setUpClient(port, done) {
    // Create a new client, and connect it to the server via a socket
    const clientSocket = new Client(`http://localhost:${port}`);
    clientSocket.on('connect', done);

    return clientSocket;
}

function cleanUpTest(MafiaGameMock, roomElements) {
    // Disconnect each socket connected to the server
    const { sockets } = roomElements.io.sockets;
    sockets.forEach((socket) => {
        socket.disconnect(true);
    });

    MafiaGameMock.resetRoom(roomElements.roomID);
}

function cleanUpAllTests(roomElements) {
    // Close the server once all tests are done
    roomElements.socketIOServer.close();
}

module.exports = {
    setUpClient,
    cleanUpTest,
    cleanUpAllTests,
};
