const { StatusCodes } = require("http-status-codes");
const Task = require("../models/taskModel");
const mongoose = require("mongoose");

// Add a new task
exports.addTask = async (req, res, next) => {
  try {
    const task = new Task({ ...req.body, userId: req.user.id });
    await task.save();
    res.status(StatusCodes.CREATED).json(task);
  } catch (error) {
    next(error);
  }
};

// Retrieve all tasks for the logged-in user
exports.getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(req.user.id) } },
      {
        $group: {
          _id: "$category",
          tasks: { $push: "$$ROOT" },
        },
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          tasks: 1,
        },
      },
    ]);

    const formattedTasks = tasks.map((taskGroup) => ({
      category: taskGroup.category,
      tasks: taskGroup.tasks,
    }));

    res.status(200).json(formattedTasks);
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
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

// Delete a task
exports.deleteTask = async (req, res, next) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    next(error);
  }
};
