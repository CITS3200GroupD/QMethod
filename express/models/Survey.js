const mongoose = require('mongoose');
const Users = require('./User');
const Schema = mongoose.Schema;

// Define collection and schema for Surveys

const surveySchema = new Schema({
  name: {
    type: String,
    required: [true, 'No name']
  },
  range: {
    type: Number,
    enum: [7, 9, 11],
    required: [true, 'No range'],
    validate: {
      validator: Number.isInteger,
      message: '{VALUE} is not an integer'
    }
  },
  cols: {
    type: [Number],
    required: [true, 'No cols']
  },
  publish: {
    type: Boolean,
    required: [true, 'No publish']
  },
  statements: {
    type: [String],
    required: [true, 'Statements']
  },
  users: {
    type: [Users.schema]
  }
},
{
    collection: 'surveys'
});

module.exports = mongoose.model('Survey', surveySchema);