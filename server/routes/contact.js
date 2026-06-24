const express = require('express');
const router = express.Router();
const sendEmail = require('../utils/sendEmail');

router.post('/', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    await sendEmail({
      subject: `📩 New Contact Message from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email || 'Not provided'}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;