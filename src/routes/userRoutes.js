const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const router = express.Router();

// Create or update user
router.route("/").post(userController.createUser);

// Get user details
router
  .route("/:userId")
  .get(authController.verifyToken, userController.getUser);

module.exports = router;
