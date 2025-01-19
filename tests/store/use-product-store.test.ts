import { useProductStore } from '@/store/use-product-store';
import { Product } from '@/types/product';

describe('useProductStore', () => {
  beforeEach(() => {
    useProductStore.setState({
      products: [],
      filters: {},
      searchParams: {},
      loading: false,
      error: null,
    });
  });

  const mockProduct: Product = {
    id: '1',
    name: 'Test Product',
    description: 'Test Description',
    price: 99.99,
    images: ['test.jpg'],
    category: 'test',
    tags: ['test'],
    inStock: true,
    stockQuantity: 10,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  it('should set products', () => {
    useProductStore.getState().setProducts([mockProduct]);
    expect(useProductStore.getState().products).toEqual([mockProduct]);
  });

  it('should set filters', () => {
    const filters = { category: 'test', minPrice: 50 };
    useProductStore.getState().setFilters(filters);
    expect(useProductStore.getState().filters).toEqual(filters);
  });

  it('should set search params', () => {
    const params = { query: 'test', page: 1 };
    useProductStore.getState().setSearchParams(params);
    expect(useProductStore.getState().searchParams).toEqual(params);
  });

  it('should set loading state', () => {
    useProductStore.getState().setLoading(true);
    expect(useProductStore.getState().loading).toBe(true);
  });

  it('should set error state', () => {
    const error = 'Test error';
    useProductStore.getState().setError(error);
    expect(useProductStore.getState().error).toBe(error);
  });
}); 