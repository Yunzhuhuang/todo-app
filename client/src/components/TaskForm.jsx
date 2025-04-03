import {
    Box,
    TextField,
    Button,
    MenuItem,
    Typography,
  } from "@mui/material";
  import { useState } from "react";
  import API from "../services/api";
  
  const priorities = ["Low", "Medium", "High"];
  
  export default function TaskForm({ onClose, onTaskAdded, existingTask }) {
    const [formData, setFormData] = useState({
      title: existingTask?.title || "",
      description: existingTask?.description || "",
      dueDate: existingTask?.dueDate?.slice(0, 10) || "",
      priority: existingTask?.priority || "Low",
    });
    const adjustedDueDate = `${formData.dueDate}T00:00:00`;

    const [error, setError] = useState("");
  
    const handleChange = (e) =>
      setFormData({ ...formData, [e.target.name]: e.target.value });
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (new Date(formData.dueDate) < new Date()) {
        setError("Due date must be in the future.");
        return;
      }
      if (!formData.title) {
        setError("Title is required.");
        return;
      }
      if (formData.title.length > 50) {
        setError("Title must be under 50 characters.");
        return;
      }
      if (formData.description.length > 200) {
        setError("Description must be under 200 characters.");
        return;
      }
      try {
        if (existingTask) {
          await API.put(`/tasks/${existingTask._id}`, formData);
        } else {
          await API.post("/tasks", {...formData, dueDate: adjustedDueDate});
        }
        onTaskAdded();
        onClose();
      } catch (err) {
        console.error("Task form submission failed");
      }
    };
  
    return (
        <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          mb: 3,
          p: 2,
          border: "1px solid #eee",
          borderRadius: 2,
          backgroundColor: "#fafafa",
        }}
        >
        {error && (
          <Typography color="error" sx={{ mt: 1, mb: 2 }}>
           {error}
          </Typography>
        )}
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
          {existingTask ? "Edit Task" : "New Task"}
        </Typography>
  
        <TextField
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />

        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          fullWidth
          multiline
          rows={3}
          sx={{ mb: 2 }}
        />

        <TextField
          label="Due Date"
          name="dueDate"
          type="date"
          value={formData.dueDate}
          onChange={handleChange}
          fullWidth
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 2 }}
        />
  
        <TextField
          label="Priority"
          name="priority"
          select
          fullWidth
          value={formData.priority}
          onChange={handleChange}
          sx={{ mb: 2 }}
        >
          {priorities.map((level) => (
            <MenuItem key={level} value={level}>
              {level}
            </MenuItem>
          ))}
        </TextField>
  
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button variant="contained" type="submit">
            {existingTask ? "Update" : "Add"}
          </Button>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    );
  }
  