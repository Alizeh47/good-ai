import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface WishlistItem {
  id: string | number;
  name: string;
  price: number;
  image: string;
  category: string;
  slug: string;
}

interface WishlistState {
  items: WishlistItem[];
  addItem: (item: WishlistItem) => void;
  removeItem: (itemId: string | number) => void;
  toggleItem: (item: WishlistItem) => void;
  hasItem: (itemId: string | number) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        set((state) => {
          if (state.items.some((i) => i.id === item.id)) return state;
          return { items: [...state.items, item] };
        });
      },

      removeItem: (itemId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemId),
        }));
      },

      toggleItem: (item) => {
        const hasItem = get().hasItem(item.id);
        if (hasItem) {
          get().removeItem(item.id);
        } else {
          get().addItem(item);
        }
      },

      hasItem: (itemId) => {
        return get().items.some((item) => item.id === itemId);
      },

      clearWishlist: () => {
        set({ items: [] });
      },
    }),
    {
      name: 'wishlist-storage',
      skipHydration: true,
    }
  )
); 