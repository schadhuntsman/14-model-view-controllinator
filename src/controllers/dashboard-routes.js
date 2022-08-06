const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment, Blog } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', withAuth, (req, res) => {
    Post.findAll({
        where: {
            //use id from session
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'post_url',
            'title',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM blog WHERE post.id = blog.post_id'), 'blog_count']
        ],
    })
    res.render('dashboard', { loggedIn: true });
    
});



module.exports = router;