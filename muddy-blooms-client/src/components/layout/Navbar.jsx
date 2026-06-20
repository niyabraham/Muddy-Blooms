import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems } = useCart();

  return (
    <nav className="bg-forest text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <Link to="/" className="font-display text-xl font-bold text-white flex items-center gap-2">
          <img src="/logo.jpg" alt="Muddy Blooms" className="w-8 h-8 object-contain" />
          Muddy Blooms
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/"            className="text-sage hover:text-white transition text-sm font-medium">Home</Link>
          <Link to="/shop"        className="text-sage hover:text-white transition text-sm font-medium">Shop</Link>
          <Link to="/landscaping" className="text-sage hover:text-white transition text-sm font-medium">Landscaping</Link>
          <Link to="/about"       className="text-sage hover:text-white transition text-sm font-medium">About</Link>
          <Link to="/contact"     className="text-sage hover:text-white transition text-sm font-medium">Contact</Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/cart" className="text-sage hover:text-white text-sm transition relative">
            🛒
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-earth text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </Link>
          <Link to="/booking" className="bg-sage text-forest font-bold px-4 py-2 rounded-full text-sm hover:bg-leaf hover:text-white transition">
            Book Appointment
          </Link>
        </div>

        <button className="md:hidden text-white text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-fern px-6 pb-4 flex flex-col gap-4 text-sm">
          <Link to="/"            onClick={() => setMenuOpen(false)} className="text-sage hover:text-white py-1">Home</Link>
          <Link to="/shop"        onClick={() => setMenuOpen(false)} className="text-sage hover:text-white py-1">Shop</Link>
          <Link to="/landscaping" onClick={() => setMenuOpen(false)} className="text-sage hover:text-white py-1">Landscaping</Link>
          <Link to="/about"       onClick={() => setMenuOpen(false)} className="text-sage hover:text-white py-1">About</Link>
          <Link to="/contact"     onClick={() => setMenuOpen(false)} className="text-sage hover:text-white py-1">Contact</Link>
          <Link to="/cart"        onClick={() => setMenuOpen(false)} className="text-sage hover:text-white py-1">🛒 Cart {totalItems > 0 && `(${totalItems})`}</Link>
          <Link to="/booking"     onClick={() => setMenuOpen(false)} className="bg-sage text-forest font-bold px-4 py-2 rounded-full text-center">Book Appointment</Link>
        </div>
      )}
    </nav>
  );
}