const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  price:    { type: Number, required: true },
  category: { type: String, required: true },
  tag:      { type: String },
  emoji:    { type: String },
  description: { type: String },
  stock:    { type: Number, default: 100 },
  inStock:  { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Plant', plantSchema);