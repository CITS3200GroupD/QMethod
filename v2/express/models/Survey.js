const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Surveys
let Survey = new Schema({
  name: String,
  range: Number,
  publish: Boolean,
  statements: [String]
},
{
    collection: 'surveys'
});

module.exports = mongoose.model('Survey', Survey);