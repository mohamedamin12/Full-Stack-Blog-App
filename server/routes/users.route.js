const router = require("express").Router();
const userController = require("../controllers/users.controller");
const upload = require("../middlewares/uploadPhoto");
const validateObjectId = require("../middlewares/validateObjectId");
const { verifyToken, verifyTokenAndAdmin, verifyTokenAndOnlyUser, verifyTokenAndAuthorization  } = require("../middlewares/verifyToken");

// api/users/
router.route("/").get(verifyTokenAndAdmin ,userController.getUsers);

// /api/users/count
router.route("/count").get(verifyTokenAndAdmin, userController.getUsersCount);

// api/users/uploaded-profile-photo
router.route("/uploaded-profile-photo").post(verifyToken,upload.single("image"), userController.uploadProfilePhoto);

// api/users/:id
router.route("/:id")
.get(validateObjectId , userController.getOneUser)
.put(validateObjectId,verifyTokenAndOnlyUser, userController.updateUser)
.delete(validateObjectId,verifyTokenAndAuthorization, userController.deleteUser);






module.exports = router;