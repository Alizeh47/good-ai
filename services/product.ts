import api from '@/lib/api';
import { Product, ProductSearchParams } from '@/types/product';

export const productService = {
  async getProducts(params: ProductSearchParams = {}) {
    const response = await api.get('/api/products', { params });
    return response.data;
  },

  async getProduct(id: string) {
    const response = await api.get(`/api/products/${id}`);
    return response.data;
  },

  async searchProducts(query: string) {
    const response = await api.get('/api/products/search', {
      params: { query },
    });
    return response.data;
  },

  async getCategories() {
    const response = await api.get('/api/products/categories');
    return response.data;
  },

  async getProductsByCategory(category: string) {
    const response = await api.get(`/api/products/category/${category}`);
    return response.data;
  },
}; 