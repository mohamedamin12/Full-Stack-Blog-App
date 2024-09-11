const router = require("express").Router();
const {getResetPasswordLink , resetPassword , sendResetPasswordLink} = require("../controllers/password.controller");

// /api/password/reset-password-link
router.post("/reset-password-link", sendResetPasswordLink);

// /api/password/reset-password/:userId/:token
router
  .route("/reset-password/:userId/:token")
  .get(getResetPasswordLink)
  .post(resetPassword);

module.exports = router;