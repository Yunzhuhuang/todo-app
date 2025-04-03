const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
if (process.env.NODE_ENV !== "test") {
    connectDB();
  }

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", require("./routes/auth"));
app.use("/api/tasks", require("./routes/tasks"));

module.exports = app;
