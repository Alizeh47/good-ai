import { create } from 'zustand';
import { Product, ProductFilters, ProductSearchParams } from '@/types/product';

interface ProductStore {
  products: Product[];
  filters: ProductFilters;
  searchParams: ProductSearchParams;
  loading: boolean;
  error: string | null;
  
  // Actions
  setProducts: (products: Product[]) => void;
  setFilters: (filters: ProductFilters) => void;
  setSearchParams: (params: ProductSearchParams) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  filters: {},
  searchParams: {},
  loading: false,
  error: null,

  setProducts: (products) => set({ products }),
  setFilters: (filters) => set({ filters }),
  setSearchParams: (params) => set({ searchParams: params }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
})); 