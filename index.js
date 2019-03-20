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

server.put('/api/users/:id', (req, res) => {
    const id = req.params.id
    console.log(id)
    const user = req.body;
    if (!user.name) {
        res.status(400).json({ error: 'Username needed' })
    } else {
        userDb
        .get(id)
        .then(users => {
            console.log(users)
            if (users.length < 1) {
                return res.status(404).json({ message: 'The user with the specified ID does not exist'})
            } else {
                userDb
                .update(id, user)
                .then(res => res.status(200).json({ user }))
                .catch(err => {
                    res.status(400).json({ error: "Did not update"})
                })
            }
        })
        .catch(err => {
            res.status(500).json({ error: "Id does not exist" })
        })
    }
})

server.post('/api/users', (req, res) => {
    const user = req.body;
    if (!user.name) {
        res.status(400).json({ error: 'Username needed' })
    } else {
        userDb
        .insert(user)
        .then(res => res.status(201).json(user))
        .catch(err => {
            res.status(500).json({ error: 'User could not be added' })
        })
    }
})