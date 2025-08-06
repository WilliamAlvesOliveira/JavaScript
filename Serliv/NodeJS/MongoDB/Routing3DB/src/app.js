const express = require('express');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const tasksRouter = require('./routes/tasks');
app.use('/tasks', tasksRouter);

// Health check
app.get('/', (req, res) => {
  res.status(200).json({ status: 'API is working' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Internal Server Error',
    details: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

module.exports = app;