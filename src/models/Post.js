const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
    {
        title:DataTypes.STRING,
        post_url: DataTypes.STRING
    },
    
    {
        sequelize
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