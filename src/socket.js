import { io } from 'socket.io-client';

// Change this URL to your backend when ready
const socket = io('http://localhost:5000');

export default socket;
