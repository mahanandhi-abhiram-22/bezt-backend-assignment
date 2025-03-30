const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { 
  versionKey: false // Removes __v field if you don't need it
});

// Ensure _id is always included when converting to JSON
TaskSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id.toString(); // Adds 'id' field (optional)
    delete ret.__v;             // Removes __v field
    return ret;
  }
});

module.exports = mongoose.model('Task', TaskSchema);