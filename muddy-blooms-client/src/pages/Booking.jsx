import { useState } from 'react';

const services = [
  { id: 'residential', label: '🏡 Residential Garden', desc: 'Home gardens & private spaces' },
  { id: 'resort', label: '🏨 Resort & Hotel', desc: 'Large scale luxury landscaping' },
  { id: 'commercial', label: '🏢 Commercial Space', desc: 'Offices & business premises' },
  { id: 'terrace', label: '🌇 Terrace Garden', desc: 'Rooftop & balcony gardens' },
  { id: 'indoor', label: '🪴 Indoor Styling', desc: 'Interior plant arrangement' },
];

export default function Booking() {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '', phone: '', email: '',
    address: '', date: '', message: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-cream min-h-screen flex flex-col items-center justify-center text-center px-6">
        <div className="bg-white rounded-3xl p-12 shadow-sm max-w-md">
          <p className="text-6xl mb-4">🌿</p>
          <h2 className="font-display text-3xl text-forest font-bold mb-3">Booking Received!</h2>
          <p className="text-fern mb-2">Thank you, <strong>{form.name}</strong>!</p>
          <p className="text-gray-500 text-sm mb-6">
            Our team will call you at <strong>{form.phone}</strong> within 24 hours to confirm your appointment.
          </p>
          <div className="bg-mist rounded-xl p-4 text-left text-sm text-fern space-y-1 mb-6">
            <p>📋 Service: <strong>{services.find(s => s.id === selectedService)?.label}</strong></p>
            <p>📅 Preferred Date: <strong>{form.date}</strong></p>
            <p>📍 Location: <strong>{form.address}</strong></p>
          </div>
          <button
            onClick={() => { setSubmitted(false); setStep(1); setSelectedService(''); setForm({ name:'',phone:'',email:'',address:'',date:'',message:'' }); }}
            className="bg-forest text-white px-8 py-3 rounded-full hover:bg-fern transition font-bold text-sm w-full">
            Book Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-cream min-h-screen">
      <div className="bg-forest text-white py-16 px-6 text-center">
        <p className="text-sage text-sm tracking-widest uppercase mb-2">Professional Landscaping</p>
        <h1 className="font-display text-5xl font-bold">Book a Consultation</h1>
        <p className="text-gray-300 mt-3 max-w-xl mx-auto">
          Free site visit & consultation. Tell us about your dream space.
        </p>
      </div>

      <div className="max-w-2xl mx-auto px-6 pt-10">
        <div className="flex items-center gap-2 mb-10">
          {[1, 2].map((s) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition ${
                step >= s ? 'bg-forest text-white' : 'bg-gray-200 text-gray-400'
              }`}>
                {s}
              </div>
              <div className={`flex-1 h-1 rounded ${s < 2 ? (step > s ? 'bg-forest' : 'bg-gray-200') : 'hidden'}`} />
            </div>
          ))}
        </div>

        {step === 1 && (
          <div>
            <h2 className="font-display text-2xl text-forest font-bold mb-2">What service do you need?</h2>
            <p className="text-fern text-sm mb-6">Select the type of landscaping project</p>
            <div className="flex flex-col gap-3">
              {services.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedService(s.id)}
                  className={`p-4 rounded-2xl border-2 text-left transition ${
                    selectedService === s.id
                      ? 'border-forest bg-white shadow-md'
                      : 'border-gray-200 bg-white hover:border-sage'
                  }`}>
                  <p className="font-bold text-forest">{s.label}</p>
                  <p className="text-sm text-fern">{s.desc}</p>
                </button>
              ))}
            </div>
            <button
              onClick={() => selectedService && setStep(2)}
              disabled={!selectedService}
              className={`w-full mt-8 py-3 rounded-full font-bold text-sm transition ${
                selectedService
                  ? 'bg-forest text-white hover:bg-fern'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}>
              Continue →
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="font-display text-2xl text-forest font-bold mb-2">Your Details</h2>
            <p className="text-fern text-sm mb-6">We'll use this to contact you</p>
            <div className="flex flex-col gap-4">
              <input name="name" value={form.name} onChange={handleChange}
                placeholder="Full Name *"
                className="px-5 py-3 rounded-xl border border-gray-200 bg-white text-forest focus:outline-none focus:ring-2 focus:ring-leaf text-sm" />
              <input name="phone" value={form.phone} onChange={handleChange}
                placeholder="Phone Number *"
                className="px-5 py-3 rounded-xl border border-gray-200 bg-white text-forest focus:outline-none focus:ring-2 focus:ring-leaf text-sm" />
              <input name="email" value={form.email} onChange={handleChange}
                placeholder="Email Address"
                className="px-5 py-3 rounded-xl border border-gray-200 bg-white text-forest focus:outline-none focus:ring-2 focus:ring-leaf text-sm" />
              <input name="address" value={form.address} onChange={handleChange}
                placeholder="Project Location / Address *"
                className="px-5 py-3 rounded-xl border border-gray-200 bg-white text-forest focus:outline-none focus:ring-2 focus:ring-leaf text-sm" />
              <input name="date" value={form.date} onChange={handleChange}
                type="date"
                min={new Date().toISOString().split('T')[0]}
                className="px-5 py-3 rounded-xl border border-gray-200 bg-white text-forest focus:outline-none focus:ring-2 focus:ring-leaf text-sm" />
              <textarea name="message" value={form.message} onChange={handleChange}
                placeholder="Tell us about your project (optional)"
                rows={3}
                className="px-5 py-3 rounded-xl border border-gray-200 bg-white text-forest focus:outline-none focus:ring-2 focus:ring-leaf text-sm resize-none" />
            </div>
            <div className="flex gap-3 mt-8">
              <button onClick={() => setStep(1)}
                className="flex-1 py-3 rounded-full border border-forest text-forest font-bold text-sm hover:bg-mist transition">
                ← Back
              </button>
              <button
                onClick={() => form.name && form.phone && form.address && handleSubmit()}
                disabled={!form.name || !form.phone || !form.address}
                className={`flex-1 py-3 rounded-full font-bold text-sm transition ${
                  form.name && form.phone && form.address
                    ? 'bg-forest text-white hover:bg-fern'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}>
                Confirm Booking ✓
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="grid grid-cols-3 gap-4 text-center">
          {[
            { icon: '🆓', text: 'Free Site Visit' },
            { icon: '📞', text: 'Call within 24hrs' },
            { icon: '✅', text: 'No Obligation' },
          ].map((b) => (
            <div key={b.text} className="bg-white rounded-2xl p-4 shadow-sm">
              <p className="text-2xl mb-1">{b.icon}</p>
              <p className="text-xs text-fern font-medium">{b.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}