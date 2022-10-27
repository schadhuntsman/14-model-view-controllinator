const router = require('express').Router();
const { BlogEntry, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const dbPostData = await BlogEntry.findAll({
      include: User,
    });


    const posts = dbPostData.map((post) => post.get({ plain: true }));
    res.render('homepage', {
      posts: posts,
      logged_in: req.session.logged_in
    });
    
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/blogentry/:id', async (req, res) => {
  try {
    const dbPostData = await BlogEntry.findByPk(req.params.id, {
      include: [
        User,
        {
          model: Comment,
          include: [ User ],
        },
      ],
    });
   

router.get('/edit/:id', async (req, res) => {
  try {
    const dbPostData = await BlogEntry.findByPk(req.params.id, {
      include: [
        User,
        {
          model: Comment,
          include: [User],
        },
      ]
    });


    const post = dbPostData.get({ plain: true });
    console.log(post)
    res.render('edit', {
      ...post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


const post = dbPostData.get({ plain: true });
res.render('blogentry', {
  ...post,
  logged_in: req.session.logged_in
});
} catch (err) {
res.status(500).json(err);
}
}); 

router.get('/blogentry', withAuth, async (req, res) => {
  try {
    const dbUserData = await User.findByPk(req.session.user_id, {
    });
    
    const identity = req.session.user_id
   
    const user = dbUserData.get({ plain: true });
    
    const dbPostData = await BlogEntry.findAll({
      where: {
        user_id: identity
      }

    });

    

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }


  res.render('login');
});


router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const dbUserData = await User.findByPk(req.session.user_id, {
    });

     const user = dbUserData.get({ plain: true });

    const identity = req.session.user_id

    const dbPostData = await BlogEntry.findAll({
      where: {
        user_id: identity
      }
    });

    const posts = dbPostData.map((post) => post.get({ plain: true }));

    console.log(posts)
    res.render('dashboard', {
      blogentries: posts,
      ...user,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

const posts = dbPostData.map((post) => post.get({ plain: true }));
    console.log(posts)
    res.render('dashboard', {
      posts: posts,
      ...user,
      logged_in: req.session.logged_in
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/signup', (req, res) => {

  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('signup');
});


module.exports = router;