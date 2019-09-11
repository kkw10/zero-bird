const express = require('express');
const db = require('./models')
const app = express();
const PORT = 1991;

db.sequelize.sync();

app.get('/', (req, res) => {
    res.send('Hello, server')
})

app.get('/about', (req, res) => {
    res.send("I'm Koon")
})

app.listen(PORT, () => {
    console.log(`server is running... on localhost:${PORT}`)
})