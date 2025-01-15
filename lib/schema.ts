const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://eglanto.com';

interface ProductSchemaProps {
  name: string;
  description: string;
  image: string;
  price: number;
  sku: string;
  category: string;
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder';
}

export function generateProductSchema(props: ProductSchemaProps) {
  const { name, description, image, price, sku, category, availability = 'InStock' } = props;

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image: `${baseUrl}${image}`,
    sku,
    category,
    offers: {
      '@type': 'Offer',
      price,
      priceCurrency: 'USD',
      availability: `https://schema.org/${availability}`,
      url: baseUrl,
    },
  };
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@id': `${baseUrl}${item.url}`,
        name: item.name,
      },
    })),
  };
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Eglanto Jewelry',
    url: baseUrl,
    logo: `${baseUrl}/images/logo.png`,
    sameAs: [
      'https://facebook.com/eglanto',
      'https://instagram.com/eglanto',
      'https://pinterest.com/eglanto',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-234-567-8900',
      contactType: 'customer service',
      email: 'support@eglanto.com',
      areaServed: 'Worldwide',
      availableLanguage: ['English'],
    },
  };
}

export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Eglanto Jewelry',
    url: baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${baseUrl}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
} 