'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Plus } from 'lucide-react';
import { cn } from '../../../lib/utils';

interface ProductCardProps {
  product: {
    id: string | number;
    name: string;
    price: number;
    image: string;
    category: string;
    slug: string;
  };
  onAddToCart?: () => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    onAddToCart?.();
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLiked(!isLiked);
    // TODO: Implement wishlist functionality
  };

  return (
    <motion.div
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <Link href={`/product/${product.slug}`}>
        <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className={cn(
              "object-cover transition-transform duration-500",
              isHovered && "scale-110"
            )}
          />
          
          {/* Quick Add Button */}
          <motion.button
            className="absolute bottom-4 right-4 p-3 bg-dark-teal text-white rounded-full
                     shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleAddToCart}
            whileHover={{ scale: 1.1 }}
            aria-label="Quick add to cart"
          >
            <Plus size={20} />
          </motion.button>

          {/* Wishlist Button */}
          <button
            onClick={handleToggleWishlist}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-sm
                     hover:bg-white transition-colors"
          >
            <Heart
              size={20}
              className={cn(
                "transition-colors",
                isLiked ? "fill-red-500 text-red-500" : "text-gray-600"
              )}
            />
          </button>

          {/* Category Tag */}
          <div className="absolute top-4 left-4 px-3 py-1 bg-white/80 backdrop-blur-sm
                        rounded-full text-xs font-medium text-gray-700">
            {product.category}
          </div>
        </div>

        <div className="mt-4 space-y-1">
          <h3 className="text-lg font-medium text-gray-900 group-hover:text-dark-teal
                       transition-colors">
            {product.name}
          </h3>
          <p className="text-lg font-semibold text-gold">
            ${product.price.toLocaleString()}
          </p>
        </div>
      </Link>

      {/* Quick Add Indicator */}
      <div className={cn(
        "absolute inset-0 bg-white/10 backdrop-blur-[2px] flex items-center justify-center",
        "opacity-0 transition-opacity pointer-events-none",
        isHovered && "opacity-100"
      )}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-4 rounded-full shadow-lg"
        >
          <ShoppingBag size={24} className="text-dark-teal" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProductCard; 