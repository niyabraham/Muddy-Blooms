const express = require('express');
const crypto = require('crypto');
const Razorpay = require('razorpay');
const router = express.Router();
const Order = require('../models/Order');
const Plant = require('../models/Plant');
const sendEmail = require('../utils/sendEmail');
const adminAuth = require('../middleware/adminAuth');

const razorpay = process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET
  ? new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    })
  : null;

async function verifyRazorpayPayment({ razorpayOrderId, razorpayPaymentId, razorpaySignature }) {
  if (!razorpay || !razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
    return { verified: false, reason: 'missing-payment-details' };
  }

  const body = `${razorpayOrderId}|${razorpayPaymentId}`;
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest('hex');

  if (expectedSignature !== razorpaySignature) {
    return { verified: false, reason: 'signature-mismatch' };
  }

  try {
    const payment = await razorpay.payments.fetch(razorpayPaymentId);
    if (payment?.status !== 'captured' && payment?.status !== 'authorized') {
      return { verified: false, reason: 'payment-not-successful' };
    }

    if (payment?.order_id !== razorpayOrderId) {
      return { verified: false, reason: 'order-id-mismatch' };
    }

    return { verified: true };
  } catch (err) {
    return { verified: false, reason: 'verification-error', detail: err.message };
  }
}

// GET all orders (admin)
router.get('/', adminAuth, async (req, res) => {
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
    const {
      customerName,
      customerPhone,
      customerEmail,
      address,
      items,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    if (!customerName || !customerPhone || !address || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Missing required order information' });
    }

    const resolvedItems = [];
    let totalAmount = 0;

    for (const item of items) {
      const quantity = Number(item.quantity) || 1;
      if (quantity < 1) {
        return res.status(400).json({ error: 'Item quantity must be at least 1' });
      }

      const plantId = item.plantId || item._id;
      const plant = plantId
        ? await Plant.findById(plantId)
        : await Plant.findOne({ name: item.name });

      if (!plant) {
        return res.status(400).json({ error: `Plant not found for ${item.name || 'unknown item'}` });
      }

      resolvedItems.push({
        plantId: plant._id,
        name: plant.name,
        price: plant.price,
        quantity,
      });

      totalAmount += plant.price * quantity;
    }

    const paymentVerification = await verifyRazorpayPayment({
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
    });

    const paymentStatus = paymentVerification.verified ? 'paid' : 'unpaid';

    const order = new Order({
      customerName,
      customerPhone,
      customerEmail,
      address,
      items: resolvedItems,
      totalAmount,
      paymentStatus,
    });

    await order.save();

    const itemsList = order.items.map((i) => `${i.name} × ${i.quantity} — ₹${i.price * i.quantity}`).join('<br>');
    sendEmail({
      subject: `🌿 New Order from ${order.customerName} — ₹${order.totalAmount}`,
      html: `
        <h2>New Order Received!</h2>
        <p><strong>Customer:</strong> ${order.customerName}</p>
        <p><strong>Phone:</strong> ${order.customerPhone}</p>
        <p><strong>Address:</strong> ${order.address}</p>
        <p><strong>Items:</strong><br>${itemsList}</p>
        <p><strong>Total:</strong> ₹${order.totalAmount}</p>
        <p><strong>Payment Status:</strong> ${order.paymentStatus}</p>
      `,
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PATCH update order status (admin)
router.patch('/:id', adminAuth, async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;