const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class BlogBlogPostBlogPost extends Model {}

BlogBlogPostBlogPost.init(
    {

        name: {
            type: DataTypes.STRING,
        },

        post_content: {
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
        modelName: 'BlogBlogPostentry',
    }    
);

module.exports = BlogBlogPostBlogPost;