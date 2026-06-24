const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const contactRoutes = require('./routes/contact');


const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/contact', contactRoutes);

app.use('/images', express.static(path.join(__dirname, 'images')));

// Routes
const plantRoutes   = require('./routes/plants');
const orderRoutes   = require('./routes/orders');
const bookingRoutes = require('./routes/bookings');
const paymentRoutes = require('./routes/payment');

app.use('/api/plants',   plantRoutes);
app.use('/api/orders',   orderRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/payment',  paymentRoutes);

// Test route
app.get('/', (req, res) => {
  res.json({ message: '🌿 Muddy Blooms API is running!' });
});

// Connect to MongoDB then start server
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.log('❌ MongoDB error:', err));