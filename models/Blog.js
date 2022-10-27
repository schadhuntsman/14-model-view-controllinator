const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class BlogBlogPost extends Model {}

BlogBlogPost.init(

  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
    }
    },

    content: {
      type: DataTypes.TEXT,
      allowNull: false,
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

module.exports = BlogBlogPost;
