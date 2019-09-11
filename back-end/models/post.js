module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
        content: {
            type: DataTypes.TEXT, // 매우 긴 글( 글자 수가 몇 글자인지 모를경우 )
            allowNull: false
        }
    }, {
        charset: 'utf8mb4', // 한글 + 이모티콘
        collate: 'utf8mb4_general_ci'
    })

    Post.associate = (db) => {
        db.Post.belongsTo(db.User); // Post 테이블에  User 테이블의 UserId를 저장함
        db.Post.hasMany(db.Comment);
        db.Post.hasMany(db.Image);
        db.Post.belongsTo(db.Post); // 게시글을 리트윗 할 경우
    }

    return Post;
}