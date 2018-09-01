const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Surveys
let Survey = new Schema({
  survey_name: {
    type: String
  },
  survey_kurt: {
    type: Number
  }
},{
    collection: 'surveys'
});

module.exports = mongoose.model('Survey', Survey);