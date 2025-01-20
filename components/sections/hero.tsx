'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleParallax = () => {
      if (!parallaxRef.current) return;
      const scrolled = window.scrollY;
      parallaxRef.current.style.transform = `translateY(${scrolled * 0.5}px)`;
    };

    window.addEventListener('scroll', handleParallax);
    return () => window.removeEventListener('scroll', handleParallax);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden bg-warm-cream">
      {/* Background Grid */}
      <div ref={parallaxRef} className="absolute inset-0 grid grid-cols-2 md:grid-cols-3 gap-4 p-4 opacity-20">
        {[1, 2, 3, 4, 5, 6].map((index) => (
          <div key={index} className="relative h-64">
            <Image
              src={`/images/jewelry-${index}.jpg`}
              alt="Jewelry background"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative container h-full flex flex-col justify-center items-center text-center z-10">
        <motion.h1 
          className="text-4xl md:text-6xl lg:text-7xl font-serif mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Desire Meets New Style
        </motion.h1>
        
        <motion.p 
          className="text-lg md:text-xl mb-12 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Discover our exquisite collection of handcrafted jewelry, where timeless elegance meets contemporary design.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Link 
            href="/collections" 
            className="px-8 py-3 bg-dark-teal text-white rounded-full hover:bg-opacity-90 transition-colors"
          >
            See All
          </Link>
          <button className="px-8 py-3 border-2 border-dark-teal rounded-full hover:bg-dark-teal hover:text-white transition-colors">
            Play Video
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection; 