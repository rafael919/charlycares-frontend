import io from 'socket.io-client';

const socket = io('https://charlycares-chat.herokuapp.com/', {
  transports: ['websocket'],
});
//const socket = io('http://localhost:8000/');

export default socket;
