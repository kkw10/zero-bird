module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', { // 테이블명 정의
        nickname: { // 세부 내용들 정의
            type: DataTypes.STRING(20), // 20글자 이하
            allowNull: false, // 필수
        },
        userId: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true, // 고유한 값
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false,
        }
    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci' // 한글 저장을 위한 설정
    })

    User.associate = (db) => { // 연관된 다른 테이블 저장
        db.User.hasMany(db.Post, { as: 'Posts' }); // User테이블은 Post테이블을 여러개 가질 수 있다.
        db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' }); // belongsToMany는 as를 달아두는 것이 좋다.
        db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followers', foreignKey: 'followingId' }); // as는 테이블 내에서 연결관계가 있을 경우 구분하기 위해서 사용한다.
        db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followings', foreignKey: 'followerId' });
        db.User.hasMany(db.Comment);
    };

    return User
}