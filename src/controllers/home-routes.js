const router = require('express').Router();
const { rest } = require('lodash');
const sequelize = require('../config/connection');
const { Post, User, Comment, Blog } = require('../models');

router.get('/', (req, res) => {
    Post.findAll({
      attributes: [
        'id',
        'post_url',
        'title',
        'created_at',
        [sequelize.literal('(SELECT COUNT(*) FROM blog WHERE post.id = blog.post_id)'), 'blog_count']
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbPostData => {
        // pass a single post object into the homepage template
        res.render('homepage', {
          posts,
          loggedIn: req.session.loggedIn
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

router.get('/post/:id', (req, res) => {
  const post = {
    id: 1,
    post_url: 'https://handlebarsjs.com/guide/',
    title: 'Handlebars Docs',
    created_at: new Date(),
    // vote_count: 10,
    comments: [{}, {}],
    user: {
      username: 'test_user'
    }
  };

  res.render('single-post', { post });
});



  router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/')
        return;
    }

    res.render('login');
  });
  
if  (req.session.loggedIn) {
  req.session.destroy(() => {
    res.status(204).end();
  });
}
else {
  res.status(404).end();
}

module.exports = router;