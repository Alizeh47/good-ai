import { createContext, useContext, useState, useEffect } from 'react'

interface Product {
  id: string
  name: string
  price: number
  image: string
  category: string
}

interface SearchContextType {
  query: string
  setQuery: (query: string) => void
  results: Product[]
  recentSearches: string[]
  suggestions: string[]
  isLoading: boolean
  clearRecentSearches: () => void
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

const RECENT_SEARCHES_KEY = 'recentSearches'
const MAX_RECENT_SEARCHES = 5

// Mock product data - replace with actual API call
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Diamond Ring',
    price: 999,
    image: '/images/products/ring-1.jpg',
    category: 'Rings',
  },
  // Add more mock products...
]

// Mock suggestions - replace with actual API call
const mockSuggestions = [
  'Diamond Ring',
  'Gold Necklace',
  'Silver Bracelet',
  'Pearl Earrings',
  'Wedding Rings',
]

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Product[]>([])
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    if (typeof window === 'undefined') return []
    const saved = localStorage.getItem(RECENT_SEARCHES_KEY)
    return saved ? JSON.parse(saved) : []
  })
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Save recent searches to localStorage
  useEffect(() => {
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(recentSearches))
  }, [recentSearches])

  // Update search results when query changes
  useEffect(() => {
    const searchProducts = async () => {
      setIsLoading(true)
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 300))

        // Filter products based on query
        const filtered = mockProducts.filter((product) =>
          product.name.toLowerCase().includes(query.toLowerCase())
        )
        setResults(filtered)

        // Update recent searches
        if (query.trim() && !recentSearches.includes(query)) {
          setRecentSearches((prev) => [
            query,
            ...prev.slice(0, MAX_RECENT_SEARCHES - 1),
          ])
        }

        // Update suggestions
        const matchingSuggestions = mockSuggestions.filter((suggestion) =>
          suggestion.toLowerCase().includes(query.toLowerCase())
        )
        setSuggestions(matchingSuggestions)
      } catch (error) {
        console.error('Error searching products:', error)
        setResults([])
        setSuggestions([])
      } finally {
        setIsLoading(false)
      }
    }

    if (query.trim()) {
      searchProducts()
    } else {
      setResults([])
      setSuggestions([])
      setIsLoading(false)
    }
  }, [query, recentSearches])

  const clearRecentSearches = () => {
    setRecentSearches([])
  }

  return (
    <SearchContext.Provider
      value={{
        query,
        setQuery,
        results,
        recentSearches,
        suggestions,
        isLoading,
        clearRecentSearches,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export function useSearch() {
  const context = useContext(SearchContext)
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider')
  }
  return context
} 