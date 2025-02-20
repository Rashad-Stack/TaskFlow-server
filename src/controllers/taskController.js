const { StatusCodes } = require("http-status-codes");
const Task = require("../models/taskModel");
const { io } = require("../server");

// Add a new task
exports.addTask = async (req, res, next) => {
  try {
    const task = new Task({ ...req.body, userId: req.user.id });
    await task.save();
    io.emit("taskAdded", task);
    res.status(StatusCodes.CREATED).json(task);
  } catch (error) {
    next(error);
  }
};

// Retrieve all tasks for the logged-in user
exports.getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

// Update task details
exports.updateTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    io.emit("taskUpdated", task);
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

// Delete a task
exports.deleteTask = async (req, res, next) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    io.emit("taskDeleted", req.params.id);
    res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    next(error);
  }
};
