const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const sendEmail = require('../utils/sendEmail');

// GET all bookings (admin)
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create booking
router.post('/', async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();

    // Send email notification
    sendEmail({
      subject: `📅 New Booking from ${booking.name} — ${booking.service}`,
      html: `
        <h2>New Landscaping Booking!</h2>
        <p><strong>Name:</strong> ${booking.name}</p>
        <p><strong>Phone:</strong> ${booking.phone}</p>
        <p><strong>Email:</strong> ${booking.email || 'Not provided'}</p>
        <p><strong>Address:</strong> ${booking.address}</p>
        <p><strong>Service:</strong> ${booking.service}</p>
        <p><strong>Preferred Date:</strong> ${booking.date || 'Not specified'}</p>
        <p><strong>Message:</strong> ${booking.message || 'None'}</p>
      `,
    });

    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PATCH update booking status (admin)
router.patch('/:id', async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;