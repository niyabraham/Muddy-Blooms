const mongoose = require('mongoose');
const Plant = require('./models/Plant');
require('dotenv').config();

const plants = [
  {
    name: "Berkin",
    price: 450,
    category: "Indoor",
    tag: "Bestseller",
    emoji: "🪴",
    image: "https://muddy-blooms-api.onrender.com/images/plantpictures/berkin.jpg",
    description: "A stunning variegated plant with bold white stripes.",
    stock: 20
  },
  {
    name: "Dwarf ZZ",
    price: 380,
    category: "Indoor",
    tag: "Low Maintenance",
    emoji: "🌿",
    image: "https://muddy-blooms-api.onrender.com/images/plantpictures/dwarfzz.jpg",
    description: "Nearly indestructible. Perfect for beginners.",
    stock: 15
  },
  {
    name: "Haworthia",
    price: 220,
    category: "Succulent",
    tag: "Succulent",
    emoji: "🌵",
    image: "https://muddy-blooms-api.onrender.com/images/plantpictures/haworthia.jpg",
    description: "A compact succulent that thrives in low light.",
    stock: 30
  },
  {
    name: "Indoor Bamboo",
    price: 550,
    category: "Indoor",
    tag: "Air Purifier",
    emoji: "🎋",
    image: "https://muddy-blooms-api.onrender.com/images/plantpictures/indoorbamboo.jpg",
    description: "Brings a zen feel and purifies indoor air.",
    stock: 12
  },
  {
    name: "Euphorbia Yellow",
    price: 310,
    category: "Succulent",
    tag: "Rare",
    emoji: "🌼",
    image: "https://muddy-blooms-api.onrender.com/images/plantpictures/yellow.jpg",
    description: "Rare and striking with bright yellow flowers.",
    stock: 8
  },
  {
    name: "Philodendron",
    price: 490,
    category: "Indoor",
    tag: "Trending",
    emoji: "🍃",
    image: "https://muddy-blooms-api.onrender.com/images/plantpictures/philadendron.jpg",
    description: "Lush tropical leaves, very popular right now.",
    stock: 18
  },
  {
    name: "Peace Lily",
    price: 350,
    category: "Indoor",
    tag: "Air Purifier",
    emoji: "🌸",
    image: "https://muddy-blooms-api.onrender.com/images/plantpictures/peacelily.jpg",
    description: "Elegant white blooms and an excellent air purifier.",
    stock: 25
  },
  {
    name: "Bougainvillea",
    price: 280,
    category: "Outdoor",
    tag: "Flowering",
    emoji: "🌺",
    image: "https://muddy-blooms-api.onrender.com/images/plantpictures/bougainveilla.jpg",
    description: "Vibrant flowering climber for outdoor walls.",
    stock: 20
  },
  {
    name: "Ixora",
    price: 199,
    category: "Outdoor",
    tag: "Flowering",
    emoji: "🌻",
    image: "https://muddy-blooms-api.onrender.com/images/plantpictures/ixora.jpg",
    description: "Bright clusters of flowers, great for hedges.",
    stock: 35
  },
  {
    name: "Adenium",
    price: 420,
    category: "Outdoor",
    tag: "Rare",
    emoji: "🌹",
    image: "https://muddy-blooms-api.onrender.com/images/plantpictures/adenium.jpg",
    description: "Desert rose with stunning trumpet flowers.",
    stock: 10
  },
  {
    name: "Aloe Vera",
    price: 180,
    category: "Succulent",
    tag: "Medicinal",
    emoji: "🌱",
    image: "https://muddy-blooms-api.onrender.com/images/plantpictures/aloevera.jpg",
    description: "Famous for its healing gel and easy care.",
    stock: 40
  },
  {
    name: "Snake Plant",
    price: 390,
    category: "Indoor",
    tag: "Bestseller",
    emoji: "🪴",
    image: "https://muddy-blooms-api.onrender.com/images/plantpictures/snakeplant.jpg",
    description: "One of the best air purifiers. Nearly care-free.",
    stock: 22
  }
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('✅ Connected to MongoDB');

  await Plant.deleteMany();
  console.log('🗑️ Cleared existing plants');

  await Plant.insertMany(plants);
  console.log('🌿 Plants seeded successfully!');

  mongoose.disconnect();
}

seed();