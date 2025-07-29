// ===== BACKEND: index.js =====
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

mongoose.connect('mongodb://127.0.0.1:27017/healthapp')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB error:', err));

// ===== USER SCHEMA =====
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String
});

const taskSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  date: String,
  text: String,
  completed: Boolean
});

const User = mongoose.model('User', userSchema);
const Task = mongoose.model('Task', taskSchema);

// ===== AUTH MIDDLEWARE =====
const requireAuth = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, 'secret123');
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// ===== REGISTER =====
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ===== LOGIN =====
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, 'secret123');
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'Lax'
    });
    res.json({ user: { name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ===== LOGOUT =====
app.post('/api/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out' });
});

// // ===== FETCH TASKS =====
// app.get('/api/tasks', requireAuth, async (req, res) => {
//   try {
//     const tasks = await Task.find({ userId: req.userId });
//     res.json(tasks);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// ===== FETCH TASKS =====
app.get('/api/tasks', requireAuth, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.userId });
    const user = await User.findById(req.userId); // ✅ Fetch user data too

    res.json({ tasks, user: { name: user.name, email: user.email } }); // ✅ send user and tasks
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ===== ADD TASK =====
app.post('/api/tasks', requireAuth, async (req, res) => {
  const { date, text } = req.body;
  try {
    const task = new Task({
      userId: req.userId,
      date,
      text,
      completed: false
    });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ===== TOGGLE COMPLETE =====
app.put('/api/tasks/:id/toggle', requireAuth, async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.userId });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    task.completed = !task.completed;
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
