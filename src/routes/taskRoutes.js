const express = require("express");
const taskController = require("../controllers/taskController");
const authController = require("../controllers/authController");
const router = express.Router();

// Protect all routes after this middleware
router.use(authController.verifyToken);

// Task routes
router.route("/").post(taskController.addTask).get(taskController.getTasks);
router
  .route("/:id")
  .put(taskController.updateTask)
  .delete(taskController.deleteTask);

module.exports = router;
