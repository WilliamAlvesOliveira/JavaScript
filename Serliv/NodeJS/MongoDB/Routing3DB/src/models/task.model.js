const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, 'Title is required'],
    trim: true,
    minlength: [3, 'Title must be at least 3 characters'],
    maxlength: [150, 'Title cannot exceed 150 characters']
  },
  completed: { 
    type: Boolean, 
    default: false 
  },
  completedAt: { 
    type: Date,
    default: null
  },
  userId: { 
    type: String,
    required: true
  }
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better performance
taskSchema.index({ userId: 1 });
taskSchema.index({ completed: 1 });
taskSchema.index({ title: 'text' });

module.exports = mongoose.model('Task', taskSchema);