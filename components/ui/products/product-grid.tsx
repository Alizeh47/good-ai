'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingCart } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  tags: string[];
  rating: number;
  inStock: boolean;
}

interface ProductGridProps {
  products: Product[];
  viewMode: 'grid' | 'list';
  itemsPerPage: number;
}

export default function ProductGrid({ products, viewMode, itemsPerPage }: ProductGridProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className={`grid gap-6 ${
        viewMode === 'grid'
          ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
          : 'grid-cols-1'
      }`}
    >
      {products.map((product) => (
        <motion.div
          key={product.id}
          variants={item}
          className={`bg-white rounded-lg shadow-sm overflow-hidden ${
            viewMode === 'list' ? 'flex' : ''
          }`}
        >
          <div className={`relative ${viewMode === 'list' ? 'w-48 h-48' : 'aspect-square'}`}>
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes={viewMode === 'list' ? '12rem' : '(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw'}
            />
            <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-200" />
          </div>

          <div className={`p-4 flex flex-col ${viewMode === 'list' ? 'flex-1' : ''}`}>
            <div className="flex items-start justify-between mb-2">
              <div>
                <Link
                  href={`/products/${product.id}`}
                  className="text-lg font-medium hover:text-teal-600 transition-colors duration-200"
                >
                  {product.name}
                </Link>
                <p className="text-sm text-gray-500">{product.category}</p>
              </div>
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
              </div>
            </div>

            {viewMode === 'list' && (
              <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
            )}

            <div className="mt-auto flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold">${product.price.toFixed(2)}</p>
                <p className="text-sm text-gray-500">
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </p>
              </div>

              <button
                disabled={!product.inStock}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                  product.inStock
                    ? 'bg-teal-600 text-white hover:bg-teal-700'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                <ShoppingCart size={20} />
                {viewMode === 'list' && <span>Add to Cart</span>}
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
} 