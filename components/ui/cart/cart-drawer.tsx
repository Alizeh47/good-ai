import { useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Minus, Plus, ShoppingBag } from 'lucide-react'
import { twMerge } from 'tailwind-merge'
import { useCart } from '../../../contexts/cart-context'

interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, totalItems, subtotal } = useCart()

  // Disable body scroll when drawer is open
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
                <ShoppingBag className="h-5 w-5" />
                <span className="font-medium">Shopping Cart</span>
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-sm">
                  {totalItems}
                </span>
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-2 transition-colors hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Cart Items */}
            {items.length === 0 ? (
              <div className="flex h-[calc(100vh-14rem)] flex-col items-center justify-center gap-4 p-6">
                <ShoppingBag className="h-12 w-12 text-gray-300" />
                <p className="text-lg font-medium">Your cart is empty</p>
                <p className="text-center text-sm text-gray-500">
                  Looks like you haven't added any items to your cart yet.
                </p>
                <button
                  onClick={onClose}
                  className="mt-4 rounded-md bg-primary px-6 py-2 font-medium text-white transition-colors hover:bg-primary/90"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="h-[calc(100vh-14rem)] overflow-auto p-6">
                <div className="divide-y">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 py-4">
                      <div className="relative aspect-square h-24 overflow-hidden rounded-md">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="mt-1 text-sm text-gray-500">
                          ${item.price.toLocaleString()}
                        </p>
                        <div className="mt-2 flex items-center gap-4">
                          <div className="flex items-center rounded-md border">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="p-1 text-gray-500 transition-colors hover:text-gray-700"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="w-8 text-center text-sm">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="p-1 text-gray-500 transition-colors hover:text-gray-700"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
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
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm text-gray-500">Subtotal</span>
                  <span className="font-medium">
                    ${subtotal.toLocaleString()}
                  </span>
                </div>
                <button
                  onClick={() => {
                    // Handle checkout
                  }}
                  className="w-full rounded-md bg-primary py-3 font-medium text-white transition-colors hover:bg-primary/90"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
} 