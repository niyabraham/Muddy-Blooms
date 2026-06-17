const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const sendEmail = require('../utils/sendEmail');

// GET all orders (admin)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create order
router.post('/', async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();

    // Send email notification
    const itemsList = order.items.map(i => `${i.name} × ${i.quantity} — ₹${i.price * i.quantity}`).join('<br>');
    sendEmail({
      subject: `🌿 New Order from ${order.customerName} — ₹${order.totalAmount}`,
      html: `
        <h2>New Order Received!</h2>
        <p><strong>Customer:</strong> ${order.customerName}</p>
        <p><strong>Phone:</strong> ${order.customerPhone}</p>
        <p><strong>Address:</strong> ${order.address}</p>
        <p><strong>Items:</strong><br>${itemsList}</p>
        <p><strong>Total:</strong> ₹${order.totalAmount}</p>
      `,
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PATCH update order status (admin)
router.patch('/:id', async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;