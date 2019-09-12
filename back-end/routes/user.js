const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const db = require('../models');

router.get('/', (req, res) => {

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

router.get('/:id', (req, res) => {

});

router.post('/logout', (req, res) => {

});

router.post('/login', (req, res) => {

});

router.get('/:id/follow', (req, res) => {

});

router.post('/:id/follow', (req, res) => {

});

router.delete('/:id/follow', (req, res) => {

});

router.delete('/:id/follower', (req, res) => {

});

router.get('/:id/posts', (req, res) => {

});

module.exports = router;