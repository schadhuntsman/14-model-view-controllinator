const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

const withAuth = require('../utils/auth');

//find all posts
router.get('/', withAuth, (req, res) => {
    Post.findAll({
        where: {
            //use id from session
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'title',
            'content',
            'created_at',
        ],
        include: [{
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

    res.render('dashboard', { loggedIn: true });
    
});
//find one post by id
router.get('/edit/:id', withAuth, (req, res) => {
   Post.findByPk(req.params.id, {
    attributes: [
        'id',
        'title',
        'content',
        'created_at',
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
            const post = dbPostData.get({ plain: true });
            get({
              plain: true
            })
            res.render('edit-post', {
              post,
              loggedIn: true
            });
          })


          .catch(err => {
            console.log(err);
          res.status(500).json(err);

        });
      })

      .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({
            plain: true
        }));
        res.render('dashboard', {
            posts,
            loggedIn: true
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });


  router.get('/new', (req, res) => {
    res.render('add-post', {
       loggedIn: true
      })
  })
          
  
    


module.exports = router;