'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronDown, Heart } from 'lucide-react';

// Mock data - replace with actual data
const rings = [
  {
    id: 1,
    name: 'Diamond Solitaire Ring',
    price: 2999,
    image: '/images/products/ring-1.jpg',
    category: 'Engagement',
    description: 'Classic solitaire with a brilliant-cut diamond',
  },
  {
    id: 2,
    name: 'Sapphire Eternity Band',
    price: 1899,
    image: '/images/products/ring-2.jpg',
    category: 'Wedding',
    description: 'Stunning sapphire eternity band in white gold',
  },
  {
    id: 3,
    name: 'Rose Gold Promise Ring',
    price: 899,
    image: '/images/collection-rings.jpg',
    category: 'Promise',
    description: 'Delicate rose gold ring with pavé diamonds',
  },
  {
    id: 4,
    name: 'Vintage Pearl Ring',
    price: 1299,
    image: '/images/jewelry-4.jpg',
    category: 'Vintage',
    description: 'Art deco inspired ring with freshwater pearl',
  },
  {
    id: 5,
    name: 'Ruby Cocktail Ring',
    price: 2499,
    image: '/images/jewelry-5.jpg',
    category: 'Statement',
    description: 'Bold cocktail ring featuring a natural ruby',
  },
  {
    id: 6,
    name: 'Emerald Halo Ring',
    price: 3299,
    image: '/images/jewelry-6.jpg',
    category: 'Luxury',
    description: 'Emerald-cut center stone with diamond halo',
  },
];

const categories = ['All', 'Engagement', 'Wedding', 'Promise', 'Vintage', 'Statement', 'Luxury'];
const sortOptions = ['Newest', 'Price: Low to High', 'Price: High to Low', 'Popular'];

export default function RingsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isWishlisted, setIsWishlisted] = useState<{ [key: number]: boolean }>({});

  const toggleWishlist = (id: number) => {
    setIsWishlisted(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <main className="min-h-screen bg-warm-cream pt-32">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[400px] mb-16">
        <Image
          src="/images/collection-rings.jpg"
          alt="Luxury Ring Collection"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30">
          <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-serif text-white mb-6"
            >
              Ring Collection
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-white/90 max-w-2xl"
            >
              From timeless solitaires to contemporary designs, discover your perfect ring.
            </motion.p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4">
        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedCategory === category
                    ? 'bg-dark-teal text-white'
                    : 'bg-white hover:bg-dark-teal/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="relative">
            <select className="appearance-none px-4 py-2 pr-10 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-dark-teal">
              {sortOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {rings.map((ring) => (
            <motion.div
              key={ring.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="relative aspect-square mb-4 rounded-lg overflow-hidden bg-white">
                <Image
                  src={ring.image}
                  alt={ring.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <button
                  onClick={() => toggleWishlist(ring.id)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/90 hover:bg-white transition-colors"
                >
                  <Heart
                    size={20}
                    className={isWishlisted[ring.id] ? 'fill-red-500 text-red-500' : ''}
                  />
                </button>
              </div>
              <h3 className="text-xl font-serif text-dark-teal mb-2">{ring.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{ring.category}</p>
              <p className="text-sm text-gray-600 mb-3">{ring.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-medium">${ring.price.toLocaleString()}</span>
                <button className="px-4 py-2 bg-dark-teal text-white rounded-full hover:bg-opacity-90 transition-colors">
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
} 