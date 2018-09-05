const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Surveys
let Survey = new Schema({
  survey_name: String,
  survey_kurt:  Number,
  statements: [String]
},
{
    collection: 'surveys'
});

module.exports = mongoose.model('Survey', Survey);