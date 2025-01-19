import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Minus, Plus, Heart, ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAnalytics } from '../common/analytics';

interface ProductVariant {
  id: string;
  name: string;
  price: number;
  inStock: boolean;
  image: string;
}

interface ProductSize {
  id: string;
  name: string;
  inStock: boolean;
}

interface ProductDetails {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  variants: ProductVariant[];
  sizes: ProductSize[];
  rating: number;
  reviewCount: number;
  features: string[];
}

interface ProductDetailsProps {
  product: ProductDetails;
  onAddToCart: (product: ProductDetails, variant: ProductVariant | null, size: ProductSize | null, quantity: number) => void;
}

export default function ProductDetails({ product, onAddToCart }: ProductDetailsProps) {
  const { trackEvent } = useAnalytics();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handlePrevImage = () => {
    setSelectedImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setSelectedImage((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
  };

  const handleAddToCart = () => {
    onAddToCart(product, selectedVariant, selectedSize, quantity);
    trackEvent('add_to_cart', {
      product_id: product.id,
      variant_id: selectedVariant?.id,
      size_id: selectedSize?.id,
      quantity,
    });
  };

  const handleToggleWishlist = () => {
    setIsWishlisted((prev) => !prev);
    trackEvent('toggle_wishlist', {
      product_id: product.id,
      action: isWishlisted ? 'remove' : 'add',
    });
  };

  const isAddToCartDisabled = (product.variants.length > 0 && !selectedVariant) ||
    (product.sizes.length > 0 && !selectedSize);

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative aspect-square"
              >
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover rounded-lg"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {product.images.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-gray-800 hover:bg-white transition-colors duration-200"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-gray-800 hover:bg-white transition-colors duration-200"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}
          </div>

          {/* Thumbnail Navigation */}
          {product.images.length > 1 && (
            <div className="grid grid-cols-5 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square rounded-lg overflow-hidden ${
                    selectedImage === index
                      ? 'ring-2 ring-teal-600'
                      : 'hover:opacity-80'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 10vw, 20vw"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Information */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-semibold">{product.name}</h1>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="ml-1 text-gray-600">{product.rating}</span>
                <span className="ml-1 text-gray-400">
                  ({product.reviewCount} reviews)
                </span>
              </div>
              <span className="text-gray-300">|</span>
              <span className="text-gray-600">{product.category}</span>
            </div>
          </div>

          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          {/* Features */}
          {product.features.length > 0 && (
            <div>
              <h3 className="text-lg font-medium mb-2">Features</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Variants */}
          {product.variants.length > 0 && (
            <div>
              <h3 className="text-lg font-medium mb-3">Variants</h3>
              <div className="grid grid-cols-4 gap-3">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    disabled={!variant.inStock}
                    className={`relative aspect-square rounded-lg overflow-hidden ${
                      !variant.inStock && 'opacity-50 cursor-not-allowed'
                    } ${
                      selectedVariant?.id === variant.id
                        ? 'ring-2 ring-teal-600'
                        : 'hover:opacity-80'
                    }`}
                  >
                    <Image
                      src={variant.image}
                      alt={variant.name}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 12.5vw, 25vw"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sizes */}
          {product.sizes.length > 0 && (
            <div>
              <h3 className="text-lg font-medium mb-3">Size</h3>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size.id}
                    onClick={() => setSelectedSize(size)}
                    disabled={!size.inStock}
                    className={`px-4 py-2 rounded-lg border ${
                      !size.inStock
                        ? 'opacity-50 cursor-not-allowed'
                        : selectedSize?.id === size.id
                        ? 'border-teal-600 bg-teal-50 text-teal-600'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {size.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div>
            <h3 className="text-lg font-medium mb-3">Quantity</h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                  disabled={quantity === 1}
                  className="p-2 hover:bg-gray-50 disabled:opacity-50"
                >
                  <Minus size={20} />
                </button>
                <span className="w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="p-2 hover:bg-gray-50"
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Price and Actions */}
          <div className="pt-6 border-t">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-3xl font-semibold">
                  ${((selectedVariant?.price || product.price) * quantity).toFixed(2)}
                </p>
                {selectedVariant && (
                  <p className="text-sm text-gray-500 mt-1">
                    ${selectedVariant.price.toFixed(2)} each
                  </p>
                )}
              </div>
              <button
                onClick={handleToggleWishlist}
                className={`p-3 rounded-full ${
                  isWishlisted
                    ? 'bg-red-50 text-red-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Heart
                  size={24}
                  className={isWishlisted ? 'fill-current' : ''}
                />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <button
                onClick={handleAddToCart}
                disabled={isAddToCartDisabled}
                className={`flex items-center justify-center gap-2 w-full py-3 rounded-lg text-white ${
                  isAddToCartDisabled
                    ? 'bg-gray-200 cursor-not-allowed'
                    : 'bg-teal-600 hover:bg-teal-700'
                }`}
              >
                <ShoppingBag size={20} />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 