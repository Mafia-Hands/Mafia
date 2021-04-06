import socketIOClient from 'socket.io-client';

/* eslint-disable new-cap */
// Uncomment if you would like to use the deployed server
const socket = new socketIOClient('mafia-hands-backend-cd.herokuapp.com');

// Uncomment if you would like to use a local server to test server changes
// const socket = new socketIOClient('localhost:4001');

export default socket;
