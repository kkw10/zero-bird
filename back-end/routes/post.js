const express = require('express');
const db = require('../models');
const router = express.Router();

router.post('/', async (req, res, next) => {  
    try {
        const hashtags = req.body.content.match(/#[^\s]+/g)
        const newPost = await db.Post.creat({
            content: req.body.content,
            UserId: req.user.id
        })

        if(hashtags) {
            const result = await Promise.all(hashtags.map(tag => db.Hashtag.findOrCreate(
                { where: { name: tag.slice(1).toLowerCase() } }
            )))
            console.log(result);
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
        res.json(fullPost);

    } catch(e) {
        console.log(e);
        next(e);
    } 
});

router.post('/images', (req, res) => {

});

module.exports = router;