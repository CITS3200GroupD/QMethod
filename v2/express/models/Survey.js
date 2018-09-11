const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Surveys
let Survey = new Schema({
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
  }
},
{
    collection: 'surveys'
});

module.exports = mongoose.model('Survey', Survey);