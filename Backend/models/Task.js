const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  date: { type: String, required: true }, // Format: YYYY-MM-DD
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

module.exports = mongoose.model('Task', TaskSchema);
