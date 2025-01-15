import { create } from 'zustand';

interface SearchState {
  query: string;
  isOpen: boolean;
  results: Array<{
    id: string | number;
    name: string;
    category: string;
    image: string;
    price: number;
    slug: string;
  }>;
  isLoading: boolean;
  setQuery: (query: string) => void;
  toggleSearch: () => void;
  setResults: (results: SearchState['results']) => void;
  clearSearch: () => void;
  search: (query: string) => Promise<void>;
}

export const useSearchStore = create<SearchState>()((set, get) => ({
  query: '',
  isOpen: false,
  results: [],
  isLoading: false,

  setQuery: (query) => {
    set({ query });
  },

  toggleSearch: () => {
    set((state) => ({ isOpen: !state.isOpen }));
  },

  setResults: (results) => {
    set({ results });
  },

  clearSearch: () => {
    set({ query: '', results: [] });
  },

  search: async (query) => {
    set({ isLoading: true });
    try {
      // TODO: Replace with actual API call
      const mockResults = [
        {
          id: 1,
          name: 'Diamond Ring',
          category: 'Rings',
          image: '/images/products/ring-1.jpg',
          price: 1299,
          slug: 'diamond-ring',
        },
        // Add more mock results...
      ].filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      set({ results: mockResults });
    } catch (error) {
      console.error('Search error:', error);
      set({ results: [] });
    } finally {
      set({ isLoading: false });
    }
  },
})); 