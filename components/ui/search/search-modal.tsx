import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, Clock, Loader2 } from 'lucide-react'
import { twMerge } from 'tailwind-merge'
import { useSearch } from '../../../contexts/search-context'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const {
    query,
    setQuery,
    results,
    recentSearches,
    suggestions,
    isLoading,
    clearRecentSearches,
  } = useSearch()

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      inputRef.current?.focus()
    } else {
      document.body.style.overflow = 'unset'
      setQuery('')
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, setQuery])

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

          {/* Modal */}
          <motion.div
            className="fixed left-0 right-0 top-0 z-50 h-full max-h-[85vh] overflow-hidden bg-white shadow-xl sm:left-1/2 sm:top-8 sm:h-auto sm:max-h-[600px] sm:w-full sm:max-w-xl sm:-translate-x-1/2 sm:rounded-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 border-b px-4 py-3">
              <Search className="h-5 w-5 text-gray-400" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for products..."
                className="flex-1 bg-transparent text-lg outline-none placeholder:text-gray-400"
              />
              {isLoading && <Loader2 className="h-5 w-5 animate-spin text-gray-400" />}
              <button
                onClick={onClose}
                className="rounded-full p-1 transition-colors hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="h-full overflow-auto">
              {/* Recent Searches */}
              {!query && recentSearches.length > 0 && (
                <div className="p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="font-medium">Recent Searches</h3>
                    <button
                      onClick={clearRecentSearches}
                      className="text-sm text-primary transition-colors hover:text-primary/80"
                    >
                      Clear All
                    </button>
                  </div>
                  <div className="space-y-2">
                    {recentSearches.map((search) => (
                      <button
                        key={search}
                        onClick={() => setQuery(search)}
                        className="flex w-full items-center gap-3 rounded-md px-2 py-1.5 transition-colors hover:bg-gray-100"
                      >
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span>{search}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Suggestions */}
              {query && suggestions.length > 0 && !results.length && (
                <div className="p-4">
                  <h3 className="mb-3 font-medium">Suggestions</h3>
                  <div className="space-y-2">
                    {suggestions.map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => setQuery(suggestion)}
                        className="flex w-full items-center gap-3 rounded-md px-2 py-1.5 transition-colors hover:bg-gray-100"
                      >
                        <Search className="h-4 w-4 text-gray-400" />
                        <span>{suggestion}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Results */}
              {results.length > 0 && (
                <div className="p-4">
                  <h3 className="mb-3 font-medium">Products</h3>
                  <div className="divide-y">
                    {results.map((product) => (
                      <Link
                        key={product.id}
                        href={`/products/${product.id}`}
                        onClick={onClose}
                        className="flex gap-4 py-4 transition-colors hover:bg-gray-50"
                      >
                        <div className="relative aspect-square h-16 overflow-hidden rounded-md">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium">{product.name}</h4>
                          <p className="text-sm text-gray-500">{product.category}</p>
                          <p className="mt-1 font-medium text-primary">
                            ${product.price.toLocaleString()}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* No Results */}
              {query && !isLoading && !results.length && !suggestions.length && (
                <div className="flex flex-col items-center justify-center p-8">
                  <Search className="h-12 w-12 text-gray-300" />
                  <p className="mt-4 text-lg font-medium">No results found</p>
                  <p className="mt-2 text-center text-sm text-gray-500">
                    We couldn't find any products matching your search.
                    <br />
                    Try using different keywords.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
} 