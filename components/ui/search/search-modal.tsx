import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Filter, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '../../../lib/utils';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchResult {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

const categories = [
  'All',
  'Rings',
  'Necklaces',
  'Earrings',
  'Bracelets',
  'Watches',
];

const priceRanges = [
  { label: 'Under $100', value: '0-100' },
  { label: '$100 - $500', value: '100-500' },
  { label: '$500 - $1000', value: '500-1000' },
  { label: 'Over $1000', value: '1000-' },
];

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // Mock search function - replace with actual API call
  useEffect(() => {
    if (query.length > 2) {
      // Simulate API call delay
      const timer = setTimeout(() => {
        // Mock results
        const mockResults: SearchResult[] = [
          {
            id: '1',
            name: 'Diamond Ring',
            price: 999,
            image: '/images/products/ring-1.jpg',
            category: 'Rings',
          },
          // Add more mock results
        ];
        setResults(mockResults);

        // Mock suggestions
        setSuggestions([
          `${query} in rings`,
          `${query} necklace`,
          `${query} collection`,
        ]);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setResults([]);
      setSuggestions([]);
    }
  }, [query, selectedCategory, selectedPriceRange]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="fixed inset-x-0 top-0 z-50 bg-white"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="container mx-auto px-4 py-6">
              {/* Search Input */}
              <div className="relative flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for jewelry..."
                    className="w-full h-12 pl-12 pr-4 rounded-full border border-gray-200
                             text-dark-teal placeholder:text-gray-400
                             focus:outline-none focus:border-dark-teal focus:ring-1 focus:ring-dark-teal"
                    autoFocus
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full
                           bg-warm-cream text-dark-teal hover:bg-dark-teal hover:text-white
                           transition-colors"
                >
                  <Filter size={18} />
                  <span className="font-medium">Filters</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-warm-cream text-dark-teal transition-colors"
                >
                  <X size={24} />
                </motion.button>
              </div>

              {/* Filters */}
              <AnimatePresence>
                {isFiltersOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-6 p-6 bg-warm-cream rounded-2xl">
                      <div className="grid gap-8 md:grid-cols-2">
                        {/* Categories */}
                        <div>
                          <h3 className="text-sm font-medium text-gray-700 mb-4">Categories</h3>
                          <div className="flex flex-wrap gap-2">
                            {categories.map((category) => (
                              <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={cn(
                                  "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                                  selectedCategory === category
                                    ? "bg-dark-teal text-white"
                                    : "bg-white text-dark-teal hover:bg-dark-teal hover:text-white"
                                )}
                              >
                                {category}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Price Ranges */}
                        <div>
                          <h3 className="text-sm font-medium text-gray-700 mb-4">Price Range</h3>
                          <div className="flex flex-wrap gap-2">
                            {priceRanges.map((range) => (
                              <button
                                key={range.value}
                                onClick={() => setSelectedPriceRange(range.value)}
                                className={cn(
                                  "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                                  selectedPriceRange === range.value
                                    ? "bg-dark-teal text-white"
                                    : "bg-white text-dark-teal hover:bg-dark-teal hover:text-white"
                                )}
                              >
                                {range.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Search Suggestions */}
              {suggestions.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Suggestions</h3>
                  <div className="space-y-2">
                    {suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => setQuery(suggestion)}
                        className="w-full text-left px-4 py-2 rounded-lg text-dark-teal
                                 hover:bg-warm-cream transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Search Results */}
              {results.length > 0 && (
                <div className="mt-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-serif text-dark-teal">Search Results</h3>
                    <span className="text-sm text-gray-500">{results.length} items found</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                    {results.map((result) => (
                      <Link
                        key={result.id}
                        href={`/product/${result.id}`}
                        onClick={onClose}
                        className="group"
                      >
                        <div className="aspect-square relative overflow-hidden rounded-xl bg-warm-cream">
                          <Image
                            src={result.image}
                            alt={result.name}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
                        <div className="mt-4">
                          <h4 className="text-dark-teal font-medium group-hover:text-gold transition-colors">
                            {result.name}
                          </h4>
                          <p className="text-gray-600">${result.price.toLocaleString()}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 