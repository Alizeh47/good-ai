import { useQuery } from '@tanstack/react-query';
import { productService } from '@/services/product';
import { Product, ProductSearchParams } from '@/types/product';
import { useProductStore } from '@/store/use-product-store';

interface ProductResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
}

export function useProducts(params: ProductSearchParams = {}) {
  const setProducts = useProductStore((state) => state.setProducts);
  const setLoading = useProductStore((state) => state.setLoading);
  const setError = useProductStore((state) => state.setError);

  return useQuery<ProductResponse, Error>({
    queryKey: ['products', params],
    queryFn: async () => {
      setLoading(true);
      try {
        const data = await productService.getProducts(params);
        setProducts(data.products);
        setError(null);
        return data;
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An error occurred');
        throw error;
      } finally {
        setLoading(false);
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useProduct(id: string) {
  return useQuery<Product, Error>({
    queryKey: ['product', id],
    queryFn: () => productService.getProduct(id),
    enabled: !!id,
  });
}

export function useCategories() {
  return useQuery<string[], Error>({
    queryKey: ['categories'],
    queryFn: productService.getCategories,
  });
}

export function useProductSearch(query: string) {
  return useQuery<Product[], Error>({
    queryKey: ['productSearch', query],
    queryFn: () => productService.searchProducts(query),
    enabled: !!query,
  });
} 