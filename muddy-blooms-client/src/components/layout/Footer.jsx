import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-forest text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">

        {/* Top Grid */}
        <div className="grid md:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="md:col-span-1">
            <h2 className="font-display text-2xl font-bold mb-3">🌿 Muddy Blooms</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Transforming spaces with nature. Kerala's premier plant nursery and landscaping experts.
            </p>
            <div className="flex gap-4 mt-5">
              <a href="https://www.facebook.com/muddyblooms/" target="_blank" rel="noreferrer"
                className="bg-fern hover:bg-leaf w-9 h-9 rounded-full flex items-center justify-center text-sm transition">
                f
              </a>
              <a href="https://www.instagram.com/muddy__blooms/" target="_blank" rel="noreferrer"
                className="bg-fern hover:bg-leaf w-9 h-9 rounded-full flex items-center justify-center text-sm transition">
                in
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-sage mb-4 uppercase text-xs tracking-widest">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/" className="hover:text-white transition">Home</Link></li>
              <li><Link to="/shop" className="hover:text-white transition">Shop Plants</Link></li>
              <li><Link to="/landscaping" className="hover:text-white transition">Landscaping</Link></li>
              <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-sage mb-4 uppercase text-xs tracking-widest">Services</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Indoor Plants</li>
              <li>Outdoor Plants</li>
              <li>Residential Landscaping</li>
              <li>Resort Landscaping</li>
              <li>Commercial Projects</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-sage mb-4 uppercase text-xs tracking-widest">Contact Us</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex gap-2">
                <span>📍</span>
                <span>Vattukulam P.O, Kadappoor, Kottayam, Kerala</span>
              </li>
              <li className="flex gap-2">
                <span>📞</span>
                <a href="tel:+919447193598" className="hover:text-white transition">+91 9447193598</a>
              </li>
              <li className="flex gap-2">
                <span>✉️</span>
                <a href="mailto:muddyblooms@gmail.com" className="hover:text-white transition">muddyblooms@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-fern pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© 2025 Muddy Blooms. All rights reserved.</p>
          <p>Designed by <a href="https://www.linkedin.com/in/niya-abraham" target="_blank" rel="noreferrer" className="text-sage hover:text-white transition">Niya Abraham</a></p>
        </div>

      </div>
    </footer>
  );
}