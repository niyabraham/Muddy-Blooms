import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { createOrder } from '../api';
import { Link } from 'react-router-dom';

export default function Checkout() {
  const { cartItems, totalPrice, totalItems, clearCart } = useCart();
  const [form, setForm] = useState({
    name: '', phone: '', email: '', address: '', city: '', pincode: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [finalTotal, setFinalTotal] = useState(0);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleOrder = async () => {
    if (!form.name || !form.phone || !form.address) return;
    setLoading(true);
    try {
      const order = await createOrder({
        customerName: form.name,
        customerPhone: form.phone,
        customerEmail: form.email,
        address: `${form.address}, ${form.city} - ${form.pincode}`,
        items: cartItems.map(item => ({
          plantId: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        totalAmount: totalPrice,
      });
      setOrderId(order._id);
      setFinalTotal(totalPrice);
      clearCart();
      setSubmitted(true);
    } catch (err) {
      alert('Something went wrong. Please try again.');
    }
    setLoading(false);
  };

  if (cartItems.length === 0 && !submitted) {
    return (
      <div className="bg-cream min-h-screen flex flex-col items-center justify-center text-center px-6">
        <p className="text-8xl mb-6">🛒</p>
        <h2 className="font-display text-3xl text-forest font-bold mb-2">Your cart is empty</h2>
        <Link to="/shop" className="bg-forest text-white px-8 py-3 rounded-full hover:bg-fern transition font-bold text-sm mt-4 inline-block">
          Browse Plants
        </Link>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="bg-cream min-h-screen flex items-center justify-center px-6">
        <div className="bg-white rounded-3xl p-12 shadow-sm max-w-md w-full text-center">
          <p className="text-6xl mb-4">🌿</p>
          <h2 className="font-display text-3xl text-forest font-bold mb-3">Order Placed!</h2>
          <p className="text-fern mb-2">Thank you, <strong>{form.name}</strong>!</p>
          <p className="text-gray-500 text-sm mb-6">
            We'll call you at <strong>{form.phone}</strong> to confirm delivery.
          </p>
          <div className="bg-mist rounded-xl p-4 text-left text-sm text-fern space-y-2 mb-6">
            <p>📦 Order ID: <strong className="text-forest text-xs">{orderId}</strong></p>
            <p>📍 Delivery to: <strong>{form.address}, {form.city}</strong></p>
            <p>💰 Total Paid: <strong>₹{finalTotal}</strong></p>
          </div>
          <Link to="/shop"
            className="bg-forest text-white px-8 py-3 rounded-full hover:bg-fern transition font-bold text-sm w-full inline-block">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-cream min-h-screen">

      {/* Header */}
      <div className="bg-forest text-white py-16 px-6 text-center">
        <h1 className="font-display text-5xl font-bold">Checkout</h1>
        <p className="text-sage mt-2">{totalItems} item{totalItems > 1 ? 's' : ''} · ₹{totalPrice}</p>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-10">

        {/* Delivery Form */}
        <div>
          <h2 className="font-display text-2xl text-forest font-bold mb-6">Delivery Details</h2>
          <div className="flex flex-col gap-4">
            <input name="name" value={form.name} onChange={handleChange}
              placeholder="Full Name *"
              className="px-4 py-3 rounded-xl border border-gray-200 bg-white text-forest text-sm focus:outline-none focus:ring-2 focus:ring-leaf" />
            <input name="phone" value={form.phone} onChange={handleChange}
              placeholder="Phone Number *"
              className="px-4 py-3 rounded-xl border border-gray-200 bg-white text-forest text-sm focus:outline-none focus:ring-2 focus:ring-leaf" />
            <input name="email" value={form.email} onChange={handleChange}
              placeholder="Email Address"
              className="px-4 py-3 rounded-xl border border-gray-200 bg-white text-forest text-sm focus:outline-none focus:ring-2 focus:ring-leaf" />
            <textarea name="address" value={form.address} onChange={handleChange}
              placeholder="Street Address *" rows={2}
              className="px-4 py-3 rounded-xl border border-gray-200 bg-white text-forest text-sm focus:outline-none focus:ring-2 focus:ring-leaf resize-none" />
            <div className="grid grid-cols-2 gap-3">
              <input name="city" value={form.city} onChange={handleChange}
                placeholder="City"
                className="px-4 py-3 rounded-xl border border-gray-200 bg-white text-forest text-sm focus:outline-none focus:ring-2 focus:ring-leaf" />
              <input name="pincode" value={form.pincode} onChange={handleChange}
                placeholder="Pincode"
                className="px-4 py-3 rounded-xl border border-gray-200 bg-white text-forest text-sm focus:outline-none focus:ring-2 focus:ring-leaf" />
            </div>
          </div>

          <div className="mt-6 bg-mist rounded-2xl p-4 text-sm text-fern">
            💡 We currently deliver across <strong>Kerala</strong>. Our team will call to confirm your order.
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <h2 className="font-display text-2xl text-forest font-bold mb-6">Order Summary</h2>
          <div className="bg-white rounded-2xl p-5 shadow-sm mb-4">
            {cartItems.map(item => (
              <div key={item._id || item.id} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{item.emoji}</span>
                  <div>
                    <p className="text-forest font-medium text-sm">{item.name}</p>
                    <p className="text-gray-400 text-xs">Qty: {item.quantity}</p>
                  </div>
                </div>
                <p className="text-fern font-bold text-sm">₹{item.price * item.quantity}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>Subtotal</span><span>₹{totalPrice}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500 mb-3">
              <span>Delivery</span><span className="text-leaf font-medium">FREE</span>
            </div>
            <div className="border-t pt-3 flex justify-between font-bold text-forest text-lg">
              <span>Total</span><span>₹{totalPrice}</span>
            </div>

            <button
              onClick={handleOrder}
              disabled={!form.name || !form.phone || !form.address || loading}
              className={`w-full mt-5 py-3 rounded-full font-bold text-sm transition ${
                form.name && form.phone && form.address && !loading
                  ? 'bg-forest text-white hover:bg-fern'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}>
              {loading ? 'Placing Order...' : 'Place Order →'}
            </button>

            <p className="text-center text-xs text-gray-400 mt-3">
              🔒 Cash on delivery · Free delivery across Kerala
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}