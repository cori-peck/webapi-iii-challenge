// code away!
const express = require('express');
const server = express();
const userDb = require('./data/helpers/userDb');

server.use(express.json())


server.listen(8000, () => console.log('Server up and running on port 8k'))


server.get('/api/users', (req, res) => {
    userDb
    .get()
    .then(users => res.status(200).json({ users }))
    .catch(err => {
        console.log(err)
        res.status(500).json({ error: 'Cannot reach user list'})
    })
})