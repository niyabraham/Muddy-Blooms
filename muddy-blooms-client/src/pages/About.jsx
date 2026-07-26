export default function About() {
  return (
    <div className="bg-cream min-h-screen">

      <div className="bg-forest text-white py-16 px-6 text-center">
        <p className="text-sage text-sm tracking-widest uppercase mb-2">Our Story</p>
        <h1 className="font-display text-5xl font-bold mb-3">About Muddy Blooms</h1>
        <span className="inline-block bg-white/10 border border-sage/30 text-sage text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full">
          Est. 2018 · Kottayam, Kerala
        </span>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-20">

        {/* Story */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-16">
          <div>
            <h2 className="font-display text-3xl text-forest font-bold mb-4">
              A Seed of an Idea, Since 2018
            </h2>
            <p className="text-fern leading-relaxed mb-4">
              Muddy Blooms began in 2018 with a simple, profound love for nature and a vision to bring green spaces to life. What started as a small local nursery and a passion for gardening has grown into a comprehensive landscaping and plant solutions provider.
            </p>
            <p className="text-fern leading-relaxed mb-4">
              We saw the potential to transform ordinary spaces into extraordinary natural retreats — whether that's a serene home garden in Kottayam, a vibrant landscape for a luxury resort, or bespoke plant designs for a commercial property.
            </p>
            <p className="text-fern leading-relaxed">
              Every plant we sell is nurtured with care. Every landscape we design tells a story. We believe green spaces don't just look beautiful — they change how people live and feel.
            </p>
          </div>
          <div className="bg-mist rounded-3xl h-72 flex items-center justify-center text-8xl">
            🌿
          </div>
        </div>

        {/* Founder Callout */}
        <div className="bg-white rounded-2xl p-8 shadow-sm mb-20 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
          <div className="w-20 h-20 rounded-full bg-mist flex items-center justify-center text-4xl flex-shrink-0">
            👤
          </div>
          <div>
            <p className="font-display text-xl text-forest font-bold">Aby Mathew</p>
            <p className="text-fern text-sm">Founder, Muddy Blooms</p>
            <p className="text-gray-500 text-sm mt-2">
              Leading every project personally, from first consultation to final planting — with a mission of nurturing nature and enriching lives, one green space at a time.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-20">
          {[
            { number: '500+', label: 'Plants Delivered' },
            { number: '50+', label: 'Landscapes Designed' },
            { number: '8+', label: 'Years Experience' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl p-6 text-center shadow-sm">
              <p className="font-display text-4xl text-forest font-bold">{stat.number}</p>
              <p className="text-fern text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Mission */}
        <div className="text-center mb-20">
          <h2 className="font-display text-3xl text-forest font-bold mb-4">
            Nurturing Nature, Enriching Lives
          </h2>
          <p className="text-fern leading-relaxed max-w-2xl mx-auto">
            Our mission goes beyond planting. We design, create, and maintain beautiful, functional, sustainable landscapes that reflect each client's vision — and for indoor spaces, we hand-pick healthy plants that bring beauty and life to any environment, from cozy homes to grand resorts.
          </p>
        </div>

        {/* Values */}
        <h2 className="font-display text-3xl text-forest font-bold text-center mb-10">
          What We Stand For
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            { icon: '🌿', title: 'Passion for Greenery', desc: 'We live and breathe plants and design, bringing genuine enthusiasm to every project.' },
            { icon: '🌱', title: 'Sustainability at Heart', desc: 'We prioritize eco-friendly practices, water conservation, and native plant selections.' },
            { icon: '✨', title: 'Uncompromising Quality', desc: 'From the soil we use to the last planted shrub, excellence is our standard.' },
            { icon: '🤝', title: 'Client-Centric Approach', desc: "Your vision is our blueprint. We listen, collaborate, and deliver results that exceed expectations." },
            { icon: '📍', title: 'Local Expertise', desc: 'With deep roots in Kerala, we understand the climate, flora, and specific needs of the region.' },
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