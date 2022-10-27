const router = require('express').Router();
const { BlogPost } = require('../../models');
const withAuth = require('../../utils/auth');


//create post
router.post('/', withAuth, (req, res) => {
  try {
    const createBlogPost = await BlogPost.create({
        ...req.body,
        user_id: req.session.user_id,
    });

    res.status(200).json(createBlogPost);
} catch (err) {
    res.status(400).json(err);
}
});

   //update post
   router.put('/:id', withAuth, (req, res) => {
   try {
        const updateBlogPost = await BlogPost.update(
            {
                name: req.body.name,
                post_content: req.body.post_content,
            },

            { where: { id: req.body.id } }
        );

        // HTTP error codes. 200 is always success.
        res.status(200).json(updateBlogPost);
    } catch (err) {
        res.status(400).json(err);
    }
});
//delete post
router.delete('/:id', withAuth, (req, res) => {
  try {
    const dbPostData = await BlogPost.destroy({
        where: {
            id: req.params.id,
            user_id: req.session.user_id,
        },
    });

    if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id!' });
        return;
    }

    res.status(200).json(dbPostData);
} catch (err) {
    res.status(500).json(err);
}
});


module.exports = router;
