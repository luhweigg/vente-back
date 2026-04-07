const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxLength: 256
  },
  description: {
    type: String,
    required: true,
    maxLength: 1024
  },
  price: {
    type: Number,
    required: true,
    min: 0,
    max: 2**53 - 1
  },
  imageUrl: {
    type: String,
    default: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=300&q=80',
    maxLength: 10000
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('Item', itemSchema);