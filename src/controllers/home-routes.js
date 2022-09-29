const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../../models');

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
      attributes: ['username']
    },
  ],
    
    include: [
      {
        model: User,
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
      }):
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  });
    

//get single
//create user
router.post('/', withAuth, (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })
    .then(dbUserData => {
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;
  
        res.json(dbUserData);
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
})


router.post('/login', withAuth, (req, res) => {
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


router.post('/logout', withAuth, (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  }
  else {
    res.status(404).end();
  }
});

module.exports = router;