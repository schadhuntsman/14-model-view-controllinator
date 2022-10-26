const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');
//find all 
router.get('/edit-comment', (req,res) => {

  if (req.session.loggedIn) {

    varPostID = req.body.postid;
    
    res.render('edit-comment', {loggedIn: req.session.loggedIn});
    
    return;
  }

  res.redirect('/');
});

router.get('/', async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username','id'],
        },
      ],
    });
      const posts = dbPostData.map((post) => post.get({
        plain: true
      }));
      res.render("homepage", {
        posts,
        loggedIn: req.session.loggedIn
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
    });

    router.get('/edit-post', (req,res) => {

      if (req.session.loggedIn) {    
       res.render('edit-post', {loggedIn: req.session.loggedIn,dashboard:true});  
        return;
      }
    
      res.redirect('/');
      
    });

    router.get('/create-post', (req,res) => {

      if (req.session.loggedIn) {
         
        res.render('create-post', {loggedIn: req.session.loggedIn, dashboard: true});
              
        return;
      }
        
      res.redirect('/');
      
    });
    
    
//get single
router.get('/post/:id', (req, res) => {
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
          const posts = dbPostData.map({
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


router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('signup');
});
    
router.get('*', (req, res) => {
  res.status(404).send("Cannot go there");
})


module.exports = router;