const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerName:  { type: String, required: true },
  customerPhone: { type: String, required: true },
  customerEmail: { type: String },
  address:       { type: String, required: true },
  items: [
    {
      plantId:  String,
      name:     String,
      price:    Number,
      quantity: Number,
    }
  ],
  totalAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'shipped', 'delivered'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['unpaid', 'paid'],
    default: 'unpaid'
  },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);