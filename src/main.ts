import http from 'http';
import ws from 'socket.io';
import express from 'express';

const server = http.createServer(express());
const io = new ws.Server(server, {
  transports: ['websocket'],
});

io.on('connect', (socket) => {
  socket.emit('welcome', { connectedAt: new Date() });

  socket.on('disconnect', () => {
    console.log('disconnect', socket.id);
  });

  socket.on('hi', () => socket.emit('welcome', { connectedAt: new Date() }));
  socket.on('hello', () => socket.emit('welcome', { connectedAt: new Date() }));
});

server.listen(3001, () => {
  console.log(`Socket IO server running on port ${3001}`);
});
