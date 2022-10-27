const router = require('express').Router();
const { User } = require('../../models');

//create user
router.post('/', async, (req, res) => {
  try {
    const dbUserData = await User.create(req.body);
    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.loggedIn = true;

      res.status(200).json(dbUserData)
  });
    } catch (err) {
      res.status(400).json(err);
    }
});


router.post('/login', (req, res) => {

    try {
    const dbUserData = await User.findOne({ where: { email: req.body.email } });
    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'Wrong email or password.' });
      return;
    }
    
    const validPassword = await dbUserData.checkPassword(req.body.password);
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Wrong email or password.' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.logged_in = true;
      res.json({ user: dbUserData, message: 'Login Success!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});


router.post('/logout', (req, res) => {
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
