import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { cn } from '../../../lib/utils';

interface Review {
  id: string;
  author: {
    name: string;
    avatar: string;
    location: string;
  };
  rating: number;
  text: string;
  date: string;
  productId?: string;
  productName?: string;
  verified: boolean;
}

interface TestimonialsSectionProps {
  reviews: Review[];
  onSubmitReview?: (review: Omit<Review, 'id' | 'date'>) => void;
}

export default function TestimonialsSection({ reviews, onSubmitReview }: TestimonialsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isWritingReview, setIsWritingReview] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    text: '',
    author: {
      name: '',
      location: '',
    },
  });

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitReview?.({
      ...newReview,
      author: {
        ...newReview.author,
        avatar: '/images/avatars/default.jpg',
      },
      verified: false,
    });
    setIsWritingReview(false);
    setNewReview({
      rating: 5,
      text: '',
      author: {
        name: '',
        location: '',
      },
    });
  };

  return (
    <section className="py-16 bg-warm-cream">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif text-dark-teal mb-4">What Our Customers Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Read genuine reviews from our valued customers about their experience with our jewelry.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="bg-white rounded-2xl p-8 shadow-sm"
              >
                <Quote className="w-12 h-12 text-gold/20 mb-6" />
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden">
                    <Image
                      src={reviews[currentIndex].author.avatar}
                      alt={reviews[currentIndex].author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-dark-teal">
                      {reviews[currentIndex].author.name}
                      {reviews[currentIndex].verified && (
                        <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                          Verified Purchase
                        </span>
                      )}
                    </h3>
                    <p className="text-sm text-gray-500">{reviews[currentIndex].author.location}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, index) => (
                        <Star
                          key={index}
                          size={16}
                          className={cn(
                            index < reviews[currentIndex].rating
                              ? "fill-gold text-gold"
                              : "text-gray-300"
                          )}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 leading-relaxed mb-6">
                  {reviews[currentIndex].text}
                </p>

                {reviews[currentIndex].productName && (
                  <div className="text-sm text-gray-500">
                    Reviewed: {reviews[currentIndex].productName}
                  </div>
                )}

                <div className="text-sm text-gray-400 mt-4">
                  {new Date(reviews[currentIndex].date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none">
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={prevTestimonial}
                className="pointer-events-auto -translate-x-1/2 p-3 rounded-full bg-white shadow-lg
                         text-dark-teal hover:bg-dark-teal hover:text-white transition-colors"
              >
                <ChevronLeft size={24} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={nextTestimonial}
                className="pointer-events-auto translate-x-1/2 p-3 rounded-full bg-white shadow-lg
                         text-dark-teal hover:bg-dark-teal hover:text-white transition-colors"
              >
                <ChevronRight size={24} />
              </motion.button>
            </div>
          </div>

          {/* Review Form */}
          <div className="mt-12 text-center">
            {!isWritingReview ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setIsWritingReview(true)}
                className="px-8 py-3 bg-dark-teal text-white rounded-full font-medium
                         hover:bg-dark-teal/90 transition-colors"
              >
                Write a Review
              </motion.button>
            ) : (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl mx-auto bg-white rounded-2xl p-8 shadow-sm"
                onSubmit={handleSubmitReview}
              >
                <h3 className="text-xl font-serif text-dark-teal mb-6">Share Your Experience</h3>
                
                {/* Rating */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rating
                  </label>
                  <div className="flex items-center gap-2">
                    {[...Array(5)].map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setNewReview({ ...newReview, rating: index + 1 })}
                        className="focus:outline-none"
                      >
                        <Star
                          size={24}
                          className={cn(
                            "transition-colors",
                            index < newReview.rating
                              ? "fill-gold text-gold"
                              : "text-gray-300 hover:text-gold"
                          )}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Review Text */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Review
                  </label>
                  <textarea
                    value={newReview.text}
                    onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 resize-none
                             text-dark-teal focus:outline-none focus:border-dark-teal
                             focus:ring-1 focus:ring-dark-teal"
                    placeholder="Share your thoughts about our products and service..."
                    required
                  />
                </div>

                {/* Author Info */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={newReview.author.name}
                      onChange={(e) => setNewReview({
                        ...newReview,
                        author: { ...newReview.author, name: e.target.value }
                      })}
                      className="w-full h-12 px-4 rounded-xl border border-gray-200
                               text-dark-teal focus:outline-none focus:border-dark-teal
                               focus:ring-1 focus:ring-dark-teal"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      value={newReview.author.location}
                      onChange={(e) => setNewReview({
                        ...newReview,
                        author: { ...newReview.author, location: e.target.value }
                      })}
                      className="w-full h-12 px-4 rounded-xl border border-gray-200
                               text-dark-teal focus:outline-none focus:border-dark-teal
                               focus:ring-1 focus:ring-dark-teal"
                      required
                    />
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex items-center justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setIsWritingReview(false)}
                    className="px-6 py-2 text-dark-teal hover:text-gold transition-colors"
                  >
                    Cancel
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    type="submit"
                    className="px-6 py-2 bg-dark-teal text-white rounded-full font-medium
                             hover:bg-dark-teal/90 transition-colors"
                  >
                    Submit Review
                  </motion.button>
                </div>
              </motion.form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
} 