import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Product {
  id: number
  name: string
  category: string
  price: number
  image: string
  slug: string
  material: string
  tags: string[]
  description: string
}

interface CartItem extends Product {
  quantity: number
}

interface StoreState {
  cart: CartItem[]
  wishlist: Product[]
  searchQuery: string
  searchResults: Product[]
  
  // Cart actions
  addToCart: (product: Product) => void
  removeFromCart: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  
  // Wishlist actions
  addToWishlist: (product: Product) => void
  removeFromWishlist: (productId: number) => void
  
  // Search actions
  setSearchQuery: (query: string) => void
  setSearchResults: (results: Product[]) => void
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      cart: [],
      wishlist: [],
      searchQuery: '',
      searchResults: [],

      addToCart: (product) =>
        set((state) => {
          const existingItem = state.cart.find((item) => item.id === product.id)
          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            }
          }
          return { cart: [...state.cart, { ...product, quantity: 1 }] }
        }),

      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== productId),
        })),

      updateQuantity: (productId, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          ),
        })),

      clearCart: () => set({ cart: [] }),

      addToWishlist: (product) =>
        set((state) => {
          if (!state.wishlist.some((item) => item.id === product.id)) {
            return { wishlist: [...state.wishlist, product] }
          }
          return state
        }),

      removeFromWishlist: (productId) =>
        set((state) => ({
          wishlist: state.wishlist.filter((item) => item.id !== productId),
        })),

      setSearchQuery: (query) => set({ searchQuery: query }),
      setSearchResults: (results) => set({ searchResults: results }),
    }),
    {
      name: 'jewelry-store',
    }
  )
) 