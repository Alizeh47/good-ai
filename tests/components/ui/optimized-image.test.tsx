import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import OptimizedImage from '../../../components/ui/common/optimized-image';

describe('OptimizedImage', () => {
  const defaultProps = {
    src: '/test-image.jpg',
    alt: 'Test image',
    width: 400,
    height: 300,
  };

  it('renders with default props', () => {
    render(<OptimizedImage {...defaultProps} />);
    const image = screen.getByAltText('Test image');
    expect(image).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <OptimizedImage
        {...defaultProps}
        className="custom-class"
        containerClassName="container-class"
      />
    );
    const image = screen.getByAltText('Test image');
    const container = image.parentElement?.parentElement;
    
    expect(image).toHaveClass('custom-class');
    expect(container).toHaveClass('container-class');
  });

  it('handles aspect ratio correctly', () => {
    render(<OptimizedImage {...defaultProps} aspectRatio={1.5} />);
    const container = screen.getByAltText('Test image').parentElement?.parentElement;
    
    expect(container).toHaveStyle({ aspectRatio: '1.5' });
  });

  it('shows low-res placeholder while loading', () => {
    render(
      <OptimizedImage
        {...defaultProps}
        lowResSrc="/test-image-low-res.jpg"
      />
    );
    
    const placeholder = screen.getAllByAltText('Test image')[1];
    expect(placeholder).toHaveClass('blur-sm');
  });

  it('handles loading state correctly', async () => {
    render(<OptimizedImage {...defaultProps} />);
    const image = screen.getByAltText('Test image');
    
    expect(image).toHaveClass('opacity-0');
    
    // Simulate image load
    image.dispatchEvent(new Event('load'));
    
    await waitFor(() => {
      expect(image).toHaveClass('opacity-100');
    });
  });

  it('prioritizes loading when preload is true', () => {
    render(<OptimizedImage {...defaultProps} preload />);
    const image = screen.getByAltText('Test image');
    
    expect(image).toHaveAttribute('loading', 'eager');
  });

  it('generates blur data URL when withBlur is true', () => {
    const mockCreateElement = jest.spyOn(document, 'createElement');
    render(<OptimizedImage {...defaultProps} withBlur />);
    
    expect(mockCreateElement).toHaveBeenCalledWith('canvas');
    mockCreateElement.mockRestore();
  });

  it('uses provided blur data URL when available', () => {
    const blurDataURL = 'data:image/jpeg;base64,test';
    render(
      <OptimizedImage
        {...defaultProps}
        blurDataURL={blurDataURL}
      />
    );
    
    const image = screen.getByAltText('Test image');
    expect(image).toHaveAttribute('placeholder', 'blur');
    expect(image).toHaveAttribute('blurDataURL', blurDataURL);
  });

  it('handles responsive sizes correctly', () => {
    const sizes = '(min-width: 768px) 50vw, 100vw';
    render(<OptimizedImage {...defaultProps} sizes={sizes} />);
    
    const image = screen.getByAltText('Test image');
    expect(image).toHaveAttribute('sizes', sizes);
  });

  it('uses default sizes when not provided', () => {
    render(<OptimizedImage {...defaultProps} />);
    
    const image = screen.getByAltText('Test image');
    expect(image).toHaveAttribute(
      'sizes',
      '(min-width: 1280px) 1200px, (min-width: 1024px) 960px, (min-width: 768px) 720px, 100vw'
    );
  });
}); 