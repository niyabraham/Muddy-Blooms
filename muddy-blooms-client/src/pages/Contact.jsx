import { useState } from 'react';
import { sendContactMessage } from '../api';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
  if (!form.name || !form.message) return;
  try {
    await sendContactMessage(form);
    setSent(true);
  } catch (err) {
    alert('Something went wrong. Please try again.');
  }
  };

  return (
    <div className="bg-cream min-h-screen">

      <div className="bg-forest text-white py-16 px-6 text-center">
        <p className="text-sage text-sm tracking-widest uppercase mb-2">Get In Touch</p>
        <h1 className="font-display text-5xl font-bold">Contact Us</h1>
        <p className="text-gray-300 mt-3">We'd love to hear from you</p>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12">

        {/* Contact Info */}
        <div>
          <h2 className="font-display text-2xl text-forest font-bold mb-6">Find Us</h2>
          <div className="flex flex-col gap-5">
            {[
              { icon: '📍', label: 'Address', value: 'Vattukulam P.O, Kadappoor, Kottayam, Kerala' },
              { icon: '📞', label: 'Phone', value: '+91 9447193598' },
              { icon: '✉️', label: 'Email', value: 'muddyblooms@gmail.com' },
              { icon: '🕐', label: 'Hours', value: 'Mon–Sat: 9am – 6pm' },
            ].map((item) => (
              <div key={item.label} className="flex gap-4 items-start bg-white p-4 rounded-2xl shadow-sm">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <p className="text-xs text-sage font-bold uppercase tracking-wide">{item.label}</p>
                  <p className="text-forest font-medium mt-1">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Social */}
          <div className="mt-8">
            <p className="text-fern text-sm font-medium mb-3">Follow us on social media</p>
            <div className="flex gap-3">
              <a href="https://www.facebook.com/muddyblooms/" target="_blank" rel="noreferrer"
                className="bg-forest text-white px-5 py-2 rounded-full text-sm hover:bg-fern transition">
                Facebook
              </a>
              <a href="https://www.instagram.com/muddy__blooms/" target="_blank" rel="noreferrer"
                className="bg-forest text-white px-5 py-2 rounded-full text-sm hover:bg-fern transition">
                Instagram
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-3xl p-8 shadow-sm">
          {sent ? (
            <div className="text-center py-10">
              <p className="text-5xl mb-4">✅</p>
              <h3 className="font-display text-2xl text-forest font-bold mb-2">Message Sent!</h3>
              <p className="text-fern text-sm">We'll get back to you within 24 hours.</p>
              <button onClick={() => { setSent(false); setForm({ name:'', email:'', phone:'', message:'' }); }}
                className="mt-6 bg-forest text-white px-6 py-2 rounded-full text-sm hover:bg-fern transition font-bold">
                Send Another
              </button>
            </div>
          ) : (
            <>
              <h2 className="font-display text-2xl text-forest font-bold mb-6">Send a Message</h2>
              <div className="flex flex-col gap-4">
                <input name="name" value={form.name} onChange={handleChange}
                  placeholder="Your Name *"
                  className="px-4 py-3 rounded-xl border border-gray-200 text-forest text-sm focus:outline-none focus:ring-2 focus:ring-leaf" />
                <input name="email" value={form.email} onChange={handleChange}
                  placeholder="Email Address"
                  className="px-4 py-3 rounded-xl border border-gray-200 text-forest text-sm focus:outline-none focus:ring-2 focus:ring-leaf" />
                <input name="phone" value={form.phone} onChange={handleChange}
                  placeholder="Phone Number"
                  className="px-4 py-3 rounded-xl border border-gray-200 text-forest text-sm focus:outline-none focus:ring-2 focus:ring-leaf" />
                <textarea name="message" value={form.message} onChange={handleChange}
                  placeholder="Your Message *" rows={4}
                  className="px-4 py-3 rounded-xl border border-gray-200 text-forest text-sm focus:outline-none focus:ring-2 focus:ring-leaf resize-none" />
                <button onClick={handleSubmit}
                  disabled={!form.name || !form.message}
                  className={`py-3 rounded-full font-bold text-sm transition ${
                    form.name && form.message
                      ? 'bg-forest text-white hover:bg-fern'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}>
                  Send Message →
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}