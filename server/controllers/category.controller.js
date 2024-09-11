const asyncHandler = require('express-async-handler');
const {Category , validateCreateCategory} =  require("../models/category.model");

/**-----------------------------------------------
 * @desc    Create a new Category
 * @route   /api/categories
 * @method  POST
 * @access public
 * ---------------------------------------------*/
const createCategory = asyncHandler(async (req,res)=>{
  // 1- validate the request body
  const {error} = validateCreateCategory(req.body);
  if(error) return res.status(400).json({message: error.details[0].message});
  // 2- create a new category
  const category = new Category({
    user: req.user.id,
    title: req.body.title
  })
  await category.save();
  res.status(201).json(category);
})

/**-----------------------------------------------
 * @desc    Get a category
 * @route   /api/categories
 * @method  GET
 * @access public
 * ---------------------------------------------*/
 const getCategories = asyncHandler(async (req,res)=>{
  const categories = await Category.find();
  res.json(categories);
})

/**-----------------------------------------------
 * @desc    delete Category
 * @route   /api/categories/:id
 * @method  DELETE
 * @access  private (only admin)
 * ---------------------------------------------*/
 const deleteCategory = asyncHandler(async (req,res)=>{
  const category = await Category.findById(req.params.id);
  if (!category) {
    return res.status(404).json({ message: "category not found" });
  }

  await Category.findByIdAndDelete(req.params.id);

  res.status(200).json({
    message: "category has been deleted successfully",
    categoryId: category._id,
  });
})

module.exports = {
  createCategory,
  getCategories,
  deleteCategory,
};