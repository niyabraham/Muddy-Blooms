import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="bg-cream">

      {/* HERO SECTION */}
      <section className="relative bg-forest text-white">
        <div className="max-w-7xl mx-auto px-6 py-32 flex flex-col items-start gap-6">
          <span className="text-sage text-sm font-medium tracking-widest uppercase">
            Kerala's Premier Plant Nursery
          </span>
          <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight max-w-2xl">
            Bring Nature Into Your World
          </h1>
          <p className="text-gray-300 text-lg max-w-xl">
            Shop rare indoor plants, or let our expert team transform your outdoor space into a breathtaking landscape.
          </p>
          <div className="flex gap-4 mt-4 flex-wrap">
            <Link to="/shop"
              className="bg-sage text-forest font-bold px-8 py-3 rounded-full hover:bg-leaf hover:text-white transition text-sm">
              Shop Plants
            </Link>
            <Link to="/booking"
              className="border border-sage text-sage px-8 py-3 rounded-full hover:bg-sage hover:text-forest transition text-sm font-bold">
              Book Landscaping
            </Link>
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
            <div key={item.title} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition text-center">
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="font-display text-xl text-forest font-bold mb-2">{item.title}</h3>
              <p className="text-fern text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED PLANTS */}
      <section className="bg-mist py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-display text-4xl text-forest font-bold text-center mb-4">
            Popular Plants
          </h2>
          <p className="text-center text-fern mb-16 max-w-xl mx-auto">
            A curated selection of our most-loved indoor plants.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Berkin", price: "₹450", tag: "Bestseller" },
              { name: "Dwarf ZZ", price: "₹380", tag: "Low Maintenance" },
              { name: "Haworthia", price: "₹220", tag: "Succulent" },
              { name: "Indoor Bamboo", price: "₹550", tag: "Air Purifier" },
            ].map((plant) => (
              <div key={plant.name} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition group">
                <div className="bg-mist h-48 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-300">
                  🪴
                </div>
                <div className="p-4">
                  <span className="text-xs text-leaf font-medium">{plant.tag}</span>
                  <h3 className="font-display text-forest font-bold mt-1">{plant.name}</h3>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-fern font-bold">{plant.price}</span>
                    <button className="bg-forest text-white text-xs px-3 py-1 rounded-full hover:bg-fern transition">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/shop" className="bg-forest text-white px-8 py-3 rounded-full hover:bg-fern transition font-bold text-sm">
              View All Plants →
            </Link>
          </div>
        </div>
      </section>

      {/* LANDSCAPING CTA */}
      <section className="bg-fern text-white py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="font-display text-4xl font-bold mb-4">
            Dream Outdoor Space?
          </h2>
          <p className="text-sage text-lg mb-8 max-w-xl mx-auto">
            Our landscape designers work with homes, resorts, and businesses to create stunning green spaces.
          </p>
          <Link to="/booking"
            className="bg-white text-forest font-bold px-10 py-4 rounded-full hover:bg-cream transition text-sm inline-block">
            Book a Free Consultation
          </Link>
        </div>
      </section>

    </div>
  );
}