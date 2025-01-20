'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const blogPosts = [
  {
    id: 1,
    title: 'Spring Jewelry Trends 2024',
    excerpt: 'Discover the hottest jewelry trends this spring season, from colorful gemstones to nature-inspired designs.',
    image: '/images/blog/spring-trends.jpg',
    category: 'Trends',
    date: 'March 15, 2024',
    readTime: '5 min read'
  },
  {
    id: 2,
    title: 'Understanding Diamond Clarity',
    excerpt: 'A comprehensive guide to diamond clarity grades and how they affect the value and beauty of your jewelry.',
    image: '/images/blog/diamond-clarity.jpg',
    category: 'Education',
    date: 'March 10, 2024',
    readTime: '8 min read'
  },
  {
    id: 3,
    title: 'The Art of Layering Necklaces',
    excerpt: 'Master the art of necklace layering with our expert tips and styling guide for a perfect look.',
    image: '/images/blog/layering-necklaces.jpg',
    category: 'Style Guide',
    date: 'March 5, 2024',
    readTime: '6 min read'
  },
  {
    id: 4,
    title: 'Caring for Your Fine Jewelry',
    excerpt: 'Essential tips and best practices for maintaining the beauty and longevity of your precious jewelry pieces.',
    image: '/images/blog/jewelry-care.jpg',
    category: 'Care Guide',
    date: 'March 1, 2024',
    readTime: '7 min read'
  },
  {
    id: 5,
    title: 'Engagement Ring Shopping Guide',
    excerpt: 'Everything you need to know about choosing the perfect engagement ring for your special moment.',
    image: '/images/blog/engagement-guide.jpg',
    category: 'Buying Guide',
    date: 'February 25, 2024',
    readTime: '10 min read'
  },
  {
    id: 6,
    title: 'History of Art Deco Jewelry',
    excerpt: 'Explore the fascinating history and distinctive characteristics of Art Deco jewelry design.',
    image: '/images/blog/art-deco.jpg',
    category: 'History',
    date: 'February 20, 2024',
    readTime: '9 min read'
  }
];

const categories = ['All', 'Trends', 'Education', 'Style Guide', 'Care Guide', 'Buying Guide', 'History'];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  return (
    <main className="min-h-screen bg-warm-cream pt-32">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[400px] mb-16">
        <div className="absolute inset-0 bg-dark-teal">
          <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-serif text-white mb-6"
            >
              Our Journal
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-white/90 max-w-2xl"
            >
              Discover the latest trends, styling tips, and expert insights in the world of fine jewelry
            </motion.p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4">
        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-12 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full transition-colors ${
                selectedCategory === category
                  ? 'bg-dark-teal text-white'
                  : 'bg-white hover:bg-dark-teal hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {blogPosts
            .filter(post => selectedCategory === 'All' || post.category === selectedCategory)
            .map((post) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative h-64">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-dark-teal text-white text-sm rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <span>{post.date}</span>
                  <span className="mx-2">•</span>
                  <span>{post.readTime}</span>
                </div>
                <h2 className="text-xl font-serif text-dark-teal mb-3">{post.title}</h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <Link 
                  href={`/blogs/${post.id}`}
                  className="inline-flex items-center text-dark-teal hover:text-dark-teal/80"
                >
                  Read More
                  <svg
                    className="ml-2 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mb-16">
          <button className="w-10 h-10 rounded-full bg-white hover:bg-dark-teal hover:text-white transition-colors flex items-center justify-center">
            1
          </button>
          <button className="w-10 h-10 rounded-full bg-white hover:bg-dark-teal hover:text-white transition-colors flex items-center justify-center">
            2
          </button>
          <button className="w-10 h-10 rounded-full bg-white hover:bg-dark-teal hover:text-white transition-colors flex items-center justify-center">
            3
          </button>
        </div>
      </div>
    </main>
  );
} 