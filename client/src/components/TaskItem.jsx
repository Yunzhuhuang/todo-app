import {
    Box,
    Typography,
    IconButton,
    Tooltip,
    Chip,
  } from "@mui/material";
  import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
  import CheckCircleIcon from "@mui/icons-material/CheckCircle";
  import DeleteIcon from "@mui/icons-material/Delete";
  import EditIcon from "@mui/icons-material/Edit";
  import API from "../services/api";
  import { useState } from "react";
  import TaskForm from "./TaskForm";
  
  export default function TaskItem({ task, onTaskUpdated }) {
    const [editing, setEditing] = useState(false);
  
    const toggleComplete = async () => {
      try {
        await API.put(`/tasks/${task._id}`, {
          completed: !task.completed,
        });
        onTaskUpdated();
      } catch (err) {
        console.error("Failed to update completion status");
      }
    };
  
    const deleteTask = async () => {
      try {
        await API.delete(`/tasks/${task._id}`);
        onTaskUpdated();
      } catch (err) {
        console.error("Failed to delete task");
      }
    };
  
    if (editing) {
      return (
        <TaskForm
          existingTask={task}
          onClose={() => setEditing(false)}
          onTaskAdded={onTaskUpdated}
        />
      );
    }
  
    return (
      <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        gap: 2,
        p: 2,
        border: "1px solid #eee",
        borderRadius: 2,
        boxShadow: 1,
        backgroundColor: task.completed ? "#f0f0f0" : "#fff",
        opacity: task.completed ? 0.6 : 1,
        flexDirection: "row",
      }}
      >
        <IconButton onClick={toggleComplete} sx={{ mt: 0.5 }}>
          {task.completed ? (
            <CheckCircleIcon color="success" />
          ) : (
            <RadioButtonUncheckedIcon />
          )}
        </IconButton>
  
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            sx={{
              fontSize: "1.1rem",
              fontWeight: 500,
              textDecoration: task.completed ? "line-through" : "none",
            }}
          >
            {task.title}
          </Typography>

          {task.description && (
          <Typography
            variant="body2"
            sx={{ mt: 0.5, color: "text.secondary" }}
          >
            {task.description}
          </Typography>
        )}

        {task.dueDate && (
          <Typography
            variant="caption"
            sx={{ display: "block", mt: 1, fontStyle: "italic", color: "gray" }}
          >
            Due: {new Date(task.dueDate).toISOString().split("T")[0]}
          </Typography>
        )}
          <Chip
            label={task.priority}
            size="small"
            sx={{
              mt: 1,
              backgroundColor:
                task.priority === "High"
                  ? "#f44336"
                  : task.priority === "Medium"
                  ? "#ff9800"
                  : "#4caf50",
              color: "#fff",
              fontSize: "0.7rem",
            }}
          />
        </Box>
  
        <Tooltip title="Edit">
          <IconButton onClick={() => setEditing(true)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
  
        <Tooltip title="Delete">
          <IconButton onClick={deleteTask}>
            <DeleteIcon color="error" />
          </IconButton>
        </Tooltip>
      </Box>
    );
  }
  