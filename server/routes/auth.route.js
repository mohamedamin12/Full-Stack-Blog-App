const router = require("express").Router();
const authController = require("../controllers/auth.controller");

// ** /api/auth/register
router.route("/register").post(authController.registerUser);

// ** /api/auth/login 
router.route("/login").post(authController.loginUser);

//** /api/auth/:userId/verify/:token
router.route("/:userId/verify/:token").get( authController.verifyUserAccount);


module.exports = router