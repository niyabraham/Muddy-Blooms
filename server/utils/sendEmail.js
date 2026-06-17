const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async ({ subject, html }) => {
  try {
    await transporter.sendMail({
      from: `"Muddy Blooms Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // sends to yourself
      subject,
      html,
    });
    console.log('📧 Email sent successfully');
  } catch (err) {
    console.log('❌ Email error:', err.message);
  }
};

module.exports = sendEmail;