'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart, ChevronLeft, ChevronRight } from 'lucide-react';

const products = [
  {
    id: 1,
    name: 'Diamond Eternity Ring',
    price: 1299,
    image: '/images/products/ring-1.jpg',
  },
  {
    id: 2,
    name: 'Pearl Drop Necklace',
    price: 899,
    image: '/images/products/necklace-1.jpg',
  },
  {
    id: 3,
    name: 'Sapphire Stud Earrings',
    price: 599,
    image: '/images/products/earrings-1.jpg',
  },
  {
    id: 4,
    name: 'Gold Chain Bracelet',
    price: 799,
    image: '/images/products/bracelet-1.jpg',
  },
  {
    id: 5,
    name: 'Rose Gold Ring',
    price: 999,
    image: '/images/products/ring-2.jpg',
  },
  {
    id: 6,
    name: 'Crystal Pendant',
    price: 699,
    image: '/images/products/necklace-2.jpg',
  },
];

const ProductCard = ({ product }: { product: typeof products[0] }) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <motion.div 
      className="group relative"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-sm
                   hover:bg-white transition-colors"
        >
          <Heart
            size={20}
            className={isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}
          />
        </button>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-medium text-white">{product.name}</h3>
        <p className="text-gold">${product.price}</p>
      </div>
    </motion.div>
  );
};

const NewArrivals = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout>();

  const slidesPerView = 3;
  const totalSlides = Math.ceil(products.length / slidesPerView);

  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
      }, 5000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, totalSlides]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    setIsAutoPlaying(false);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
    setIsAutoPlaying(false);
  };

  return (
    <section className="py-20 bg-dark-teal">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-serif mb-4 text-white">
            New Arrivals
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Discover our latest additions, each piece carefully selected to enhance your collection.
          </p>
        </motion.div>

        <div className="relative">
          <div className="overflow-hidden">
            <motion.div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentSlide * (100 / totalSlides)}%)`,
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-w-full">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Navigation Controls */}
          <button
            onClick={handlePrevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12
                     p-3 rounded-full bg-white/10 hover:bg-white/20 text-white
                     transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={handleNextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12
                     p-3 rounded-full bg-white/10 hover:bg-white/20 text-white
                     transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentSlide(index);
                  setIsAutoPlaying(false);
                }}
                className={`w-2 h-2 rounded-full transition-colors ${
                  currentSlide === index ? 'bg-gold' : 'bg-white/20'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals; 