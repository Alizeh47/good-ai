'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    quote: "The craftsmanship of their jewelry is exceptional. Each piece tells a unique story and adds elegance to any outfit.",
    author: "Emma Thompson",
    location: "New York, USA",
    image: "/images/testimonials/customer-1.jpg",
  },
  {
    id: 2,
    quote: "I was amazed by the attention to detail in my engagement ring. The customer service was outstanding throughout the process.",
    author: "Michael Chen",
    location: "London, UK",
    image: "/images/testimonials/customer-2.jpg",
  },
  {
    id: 3,
    quote: "Their pieces are timeless and the quality is unmatched. I receive compliments every time I wear my necklace.",
    author: "Sofia Rodriguez",
    location: "Paris, France",
    image: "/images/testimonials/customer-3.jpg",
  },
];

const TestimonialCard = ({ testimonial, isActive }: {
  testimonial: typeof testimonials[0];
  isActive: boolean;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
    exit={{ opacity: 0, y: -20 }}
    className="absolute inset-0 flex flex-col md:flex-row items-center gap-8 p-8"
  >
    <div className="relative w-32 h-32 md:w-48 md:h-48 flex-shrink-0">
      <Image
        src={testimonial.image}
        alt={testimonial.author}
        fill
        className="object-cover rounded-full"
      />
    </div>
    
    <div className="flex-1 text-center md:text-left">
      <Quote className="w-12 h-12 text-gold/20 mx-auto md:mx-0 mb-4" />
      <p className="text-lg md:text-xl text-gray-600 italic mb-6">
        {testimonial.quote}
      </p>
      <div>
        <h3 className="font-serif text-xl mb-1">{testimonial.author}</h3>
        <p className="text-sm text-gray-500">{testimonial.location}</p>
      </div>
    </div>
  </motion.div>
);

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  return (
    <section className="py-20 bg-warm-cream">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-serif mb-4">
            What Our Customers Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover why our clients choose Eglanto for their most precious moments.
          </p>
        </motion.div>

        <div className="relative h-[400px] md:h-[300px] max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {testimonials.map((testimonial, index) => (
              index === currentIndex && (
                <TestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                  isActive={index === currentIndex}
                />
              )
            ))}
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2">
            <div className="container flex justify-between">
              <button
                onClick={handlePrev}
                className="p-2 rounded-full bg-white/80 hover:bg-white
                         shadow-lg transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={handleNext}
                className="p-2 rounded-full bg-white/80 hover:bg-white
                         shadow-lg transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>

          {/* Dots Navigation */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsAutoPlaying(false);
                }}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-dark-teal' : 'bg-gray-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 