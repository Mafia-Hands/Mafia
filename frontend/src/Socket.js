import socketIOClient from 'socket.io-client';

const socket = new socketIOClient('mafia-hands-backend-cd.herokuapp.com');
// const socket = new socketIOClient('localhost:4001');

export default socket;
