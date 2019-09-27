const express = require('express');
const db = require('../models');
const router = express.Router();

router.get('/:tag', async (req, res, next) => {
    try {
        let where = {}

        if(parseInt(req.query.lastId, 10)) {
            where = {
                id: {
                    [db.Sequelize.Op.lt]: parseInt(req.query.lastId, 10)
                }
            }
        }

        const posts = await db.Post.findAll({
            where,
            include: [{
                model: db.Hashtag,
                where: { // 주소창에 한글, 특수문자 등이 입력될 경우 대비
                    name: decodeURIComponent(req.params.tag)  
                },
            }, {
                model: db.User,
                attributes: ['id', 'nickname']
            }, {
                model: db.Image
            }, {
                model: db.User,
                through: 'Like',
                as: 'Likers',
                attributes: ['id']
            }, {
                model: db.Post,
                as: 'Retweet',
                include: [{
                    model: db.User,
                    attributes: ['id', 'nickname']
                }, {
                    model: db.Image
                }]
            }],
            order: [['createdAt', 'DESC']],
            limit: parseInt(req.query.limit, 10)
        });
        res.json(posts)

    } catch(e) {
        console.error(e)
        next()
    }
})

module.exports = router;