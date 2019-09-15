const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const dotenv = require('dotenv');
const passport = require('passport');
const passportConfig = require('./passport');

const db = require('./models');
const app = express();
const PORT = 1991;

const userAPIRouter = require('./routes/user');
const postAPIRouter = require('./routes/post');
const postsAPIRouter = require('./routes/posts');

dotenv.config();
db.sequelize.sync();
passportConfig(); 

app.use(morgan('dev'));
app.use(express.json()); // express에서 json을 처리하기 위해서 사용
app.use(express.urlencoded({ extended: true })); // form에서 넘어온 데이터를 처리하기 위해서 사용
app.use(cors());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(expressSession({
    resave: false, // 매번 새션 강제 저장
    saveUninitialized: false, // 빈 값도 저장
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true, // cookie를 자바스크립트에서 접근 못하게 막음
        secure: false, // https를 사용하면 true
    }
}));
app.use(passport.initialize());
app.use(passport.session()); // 패스포트 세션은 익스프레스 세션 아래에 있어야함!


app.use('/api/user', userAPIRouter)
app.use('/api/post', postAPIRouter)
app.use('/api/posts', postsAPIRouter)

app.listen(PORT, () => {
    console.log(`server is running... on localhost:${PORT}`)
})