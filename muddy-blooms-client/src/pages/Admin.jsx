import { useState, useEffect } from 'react';
import { fetchOrders, fetchBookings, updateOrderStatus, updateBookingStatus } from '../api';

const ORDER_STATUSES = ['pending', 'confirmed', 'shipped', 'delivered'];
const BOOKING_STATUSES = ['pending', 'confirmed', 'completed'];

const statusColors = {
  pending:   'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-blue-100 text-blue-700',
  shipped:   'bg-purple-100 text-purple-700',
  delivered: 'bg-green-100 text-green-700',
  completed: 'bg-green-100 text-green-700',
};

export default function Admin() {
  const [tab, setTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchOrders(), fetchBookings()])
      .then(([o, b]) => { setOrders(o); setBookings(b); setLoading(false); });
  }, []);

  const handleOrderStatus = async (id, status) => {
    await updateOrderStatus(id, status);
    setOrders(prev => prev.map(o => o._id === id ? { ...o, status } : o));
  };

  const handleBookingStatus = async (id, status) => {
    await updateBookingStatus(id, status);
    setBookings(prev => prev.map(b => b._id === id ? { ...b, status } : b));
  };

  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const pendingBookings = bookings.filter(b => b.status === 'pending').length;

  return (
    <div className="bg-cream min-h-screen">

      {/* Header */}
      <div className="bg-forest text-white py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-sage text-sm tracking-widest uppercase mb-1">Muddy Blooms</p>
          <h1 className="font-display text-4xl font-bold">Admin Dashboard</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Total Orders', value: orders.length, icon: '📦' },
            { label: 'Total Revenue', value: `₹${totalRevenue}`, icon: '💰' },
            { label: 'Pending Orders', value: pendingOrders, icon: '⏳' },
            { label: 'Pending Bookings', value: pendingBookings, icon: '📅' },
          ].map(stat => (
            <div key={stat.label} className="bg-white rounded-2xl p-5 shadow-sm text-center">
              <p className="text-3xl mb-2">{stat.icon}</p>
              <p className="font-display text-2xl text-forest font-bold">{stat.value}</p>
              <p className="text-fern text-xs mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-3 mb-6">
          <button onClick={() => setTab('orders')}
            className={`px-6 py-2 rounded-full font-bold text-sm transition ${
              tab === 'orders' ? 'bg-forest text-white' : 'bg-white text-forest border border-gray-200'
            }`}>
            📦 Orders ({orders.length})
          </button>
          <button onClick={() => setTab('bookings')}
            className={`px-6 py-2 rounded-full font-bold text-sm transition ${
              tab === 'bookings' ? 'bg-forest text-white' : 'bg-white text-forest border border-gray-200'
            }`}>
            📅 Bookings ({bookings.length})
          </button>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <p className="text-5xl animate-pulse mb-4">🌿</p>
            <p className="text-fern">Loading data...</p>
          </div>
        ) : (

          <>
            {/* Orders Tab */}
            {tab === 'orders' && (
              <div className="flex flex-col gap-4">
                {orders.length === 0 ? (
                  <div className="text-center py-20 bg-white rounded-2xl">
                    <p className="text-5xl mb-3">📭</p>
                    <p className="text-fern">No orders yet</p>
                  </div>
                ) : orders.map(order => (
                  <div key={order._id} className="bg-white rounded-2xl p-6 shadow-sm">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

                      {/* Customer Info */}
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-display text-forest font-bold text-lg">
                            {order.customerName}
                          </h3>
                          <span className={`text-xs px-3 py-1 rounded-full font-medium ${statusColors[order.status]}`}>
                            {order.status}
                          </span>
                        </div>
                        <p className="text-gray-500 text-sm">📞 {order.customerPhone}</p>
                        <p className="text-gray-500 text-sm">📍 {order.address}</p>
                        <p className="text-gray-500 text-sm mt-1">
                          🕐 {new Date(order.createdAt).toLocaleDateString('en-IN', {
                            day: 'numeric', month: 'short', year: 'numeric',
                            hour: '2-digit', minute: '2-digit'
                          })}
                        </p>
                      </div>

                      {/* Items + Total */}
                      <div className="md:text-right">
                        <p className="font-display text-2xl text-forest font-bold mb-1">
                          ₹{order.totalAmount}
                        </p>
                        <div className="text-sm text-gray-500 mb-3">
                          {order.items.map(item => (
                            <p key={item._id}>{item.name} × {item.quantity}</p>
                          ))}
                        </div>

                        {/* Status Updater */}
                        <select
                          value={order.status}
                          onChange={(e) => handleOrderStatus(order._id, e.target.value)}
                          className="text-sm border border-gray-200 rounded-full px-3 py-2 text-forest focus:outline-none focus:ring-2 focus:ring-leaf">
                          {ORDER_STATUSES.map(s => (
                            <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Bookings Tab */}
            {tab === 'bookings' && (
              <div className="flex flex-col gap-4">
                {bookings.length === 0 ? (
                  <div className="text-center py-20 bg-white rounded-2xl">
                    <p className="text-5xl mb-3">📭</p>
                    <p className="text-fern">No bookings yet</p>
                  </div>
                ) : bookings.map(booking => (
                  <div key={booking._id} className="bg-white rounded-2xl p-6 shadow-sm">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-display text-forest font-bold text-lg">
                            {booking.name}
                          </h3>
                          <span className={`text-xs px-3 py-1 rounded-full font-medium ${statusColors[booking.status]}`}>
                            {booking.status}
                          </span>
                        </div>
                        <p className="text-gray-500 text-sm">📞 {booking.phone}</p>
                        <p className="text-gray-500 text-sm">📍 {booking.address}</p>
                        <p className="text-gray-500 text-sm">🏡 {booking.service}</p>
                        {booking.date && (
                          <p className="text-gray-500 text-sm">📅 Preferred: {booking.date}</p>
                        )}
                        {booking.message && (
                          <p className="text-gray-400 text-sm mt-1 italic">"{booking.message}"</p>
                        )}
                        <p className="text-gray-500 text-sm mt-1">
                          🕐 {new Date(booking.createdAt).toLocaleDateString('en-IN', {
                            day: 'numeric', month: 'short', year: 'numeric',
                            hour: '2-digit', minute: '2-digit'
                          })}
                        </p>
                      </div>

                      <select
                        value={booking.status}
                        onChange={(e) => handleBookingStatus(booking._id, e.target.value)}
                        className="text-sm border border-gray-200 rounded-full px-3 py-2 text-forest focus:outline-none focus:ring-2 focus:ring-leaf self-start md:self-center">
                        {BOOKING_STATUSES.map(s => (
                          <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}