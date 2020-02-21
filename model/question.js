const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const questionSchema = new mongoose.Schema({
  questionNumber: Number,
  question: String,
  answer1: Array,
  answer2: Array,
  answer3: Array,
  answer4: Array,
});


module.exports = mongoose.model('Question', questionSchema);
