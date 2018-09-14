const mongoose = require('mongoose');
const Users = require('./User');
const Schema = mongoose.Schema;

// Define collection and schema for Surveys

const RANGE_OFFERED = [7, 9, 11];
const CHAR_LIMIT = 350;
const NAME_LIMIT = 100;
const STATE_LIMIT = 80;

const surveySchema = new Schema({
  name: {
    type: String,
    required: [true, 'No name'],
    validate: [nameLimit, `{PATH} exceeds the limit of ${NAME_LIMIT}`]
  },
  range: {
    type: Number,
    enum: RANGE_OFFERED,
    required: [true, 'No range']
  },
  cols: {
    type: [Number],
    required: [true, 'No cols'],
    validate: [ colValidate, `{PATH} failed to validate`]
  },
  publish: {
    type: Boolean,
    required: [true, 'No publish']
  },
  statements: {
    type: [String],
    required: [true, 'Statements'],
    validate: [statementLimit, `{PATH} exceeds the limit of ${STATE_LIMIT}`]
  },
  users: {
    type: [Users.schema]
  }
},
{
    collection: 'surveys'
});

// Validators
// Check that there are less than STATE_LIMIT statements and that statements are less than CHAR_LIMIT
function statementLimit(array) {
  if (array.length > STATE_LIMIT) {
    return false;
  } else {
    array.forEach( (statement) => {
      if (statement.length > CHAR_LIMIT) {
        return false;
      }
    });
    return true;
  }
}

// Check that survey name is less than NAME_LIMIT
function nameLimit(name) {
  return name.length <= NAME_LIMIT;
}

// Check that cols field is within range offered.
function colValidate(array) {
  return (RANGE_OFFERED.indexOf(array.length) > -1);
}

module.exports = mongoose.model('Survey', surveySchema);