const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  phone:       { type: String, required: true },
  email:       { type: String },
  address:     { type: String, required: true },
  service:     { type: String, required: true },
  date:        { type: String },
  message:     { type: String },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed'],
    default: 'pending'
  },
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);