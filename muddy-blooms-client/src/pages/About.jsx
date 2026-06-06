export default function About() {
  return (
    <div className="bg-cream min-h-screen">

      <div className="bg-forest text-white py-16 px-6 text-center">
        <p className="text-sage text-sm tracking-widest uppercase mb-2">Our Story</p>
        <h1 className="font-display text-5xl font-bold">About Muddy Blooms</h1>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-20">

        {/* Story */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <h2 className="font-display text-3xl text-forest font-bold mb-4">
              Born from a Love of Green
            </h2>
            <p className="text-fern leading-relaxed mb-4">
              Muddy Blooms started as a passion project in the heart of Kottayam, Kerala — a region blessed with lush greenery and a deep connection to nature.
            </p>
            <p className="text-fern leading-relaxed mb-4">
              What began as a small collection of indoor plants has grown into Kerala's trusted name for premium plant nursery and professional landscaping services.
            </p>
            <p className="text-fern leading-relaxed">
              Every plant we sell is nurtured with care. Every landscape we design tells a story. We believe green spaces aren't just beautiful — they transform how people live and feel.
            </p>
          </div>
          <div className="bg-mist rounded-3xl h-72 flex items-center justify-center text-8xl">
            🌿
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-20">
          {[
            { number: '500+', label: 'Plants Delivered' },
            { number: '50+', label: 'Landscapes Designed' },
            { number: '5+', label: 'Years Experience' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl p-6 text-center shadow-sm">
              <p className="font-display text-4xl text-forest font-bold">{stat.number}</p>
              <p className="text-fern text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Values */}
        <h2 className="font-display text-3xl text-forest font-bold text-center mb-10">
          What We Stand For
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: '🌱', title: 'Sustainability', desc: 'We source responsibly and promote eco-friendly gardening practices.' },
            { icon: '❤️', title: 'Care', desc: 'Every plant and project gets our full attention and expertise.' },
            { icon: '🤝', title: 'Trust', desc: 'We build long-term relationships with every customer we serve.' },
          ].map((v) => (
            <div key={v.title} className="bg-white rounded-2xl p-6 shadow-sm text-center">
              <p className="text-4xl mb-3">{v.icon}</p>
              <h3 className="font-display text-forest font-bold text-lg mb-2">{v.title}</h3>
              <p className="text-fern text-sm leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}