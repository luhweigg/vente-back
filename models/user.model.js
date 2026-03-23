const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  money: {
    type: Number,
    default: 500,
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);