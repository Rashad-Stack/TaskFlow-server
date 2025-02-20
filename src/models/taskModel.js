const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxLength: 50,
    },
    description: {
      type: String,
      maxLength: 200,
    },
    category: {
      type: String,
      enum: ["To-Do", "In Progress", "Done"],
      default: "To-Do",
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
