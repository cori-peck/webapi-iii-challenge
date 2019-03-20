// code away!
const express = require('express');
const userDb = require('./data/helpers/userDb');
const postDb = require('./data/helpers/postDb');
const cors = require('cors');

const server = express();


server.listen(8000, () => console.log('Server up and running on port 8k'))


function upperCaseUser(req, res, next) {
    console.log(req.body)
    if (req.body.name) {
        req.body.name = req.body.name.toUpperCase();
    }
    next();
}

server.use(express.json());
server.use(cors());
server.use(upperCaseUser);


//R - Read
//** Users **//
server.get('/api/users', (req, res) => {
    userDb
    .get()
    .then(users => res.status(200).json({ users }))
    .catch(err => {
        console.log(err)
        res.status(500).json({ error: 'Cannot reach user list'})
    })
})

//** Posts **//
server.get('/api/posts', (req, res) => {
    postDb
    .get()
    .then(posts => res.status(200).json({ posts }))
    .catch(err => {
        res.status(500).json({ error: 'Cannot reach post list' })
    })
})

server.get('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    postDb
    .getById(id)
    .then(post => {
        if (post.length < 1) {
            res.status(404).json({ message: "The post for the ID does not exist" })
        } else {
            res.status(200).json({ post })
        }
    })
    .catch(err => {
        res.status(500).json({ error: "Can not get this post" })
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

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    userDb
    .getById(id)
    .then(user => {
        if (!user) {
            res.status(404).json({ message: 'User does not exist' })
        } else {
            userDb
            .remove(id)
            .then(res => {
                res.status(200).json(user)
            })
            .catch(err => {
                res.status(500).json({ error: 'User could not be removed' })
            })
        }
    })
    .catch(err => {
        res.status(500).json({ error: 'User could not be removed'})
    })
})