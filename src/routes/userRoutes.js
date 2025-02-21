const express = require("express");
const {
  createOrUpdateUser,
  getUser,
} = require("../controllers/userController");
const authController = require("../controllers/authController");

const router = express.Router();

// Create or update user
router.route("/").post(createOrUpdateUser);

// Get user details
router.route("/:userId").get(authController.verifyToken, getUser);

module.exports = router;
