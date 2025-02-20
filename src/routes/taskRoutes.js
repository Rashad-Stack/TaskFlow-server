const express = require("express");
const taskController = require("../controllers/taskController");
const router = express.Router();

// Task routes
router.route("/").post(taskController.addTask).get(taskController.getTasks);
router
  .route("/:id")
  .put(taskController.updateTask)
  .delete(taskController.deleteTask);

module.exports = router;
