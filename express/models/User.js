const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    register_ans: {
      type: [String]
    },
    question_ans: {
      type: [String]
    },
    progress: {
      type: Number,
      enum: [0, 1, 2, 3],
    },
    sort_agree: {
      type: [Number],
      required: [true, 'No sort_agree'],
      /*
      validate: {
        validator: Number.isInteger,
        message: '{VALUE} is not an integer'
      }
      */
    },
    sort_neutral: {
      type: [Number],
      required: [true, 'No sort_neutral']
      /*
      validate: {
        validator: Number.isInteger,
        message: '{VALUE} is not an integer'
      }
      */
    },
    sort_disagree: {
      type: [Number],
      /*
      validate: {
        validator: Number.isInteger,
        message: '{VALUE} is not an integer'
      }
      */
    },
    matrix: {
      type: [[Number]],
    }
  });

module.exports = mongoose.model('User', userSchema);
