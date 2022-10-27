const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
{
    // id: {
    // type: DataTypes.INTEGER,
    // allowNull: false,
    // primaryKey: true,
    // autoincrement: true
    // },
    comment_text: {
        type: DataTypes.STRING,
    },
    date_created: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
    },
},
{
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'post'
}
);

module.exports = Comment;