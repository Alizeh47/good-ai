'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart, ShoppingBag } from 'lucide-react';
import ProductCard from '@/components/ui/products/product-card';
import { cn } from '@/lib/utils';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  details: string[];
  category: string;
}

interface Products {
  [key: string]: Product;
}

interface RelatedProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  slug: string;
  description: string;
}

// Mock data - replace with actual data fetching
const products: Products = {
  'diamond-eternity-ring': {
    id: '1',
    name: 'Diamond Eternity Ring',
    price: 1299,
    description: 'A stunning piece that symbolizes eternal love, crafted with the finest diamonds and 18k gold.',
    images: [
      '/images/products/ring-1.jpg',
      '/images/products/ring-2.jpg',
      '/images/products/ring-1.jpg',
      '/images/products/ring-2.jpg',
    ],
    details: [
      'Material: 18k Gold',
      'Diamond Clarity: VS1',
      'Total Carat Weight: 1.5ct',
      'Band Width: 2.3mm',
    ],
    category: 'Rings',
  },
  'pearl-drop-necklace': {
    id: '2',
    name: 'Pearl Drop Necklace',
    price: 899,
    description: 'Elegant pearl necklace featuring a stunning drop design with freshwater pearls.',
    images: [
      '/images/products/necklace-1.jpg',
      '/images/products/necklace-2.jpg',
      '/images/products/necklace-1.jpg',
      '/images/products/necklace-2.jpg',
    ],
    details: [
      'Material: Sterling Silver',
      'Pearl Type: Freshwater',
      'Pearl Size: 7-8mm',
      'Chain Length: 18 inches',
    ],
    category: 'Necklaces',
  },
  'sapphire-earrings': {
    id: '3',
    name: 'Sapphire Earrings',
    price: 799,
    description: 'Beautiful sapphire earrings with diamond accents, perfect for special occasions.',
    images: [
      '/images/products/earrings-1.jpg',
      '/images/products/earrings-1.jpg',
      '/images/products/earrings-1.jpg',
      '/images/products/earrings-1.jpg',
    ],
    details: [
      'Material: 18k White Gold',
      'Stone: Blue Sapphire',
      'Diamond Accents: 0.25ct',
      'Closure: Lever Back',
    ],
    category: 'Earrings',
  },
  'gold-chain-bracelet': {
    id: '4',
    name: 'Gold Chain Bracelet',
    price: 599,
    description: 'Classic gold chain bracelet with modern design, perfect for everyday wear.',
    images: [
      '/images/products/bracelet-1.jpg',
      '/images/products/bracelet-1.jpg',
      '/images/products/bracelet-1.jpg',
      '/images/products/bracelet-1.jpg',
    ],
    details: [
      'Material: 14k Gold',
      'Length: 7.5 inches',
      'Clasp: Lobster',
      'Weight: 8.5g',
    ],
    category: 'Bracelets',
  }
};

const relatedProducts: RelatedProduct[] = [
  {
    id: '3',
    name: 'Sapphire Earrings',
    price: 799,
    image: '/images/products/earrings-1.jpg',
    category: 'Earrings',
    slug: 'sapphire-earrings',
    description: 'Beautiful sapphire earrings with diamond accents'
  },
  {
    id: '4',
    name: 'Gold Chain Bracelet',
    price: 599,
    image: '/images/products/bracelet-1.jpg',
    category: 'Bracelets',
    slug: 'gold-chain-bracelet',
    description: 'Classic gold chain bracelet with modern design'
  },
];

export default function ProductPage({ params }: { params: { slug: string } }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const product = products[params.slug as keyof typeof products];

  if (!product) {
    return (
      <div className="min-h-screen bg-warm-cream pt-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-serif text-dark-teal mb-4">Product Not Found</h1>
          <p className="text-gray-600">The product you are looking for does not exist.</p>
        </div>
      </div>
    );
  }

  const handlePrevImage = () => {
    setCurrentImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const handleNextImage = () => {
    setCurrentImage((prev) => (prev + 1) % product.images.length);
  };

  return (
    <main className="min-h-screen bg-warm-cream pt-32">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Carousel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="aspect-square relative overflow-hidden rounded-lg bg-white">
              <Image
                src={product.images[currentImage]}
                alt={product.name}
                fill
                className="object-cover"
                priority
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
              {product.images.map((image: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={cn(
                    "relative aspect-square overflow-hidden rounded-lg bg-white",
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
          </motion.div>

          {/* Product Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div>
              <h1 className="text-3xl font-serif mb-2 text-dark-teal">{product.name}</h1>
              <p className="text-2xl font-semibold text-gold">
                ${product.price.toLocaleString()}
              </p>
            </div>

            <p className="text-gray-600">{product.description}</p>

            <div className="space-y-4">
              <h3 className="font-medium text-dark-teal">Details</h3>
              <ul className="space-y-2">
                {product.details.map((detail: string, index: number) => (
                  <li key={index} className="text-gray-600">• {detail}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label htmlFor="quantity" className="font-medium text-dark-teal">
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
                    className={isWishlisted ? 'fill-current text-red-500' : ''}
                  />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-24"
        >
          <h2 className="text-2xl font-serif mb-8 text-dark-teal">You May Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} viewMode="grid" />
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
} 