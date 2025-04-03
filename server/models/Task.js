/*
The Task model.
*/
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // links the task to a user
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: String,
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Low",
  },
  completed: {
    type: Boolean,
    default: false,
  },
  dueDate: Date,
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);
