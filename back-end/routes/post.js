const express = require('express');
const db = require('../models');
const router = express.Router();
const { isLoggedIn } = require('./middleware');

router.post('/', isLoggedIn, async (req, res, next) => {  
    try {
        const hashtags = req.body.content.match(/#[^\s]+/g)
        const newPost = await db.Post.create({
            content: req.body.content,
            UserId: req.user.id
        })

        if(hashtags) {
            const result = await Promise.all(hashtags.map(tag => db.Hashtag.findOrCreate(
                { where: { name: tag.slice(1).toLowerCase() } }
            )))
            
            await newPost.addHashtags(result.map(r => r[0])) // add~ 함수는 시퀄라이즈에서 associate를 참조하여 자동생성해주는 함수임.
        }

        // const User = await newPost.getUser(); // way1 : 시퀄라이즈 자동 생성함수(get~) 사용
        // newPost.User = User;
        // res.json(newPost);
        const fullPost = await db.Post.findOne({ // way2 : 직접 불러오기
            where: { id: newPost.id },
            include: [{
                model: db.User,
                attributes: ['id', 'nickname']
            }], 
            order: [['createdAt', 'DESC']] // 내림차순 정렬
        })
        console.log(fullPost);
        res.json(fullPost);

    } catch(e) {
        console.log(e);
        next(e);
    } 
});

router.post('/images', (req, res) => {

});

router.get('/:id/comments', async (req, res, next) => {
    try { // 댓글을 가져오기 전에는 항상 포스트가 있는지부터 확인한다.
        console.log(`CHECK!!! : ${req.params.id}`)
        const post = await db.Post.findOne({ where: { id: req.params.id } })
        if(!post) { 
            return res.status(404).send('포스트가 존재하지 않습니다.')
        }
        
        const comments = await db.Comment.findAll({
            where: {
                PostId: req.params.id
            },
            order: [['createdAt', 'ASC']],
            include: [{
                model: db.User,
                attributes: ['id', 'nickname']
            }]
        })
        res.json(comments)

    } catch(e) {
        console.error(e);
        next(e);
    }
})

router.post('/:id/comment', isLoggedIn, async (req, res, next) => {
    try {
        const post = await db.Post.findOne({
            where: { id: req.params.id }
        })
        if(!post) {
            return res.status(404).send('포스트가 존재하지 않습니다.')
        }

        const newComment = await db.Comment.create({
            PostId: post.id,
            UserId: req.user.id,
            content: req.body.content
        })
        await post.addComment(newComment.id);

        const comment = await db.Comment.findOne({ // include를 위해서 다시 조회
            where: {
                id: newComment.id,
            },
            include: [{
                model: db.User,
                attributes: ['id', 'nickname']
            }]
        })

        return res.json(comment);

    } catch(e) {
        console.error(e);
        return next(e);
    }
})

module.exports = router;