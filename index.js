const express = require('express');
const server = express();

const writeEnvFile = require('./lib/writeEnvFile');

const socketServerUrl = process.env.SOCKET_SERVER || 'ws://localhost:3000'
writeEnvFile(socketServerUrl, require('fs'));

// Serve /static
server.use(express.static('static'));

const port = process.env.PORT || 3001;
server.listen(port);
console.log('listening on port', port);
