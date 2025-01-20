'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ShoppingBag, Minus, Plus, X } from 'lucide-react'
import { useStore } from '@/store/useStore'

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useStore()

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = 0 // Will be calculated at checkout
  const tax = 0 // Will be calculated at checkout
  const total = subtotal + shipping + tax

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-6 w-6" />
            <h1 className="text-2xl font-medium">Shopping Cart</h1>
          </div>
          {cart.length > 0 && (
            <p className="text-gray-600">
              {cart.reduce((total, item) => total + item.quantity, 0)} items
            </p>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {cart.length === 0 ? (
              <div className="text-center text-gray-500 py-12">
                <ShoppingBag className="h-12 w-12 mx-auto mb-4 stroke-1" />
                <p className="text-lg mb-4">Your cart is empty</p>
                <Link href="/collections" className="text-primary hover:underline">
                  Continue shopping
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 border rounded-lg p-4">
                    <div className="relative aspect-square w-24 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <Link href={`/product/${item.slug}`}>
                          <h3 className="font-medium">{item.name}</h3>
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                      <p className="text-gray-600 text-sm">{item.category}</p>
                      <div className="mt-2 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                            className="p-1 rounded-full hover:bg-gray-100"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 rounded-full hover:bg-gray-100"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="font-medium">
                          ${(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-lg font-medium mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>${total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <button 
                className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={cart.length === 0}
                onClick={() => {/* TODO: Implement checkout */}}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 