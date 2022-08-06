const router = require('express').Router();
const withAuth = require('../../utils/auth');
const postRoutes = require('./post-routes')

router.use('/post', withAuth, postRoutes);


module.exports = router;