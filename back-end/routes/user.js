const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const db = require('../models');
const passport = require('passport')
const { isLoggedIn } = require('./middleware');

router.get('/', isLoggedIn, (req, res) => {
    const user = Object.assign({}, req.user.toJSON());
    delete user.password;
    res.json(user);
});

router.post('/', async (req, res, next) => { // 회원가입 라우터
    try {
        const exUser = await db.User.findOne({ // 이미 있는 아이디인지 조회
            where: {
                userId:req.body.userId,
            }    
        })

        if (exUser) {
            return res.status(403).send('이미 사용중인 아이디입니다.')
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 12) // 비밀번호 암호화
        const newUser = await db.User.create({ // db에 새 유저 추가
            nickname: req.body.nickname,
            userId: req.body.userId,
            password: hashedPassword
        })

        console.log(newUser)

        return res.status(200).json(newUser) // 프론트로 확인 응답

    } catch(e) {
        console.error(e);
        return next(e); 
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const user = await db.User.findOne({
            where: {id: parseInt(req.params.id, 10)},
            include: [
                {   model: db.Post,
                    as: 'Posts',
                    attributes: ['id']
                }, {
                    model: db.User,
                    as: 'Followings',
                    attributes: ['id']
                }, {
                    model: db.User,
                    as: 'Followers',
                    attributes: ['id']
                }

            ],            
            attributes: ['id', 'nickname']
        })
        const jsonUser = user.toJSON();
        jsonUser.Posts = jsonUser.Posts ? jsonUser.Posts.length : 0;
        jsonUser.Followings = jsonUser.Followings ? jsonUser.Followings.length : 0;
        jsonUser.Followers = jsonUser.Followers ? jsonUser.Followers.length : 0;
        res.json(jsonUser);

    } catch(e) {
        console.log(e)
        next(e)
    }
});

router.post('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.send('Logout success!');
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if(err) {
            console.error(err);
            return next(err);
        }

        if(info) {
            return res.status(401).json(info.reason);
        }

        return req.login(user, async (loginErr) => {
            try {
                if(loginErr) {
                    return next(loginErr);
                }

                const fullUser = await db.User.findOne({
                    where: { id: user.id },
                    include: [{
                        model: db.Post,
                        as: 'Posts',
                        attributes: ['id']
                    }, {
                        model: db.User, 
                        as: 'Followings',
                        attributes: ['id']
                    }, {
                        model: db.User, 
                        as: 'Followers',
                        attributes: ['id']
                    }],
                    attributes: ['id', 'nickname', 'userId']
                })
                console.log(fullUser);
                return res.json(fullUser);
            } catch(e) {
                next(e)
            }

            // console.log('login success', req.user);

            // const filteredUser = Object.assign({}, user.toJSON());
            // delete filteredUser.password;
            // return res.json(filteredUser);
        })

    })(req, res, next)
});

router.get('/:id/follow', (req, res) => {

});

router.post('/:id/follow', (req, res) => {

});

router.delete('/:id/follow', (req, res) => {

});

router.delete('/:id/follower', (req, res) => {

});

router.get('/:id/posts', async (req, res, next) => {
    try {
        const posts = await db.Post.findAll({
            where: {
                UserId: parseInt(req.params.id, 10),
                RetweetId: null
            },
            include: [{
                model: db.User,
                attributes: ['id', 'nickname']
            }]
        })
        res.json(posts);

    } catch(e) {
        console.error(e);
        next(e);
    }
});

module.exports = router;