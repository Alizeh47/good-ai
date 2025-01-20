'use client'

import { useEffect } from 'react'
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Heart, ShoppingBag } from 'lucide-react'
import { useStore } from '@/store/useStore'
import { Product } from '@/store/useStore'

export const metadata: Metadata = {
  title: 'Search Products | Luxury Jewelry Store',
  description: 'Search through our extensive collection of fine jewelry, including rings, necklaces, earrings, and bracelets.',
};

// Mock product data - in a real app, this would come from an API or database
const products: Product[] = [
  {
    id: 1,
    name: 'Diamond Solitaire Ring',
    category: 'Rings',
    price: 2999,
    image: '/images/jewelry-1.jpg',
    slug: 'diamond-solitaire-ring',
    material: '18k White Gold',
    tags: ['diamond', 'engagement', 'solitaire'],
    description: 'Classic solitaire diamond ring in 18k white gold'
  },
  {
    id: 2,
    name: 'Pearl Strand Necklace',
    category: 'Necklaces',
    price: 1299,
    image: '/images/jewelry-5.jpg',
    slug: 'pearl-strand-necklace',
    material: 'Freshwater Pearl',
    tags: ['pearl', 'classic', 'strand'],
    description: 'Elegant freshwater pearl strand necklace'
  },
  {
    id: 3,
    name: 'Sapphire Drop Earrings',
    category: 'Earrings',
    price: 1599,
    image: '/images/jewelry-6.jpg',
    slug: 'sapphire-drop-earrings',
    material: '14k Yellow Gold',
    tags: ['sapphire', 'drop', 'gemstone'],
    description: 'Beautiful sapphire drop earrings with diamond accents'
  }
];

const categories = ['All', 'Rings', 'Necklaces', 'Earrings', 'Bracelets'];
const materials = ['All', '18k White Gold', '14k Yellow Gold', 'Platinum', 'Sterling Silver', 'Pearl'];
const priceRanges = [
  'All Prices',
  'Under $500',
  '$500 - $1,000',
  '$1,000 - $2,500',
  '$2,500 - $5,000',
  'Over $5,000'
];

export default function SearchPage() {
  const { 
    searchQuery, 
    searchResults, 
    setSearchQuery, 
    setSearchResults,
    addToCart,
    addToWishlist,
    wishlist
  } = useStore()

  // Search function
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([])
      return
    }

    const query = searchQuery.toLowerCase()
    const results = products.filter(product => 
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.material.toLowerCase().includes(query) ||
      product.tags.some(tag => tag.toLowerCase().includes(query))
    )
    setSearchResults(results)
  }, [searchQuery, setSearchResults])

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-6xl mx-auto">
        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Search for jewelry..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pl-12 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
      </div>

        <div className="mt-8">
          <h2 className="text-xl font-medium mb-4">
            {searchResults.length > 0 
              ? `Found ${searchResults.length} results`
              : searchQuery 
                ? 'No results found'
                : 'Start typing to search'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map((product) => (
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
                      onClick={() => addToWishlist(product)}
                      className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
                    >
                      <Heart 
                        className={`h-5 w-5 ${
                          wishlist.some(item => item.id === product.id)
                            ? 'fill-red-500 stroke-red-500'
                            : 'stroke-gray-600'
                        }`}
                      />
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
            
            {searchQuery && searchResults.length === 0 && (
              <div className="col-span-full text-center text-gray-500 py-12">
                <p className="text-lg mb-4">No products found</p>
                <p>Try adjusting your search terms</p>
          </div>
            )}
            
            {!searchQuery && (
              <div className="col-span-full text-center text-gray-500 py-12">
                <Search className="h-12 w-12 mx-auto mb-4 stroke-1" />
                <p className="text-lg mb-4">Start typing to search for products</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 