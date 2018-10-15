const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Define Admin login Schema

const adminSchema = new Schema ({
  username: {
    type: String,
    required: [true, 'No username'],
  },
  password: {
    type: String,
    required: [true, 'No password']
  }
},
{
  collection: 'admin'
});

module.exports = mongoose.model('Admin', adminSchema);
