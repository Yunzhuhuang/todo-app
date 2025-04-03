/*
Set up routing
*/
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import TodoList from "./pages/TodoList";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import React from "react";

function App() {
  const { token } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={token ? <TodoList /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;

