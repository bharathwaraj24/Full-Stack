const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

let users = {};
let nextId = 1;

app.get('/users', (req,res) => {
    res.json(Object.values(users));
});

app.get('/users/:id', (req,res) => {
    const user = users[req.params.id];
    if(user){
        res.json(user);
    }else{
        res.status(404).send('User not found!');
    }
});

app.post('/users', (req,res) => {
    const user = req.body;
    user.id = nextId++;
    users[user.id] = user;
    res.status(201).json(user);
})

app.put('/users/:id', (req,res) => {
    const id = req.params.id;
    if(users[id]){
        users[id] = { ...users[id], ...req.body};
        res.json(users[id]);
    }else{
        res.status(404).send('User not found!');
    }
});

app.delete('/users/:id', (req,res) => {
    const id = req.params.id;
    if(users[id]){
        delete users[id];
        res.status(204).send();
    }else{
        res.status(404).send('User not found!');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});