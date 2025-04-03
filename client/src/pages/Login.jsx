import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import API from "../services/api";
import React from "react";

import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Paper,
} from "@mui/material";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long, sign up failed.");
      return;
    }
    if (!formData.email || !formData.password) {
      setError("All fields are required.");
      return;
    }
    
    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    try {
      const res = await API.post("/login", formData);
      login(res.data.token);
      navigate("/");
    } catch (err) {
      setError("Invalid email or password, please try again :)");
    }
  };

  return (
    <Box
    sx={{
      width: "100%",
      maxWidth: "1200px",
      margin: "0 auto",
      minHeight: "100vh",
      display: "flex",
    }}
    >
      {/* Main Layout */}
      <Grid
        container
        direction="row"
        sx={{
          minHeight: "100vh",
          flexWrap: "nowrap",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        {/* Left - Login Form */}
        <Grid
          item
          xs={12}
          md={8}
          component={Paper}
          elevation={0}
          square
          sx={{
            display: "flex",
            justifyContent: "center",
            minHeight: "100vh",
            px: 4,
            pt: { xs: 8, md: 10, lg: 0 },
            alignItems: {
                xs: "flex-start",  // top-aligned on small screens
                md: "flex-start",  // still top-aligned
                lg: "center",      // center on large+ screens
              },
          }}
        >
           <Box sx={{ width: "100%", maxWidth: 400 }}>
           <Typography
            variant="h4"
            fontWeight="bold"
            color="red"
            sx={{ mb: 15 }}
           >
              To Do List
           </Typography>
           {error && (
            <Typography color="error" sx={{ mt: 1, mb: 2 }}>
           {error}
           </Typography>
           )}
           <Typography variant="h3" gutterBottom fontWeight="bold">
              Log in
           </Typography>
  
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="email"
                label="Email"
                type="email"
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                onChange={handleChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  bgcolor: "#db4c3f",
                  color: "#fff",
                  fontWeight: "bold",
                }}
              >
                LOG IN
              </Button>
              <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                Don’t have an account? <Link to="/signup">Sign up</Link>
              </Typography>
            </Box>
          </Box>
        </Grid>
  
        {/* Right - Image */}
        <Grid
          item
          xs={false}
          md={4}
          sx={{
            backgroundColor: "white",
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            justifyContent: "center",
            px: 2,
          }}
        >
          <Box
            component="img"
            src="/todo.png"
            alt="Login Illustration"
            sx={{
              maxWidth: "60%",
              maxHeight: "80vh",
              objectFit: "contain",
            }}
          />
        </Grid>
      </Grid>
      </Box>
  );
}
