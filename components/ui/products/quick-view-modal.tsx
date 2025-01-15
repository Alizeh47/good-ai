import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Heart, ShoppingBag } from 'lucide-react'
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative max-h-[90vh] w-full max-w-4xl overflow-auto rounded-lg bg-white p-6"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full bg-gray-100 p-2 transition-colors hover:bg-gray-200"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Product Gallery */}
              <div className="relative aspect-square">
                <Image
                  src={product.images[currentImageIndex]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
                
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow-md transition-transform hover:scale-110"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow-md transition-transform hover:scale-110"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>

                <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                  {product.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={twMerge(
                        'h-2 w-2 rounded-full bg-white/50 transition-colors',
                        index === currentImageIndex && 'bg-white'
                      )}
                    />
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div className="flex flex-col">
                <p className="text-sm font-medium uppercase tracking-wider text-text-secondary">
                  {product.category}
                </p>
                <h2 className="mt-2 font-serif text-2xl font-medium text-text-primary">
                  {product.name}
                </h2>
                <p className="mt-2 text-2xl font-medium text-primary">
                  ${product.price.toLocaleString()}
                </p>
                <p className="mt-4 text-text-secondary">
                  {product.description}
                </p>

                <div className="mt-6 flex items-center gap-4">
                  <div className="flex items-center rounded-md border">
                    <button
                      onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                      className="px-3 py-2 text-text-secondary transition-colors hover:text-text-primary"
                    >
                      -
                    </button>
                    <span className="w-12 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity((prev) => prev + 1)}
                      className="px-3 py-2 text-text-secondary transition-colors hover:text-text-primary"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={onToggleWishlist}
                    className="rounded-md border p-2 transition-colors hover:bg-gray-50"
                  >
                    <Heart
                      className={twMerge(
                        'h-6 w-6',
                        isWishlisted ? 'fill-red-500 stroke-red-500' : ''
                      )}
                    />
                  </button>
                </div>

                <button
                  onClick={onAddToCart}
                  className="mt-6 flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 font-medium text-white transition-colors hover:bg-primary/90"
                >
                  <ShoppingBag className="h-5 w-5" />
                  Add to Cart
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 