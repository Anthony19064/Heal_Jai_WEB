// src/socket.js
import io from 'socket.io-client';
const API = import.meta.env.VITE_API_URL; // ที่อยู่ server socket ของคุณ

const socket = io(API);

export default socket;
