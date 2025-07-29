const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const dayjs = require('dayjs');

// Create new task
router.post('/', async (req, res) => {
  const { userId, date, text } = req.body;
  const task = new Task({ userId, date, text });
  await task.save();
  res.json(task);
});

// Get tasks for a specific day
router.get('/', async (req, res) => {
  const { userId, date } = req.query;
  const tasks = await Task.find({ userId, date });
  res.json({ tasks });
});

// Update task completion
router.patch('/:id', async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(task);
});

// Get completed task count for each day in a month
router.get('/month', async (req, res) => {
  const { userId, month } = req.query; // month = 'YYYY-MM'
  const regex = new RegExp(`^${month}`);

  const tasks = await Task.find({ userId, date: { $regex: regex }, completed: true });

  const dayCounts = {};
  tasks.forEach(task => {
    dayCounts[task.date] = (dayCounts[task.date] || 0) + 1;
  });

  const data = Object.keys(dayCounts).map(date => ({
    date,
    completedCount: dayCounts[date],
  }));

  res.json(data);
});

module.exports = router;
