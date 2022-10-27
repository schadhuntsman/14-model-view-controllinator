const router = require('express').Router();
const { BlogBlogPostBlogPost } = require('../../models');
const withAuth = require('../../utils/auth.js');

router.post('/', async (req, res) => {
  try {
    const newBlogBlogPostEntry = await BlogBlogPostBlogPost.create({
        ...req.body,
        user_id: req.session.user_id,
    });

    res.status(200).json(newBlogBlogPostEntry);
  } catch (err) {
    res.status(400).json(err);
  }
});
//edit post with id
router.post('/edit/:id', async (req, res) => {
    try {
        console.log(req.body)
        const updateBlogBlogPostEntry = await BlogBlogPostBlogPost.update(
        {
            name: req.body.name,
            post_content: req.body.post_content,
        },
        { where: { id: req.body.id} }
        );

        res.status(200).json(updateBlogBlogPostEntry);
    } catch (err) {
        res.status(400).json(err);
    }
});

//delete BlogBlogPost entry 
router.delete('/:id', withAuth, async (req, res) => {
    try {
    const BlogBlogPostEntryData = await BlogBlogPostBlogPost.destroy({
        where: {
            id: req.params.id,
            user_id: req.session.user_id,
        },
    });
    if (!BlogBlogPostEntryData ) {
        res.status(404).json({ message: "No matching posts found."});
        return;
    }

    res.status(200).json(BlogBlogPostEntryData);
} catch (err) {
    res.status(500).json(err);
}
});

module.exports = router;