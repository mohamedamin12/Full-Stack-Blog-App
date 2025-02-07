const router = require("express").Router();
const commentController = require("../controllers/comments.controller");
const validateObjectId = require("../middlewares/validateObjectId");
const {verifyToken , verifyTokenAndAdmin} = require("../middlewares/verifyToken")

// api/comments/
router.route("/")
.get(verifyToken,commentController.getComments)
.post(verifyToken,commentController.createComment)

// api/comments/:id
router.route("/:id")
.put(validateObjectId,verifyToken,commentController.updateComment)
.delete(validateObjectId,verifyTokenAndAdmin,commentController.deleteComment)

module.exports = router;