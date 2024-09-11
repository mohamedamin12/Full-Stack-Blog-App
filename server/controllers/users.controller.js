const asyncHandler = require("express-async-handler");
const {
  cloudinaryRemoveImage,
  cloudinaryUploadImage,
  cloudinaryRemoveMultipleImage,
} = require("../utils/cloudinary");
const path = require("path");
const fs = require("fs");
const { User, validateUpdateUser } = require("../models/users.model");
const bcrypt = require("bcrypt");
const { Post } = require("../models/posts.model");
const { Comment } = require("../models/comments.model");
/**-----------------------------------------------
 * @desc    git all Users
 * @route   /api/users
 * @method  GET
 * @access  private
 ------------------------------------------------*/
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").populate("posts");
  res.status(200).json(users);
});

/**-----------------------------------------------
 * @desc    git User
 * @route   /api/users/:id
 * @method  GET
 * @access  public (only users authenticated)
 ------------------------------------------------*/
const getOneUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
    .select("-password -__v")
    .populate("posts");
  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }
  res.status(200).json(user);
});

/**-----------------------------------------------
 * @desc    Get Users Count
 * @route   /api/users/count
 * @method  GET
 * @access  private (only admin)
 ------------------------------------------------*/
const getUsersCount = asyncHandler(async (req, res) => {
  const count = await User.countDocuments();
  res.status(200).json(count);
});

/**-----------------------------------------------
 * @desc    Update User
 * @route   /api/users/:id
 * @method  PUT
 * @access  public (only users himself)
 ------------------------------------------------*/
const updateUser = asyncHandler(async (req, res) => {
  const { error } = validateUpdateUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        username: req.body.username,
        password: req.body.password,
        bio: req.body.bio,
      },
    },
    { new: true }
  )
    .select("-password")
    .populate("posts");

  res.status(200).json(updatedUser);
});

/**-----------------------------------------------
 * @desc    Profile Photo Upload
 * @route   /api/users/profile/profile-photo-upload
 * @method  POST
 * @access  private (only logged in user)
 ------------------------------------------------*/
const uploadProfilePhoto = asyncHandler(async (req, res) => {
  // 1. validate
  if (!req.file) {
    return res.status(400).json({ massage: "no file provided" });
  }
  // 2. Get the path to the image
  const imagePath = path.join(__dirname, `../images/${req.file.filename}`);
  // 3. Upload to cloudinary
  const upload = await cloudinaryUploadImage(imagePath);
  // 4. Get the user from DB
  const user = await User.findById(req.user.id);
  // 5. Delete the old profile photo if exist
  if (user.profilePhoto.publicId !== null) {
    await cloudinaryRemoveImage(user.profilePhoto.publicId);
  }
  // 6. Change the profilePhoto field in the DB
  user.profilePhoto = {
    url: upload.secure_url,
    publicId: upload.public_id,
  };
  await user.save();
  // 7. Send response to client
  res.status(200).json({
    message: "your profile photo uploaded successfully",
    profilePhoto: { url: upload.secure_url, publicId: upload.public_id },
  });
  // 8. Remove image from the server
  fs.unlinkSync(imagePath);
});

/**-----------------------------------------------
 * @desc    Delete User Profile (Account)
 * @route   /api/users/profile/:id
 * @method  DELETE
 * @access  private (only admin or user himself)
 ------------------------------------------------*/
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }

  const posts = await Post.find({ userId: user._id });
  const publicIds = posts.map((post) => post.image.publicId);

  if (publicIds.length > 0) {
    await cloudinaryRemoveMultipleImage(publicIds);
  }

  await Post.deleteMany({ user: user._id });

  await Comment.deleteMany({ user: user._id });

  await User.findByIdAndDelete(req.params.id);

  res.status(200).json({ message: "user deleted successfully" });
});

module.exports = {
  getUsers,
  getOneUser,
  updateUser,
  uploadProfilePhoto,
  deleteUser,
  getUsersCount,
};
