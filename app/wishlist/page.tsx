'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heart, ShoppingBag, X } from 'lucide-react'
import { useStore } from '@/store/useStore'

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, addToCart } = useStore()

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6" />
            <h1 className="text-2xl font-medium">My Wishlist</h1>
          </div>
          {wishlist.length > 0 && (
            <p className="text-gray-600">{wishlist.length} items</p>
          )}
        </div>

        {wishlist.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            <Heart className="h-12 w-12 mx-auto mb-4 stroke-1" />
            <p className="text-lg mb-4">Your wishlist is empty</p>
            <Link href="/collections" className="text-primary hover:underline">
              Browse our collections
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((product) => (
              <div key={product.id} className="group border rounded-lg p-4">
                <div className="relative aspect-square mb-4">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover rounded-md"
                  />
                  <div className="absolute top-2 right-2 flex gap-2">
                    <button
                      onClick={() => removeFromWishlist(product.id)}
                      className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
                    >
                      <X className="h-5 w-5 stroke-gray-600" />
                    </button>
                    <button
                      onClick={() => addToCart(product)}
                      className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
                    >
                      <ShoppingBag className="h-5 w-5 stroke-gray-600" />
                    </button>
                  </div>
                </div>
                <Link href={`/product/${product.slug}`}>
                  <h3 className="font-medium mb-1">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{product.category}</p>
                  <p className="font-medium">${product.price.toLocaleString()}</p>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 