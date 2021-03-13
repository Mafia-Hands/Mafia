import socketIOClient from 'socket.io-client';

const socket = new socketIOClient('http://localhost:3000/');

export default socket;
