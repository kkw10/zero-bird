const express = require('express');
const next = require('next');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const dotenv = require('dotenv')

// 동적 URL을 위해서 express와 next를 연결한다. (next8은 동적 URL을 지원하지 않음)
// 즉 next를 통해서 express를 돌리는 방법임.
// (단 next9버전 부터는 next자체에서 동적 URL을 지원한다고하니 참고 할 것!)

const PORT = 1990;
const dev = process.env.NODE_ENV !== 'production';
const prod = process.env.NODE_ENV === 'production';

const app = next({ dev });
const handle = app.getRequestHandler();
dotenv.config();

app.prepare().then(() => {
    const server = express();
    server.use(morgan('dev'));
    server.use(express.json());
    server.use(express.urlencoded({ extended: true }))
    server.use(cookieParser(process.env.COOKIE_SECRET))
    server.use(expressSession({
        resave: false,
        saveUninitialized: false,
        secret: '',
        cookie: {
            httpOnly: true,
            secure: false
        }
    }))

    server.get('/hashtag/:tag', (req, res) => {
        return app.render(req, res, '/hashtag', { tag: req.params.tag });
    })

    server.get('/user/:id', (req, res) => {
        return app.render(req, res, '/user', { id: req.params.id });
    })

    server.get('*', (req, res) => {
        return handle(req, res);
    })

    server.listen(PORT, () => {
        console.log(`Front-end server is running... on localhost:${PORT}`)
    })
})