const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const auth = require("../middleware/authMiddleware");

router.post("/", auth, async (req, res) => {
    try {
      const { title, description, dueDate, priority } = req.body;
  
      const task = new Task({
        user: req.user, // set by auth middleware
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
  });

router.put("/:id", auth, async (req, res) => {
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
  });

router.get("/", auth, async (req, res) => {
    try {
      const tasks = await Task.find({ user: req.user }).sort({ createdAt: -1 });
      res.json(tasks);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  });

router.delete("/:id", auth, async (req, res) => {
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
  });

module.exports = router;
  
  


  
  