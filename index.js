const express = require('express');
const server = express();

server.use(express.static('static'));

const port = process.env.PORT || 3001;
server.listen(port);
console.log('listening on port', port);
