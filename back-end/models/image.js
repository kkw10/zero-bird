module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define('Image', {
        src: { // 이미지 경로 
            type: DataTypes.STRING(200),
            allowNull: false
        }
    }, {
        carset: 'utf-8',
        collate: 'utf8_general_ci'
    })

    Image.associate = (db) => {
        db.Image.belongsTo(db.Post);
    }

    return Image;
}