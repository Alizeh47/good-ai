import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Heart, ShoppingBag } from 'lucide-react'
import { twMerge } from 'tailwind-merge'
import { useWishlist } from '../../../contexts/wishlist-context'
import { useCart } from '../../../contexts/cart-context'

interface WishlistDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export default function WishlistDrawer({ isOpen, onClose }: WishlistDrawerProps) {
  const { items, removeItem, clearWishlist } = useWishlist()
  const { addItem: addToCart } = useCart()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            className="fixed right-0 top-0 z-50 h-full w-full max-w-md bg-white shadow-xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 20 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b px-6 py-4">
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                <span className="font-medium">My Wishlist</span>
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-sm">
                  {items.length}
                </span>
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-2 transition-colors hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Wishlist Items */}
            {items.length === 0 ? (
              <div className="flex h-[calc(100vh-14rem)] flex-col items-center justify-center gap-4 p-6">
                <Heart className="h-12 w-12 text-gray-300" />
                <p className="text-lg font-medium">Your wishlist is empty</p>
                <p className="text-center text-sm text-gray-500">
                  Add items you love to your wishlist. Review them anytime and easily move them to the cart.
                </p>
                <button
                  onClick={onClose}
                  className="mt-4 rounded-md bg-primary px-6 py-2 font-medium text-white transition-colors hover:bg-primary/90"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="h-[calc(100vh-14rem)] overflow-auto">
                <div className="divide-y">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4">
                      <Link
                        href={`/products/${item.id}`}
                        onClick={onClose}
                        className="relative aspect-square h-24 overflow-hidden rounded-md"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </Link>
                      <div className="flex flex-1 flex-col">
                        <Link
                          href={`/products/${item.id}`}
                          onClick={onClose}
                          className="font-medium hover:text-primary"
                        >
                          {item.name}
                        </Link>
                        <p className="mt-1 text-sm text-gray-500">
                          {item.category}
                        </p>
                        <p className="mt-1 font-medium text-primary">
                          ${item.price.toLocaleString()}
                        </p>
                        <div className="mt-2 flex items-center gap-4">
                          <button
                            onClick={() => {
                              addToCart({
                                id: item.id,
                                name: item.name,
                                price: item.price,
                                image: item.image,
                              })
                              removeItem(item.id)
                            }}
                            className="flex items-center gap-2 text-sm text-primary transition-colors hover:text-primary/80"
                          >
                            <ShoppingBag className="h-4 w-4" />
                            Move to Cart
                          </button>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-sm text-red-500 transition-colors hover:text-red-600"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Footer */}
            {items.length > 0 && (
              <div className="absolute bottom-0 left-0 right-0 border-t bg-white p-6">
                <button
                  onClick={() => {
                    items.forEach((item) => {
                      addToCart({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        image: item.image,
                      })
                    })
                    clearWishlist()
                    onClose()
                  }}
                  className="w-full rounded-md bg-primary py-3 font-medium text-white transition-colors hover:bg-primary/90"
                >
                  Move All to Cart
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
} 