'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const collections = [
  {
    title: 'Timeless Elegance',
    description: 'Discover our signature collection of classic pieces that transcend time.',
    image: '/images/jewelry-1.jpg',
    link: '/collections/timeless',
  },
  {
    title: 'Modern Romance',
    description: 'Contemporary designs that capture the essence of modern love.',
    image: '/images/jewelry-2.jpg',
    link: '/collections/modern',
  },
  {
    title: 'Vintage Inspired',
    description: 'Pieces that draw inspiration from the golden age of jewelry design.',
    image: '/images/jewelry-3.jpg',
    link: '/collections/vintage',
  },
];

const craftmanship = [
  {
    title: 'Expert Artisans',
    description: 'Our master craftsmen bring decades of experience to every piece.',
    image: '/images/heritage/craft-1.jpg',
  },
  {
    title: 'Finest Materials',
    description: 'Only the highest quality gems and precious metals make it into our pieces.',
    image: '/images/heritage/craft-2.jpg',
  },
  {
    title: 'Meticulous Detail',
    description: 'Every piece undergoes rigorous quality control and hand-finishing.',
    image: '/images/heritage/craft-3.jpg',
  },
];

export default function DiscoverPage() {
  return (
    <main className="pt-32 bg-warm-cream min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] mb-24">
        <Image
          src="/images/claim.jpg"
          alt="Luxury Jewelry Collection"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-dark-teal/40 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center text-white"
          >
            <h1 className="text-5xl md:text-6xl font-serif mb-6">Discover Our World</h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto">
              Where tradition meets contemporary elegance
            </p>
          </motion.div>
        </div>
      </section>

      {/* Collections Section */}
      <section className="container mx-auto px-4 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-serif mb-6 text-dark-teal">Our Collections</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Each collection tells a unique story through exquisite craftsmanship and timeless design.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <Link href={collection.link} className="block">
                <div className="relative h-96 mb-6 rounded-lg overflow-hidden">
                  <Image
                    src={collection.image}
                    alt={collection.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-dark-teal/0 group-hover:bg-dark-teal/40 transition-colors duration-300" />
                </div>
                <h3 className="text-2xl font-serif mb-2 text-dark-teal">{collection.title}</h3>
                <p className="text-gray-600 mb-4">{collection.description}</p>
                <span className="text-gold flex items-center gap-2 group-hover:gap-4 transition-all duration-300">
                  Explore Collection <ArrowRight size={20} />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Craftmanship Section */}
      <section className="bg-white py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-serif mb-6 text-dark-teal">Our Craftmanship</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Every piece is a testament to our dedication to excellence and attention to detail.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {craftmanship.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="relative h-80 mb-6 rounded-lg overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-2xl font-serif mb-2 text-dark-teal">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
} 