const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    maxlength: 50
  },
  password: {
    type: String,
    required: true,
    maxlength: 255
  },
  money: {
    type: Number,
    default: 500,
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);