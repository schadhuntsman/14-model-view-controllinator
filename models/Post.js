const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class BlogPost extends Model {}


    BlogPost.init(
        {
            name: {
                type: DataTypes.STRING,
            },

            post_content: {
                type: DataTypes.STRING,
            },

            date_created: {
                type: DataTypes.DATE,
                allowNull: false,
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
)

module.exports = BlogPost;