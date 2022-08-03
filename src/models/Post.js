const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
//create our post model
class Post extends Model {
    static upvote(body, models) {
        return models.Blog.create({
            user_id: body.user_id,
            post_id: body.post_id
        }).then(() => {
            return Post.findOne({
                where: {
                    id: body.post_id
                },
                
            })
        })
    }
}