import React from 'react';
import { render } from '@testing-library/react';
import SEO from '../../../components/ui/common/seo';

// Mock next/router
jest.mock('next/router', () => ({
  useRouter: () => ({
    asPath: '/test-page',
  }),
}));

// Mock environment variables
process.env.NEXT_PUBLIC_SITE_URL = 'https://example.com';

describe('SEO', () => {
  const defaultProps = {
    title: 'Test Page',
    description: 'Test description',
    image: '/test-image.jpg',
  };

  it('renders with default props', () => {
    render(<SEO {...defaultProps} />);
    
    // Check meta tags
    expect(document.title).toBe('Test Page');
    expect(document.querySelector('meta[name="description"]')).toHaveAttribute(
      'content',
      'Test description'
    );
    expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://example.com/test-page'
    );
  });

  it('renders Open Graph meta tags', () => {
    render(<SEO {...defaultProps} />);
    
    expect(document.querySelector('meta[property="og:title"]')).toHaveAttribute(
      'content',
      'Test Page'
    );
    expect(document.querySelector('meta[property="og:description"]')).toHaveAttribute(
      'content',
      'Test description'
    );
    expect(document.querySelector('meta[property="og:image"]')).toHaveAttribute(
      'content',
      'https://example.com/test-image.jpg'
    );
    expect(document.querySelector('meta[property="og:url"]')).toHaveAttribute(
      'content',
      'https://example.com/test-page'
    );
  });

  it('renders Twitter meta tags', () => {
    render(<SEO {...defaultProps} />);
    
    expect(document.querySelector('meta[name="twitter:title"]')).toHaveAttribute(
      'content',
      'Test Page'
    );
    expect(document.querySelector('meta[name="twitter:description"]')).toHaveAttribute(
      'content',
      'Test description'
    );
    expect(document.querySelector('meta[name="twitter:image"]')).toHaveAttribute(
      'content',
      'https://example.com/test-image.jpg'
    );
  });

  it('handles article type with additional meta tags', () => {
    const articleProps = {
      ...defaultProps,
      type: 'article' as const,
      publishedTime: '2024-01-01T00:00:00Z',
      modifiedTime: '2024-01-02T00:00:00Z',
      author: 'Test Author',
    };

    render(<SEO {...articleProps} />);
    
    expect(document.querySelector('meta[property="og:type"]')).toHaveAttribute(
      'content',
      'article'
    );
    expect(document.querySelector('meta[property="article:published_time"]')).toHaveAttribute(
      'content',
      '2024-01-01T00:00:00Z'
    );
    expect(document.querySelector('meta[property="article:modified_time"]')).toHaveAttribute(
      'content',
      '2024-01-02T00:00:00Z'
    );
    expect(document.querySelector('meta[property="article:author"]')).toHaveAttribute(
      'content',
      'Test Author'
    );
  });

  it('generates breadcrumb schema', () => {
    render(<SEO {...defaultProps} />);
    
    const scripts = document.querySelectorAll('script[type="application/ld+json"]');
    const schema = JSON.parse(scripts[0].innerHTML);
    
    expect(schema[0]['@type']).toBe('BreadcrumbList');
    expect(schema[0].itemListElement[0].item.name).toBe('Test Page');
  });

  it('generates organization schema', () => {
    render(<SEO {...defaultProps} />);
    
    const scripts = document.querySelectorAll('script[type="application/ld+json"]');
    const schema = JSON.parse(scripts[0].innerHTML);
    
    expect(schema[1]['@type']).toBe('Organization');
    expect(schema[1].url).toBe('https://example.com');
  });

  it('includes custom schema when provided', () => {
    const customSchema = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'Test Product',
    };

    render(<SEO {...defaultProps} schema={customSchema} />);
    
    const scripts = document.querySelectorAll('script[type="application/ld+json"]');
    const schema = JSON.parse(scripts[0].innerHTML);
    
    expect(schema[2]['@type']).toBe('Product');
    expect(schema[2].name).toBe('Test Product');
  });

  it('handles absolute image URLs', () => {
    const props = {
      ...defaultProps,
      image: 'https://external-domain.com/image.jpg',
    };

    render(<SEO {...props} />);
    
    expect(document.querySelector('meta[property="og:image"]')).toHaveAttribute(
      'content',
      'https://external-domain.com/image.jpg'
    );
  });

  it('includes PWA meta tags', () => {
    render(<SEO {...defaultProps} />);
    
    expect(document.querySelector('meta[name="application-name"]')).toHaveAttribute(
      'content',
      'Your Jewelry Store'
    );
    expect(document.querySelector('meta[name="theme-color"]')).toHaveAttribute(
      'content',
      '#1F4D46'
    );
  });

  it('includes preconnect links', () => {
    render(<SEO {...defaultProps} />);
    
    expect(document.querySelector('link[rel="preconnect"]')).toHaveAttribute(
      'href',
      'https://cdn.yourdomain.com'
    );
  });
}); 