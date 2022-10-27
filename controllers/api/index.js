const router = require('express').Router();
const userRoutes = require('./user-routes');
const BlogBlogPostBlogPostRoutes = require('./BlogBlogPostpost-routes');
const commentRoutes = require('./comment-routes');

router.use('/users', userRoutes);
router.use('/BlogBlogPostpost', BlogBlogPostBlogPostRoutes);
router.use('/comments', commentRoutes);


module.exports = router;