'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronDown, Heart, ShoppingBag } from 'lucide-react';
import { useStore } from '@/store/useStore';
import type { Product } from '@/store/useStore';

const earrings: Product[] = [
  {
    id: 1,
    name: 'Diamond Stud Earrings',
    price: 1999,
    image: '/images/jewelry-1.jpg',
    category: 'Classic',
    material: '18k White Gold',
    slug: 'diamond-stud-earrings',
    tags: ['diamond', 'studs', 'classic'],
    description: 'Timeless round-cut diamond studs in 18k white gold',
  },
  {
    id: 2,
    name: 'Pearl Drop Earrings',
    price: 899,
    image: '/images/jewelry-2.jpg',
    category: 'Elegant',
    material: '14k White Gold',
    slug: 'pearl-drop-earrings',
    tags: ['pearl', 'drop', 'elegant'],
    description: 'South Sea pearl drops with diamond accents',
  },
  {
    id: 3,
    name: 'Sapphire Hoops',
    price: 1499,
    image: '/images/jewelry-3.jpg',
    category: 'Contemporary',
    material: '14k Yellow Gold',
    slug: 'sapphire-hoops',
    tags: ['sapphire', 'hoops', 'contemporary'],
    description: 'Modern sapphire-studded hoop earrings',
  },
  {
    id: 4,
    name: 'Chandelier Earrings',
    price: 2499,
    image: '/images/jewelry-4.jpg',
    category: 'Statement',
    material: '18k White Gold',
    slug: 'chandelier-earrings',
    tags: ['diamond', 'ruby', 'statement'],
    description: 'Dramatic diamond and ruby chandelier design',
  },
  {
    id: 5,
    name: 'Emerald Studs',
    price: 1799,
    image: '/images/jewelry-5.jpg',
    category: 'Luxury',
    material: '18k White Gold',
    slug: 'emerald-studs',
    tags: ['emerald', 'studs', 'luxury'],
    description: 'Colombian emerald studs with diamond halos',
  },
  {
    id: 6,
    name: 'Gold Geometric Earrings',
    price: 799,
    image: '/images/jewelry-6.jpg',
    category: 'Modern',
    material: '14k Yellow Gold',
    slug: 'gold-geometric-earrings',
    tags: ['gold', 'geometric', 'modern'],
    description: 'Contemporary geometric design in 14k gold',
  },
];

const categories = ['All', 'Classic', 'Elegant', 'Contemporary', 'Statement', 'Luxury', 'Modern'];
const sortOptions = ['Newest', 'Price: Low to High', 'Price: High to Low', 'Popular'];

export default function EarringsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { addToCart, addToWishlist, removeFromWishlist, wishlist } = useStore();

  const filteredEarrings = selectedCategory === 'All'
    ? earrings
    : earrings.filter(earring => earring.category === selectedCategory);

  return (
    <main className="min-h-screen bg-warm-cream pt-32">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[400px] mb-16">
        <Image
          src="/images/collection-earrings.jpg"
          alt="Luxury Earring Collection"
          fill
          sizes="100vw"
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
              Earring Collection
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-white/90 max-w-2xl"
            >
              From classic studs to statement chandeliers, discover earrings that elevate every look.
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
          {filteredEarrings.map((earring) => (
            <motion.div
              key={earring.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="relative aspect-square mb-4 rounded-lg overflow-hidden bg-white">
                <Image
                  src={earring.image}
                  alt={earring.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  priority={earring.id <= 3}
                />
                <button
                  onClick={() => {
                    const isInWishlist = wishlist.some(item => item.id === earring.id);
                    if (isInWishlist) {
                      removeFromWishlist(earring.id);
                    } else {
                      addToWishlist(earring);
                    }
                  }}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/90 hover:bg-white transition-colors"
                >
                  <Heart
                    size={20}
                    className={wishlist.some(item => item.id === earring.id) ? 'fill-red-500 text-red-500' : ''}
                  />
                </button>
              </div>
              <h3 className="text-xl font-serif text-dark-teal mb-2">{earring.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{earring.category}</p>
              <p className="text-sm text-gray-600 mb-3">{earring.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-medium">${earring.price.toLocaleString()}</span>
                <button 
                  onClick={() => addToCart(earring)}
                  className="px-4 py-2 bg-dark-teal text-white rounded-full hover:bg-opacity-90 transition-colors flex items-center gap-2"
                >
                  <ShoppingBag size={16} />
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