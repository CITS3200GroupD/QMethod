const mongoose = require('mongoose');
const settings = require('../../config/Settings')
const Schema = mongoose.Schema;

let userSchema = new Schema({
    register_ans: {
      type: [String],
      required: [true, 'No register_ans']
    },
    question_ans: {
      type: [String],
      required: [true, 'No question_ans']
    },
    progress: {
      type: Number,
      required: [true, 'No progress'],
      validate: [ progressValidate, '{VALUE} is not an integer']
    },
    sort_agree: {
      type: [Number],
      required: [true, 'No sort_agree']
    },
    sort_neutral: {
      type: [Number],
      required: [true, 'No sort_neutral']
    },
    sort_disagree: {
      type: [Number],
      required: [true, 'No sort_disagree']
    },
    matrix: {
      type: [[Number]],
      required: [true, 'No matrix']
    }
  });

// Check that cols field is within range offered.
function progressValidate(progress) {
  return (settings.PROGRESS_FLAGS.indexOf(progress) > -1);
}

module.exports = mongoose.model('User', userSchema);
