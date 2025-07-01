

const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  task: { type: String, required: true, trim: true, maxlength: 100, minlength: 1 },
  assignedTo: { type: String, required: true, trim: true, maxlength: 50, minlength: 1 },
  priority: { type: String, enum: ['High', 'Medium', 'Low'], default: 'Medium' },
  done: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Todo', TodoSchema);
