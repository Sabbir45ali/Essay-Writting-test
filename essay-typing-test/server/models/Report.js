const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  prompt: String,
  essayText: String,
  wordsTyped: Number,
  charactersTyped: Number,
  timeTaken: Number,
  wpm: Number,
  backspaceCount: Number,
  score: Number,
  completedAt: Date,
}, { timestamps: true });

module.exports = mongoose.model('Report', ReportSchema);
