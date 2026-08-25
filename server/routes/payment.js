const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');
const computeOrderTotal = require('../utils/computeOrderTotal');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create a Razorpay order — amount is computed from real DB prices, never trusted from the client
router.post('/create-order', async (req, res) => {
  try {
    const { items } = req.body;
    const { totalAmount } = await computeOrderTotal(items);

    const options = {
      amount: Math.round(totalAmount * 100), // paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    console.log('Razorpay order error:', err);
    res.status(400).json({ error: err.message });
  }
});

// Verify payment signature
router.post('/verify', (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      res.json({ verified: true });
    } else {
      res.status(400).json({ verified: false });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;