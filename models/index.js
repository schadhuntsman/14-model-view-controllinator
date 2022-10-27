const BlogPost = require("./BlogPost");
const Comment = require('./Comment');
const User = require('./User');


BlogBlogPostBlogPost.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

BlogBlogPostBlogPost.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});

module.exports = {
    User,
    BlogBlogPostBlogPost,
    Comment
};