
// const express = require("express");

// const PORT = process.env.PORT || 3001;

// const app = express();

// app.listen(PORT, () => {
//   console.log(`Server listening on ${PORT}`);
// });

const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const { default: vision } = require("./vision");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Run when client connects
io.on('connection', socket => {
    console.log('New WS Connection...')
});

const PORT = 3001 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))

require("./vision");
require("./firebase");