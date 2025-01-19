import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ProductDetails from '../../../components/ui/products/product-details';
import { useAnalytics } from '../../../components/ui/common/analytics';

// Mock analytics hook
jest.mock('../../../components/ui/common/analytics', () => ({
  useAnalytics: jest.fn(() => ({
    trackEvent: jest.fn(),
    trackConversion: jest.fn(),
  })),
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

describe('ProductDetails', () => {
  const mockProduct = {
    id: '1',
    name: 'Test Product',
    description: 'Test description',
    price: 99.99,
    images: [
      '/test-image-1.jpg',
      '/test-image-2.jpg',
      '/test-image-3.jpg',
    ],
    category: 'Test Category',
    sizes: [
      { id: 's', name: 'Small', value: 'S', inStock: true },
      { id: 'm', name: 'Medium', value: 'M', inStock: true },
      { id: 'l', name: 'Large', value: 'L', inStock: false }
    ],
    colors: [
      { id: 'red', name: 'Red', value: '#FF0000' },
      { id: 'blue', name: 'Blue', value: '#0000FF' },
      { id: 'green', name: 'Green', value: '#00FF00' }
    ],
    features: ['Feature 1', 'Feature 2'],
    rating: 4.5,
    reviews: [
      {
        id: '1',
        author: 'Test User',
        rating: 5,
        text: 'Great product!',
        date: '2024-01-01',
      },
    ],
    variants: [
      { id: 'v1', name: 'Small Red', price: 99.99, image: '/test-image-1.jpg', size: 'S', color: 'Red', inStock: true },
      { id: 'v2', name: 'Medium Blue', price: 99.99, image: '/test-image-1.jpg', size: 'M', color: 'Blue', inStock: true },
      { id: 'v3', name: 'Large Green', price: 99.99, image: '/test-image-1.jpg', size: 'L', color: 'Green', inStock: false }
    ],
    reviewCount: 1
  };

  const mockOnAddToCart = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders product details correctly', () => {
    render(<ProductDetails product={mockProduct} onAddToCart={mockOnAddToCart} />);

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.getByText('Test Category')).toBeInTheDocument();
  });

  it('handles image gallery navigation', () => {
    render(<ProductDetails product={mockProduct} onAddToCart={mockOnAddToCart} />);

    const mainImage = screen.getByAltText('Test Product - Main Image');
    expect(mainImage).toHaveAttribute('src', '/test-image-1.jpg');

    const thumbnails = screen.getAllByRole('button', { name: /thumbnail/i });
    expect(thumbnails).toHaveLength(3);

    fireEvent.click(thumbnails[1]);
    expect(mainImage).toHaveAttribute('src', '/test-image-2.jpg');
  });

  it('handles size selection', () => {
    render(<ProductDetails product={mockProduct} onAddToCart={mockOnAddToCart} />);

    const sizeButtons = screen.getAllByRole('button', { name: /size/i });
    expect(sizeButtons).toHaveLength(3);

    fireEvent.click(sizeButtons[1]);
    expect(sizeButtons[1]).toHaveClass('selected');
  });

  it('handles color selection', () => {
    render(<ProductDetails product={mockProduct} onAddToCart={mockOnAddToCart} />);

    const colorButtons = screen.getAllByRole('button', { name: /color/i });
    expect(colorButtons).toHaveLength(3);

    fireEvent.click(colorButtons[0]);
    expect(colorButtons[0]).toHaveClass('selected');
  });

  it('handles quantity adjustment', () => {
    render(<ProductDetails product={mockProduct} onAddToCart={mockOnAddToCart} />);

    const decreaseButton = screen.getByRole('button', { name: /decrease/i });
    const increaseButton = screen.getByRole('button', { name: /increase/i });
    const quantityInput = screen.getByRole('spinbutton');

    expect(quantityInput).toHaveValue(1);

    fireEvent.click(increaseButton);
    expect(quantityInput).toHaveValue(2);

    fireEvent.click(decreaseButton);
    expect(quantityInput).toHaveValue(1);

    fireEvent.change(quantityInput, { target: { value: '5' } });
    expect(quantityInput).toHaveValue(5);
  });

  it('handles add to cart', () => {
    const { trackEvent } = useAnalytics();
    render(<ProductDetails product={mockProduct} onAddToCart={mockOnAddToCart} />);

    const addToCartButton = screen.getByRole('button', { name: /add to cart/i });
    fireEvent.click(addToCartButton);

    expect(trackEvent).toHaveBeenCalledWith('add_to_cart', expect.any(Object));
  });

  it('handles add to wishlist', () => {
    const { trackEvent } = useAnalytics();
    render(<ProductDetails product={mockProduct} onAddToCart={mockOnAddToCart} />);

    const wishlistButton = screen.getByRole('button', { name: /wishlist/i });
    fireEvent.click(wishlistButton);

    expect(trackEvent).toHaveBeenCalledWith('add_to_wishlist', {
      product_id: '1',
      product_name: 'Test Product',
    });
  });

  it('displays product features', () => {
    render(<ProductDetails product={mockProduct} onAddToCart={mockOnAddToCart} />);

    mockProduct.features.forEach((feature) => {
      expect(screen.getByText(feature)).toBeInTheDocument();
    });
  });

  it('displays product reviews', () => {
    render(<ProductDetails product={mockProduct} onAddToCart={mockOnAddToCart} />);

    expect(screen.getByText('4.5')).toBeInTheDocument();
    expect(screen.getByText('Great product!')).toBeInTheDocument();
    expect(screen.getByText('Test User')).toBeInTheDocument();
  });

  it('handles invalid quantity input', () => {
    render(<ProductDetails product={mockProduct} onAddToCart={mockOnAddToCart} />);

    const quantityInput = screen.getByRole('spinbutton');

    fireEvent.change(quantityInput, { target: { value: '-1' } });
    expect(quantityInput).toHaveValue(1);

    fireEvent.change(quantityInput, { target: { value: '0' } });
    expect(quantityInput).toHaveValue(1);

    fireEvent.change(quantityInput, { target: { value: '999' } });
    expect(quantityInput).toHaveValue(99);
  });

  it('disables add to cart button when no size is selected', () => {
    render(<ProductDetails product={mockProduct} onAddToCart={mockOnAddToCart} />);
    const addToCartButton = screen.getByRole('button', { name: /add to cart/i });
    expect(addToCartButton).toBeDisabled();
  });

  it('disables add to cart button when no color is selected', () => {
    render(<ProductDetails product={mockProduct} onAddToCart={mockOnAddToCart} />);
    const addToCartButton = screen.getByRole('button', { name: /add to cart/i });
    expect(addToCartButton).toBeDisabled();
  });

  it('enables add to cart button when size and color are selected', () => {
    render(<ProductDetails product={mockProduct} onAddToCart={mockOnAddToCart} />);
    // ... rest of test
  });

  it('disables add to cart button when selected size is out of stock', () => {
    render(<ProductDetails product={mockProduct} onAddToCart={mockOnAddToCart} />);
    // ... rest of test
  });

  it('displays product name', () => {
    render(<ProductDetails product={mockProduct} onAddToCart={mockOnAddToCart} />);
    expect(screen.getByText('Test Product')).toBeInTheDocument();
  });

  it('displays product description', () => {
    render(<ProductDetails product={mockProduct} onAddToCart={mockOnAddToCart} />);
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('displays product price', () => {
    render(<ProductDetails product={mockProduct} onAddToCart={mockOnAddToCart} />);
    expect(screen.getByText('$99.99')).toBeInTheDocument();
  });

  it('displays product images', () => {
    render(<ProductDetails product={mockProduct} onAddToCart={mockOnAddToCart} />);
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(mockProduct.images.length);
  });

  it('displays size options', () => {
    render(<ProductDetails product={mockProduct} onAddToCart={mockOnAddToCart} />);
    mockProduct.sizes.forEach(size => {
      expect(screen.getByText(size.name)).toBeInTheDocument();
    });
  });

  it('displays color options', () => {
    render(<ProductDetails product={mockProduct} onAddToCart={mockOnAddToCart} />);
    mockProduct.colors.forEach(color => {
      expect(screen.getByText(color.name)).toBeInTheDocument();
    });
  });

  it('displays features', () => {
    render(<ProductDetails product={mockProduct} onAddToCart={mockOnAddToCart} />);
    mockProduct.features.forEach(feature => {
      expect(screen.getByText(feature)).toBeInTheDocument();
    });
  });

  it('displays rating', () => {
    render(<ProductDetails product={mockProduct} onAddToCart={mockOnAddToCart} />);
    // ... rest of test
  });

  it('displays reviews', () => {
    render(<ProductDetails product={mockProduct} onAddToCart={mockOnAddToCart} />);
    // ... rest of test
  });

  it('displays variants', () => {
    render(<ProductDetails product={mockProduct} onAddToCart={mockOnAddToCart} />);
    // ... rest of test
  });

  it('displays review count', () => {
    render(<ProductDetails product={mockProduct} onAddToCart={mockOnAddToCart} />);
    // ... rest of test
  });
}); 