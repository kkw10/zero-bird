const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const db = require('./models');
const app = express();
const PORT = 1991;

const userAPIRouter = require('./routes/user');
const postAPIRouter = require('./routes/post');
const postsAPIRouter = require('./routes/posts');

db.sequelize.sync();

app.use(morgan('dev'))
app.use(express.json()); // express에서 json을 처리하기 위해서 사용
app.use(express.urlencoded({ extended: true })); // form에서 넘어온 데이터를 처리하기 위해서 사용
app.use(cors())

app.use('/api/user', userAPIRouter)
app.use('/api/post', postAPIRouter)
app.use('/api/posts', postsAPIRouter)

app.listen(PORT, () => {
    console.log(`server is running... on localhost:${PORT}`)
})