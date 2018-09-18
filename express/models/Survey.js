const settings = require('../../config/Settings')
const mongoose = require('mongoose');
const Users = require('./User');
const Schema = mongoose.Schema;

// Define collection and schema for Surveys
const surveySchema = new Schema({
  name: {
    type: String,
    required: [true, 'No name'],
    validate: [nameLimit, `{PATH} exceeds the limit of ${settings.NAME_LIMIT}`]
  },
  range: {
    type: Number,
    enum: settings.RANGE_OFFERED,
    required: [true, 'No range']
  },
  cols: {
    type: [Number],
    required: [true, 'No cols'],
    validate: [ colValidate, `{PATH} failed to validate`]
  },
  register: {
    type: [String],
    // required: [true, 'No register'],
  },
  questionnaire: {
    type: [String],
    // required: [true, 'No questionnaire'],
    // validate: [ colValidate, `{PATH} failed to validate`]
  },
  publish: {
    type: Boolean,
    required: [true, 'No publish']
  },
  statements: {
    type: [String],
    required: [true, 'Statements'],
    validate: [statementLimit, `{PATH} exceeds the limit of ${settings.STATE_LIMIT}`]
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
  if (array.length > settings.STATE_LIMIT) {
    return false;
  } else {
    array.forEach( (statement) => {
      if (statement.length > settings.CHAR_LIMIT) {
        return false;
      }
    });
    return true;
  }
}

// Check that survey name is less than NAME_LIMIT
function nameLimit(name) {
  return name.length <= settings.NAME_LIMIT;
}

// Check that cols field is within range offered.
function colValidate(array) {
  return (settings.RANGE_OFFERED.indexOf(array.length) > -1);
}

module.exports = mongoose.model('Survey', surveySchema);
