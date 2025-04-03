import { useEffect, useState, useContext } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from "@mui/icons-material/Logout";
import TaskItem from "../components/TaskItem";
import TaskForm from "../components/TaskForm";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const { logout } = useContext(AuthContext);

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error("Failed to load tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          My Tasks
        </Typography>

        <Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setShowForm(!showForm)}
            sx={{ mr: 2 }}
          >
            Add Task
          </Button>
          <IconButton color="error" onClick={logout}>
            <LogoutIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Add Task Form */}
      {showForm && (
        <TaskForm
          onClose={() => setShowForm(false)}
          onTaskAdded={fetchTasks}
        />
      )}

    {/* Task List */}
    {tasks.length === 0 ? (
     <Typography
      variant="body1"
      align="center"
      sx={{ mt: 12, color: "text.secondary", width: "100%" }}
     >
       No tasks for now.
     </Typography>
    ) : (
      <Grid container spacing={2}>
        {tasks.map((task) => (
          <Grid item xs={12} md={6} lg={4} key={task._id}>
            <TaskItem task={task} onTaskUpdated={fetchTasks} />
          </Grid>
        ))}
      </Grid>
    )}
    </Box>
  );
}
