/*
Handles task create, read, update and delete.
*/
const Task = require("../models/Task");

// POST /api/tasks - Create a new task
exports.createTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority } = req.body;
    if (!title) return res.status(400).json({ msg: "Task title is required" });
    if (title.length > 50) return res.status(400).json({ msg: "Title too long" });

    const task = new Task({
      user: req.user,
      title,
      description,
      dueDate,
      priority,
    });

    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

// GET /api/tasks - Get all tasks for logged-in user
exports.getTasks = async (req, res) => {
  try {
    const filter = { user: req.user };
    if (req.query.priority) {
      filter.priority = req.query.priority;
    }

    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

// PUT /api/tasks/:id - Update a task
exports.updateTask = async (req, res) => {
  const { title, description, completed, dueDate, priority } = req.body;

  try {
    let task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ msg: "Task not found" });
    if (task.user.toString() !== req.user)
      return res.status(403).json({ msg: "Not authorized" });

    task.title = title ?? task.title;
    task.description = description ?? task.description;
    task.completed = completed ?? task.completed;
    task.dueDate = dueDate ?? task.dueDate;
    task.priority = priority ?? task.priority;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

// DELETE /api/tasks/:id - Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ msg: "Task not found" });
    if (task.user.toString() !== req.user)
      return res.status(403).json({ msg: "Not authorized" });

    await task.deleteOne();
    res.json({ msg: "Task deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};
