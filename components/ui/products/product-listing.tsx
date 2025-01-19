'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Grid, List, SlidersHorizontal, ChevronDown } from 'lucide-react';
import ProductCard from './product-card';
import ProductGrid from './product-grid';
import { useAnalytics } from '../common/analytics';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  tags: string[];
  rating: number;
  inStock: boolean;
}

interface ProductListingProps {
  products: Product[];
  categories: string[];
  onFilterChange?: (filters: any) => void;
  onSortChange?: (sort: string) => void;
}

export default function ProductListing({
  products,
  categories,
  onFilterChange,
  onSortChange,
}: ProductListingProps) {
  const { trackEvent } = useAnalytics();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'newest', label: 'Newest' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'rating', label: 'Top Rated' },
  ];

  const handleViewModeChange = (mode: 'grid' | 'list') => {
    setViewMode(mode);
    trackEvent('view_mode_change', { mode });
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setPage(1);
    onFilterChange?.({ category, priceRange });
    trackEvent('filter_change', { category });
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    onSortChange?.(value);
    trackEvent('sort_change', { sort: value });
  };

  const handlePriceRangeChange = (range: [number, number]) => {
    setPriceRange(range);
    onFilterChange?.({ category: selectedCategory, priceRange: range });
    trackEvent('price_range_change', { min: range[0], max: range[1] });
  };

  const filteredProducts = products
    .filter((product) => {
      if (selectedCategory !== 'all' && product.category !== selectedCategory) return false;
      if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = filteredProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            <SlidersHorizontal size={20} />
            <span>Filters</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleViewModeChange('grid')}
              className={`p-2 rounded-lg ${
                viewMode === 'grid' ? 'bg-gray-100' : 'hover:bg-gray-50'
              }`}
              aria-label="Grid view"
            >
              <Grid size={20} />
            </button>
            <button
              onClick={() => handleViewModeChange('list')}
              className={`p-2 rounded-lg ${
                viewMode === 'list' ? 'bg-gray-100' : 'hover:bg-gray-50'
              }`}
              aria-label="List view"
            >
              <List size={20} />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className="border rounded-lg px-3 py-2 bg-white"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border rounded-lg p-6 bg-gray-50"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Categories */}
              <div>
                <h3 className="font-medium mb-3">Categories</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => handleCategoryChange('all')}
                    className={`w-full text-left px-3 py-2 rounded-lg ${
                      selectedCategory === 'all'
                        ? 'bg-teal-50 text-teal-600'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    All Categories
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategoryChange(category)}
                      className={`w-full text-left px-3 py-2 rounded-lg ${
                        selectedCategory === category
                          ? 'bg-teal-50 text-teal-600'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-medium mb-3">Price Range</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) =>
                        handlePriceRangeChange([Number(e.target.value), priceRange[1]])
                      }
                      className="w-24 px-3 py-2 border rounded-lg"
                      placeholder="Min"
                    />
                    <span>to</span>
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) =>
                        handlePriceRangeChange([priceRange[0], Number(e.target.value)])
                      }
                      className="w-24 px-3 py-2 border rounded-lg"
                      placeholder="Max"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Products */}
      {viewMode === 'grid' ? (
        <ProductGrid products={currentProducts} viewMode="grid" itemsPerPage={itemsPerPage} />
      ) : (
        <div className="space-y-4">
          {currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} viewMode="list" />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => {
                setPage(pageNum);
                trackEvent('pagination_change', { page: pageNum });
              }}
              className={`w-10 h-10 rounded-full ${
                page === pageNum
                  ? 'bg-teal-600 text-white'
                  : 'border hover:bg-gray-50'
              }`}
            >
              {pageNum}
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 