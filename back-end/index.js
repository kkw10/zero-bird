const express = require('express');
const db = require('./models')
const app = express();
const PORT = 1991;

const userAPIRouter = require('./routes/user');
const postAPIRouter = require('./routes/post');
const postsAPIRouter = require('./routes/posts');

db.sequelize.sync();

app.use('/api/user', userAPIRouter)

app.use('/api/post', postAPIRouter)

app.use('/api/posts', postsAPIRouter)

app.listen(PORT, () => {
    console.log(`server is running... on localhost:${PORT}`)
})