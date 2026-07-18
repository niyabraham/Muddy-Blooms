import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchPlants, BASE_URL } from '../api';
import { useCart } from '../context/CartContext';

export default function Home() {
  const [featuredPlants, setFeaturedPlants] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchPlants().then(plants => {
      setFeaturedPlants(plants.slice(0, 4));
    }).catch(() => {});
  }, []);

  return (
    <div className="bg-cream">

      {/* HERO SECTION */}
      <section className="relative bg-forest text-white overflow-hidden">
        <div className="absolute -top-32 -left-20 w-96 h-96 bg-leaf/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/4 -right-32 w-[30rem] h-[30rem] bg-earth/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-fern/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 py-28 md:py-36 relative grid md:grid-cols-2 gap-12 items-center">

          {/* Copy */}
          <div className="flex flex-col items-start gap-6">
            <span className="text-earth text-sm font-bold tracking-widest uppercase bg-white/5 border border-earth/30 px-4 py-2 rounded-full">
              Kerala's Premier Plant Nursery
            </span>
            <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.05]">
              Bring Nature Into <span className="text-leaf">Your World</span>
            </h1>
            <p className="text-gray-300 text-lg max-w-xl">
              Shop rare indoor plants, or let our expert team transform your outdoor space into a breathtaking landscape.
            </p>
            <div className="flex gap-4 mt-2 flex-wrap">
              <Link to="/shop"
                className="bg-sage text-forest font-bold px-8 py-3 rounded-full hover:bg-leaf hover:text-white hover:-translate-y-0.5 transition-all duration-300 text-sm shadow-lg shadow-black/20">
                Shop Plants
              </Link>
              <Link to="/booking"
                className="border border-sage/50 text-sage px-8 py-3 rounded-full hover:bg-sage hover:text-forest hover:-translate-y-0.5 transition-all duration-300 text-sm font-bold">
                Book Landscaping
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-6 pt-6 border-t border-white/10 w-full text-sm">
              <span className="text-gray-400 uppercase tracking-widest text-xs">Featured on</span>
              <span className="text-sage font-semibold">Manorama News</span>
              <span className="text-white/20">•</span>
              <span className="text-sage font-semibold">Kissan Krishideepam</span>
            </div>
          </div>

          {/* Floating plant collage */}
          <div className="relative hidden md:flex items-center justify-center h-[420px]">
            <div className="absolute w-72 h-72 bg-leaf/10 rounded-full blur-2xl" />

            <div className="absolute top-0 left-6 animate-[float_6s_ease-in-out_infinite]">
              <div className="bg-mist rounded-3xl w-40 h-48 shadow-2xl flex items-center justify-center text-7xl rotate-[-8deg]">
                🪴
              </div>
            </div>
            <div className="absolute bottom-2 right-2 animate-[float_7s_ease-in-out_infinite_1s]">
              <div className="bg-cream rounded-3xl w-44 h-52 shadow-2xl flex items-center justify-center text-8xl rotate-[6deg]">
                🌿
              </div>
            </div>
            <div className="absolute top-20 right-16 animate-[float_5s_ease-in-out_infinite_0.5s]">
              <div className="bg-earth rounded-full w-24 h-24 shadow-xl flex items-center justify-center text-4xl rotate-[10deg]">
                🌸
              </div>
            </div>
            <div className="absolute bottom-28 left-14 animate-[float_8s_ease-in-out_infinite_1.5s]">
              <div className="bg-sage rounded-2xl w-28 h-28 shadow-xl flex items-center justify-center text-4xl rotate-[-6deg]">
                🌱
              </div>
            </div>
          </div>
        </div>

        {/* Decorative bottom curve */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,60 C480,0 960,0 1440,60 L1440,60 L0,60 Z" fill="#F9F6F0"/>
          </svg>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <p className="text-center text-earth font-bold text-sm tracking-widest uppercase mb-3">The Muddy Blooms Difference</p>
        <h2 className="font-display text-4xl text-forest font-bold text-center mb-4">
          Why Choose Muddy Blooms?
        </h2>
        <p className="text-center text-fern mb-16 max-w-xl mx-auto">
          From a single plant to a full landscape transformation — we do it all with care.
        </p>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            { icon: "🌱", title: "Expert Plant Care", desc: "Every plant is nurtured by specialists and arrives healthy, guaranteed." },
            { icon: "🏡", title: "Custom Landscaping", desc: "Bespoke designs for homes, resorts, and commercial spaces across Kerala." },
            { icon: "🚚", title: "Safe Delivery", desc: "Careful packaging and prompt delivery right to your doorstep." },
          ].map((item) => (
            <div key={item.title} className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 text-center border border-transparent hover:border-sage/40 hover:-translate-y-1">
              <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-mist flex items-center justify-center text-4xl group-hover:bg-sage/40 transition-colors duration-300">
                {item.icon}
              </div>
              <h3 className="font-display text-xl text-forest font-bold mb-2">{item.title}</h3>
              <p className="text-fern text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED PLANTS */}
      <section className="bg-mist py-24">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-earth font-bold text-sm tracking-widest uppercase mb-3">Shop Favorites</p>
          <h2 className="font-display text-4xl text-forest font-bold text-center mb-4">
            Popular Plants
          </h2>
          <p className="text-center text-fern mb-16 max-w-xl mx-auto">
            A curated selection of our most-loved indoor plants.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {featuredPlants.length === 0 ? (
              [1,2,3,4].map(i => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse">
                  <div className="bg-gray-200 h-48" />
                  <div className="p-4 space-y-2">
                    <div className="bg-gray-200 h-3 w-16 rounded" />
                    <div className="bg-gray-200 h-4 w-24 rounded" />
                    <div className="bg-gray-200 h-3 w-32 rounded" />
                  </div>
                </div>
              ))
            ) : (
              featuredPlants.map((plant) => (
                <div key={plant._id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                  <div className="h-48 overflow-hidden">
                    {plant.image ? (
                      <img
                          src={`${BASE_URL}${plant.image}`}
                          alt={plant.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          onError={(e) => {
                            console.log("Failed:", e.target.src);
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                          }}
                        />
                    ) : null}
                    <div
                      className="bg-mist h-full items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-300"
                      style={{ display: plant.image ? 'none' : 'flex' }}>
                      {plant.emoji}
                    </div>
                  </div>
                  <div className="p-4">
                    <span className="text-xs text-leaf font-medium">{plant.tag}</span>
                    <h3 className="font-display text-forest font-bold mt-1">{plant.name}</h3>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-fern font-bold">₹{plant.price}</span>
                      <button
                        onClick={() => addToCart(plant)}
                        className="bg-forest text-white text-xs px-3 py-1 rounded-full hover:bg-fern transition">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="text-center mt-12">
            <Link to="/shop" className="bg-forest text-white px-8 py-3 rounded-full hover:bg-fern hover:-translate-y-0.5 transition-all duration-300 font-bold text-sm inline-block shadow-lg shadow-forest/20">
              View All Plants →
            </Link>
          </div>
        </div>
      </section>

      {/* LANDSCAPING CTA */}
      <section className="relative bg-fern text-white py-24 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 rotate-180">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,60 C480,0 960,0 1440,60 L1440,60 L0,60 Z" fill="#F9F6F0"/>
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-6 text-center relative">
          <h2 className="font-display text-4xl font-bold mb-4">
            Dream Outdoor Space?
          </h2>
          <p className="text-sage text-lg mb-8 max-w-xl mx-auto">
            Our landscape designers work with homes, resorts, and businesses to create stunning green spaces.
          </p>
          <Link to="/booking"
            className="bg-white text-forest font-bold px-10 py-4 rounded-full hover:bg-cream hover:-translate-y-0.5 transition-all duration-300 text-sm inline-block shadow-xl">
            Book a Free Consultation
          </Link>
        </div>
      </section>

    </div>
  );
}