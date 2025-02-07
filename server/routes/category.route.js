const router = require("express").Router();
const {verifyToken , verifyTokenAndAdmin} = require("../middlewares/verifyToken")
const categoryController = require("../controllers/category.controller");

// api/categories/
router.route("/")
.get(categoryController.getCategories)
.post(verifyToken, categoryController.createCategory)

// api/categories/:id
router.route("/:id")
.delete(verifyTokenAndAdmin, categoryController.deleteCategory)

module.exports = router;