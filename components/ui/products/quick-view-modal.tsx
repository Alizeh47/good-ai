import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Heart, ShoppingBag, Minus, Plus } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

interface QuickViewModalProps {
  product: {
    id: string
    name: string
    price: number
    description: string
    images: string[]
    category: string
  }
  isOpen: boolean
  onClose: () => void
  onAddToCart: () => void
  onToggleWishlist: () => void
  isWishlisted: boolean
}

export default function QuickViewModal({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
}: QuickViewModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    )
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-4xl max-h-[90vh] overflow-auto rounded-2xl bg-white p-8"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              className="absolute right-6 top-6 p-2 rounded-full bg-white shadow-lg
                       hover:bg-dark-teal hover:text-white transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </motion.button>

            <div className="grid gap-8 md:grid-cols-2">
              {/* Product Gallery */}
              <div className="relative aspect-square rounded-xl overflow-hidden bg-warm-cream">
                <Image
                  src={product.images[currentImageIndex]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 50vw, 100vw"
                  priority
                />
                
                <motion.button
                  onClick={prevImage}
                  whileHover={{ scale: 1.1 }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full
                           bg-white shadow-lg hover:bg-dark-teal hover:text-white
                           transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </motion.button>
                
                <motion.button
                  onClick={nextImage}
                  whileHover={{ scale: 1.1 }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full
                           bg-white shadow-lg hover:bg-dark-teal hover:text-white
                           transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </motion.button>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {product.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={twMerge(
                        'w-2.5 h-2.5 rounded-full bg-white/50 transition-colors shadow-lg',
                        index === currentImageIndex && 'bg-white scale-125'
                      )}
                    />
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div className="flex flex-col">
                <div className="px-4 py-1.5 bg-warm-cream text-dark-teal rounded-full
                             w-fit text-xs font-medium tracking-wide uppercase">
                  {product.category}
                </div>

                <h2 className="mt-4 font-serif text-3xl text-dark-teal">
                  {product.name}
                </h2>

                <p className="mt-2 text-2xl font-medium text-gold">
                  ${product.price.toLocaleString()}
                </p>

                <p className="mt-6 text-gray-600 leading-relaxed">
                  {product.description}
                </p>

                <div className="mt-8 flex items-center gap-4">
                  <div className="flex items-center rounded-full border border-gray-200
                               overflow-hidden bg-white">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                      className="p-3 text-dark-teal hover:bg-warm-cream transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </motion.button>
                    <span className="w-12 text-center font-medium">
                      {quantity}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      onClick={() => setQuantity((prev) => prev + 1)}
                      className="p-3 text-dark-teal hover:bg-warm-cream transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </motion.button>
                  </div>

                  <motion.button
                    onClick={onToggleWishlist}
                    whileHover={{ scale: 1.1 }}
                    className="p-3 rounded-full border border-gray-200 bg-white
                             hover:bg-warm-cream transition-colors"
                  >
                    <Heart
                      className={twMerge(
                        'w-5 h-5',
                        isWishlisted ? 'fill-red-500 stroke-red-500' : 'text-dark-teal'
                      )}
                    />
                  </motion.button>
                </div>

                <motion.button
                  onClick={onAddToCart}
                  whileHover={{ scale: 1.02 }}
                  className="mt-8 flex items-center justify-center gap-2 rounded-full
                           bg-dark-teal text-white px-8 py-4 font-medium
                           hover:bg-dark-teal/90 transition-colors"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Add to Cart
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 