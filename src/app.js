/* eslint-disable no-undef */
const express = require("express");
const cors = require("cors");
const { StatusCodes } = require("http-status-codes");
const path = require("path");

const taskRoutes = require("./routes/taskRoutes");
const userRoutes = require("./routes/userRoutes");
const {
  createAppError,
  globalErrorHandler,
} = require("./utils/errorMiddleware");

const connectDB = require("./config/db");
const morgan = require("morgan");

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://rashad-stack-taskflow.netlify.app/",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);

// Serve static assets in production
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Error handling middleware
// Unhandled Routes
app.all("*", (req, res, next) => {
  const error = createAppError(
    `Can't Find this URL (${req.originalUrl}) on this server!`,
    StatusCodes.NOT_FOUND
  );
  next(error);
});

app.use(globalErrorHandler);

module.exports = app;
