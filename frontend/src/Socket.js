import socketIOClient from 'socket.io-client';

/* eslint-disable new-cap */
const socket = new socketIOClient('mafia-hands-backend-cd.herokuapp.com');

// uncomment this for backend development
// const socket = new socketIOClient('localhost:4001');

export default socket;
