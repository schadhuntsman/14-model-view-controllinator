const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');
//find all 
router.get('/', (req, res) => {
  Post.findAll({
    attributes: [
      'id',
      'title',
      'content',
      'created_at'
    ],
    include: 
    [{
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
      const posts = dbPostData.map(post => post.get({
        plain: true
      }));
      res.render("homepage", {
        posts,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  });--
    
//get single
router.get('/', (req, res) => {
  Post.findOne({
      where: {
        id: req.params.id
      },
          attributes: [
              'id',
              'title',
              'content',
              'created_at'
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
      .then(dbPostData => {
        if(!dbPostData) {
          res.status(404).json({
            message: 'No posts found with this id'
          });
          return;
        }
          const posts = dbPostData.get({
              plain: true
          });

          res.render('single-post', {
              posts,
              loggedIn: req.session.loggedIn
          });
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});


router.post('/login', (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(dbUserData => {
        if (!dbUserData) {
          res.status(400).json({ message: 'No user with that username' 
        });
          return;
        }
        req.session.save(() => {
          req.session.user_id = dbUserData.id;
          req.session.username = dbUserData.username;
          req.session.loggedIn = true;
      
          res.json({ user: dbUserData, message: 'You are now logged in!' });
        });
      });

        const validPassword = dbUserData.checkPassword(req.body.password);
    
        if (!validPassword) {
          res.status(400).json({ message: 'Incorrect credentials!'
        });
          return;
     }
  });

  req.session.save(() => {
    req.session.user_id = dbUserData.id;
    req.session.username = dbUserData.username;
    req.session.loggedIn = true;

    res.json({ user: dbUserData,
               message: 'You are now logged in!' 
      });
  });



module.exports = router;