const { INTEGER } = require('sequelize');
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            AutoIncrement: true
        },
        title: {
            DataTypes: STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        content: {
            DataTypes: STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },

        user_id: {
            DataTypes: INTEGER,
            reference: {
                model: 'user',
                key: 'id'
            }
            }
        },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'post'
    }
)
//create our post model
// class Post extends Model {
//     static upvote(body, models) {
//         return models.Blog.create({
//             user_id: body.user_id,
//             post_id: body.post_id
//         }).then(() => {
//             return Post.findOne({
//                 where: {
//                     id: body.post_id
//                 },
                
//             })
//         })
//     }
// }

module.exports = Post;