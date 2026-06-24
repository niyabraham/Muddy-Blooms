// Wake up Render backend on app load
fetch('https://muddy-blooms-api.onrender.com/').catch(() => {});
// ✅ CHANGE: export BASE_URL so Shop.jsx can use it for image paths
export const BASE_URL = 'https://muddy-blooms-api.onrender.com';
const API = `${BASE_URL}/api`;

export const fetchPlants = async () => {
  const res = await fetch(`${API}/plants`);
  return res.json();
};

export const createOrder = async (orderData) => {
  const res = await fetch(`${API}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData),
  });
  return res.json();
};

export const createBooking = async (bookingData) => {
  const res = await fetch(`${API}/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bookingData),
  });
  return res.json();
};

// Admin APIs
export const fetchOrders = async () => {
  const res = await fetch(`${API}/orders`);
  return res.json();
};

export const fetchBookings = async () => {
  const res = await fetch(`${API}/bookings`);
  return res.json();
};

export const updateOrderStatus = async (id, status) => {
  const res = await fetch(`${API}/orders/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  return res.json();
};

export const updateBookingStatus = async (id, status) => {
  const res = await fetch(`${API}/bookings/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  return res.json();
};

export const createRazorpayOrder = async (amount) => {
  const res = await fetch(`${API}/payment/create-order`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount }),
  });
  return res.json();
};

export const sendContactMessage = async (formData) => {
  const res = await fetch(`${API}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  return res.json();
};

export const verifyPayment = async (paymentData) => {
  const res = await fetch(`${API}/payment/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(paymentData),
  });
  return res.json();
};