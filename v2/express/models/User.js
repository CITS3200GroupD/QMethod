const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    age: {
      type: Number,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other']
    },
    mainLang: {
      type: String,
    },
    otherLang: {
      type: String,
    },
    progress: {
      type: Number,
      enum: [0, 1, 2, 3]
    },
    questionAns: {
      type: [String]
    },
    sort_agree: {
      type: [Number],
      validate: {
        validator: Number.isInteger,
        message: '{VALUE} is not an integer'
      }
    },
    sort_neutral: {
      type: [Number],
      validate: {
        validator: Number.isInteger,
        message: '{VALUE} is not an integer'
      }
    },
    sort_disagree: {
      type: [Number],
      validate: {
        validator: Number.isInteger,
        message: '{VALUE} is not an integer'
      }
    },
    matrix: {
      type: [[Number]],
    }
  });
  
module.exports = mongoose.model('User', userSchema);