const router = require('express').Router();
const { BlogPost } = require('../../models');
const withAuth = require('../../utils/auth.js');

router.post('/', async (req, res) => {
  try {
    const newBlogEntry = await BlogPost.create({
        ...req.body,
        user_id: req.session.user_id,
    });

    res.status(200).json(newBlogEntry);
  } catch (err) {
    res.status(400).json(err);
  }
});
//edit post with id
router.post('/edit/:id', async (req, res) => {
    try {
        console.log(req.body)
        const updateBlogEntry = await BlogPost.update(
        {
            name: req.body.name,
            post_content: req.body.post_content,
        },
        { where: { id: req.body.id} }
        );

        res.status(200).json(updateBlogEntry);
    } catch (err) {
        res.status(400).json(err);
    }
});

//delete blog entry 
router.delete('/:id', withAuth, async (req, res) => {
    try {
    const blogEntryData = await BlogPost.destroy({
        where: {
            id: req.params.id,
            user_id: req.session.user_id,
        },
    });
    if (!blogEntryData ) {
        res.status(404).json({ message: "No matching posts found."});
        return;
    }

    res.status(200).json(blogEntryData);
} catch (err) {
    res.status(500).json(err);
}
});

module.exports = router;