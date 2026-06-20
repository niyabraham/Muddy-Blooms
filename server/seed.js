const mongoose = require('mongoose');
const Plant = require('./models/Plant');
require('dotenv').config();

const plants = [
  { name: "Berkin", price: 450, category: "Indoor", tag: "Bestseller", emoji: "🪴", image: "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?w=400&h=400&fit=crop", description: "A stunning variegated plant with bold white stripes.", stock: 20 },
  { name: "Dwarf ZZ", price: 380, category: "Indoor", tag: "Low Maintenance", emoji: "🌿", image: "https://images.unsplash.com/photo-1632321014154-d7b18e8e8b0d?w=400&h=400&fit=crop", description: "Nearly indestructible. Perfect for beginners.", stock: 15 },
  { name: "Haworthia", price: 220, category: "Succulent", tag: "Succulent", emoji: "🌵", image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400&h=400&fit=crop", description: "A compact succulent that thrives in low light.", stock: 30 },
  { name: "Indoor Bamboo", price: 550, category: "Indoor", tag: "Air Purifier", emoji: "🎋", image: "https://images.unsplash.com/photo-1591958911259-bee2173bdcc0?w=400&h=400&fit=crop", description: "Brings a zen feel and purifies indoor air.", stock: 12 },
  { name: "Euphorbia Yellow", price: 310, category: "Succulent", tag: "Rare", emoji: "🌼", image: "https://images.unsplash.com/photo-1509937528035-ad76254b0356?w=400&h=400&fit=crop", description: "Rare and striking with bright yellow flowers.", stock: 8 },
  { name: "Philodendron", price: 490, category: "Indoor", tag: "Trending", emoji: "🍃", image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400&h=400&fit=crop", description: "Lush tropical leaves, very popular right now.", stock: 18 },
  { name: "Peace Lily", price: 350, category: "Indoor", tag: "Air Purifier", emoji: "🌸", image: "https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=400&h=400&fit=crop", description: "Elegant white blooms and an excellent air purifier.", stock: 25 },
  { name: "Bougainvillea", price: 280, category: "Outdoor", tag: "Flowering", emoji: "🌺", image: "https://images.unsplash.com/photo-1597305877032-0668b3c6413a?w=400&h=400&fit=crop", description: "Vibrant flowering climber for outdoor walls.", stock: 20 },
  { name: "Ixora", price: 199, category: "Outdoor", tag: "Flowering", emoji: "🌻", image: "https://images.unsplash.com/photo-1597305779175-9a3ee83c20e6?w=400&h=400&fit=crop", description: "Bright clusters of flowers, great for hedges.", stock: 35 },
  { name: "Adenium", price: 420, category: "Outdoor", tag: "Rare", emoji: "🌹", image: "https://images.unsplash.com/photo-1597305877074-5f93a5b3a5e3?w=400&h=400&fit=crop", description: "Desert rose with stunning trumpet flowers.", stock: 10 },
  { name: "Aloe Vera", price: 180, category: "Succulent", tag: "Medicinal", emoji: "🌱", image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400&h=400&fit=crop", description: "Famous for its healing gel and easy care.", stock: 40 },
  { name: "Snake Plant", price: 390, category: "Indoor", tag: "Bestseller", emoji: "🪴", image: "https://images.unsplash.com/photo-1593482892290-f54927ae1bb6?w=400&h=400&fit=crop", description: "One of the best air purifiers. Nearly care-free.", stock: 22 },
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