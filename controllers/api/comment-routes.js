const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// get all comments
router.get('/', withAuth, (req, res) => {
  try {
      const createComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
      });
      res.status(200).json(createComment);
            } catch (err) {
      res.status(400).json(err);
   }
});

//delete comment
router.delete('/:id', withAuth, async (req, res) => {
      
      try {
        const dbCommentData = await Comment.destroy({
          where: {
            id: req.params.id,
            user_id: req.session.user_id,
          },
        });
        if (!dbCommentData) {
          res.status(404).json({ message: "No matching comments up in here!" });
          return;
        }
    
        res.status(200).json(dbCommentData);
      } catch (err) {
        res.status(500).json(err);
      }
    });

module.exports = router;
