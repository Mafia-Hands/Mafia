const app = require('express')();
const server = require('http').createServer(app);
const config = require('./config.json');
const MafiaGame = require('./domain/MafiaGame');

const loadLobbyEvents = require('./Events/LobbyEvents');
const loadVoteEvents = require('./Events/VoteEvents');
const loadGameStartEvents = require('./Events/GameStartEvents');
const { loadNightTimeEvents } = require('./Events/NightTimeVoteEvents');
const loadStateChangeEvents = require('./Events/GameStateEvents/StateChangeEvents');

const io = require('socket.io')(server, {
    // Set up of CORS settings for socket.io server
    // Reason for all site access is for the ease of development, since we might have various local/cloud website setup for testing purposes.
    // While allowing all origins may pose a security thread for a banking website, as any site can make a request using the same session
    // This won't be a problem in our website, as there are no local session/cookies returned to the user.
    // Please refer to the post: https://stackoverflow.com/questions/12001269/what-are-the-security-risks-of-setting-access-control-allow-origin
    cors: {
        origin: config.cors_origin, // Allow all origin to connect to the website
    },
});

const port = process.env.PORT || config.local_port;

const mafiaGame = new MafiaGame();

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

// Listen for a "connection" event for incoming sockets.
io.on('connection', (socket) => {
    // this function catches any lobby events sent from client
    loadLobbyEvents(io, socket, mafiaGame);

    // this function catches any vote events sent from client
    loadVoteEvents(io, socket, mafiaGame);

    // this function catches any game starts event sent from client
    loadGameStartEvents(io, socket, mafiaGame);

    // this function catches any events related to mafia/medic/detective votes during the night
    loadNightTimeEvents(io, socket, mafiaGame);

    // this function catches events that relate to game state changes
    loadStateChangeEvents(io, socket, mafiaGame);
});

// Start the server on our predetermined port number.
server.listen(port, () => {
    console.log(`Listening on *:${port}`);
});

// Export the server for testing
exports.server = server;
exports.io = io;
