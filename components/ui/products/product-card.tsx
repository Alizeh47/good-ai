'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag } from 'lucide-react';
import { useAnalytics } from '../common/analytics';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

interface ProductCardProps {
  product: Product;
  viewMode: 'grid' | 'list';
}

const ProductCard: React.FC<ProductCardProps> = ({ product, viewMode }) => {
  const { trackEvent } = useAnalytics();
  const [isWishlisted, setIsWishlisted] = React.useState(false);

  const handleAddToWishlist = () => {
    setIsWishlisted(!isWishlisted);
    trackEvent(isWishlisted ? 'remove_from_wishlist' : 'add_to_wishlist', {
      product_id: product.id,
      product_name: product.name,
    });
  };

  const handleAddToCart = () => {
    trackEvent('add_to_cart', {
      product_id: product.id,
      product_name: product.name,
      price: product.price,
    });
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        whileHover={{ y: -4 }}
        className="bg-white rounded-2xl p-4 shadow-sm flex gap-6"
      >
        {/* Image */}
        <Link href={`/product/${product.id}`} className="relative w-48 h-48">
          <div className="relative w-full h-full rounded-xl overflow-hidden bg-warm-cream">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 hover:scale-110"
            />
          </div>
          <span className="absolute top-2 left-2 px-2 py-1 bg-white/80 backdrop-blur-sm text-xs rounded-full">
            {product.category}
          </span>
        </Link>

        {/* Content */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1">
            <Link href={`/product/${product.id}`}>
              <h3 className="text-lg font-medium hover:text-teal-600 transition-colors">
                {product.name}
              </h3>
            </Link>
            <p className="mt-2 text-gray-600 line-clamp-3">{product.description}</p>
            <p className="mt-2 text-xl font-medium">${product.price.toFixed(2)}</p>
          </div>

          <div className="mt-4 flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-2 bg-teal-600 text-white px-6 py-2 rounded-full hover:bg-teal-700 transition-colors"
            >
              <ShoppingBag size={20} />
              <span>Add to Cart</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleAddToWishlist}
              className={`w-10 h-10 flex items-center justify-center rounded-full ${
                isWishlisted ? 'bg-red-50 text-red-500' : 'bg-gray-100 text-gray-600'
              }`}
            >
              <Heart className={isWishlisted ? 'fill-current' : ''} size={20} />
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl p-4 shadow-sm"
    >
      {/* Image */}
      <Link href={`/product/${product.id}`} className="block relative">
        <div className="relative aspect-square rounded-xl overflow-hidden bg-warm-cream">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 hover:scale-110"
          />
        </div>
        <span className="absolute top-2 left-2 px-2 py-1 bg-white/80 backdrop-blur-sm text-xs rounded-full">
          {product.category}
        </span>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleAddToWishlist}
          className={`absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full ${
            isWishlisted ? 'bg-red-50 text-red-500' : 'bg-white/80 backdrop-blur-sm text-gray-600'
          }`}
        >
          <Heart className={isWishlisted ? 'fill-current' : ''} size={16} />
        </motion.button>
      </Link>

      {/* Content */}
      <div className="mt-4">
        <Link href={`/product/${product.id}`}>
          <h3 className="font-medium hover:text-teal-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1 text-gray-600 text-sm line-clamp-2">{product.description}</p>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-lg font-medium">${product.price.toFixed(2)}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            className="w-10 h-10 flex items-center justify-center bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-colors"
          >
            <ShoppingBag size={18} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard; 