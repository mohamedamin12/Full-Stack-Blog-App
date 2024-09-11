const asyncHandler = require("express-async-handler");
const {
  Comment,
  validateCreateComment,
  validateUpdateComment,
} = require("../models/comments.model");
const { User } = require("../models/users.model");

/**-----------------------------------------------
 * @desc    git all Comments
 * @route   /api/auth/comments
 * @method  GET
 * @access  private
 ------------------------------------------------*/
const getComments = asyncHandler(async (req, res) => {
  const comments = await Comment.find();
  res.status(200).json(comments);
});

/**-----------------------------------------------
 * @desc    Create Comment
 * @route   /api/auth/comments
 * @method  POST
 * @access  private (only logged in user)
 ------------------------------------------------*/
const createComment = asyncHandler(async (req, res) => {
  const { error } = validateCreateComment(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const profile = await User.findById(req.user.id);

  const comment = new Comment({
    postId: req.body.postId,
    user: req.user.id,
    text: req.body.text,
    username: profile.username,
  });
  await comment.save();
  res.status(201).json(comment);
});

/**-----------------------------------------------
 * @desc    Update Comment
 * @route   /api/auth/comments/:id
 * @method  PUT
 * @access  private (only logged in user)
 *  ------------------------------------------------*/
const updateComment = asyncHandler(async (req, res) => {
  const { error } = validateUpdateComment(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const comment = await Comment.findById(req.params.id);
  if (!comment) {
    return res.status(404).json({ message: "Comment not found" });
  }

  if (req.user.id !== comment.user.toString()) {
    return res.status(403).json({
      message: "access denied, only user himself can edit his comment",
    });
  }

  const updatedComment = await Comment.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        text: req.body.text,
      },
    },
    { new: true }
  );
  res.status(200).json(updatedComment);
});

/**-----------------------------------------------
 * @desc    Delete Comment
 * @route   /api/comments/:id
 * @method  DELETE
 * @access  private (only admin or owner of the comment)
 ------------------------------------------------*/
const deleteComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) {
    return res.status(404).json({ message: "Comment not found" });
  }

  if (req.user.isAdmin || req.user.id === comment.user.toString()) {
    await Comment.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "comment has been deleted" });
  } else {
    res.status(403).json({ message: "access denied, not allowed" });
  }
});

module.exports = {
  getComments,
  createComment,
  updateComment,
  deleteComment,
};