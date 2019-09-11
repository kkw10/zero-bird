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
        charset: 'utf-8',
        collate: 'utf8-_general_ci' // 한글 저장을 위한 설정
    })

    User.associate = (db) => { // 연관된 다른 테이블 저장
        db.User.hasMany(db.Post); // User테이블은 Post테이블을 여러개 가질 수 있다.
        db.User.hasMany(db.Comment);
    };

    return User
}