const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;


const testSchema = new mongoose.Schema({
  testName: String,
  questions: { type: ObjectId, ref: 'Question' },
});

module.exports = mongoose.model('Test', testSchema);
