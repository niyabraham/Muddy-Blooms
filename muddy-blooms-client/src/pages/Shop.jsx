import { useState } from 'react';
import { useCart } from '../context/CartContext';

const plants = [
  { id: 1, name: "Berkin", price: 450, category: "Indoor", tag: "Bestseller", emoji: "🪴" },
  { id: 2, name: "Dwarf ZZ", price: 380, category: "Indoor", tag: "Low Maintenance", emoji: "🌿" },
  { id: 3, name: "Haworthia", price: 220, category: "Succulent", tag: "Succulent", emoji: "🌵" },
  { id: 4, name: "Indoor Bamboo", price: 550, category: "Indoor", tag: "Air Purifier", emoji: "🎋" },
  { id: 5, name: "Euphorbia Yellow", price: 310, category: "Succulent", tag: "Rare", emoji: "🌼" },
  { id: 6, name: "Philodendron", price: 490, category: "Indoor", tag: "Trending", emoji: "🍃" },
  { id: 7, name: "Peace Lily", price: 350, category: "Indoor", tag: "Air Purifier", emoji: "🌸" },
  { id: 8, name: "Bougainvillea", price: 280, category: "Outdoor", tag: "Flowering", emoji: "🌺" },
  { id: 9, name: "Ixora", price: 199, category: "Outdoor", tag: "Flowering", emoji: "🌻" },
  { id: 10, name: "Adenium", price: 420, category: "Outdoor", tag: "Rare", emoji: "🌹" },
  { id: 11, name: "Aloe Vera", price: 180, category: "Succulent", tag: "Medicinal", emoji: "🌱" },
  { id: 12, name: "Snake Plant", price: 390, category: "Indoor", tag: "Bestseller", emoji: "🪴" },
];

const categories = ["All", "Indoor", "Outdoor", "Succulent"];

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [addedItems, setAddedItems] = useState([]);
  const { addToCart } = useCart();

  const filtered = plants.filter((p) => {
    const matchCategory = activeCategory === "All" || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  const handleAdd = (plant) => {
    addToCart(plant);
    setAddedItems((prev) => [...prev, plant.id]);
    setTimeout(() => {
      setAddedItems((prev) => prev.filter((i) => i !== plant.id));
    }, 1500);
  };

  return (
    <div className="bg-cream min-h-screen">

      {/* Header */}
      <div className="bg-forest text-white py-16 px-6 text-center">
        <p className="text-sage text-sm tracking-widest uppercase mb-2">Our Collection</p>
        <h1 className="font-display text-5xl font-bold">Plant Shop</h1>
        <p className="text-gray-300 mt-3 max-w-xl mx-auto">
          Handpicked plants for every space — indoors, outdoors, and everything in between.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Search + Filter */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-10">
          <input
            type="text"
            placeholder="🔍 Search plants..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-80 px-5 py-3 rounded-full border border-gray-200 bg-white text-forest focus:outline-none focus:ring-2 focus:ring-leaf text-sm"
          />
          <div className="flex gap-2 flex-wrap justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                  activeCategory === cat
                    ? "bg-forest text-white"
                    : "bg-white text-forest border border-gray-200 hover:bg-mist"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <p className="text-fern text-sm mb-6">{filtered.length} plants found</p>

        {/* Plant Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((plant) => (
            <div key={plant.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition group">
              <div className="bg-mist h-44 flex items-center justify-center text-6xl
                group-hover:scale-105 transition-transform duration-300">
                {plant.emoji}
              </div>
              <div className="p-4">
                <span className="text-xs text-leaf font-medium">{plant.tag}</span>
                <h3 className="font-display text-forest font-bold mt-1 text-lg">{plant.name}</h3>
                <p className="text-xs text-gray-400 mb-3">{plant.category} Plant</p>
                <div className="flex items-center justify-between">
                  <span className="text-fern font-bold text-lg">₹{plant.price}</span>
                  <button
                    onClick={() => handleAdd(plant)}
                    className={`text-xs px-3 py-2 rounded-full transition font-bold ${
                      addedItems.includes(plant.id)
                        ? "bg-leaf text-white"
                        : "bg-forest text-white hover:bg-fern"
                    }`}
                  >
                    {addedItems.includes(plant.id) ? "✓ Added!" : "+ Cart"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">🌵</p>
            <p className="text-fern text-lg">No plants found. Try a different search!</p>
          </div>
        )}
      </div>
    </div>
  );
}