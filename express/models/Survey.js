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
    required: [true, 'No range'],
    validate: [ rangeValidate, `{PATH} failed to validate`]
  },
  cols: {
    type: [Number],
    required: [true, 'No cols'],
    validate: [ colValidate, `{PATH} failed to validate`]
  },
  register: {
    type: [[String]],
    required: [true, 'No register'],
    validate: [ formValidate, `{PATH} failed to validate`]
  },
  questionnaire: {
    type: [[String]],
    required: [true, 'No questionnaire'],
    validate: [ formValidate, `{PATH} failed to validate`]
  },
  instructions: {
    type: [[String]],
    // required: [true, 'No instructions' ]
  },
  /*
  register_type: {
    type: [[String]],
    // required: [true, 'No register_types' ]
  },

  questionnaire_type: {
    type: [Number],
    // required: [true, 'No questionnaire_types' ]
  },
  */
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
    type: [Users.schema],
    required: [true, 'No users']
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

// Check that registration fields do not exceed maximum field limit.
function formValidate(array) {
  return (array.length <= settings.FIELDS_LIMIT);
}

// Check that range field is within range offered.
function rangeValidate(range) {
  return (settings.RANGE_OFFERED.indexOf(range) > -1);
}

// Validation of userdata
surveySchema.pre('validate', function(next) {
  const ques_len = this.questionnaire.length;
  const reg_len = this.register.length;
  const state_len = this.statements.length;
  let cell_count = 0;

  if (this.users.length == 0) {
    next();
  } else {
    this.users.forEach( user => {
      if (user.register_ans.length !== reg_len) {
        // console.error('Invalid Registration Data')
        next(new Error('Invalid Registration Data'));
      }
      if (user.progress >= 1) {
        if (user.sort_disagree.length +
          user.sort_neutral.length + user.sort_agree.length !== state_len) {
            // console.error('Invalid Init-Sort Data')
            next(new Error('Invalid Init-Sort Data'));
        }

        if (user.progress >= 2) {
          user.matrix.forEach(col => {
            col.forEach(function() {
              cell_count++;
            });
          });
          if (cell_count != state_len) {
            // console.error('Invalid Cell Count');
            next(new Error('Invalid Init-Sort Data'));
          }
          if (user.progress >= 3) {
            if (user.question_ans.length !== ques_len) {
             // console.error('Invalid Questionnaire Data')
              next(new Error('Invalid Questionnaire Data'));
            }
          }
        }
      }
      next();
    });
  }
});

module.exports = mongoose.model('Survey', surveySchema);
