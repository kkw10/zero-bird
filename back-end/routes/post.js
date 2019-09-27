const express = require('express');
const path = require('path');
const db = require('../models');
const multer = require('multer'); // body parser로는 form data를 파싱할 수 없음
const router = express.Router();
const { isLoggedIn } = require('./middleware'); 
const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {
            done(null, 'uploads')
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname);
            const basename = path.basename(file.originalname, ext); // ex) zero.png => ext === .png, basename === zero
            done(null, basename + new Date().valueOf() + ext); // 파일명 중복 방지를 위함
        },
        limits: { fileSize: 20 * 1024 * 1024 } // 20mb로 파일크기 제한 
    })
})

// 이미지 업로드의 경우 주소만 받기 때문에 upload.none()을 사용한다.ㄴ
router.post('/', isLoggedIn, upload.none(), async (req, res, next) => {  
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

        if(req.body.image) {
            if(Array.isArray(req.body.image)) { // 이미지 주소를 여러개 올린 경우 (multer의 단점임)
                const images = await Promise.all(req.body.image.map((image) => {
                    return db.Image.create({ src: image })
                }));
                await newPost.addImages(images);

            } else {
                const image = await db.Image.create({ // 이미지 주소를 하나 올린 경우
                    src: req.body.image
                });
                await newPost.addImage(image);
            }
        }

        // const User = await newPost.getUser(); // way1 : 시퀄라이즈 자동 생성함수(get~) 사용
        // newPost.User = User;
        // res.json(newPost);
        const fullPost = await db.Post.findOne({ // way2 : 직접 불러오기
            where: { id: newPost.id },
            include: [{
                model: db.User,
                attributes: ['id', 'nickname']
            }, {
                model: db.Image
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

// 이미지를 한장만 올린다면 upload.single()
// etc. upload.fields([{name: 'a'}, {name: 'b'}]) => 이미지 형식이 여러가지가 있을 경우
// etc. upload.none() => 이미지나 파일을 하나도 올리지 않을 경우
router.post('/images', upload.array('image'), (req, res) => {
    console.log(req.files);
    res.json(req.files.map(v => v.filename))
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

router.post('/:id/like', isLoggedIn, async (req, res, next) => {
    try {
        const post = await db.Post.findOne({
            where: { id: req.params.id }
        })

        if(!post) {
            return res.status(404).send('포스트가 존재하지 않습니다.')
        }

        await post.addLiker(req.user.id);
        res.json({ userId: req.user.id });

    } catch(e) {
        console.error(e);
        next(e);
    }
})

router.delete('/:id/like', isLoggedIn, async (req, res, next) => {
    try {
        const post = await db.Post.findOne({
            where: { id: req.params.id }
        })

        if(!post) {
            return res.status(404).send('포스트가 존재하지 않습니다.')
        }

        await post.removeLiker(req.user.id);
        res.json({ userId: req.user.id });

    } catch(e) {
        console.error(e);
        next(e);
    }
})

router.post('/:id/retweet', isLoggedIn, async (req, res, next) => {
    try {
        const post = await db.Post.findOne({
            where: { id: req.params.id },
            include: [{
                model: db.Post,
                as: 'Retweet'
            }]
        })

        if(!post) {
            return res.status(404).send('포스트가 존재하지 않습니다.')
        }

        if(req.user.id === post.UserId || (post.Retweet && post.Retweet.UserId === req.user.id)) {
            return res.status(403).send('자신의 글은 리트윗할 수 없습니다.')
        }

        const retweetTargetId = post.RetweetId || post.id // 리트윗한 게시글을 다시 리트윗 || 원본 게시글을 리트윗
        const exPost = await db.Post.findOne({
            where: {
                UserId: req.user.id,
                RetweetId: retweetTargetId
            }
        })

        if(exPost) {
            return res.status(403).send('이미 리트윗한 게시글입니다.')
        }

        const retweet = await db.Post.create({
            UserId: req.user.id,
            RetweetId: retweetTargetId,
            content: 'retweet' // DB에서 content가 null값이면 안되게 설정했으므로 아무 글이나 넣는다.
        })

        const retweetWithPrevPost = await db.Post.findOne({
            where: { id: retweet.id },
            include: [{
                model: db.User,
                attributes: ['id', 'nickname']
            }, {
                model: db.Post,
                as: 'Retweet',
                include: [{
                    model: db.User,
                    attributes: ['id', 'nickname']
                }, {
                    model: db.Image
                }]
            }]
        })

        res.json(retweetWithPrevPost);

    } catch(e) {
        console.error(e);
        next(e);
    }
})

router.delete('/:id', isLoggedIn, async (req, res, next) => {
    try {
        const post = await db.Post.findOne({
            where: { id: req.params.id }
        })

        if(!post) {
            return res.status(404).send('포스트가 존재하지 않습니다.')
        }

        await db.Post.destroy({ 
            where: { id: req.params.id }
         })

         res.send(req.params.id);

    } catch(e) {
        console.error(e);
        next(e);
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const post = await db.Post.findOne({
            where: { id: req.params.id },
            include: [{
                model: db.User,
                attributes: ['id', 'nickname']
            }, {
                model: db.Image
            }]
        })
        
        res.json(post);
        
    } catch(e) {
        console.error(e);
        next(e)
    }
})

module.exports = router;