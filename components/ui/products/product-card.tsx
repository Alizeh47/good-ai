import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Heart, Eye, ShoppingBag } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

interface ProductCardProps {
  id: string
  name: string
  price: number
  image: string
  category: string
  isNew?: boolean
  onQuickView?: () => void
  onAddToCart?: () => void
  onToggleWishlist?: () => void
  isWishlisted?: boolean
  className?: string
}

export default function ProductCard({
  id,
  name,
  price,
  image,
  category,
  isNew = false,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  isWishlisted = false,
  className,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className={twMerge(
        'group relative overflow-hidden bg-white',
        className
      )}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      {/* Image container */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
        />
        
        {/* Overlay actions */}
        <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10">
          <motion.div 
            className="absolute right-4 top-4 flex flex-col gap-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 20 }}
          >
            <button
              onClick={onToggleWishlist}
              className="rounded-full bg-white p-2 shadow-md transition-colors hover:bg-primary hover:text-white"
            >
              <Heart
                className={twMerge(
                  'h-5 w-5',
                  isWishlisted ? 'fill-red-500 stroke-red-500' : ''
                )}
              />
            </button>
            <button
              onClick={onQuickView}
              className="rounded-full bg-white p-2 shadow-md transition-colors hover:bg-primary hover:text-white"
            >
              <Eye className="h-5 w-5" />
            </button>
          </motion.div>

          <motion.div
            className="absolute bottom-4 left-4 right-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          >
            <button
              onClick={onAddToCart}
              className="flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90"
            >
              <ShoppingBag className="h-4 w-4" />
              Add to Cart
            </button>
          </motion.div>
        </div>

        {/* New badge */}
        {isNew && (
          <div className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1 text-xs font-medium text-white">
            New
          </div>
        )}
      </div>

      {/* Product info */}
      <div className="p-4">
        <p className="text-xs font-medium uppercase tracking-wider text-text-secondary">
          {category}
        </p>
        <h3 className="mt-1 font-serif text-lg font-medium text-text-primary">
          {name}
        </h3>
        <motion.p 
          className="mt-1 text-lg font-medium text-primary"
          initial={false}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 0.3 }}
          key={price}
        >
          ${price.toLocaleString()}
        </motion.p>
      </div>
    </motion.div>
  )
} 