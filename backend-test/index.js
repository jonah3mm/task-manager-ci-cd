const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = 5001;

// Enable CORS to allow access from the frontend running at http://localhost:3001
app.use(cors({
  origin: "http://localhost:3001"
}));

// Parse JSON bodies
app.use(express.json());

// In-memory task storage
let tasks = [];

// GET all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// POST a new task
app.post("/tasks", (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: "Task text is required" });
  }
  // Use uuidv4 to generate a unique ID for the new task
  const newTask = { id: uuidv4(), text, completed: false };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PATCH to update task completion status
app.patch("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  const task = tasks.find((t) => t.id === id);
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }
  task.completed = completed;
  res.json(task);
});

// DELETE a task
app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter((t) => t.id !== id);
  res.status(204).send();
});

// Test route
app.get("/", (req, res) => {
  res.send("✅ Backend running at http://localhost:5001");
});

// Start the backend server
app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
