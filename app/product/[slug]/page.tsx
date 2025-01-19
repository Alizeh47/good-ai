'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart, ShoppingBag } from 'lucide-react';
import ProductCard from '../../../components/ui/products/product-card';
import { cn } from '../../../lib/utils';

// Mock data - replace with actual data fetching
const product = {
  id: 1,
  name: 'Diamond Eternity Ring',
  price: 1299,
  description: 'A stunning piece that symbolizes eternal love, crafted with the finest diamonds and 18k gold.',
  images: [
    '/images/products/ring-1-1.jpg',
    '/images/products/ring-1-2.jpg',
    '/images/products/ring-1-3.jpg',
    '/images/products/ring-1-4.jpg',
  ],
  details: [
    'Material: 18k Gold',
    'Diamond Clarity: VS1',
    'Total Carat Weight: 1.5ct',
    'Band Width: 2.3mm',
  ],
  category: 'Rings',
  slug: 'diamond-eternity-ring',
};

const relatedProducts = [
  {
    id: '2',
    name: 'Pearl Drop Necklace',
    price: 899,
    image: '/images/products/necklace-1.jpg',
    category: 'Necklaces',
    slug: 'pearl-drop-necklace',
    description: 'Elegant pearl necklace with delicate drop design'
  },
  // Add more related products...
];

export default function ProductPage({ params }: { params: { slug: string } }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handlePrevImage = () => {
    setCurrentImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const handleNextImage = () => {
    setCurrentImage((prev) => (prev + 1) % product.images.length);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Carousel */}
          <div className="relative">
            <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100">
              <Image
                src={product.images[currentImage]}
                alt={product.name}
                fill
                className="object-cover"
              />
              
              <button
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full
                         bg-white/80 hover:bg-white transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>
              
              <button
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full
                         bg-white/80 hover:bg-white transition-colors"
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Thumbnail Navigation */}
            <div className="mt-4 grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={cn(
                    "relative aspect-square overflow-hidden rounded-lg bg-gray-100",
                    currentImage === index && "ring-2 ring-dark-teal"
                  )}
                >
                  <Image
                    src={image}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-serif mb-2">{product.name}</h1>
              <p className="text-2xl font-semibold text-gold">
                ${product.price.toLocaleString()}
              </p>
            </div>

            <p className="text-gray-600">{product.description}</p>

            <div className="space-y-4">
              <h3 className="font-medium">Details</h3>
              <ul className="space-y-2">
                {product.details.map((detail, index) => (
                  <li key={index} className="text-gray-600">• {detail}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label htmlFor="quantity" className="font-medium">
                  Quantity
                </label>
                <select
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="rounded-md border-gray-200"
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 flex items-center justify-center gap-2 bg-dark-teal text-white
                           py-3 rounded-full hover:bg-opacity-90 transition-colors"
                >
                  <ShoppingBag size={20} />
                  Add to Cart
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="p-3 rounded-full border-2 border-dark-teal hover:bg-dark-teal
                           hover:text-white transition-colors"
                >
                  <Heart
                    size={20}
                    className={isWishlisted ? 'fill-red-500 text-red-500' : ''}
                  />
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-24">
          <h2 className="text-2xl font-serif mb-8">You May Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} viewMode="grid" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 