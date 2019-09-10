const express = require('express');

const app = express();
const PORT = 1991;

app.get('/', (req, res) => {
    res.send('Hello, server')
})

app.get('/about', (req, res) => {
    res.send("I'm Koon")
})

app.listen(PORT, () => {
    console.log(`server is running... on localhost:${PORT}`)
})