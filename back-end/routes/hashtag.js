const express = require('express');
const db = require('../models');
const router = express.Router();

router.get('/:tag', async (req, res, next) => {
    try {
        const posts = await db.Post.findAll({
            include: [{
                model: db.Hashtag,
                where: { // 주소창에 한글, 특수문자 등이 입력될 경우 대비
                    name: decodeURIComponent(req.params.tag)  
                },
            }, {
                model: db.User,
                attributes: ['id', 'nickname']
            }]
        });
        res.json(posts)

    } catch(e) {
        console.error(e)
        next()
    }
})

module.exports = router;