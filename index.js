// code away!
const express = require('express');
const server = express();

server.use(express.json())


server.listen(8000, () => console.log('Server up and running on port 8k'))