import socketIOClient from 'socket.io-client';

// const socket = new socketIOClient('mafia-hands-backend-cd.herokuapp.com');
const socket = new socketIOClient('localhost:3000');

export default socket;
