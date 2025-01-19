import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Cart, CartItem } from '@/types/cart';

interface CartStore extends Cart {
  addItem: (product: CartItem['product'], quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  calculateTotals: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      subtotal: 0,
      tax: 0,
      shipping: 0,
      total: 0,

      addItem: (product, quantity = 1) => {
        const items = [...get().items];
        const existingItem = items.find(item => item.product.id === product.id);

        if (existingItem) {
          existingItem.quantity += quantity;
        } else {
          items.push({ product, quantity });
        }

        set({ items });
        get().calculateTotals();
      },

      removeItem: (productId) => {
        const items = get().items.filter(item => item.product.id !== productId);
        set({ items });
        get().calculateTotals();
      },

      updateQuantity: (productId, quantity) => {
        const items = get().items.map(item =>
          item.product.id === productId
            ? { ...item, quantity: Math.max(0, quantity) }
            : item
        );
        set({ items });
        get().calculateTotals();
      },

      clearCart: () => {
        set({ items: [], subtotal: 0, tax: 0, shipping: 0, total: 0 });
      },

      calculateTotals: () => {
        const items = get().items;
        const subtotal = items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
        const tax = subtotal * 0.1; // 10% tax
        const shipping = subtotal > 100 ? 0 : 10; // Free shipping over $100
        const total = subtotal + tax + shipping;

        set({ subtotal, tax, shipping, total });
      },
    }),
    {
      name: 'cart-storage',
    }
  )
); 