import { Product as ProductType } from '@/types/product';

interface Organization {
  name: string;
  logo: string;
  url: string;
  description?: string;
  socialMediaLinks?: string[];
  address?: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
}

interface Product {
  name: string;
  description: string;
  images: string[];
  price: number;
  currency: string;
  sku: string;
  brand: string;
  category?: string;
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder';
  rating?: {
    value: number;
    count: number;
  };
}

interface Collection {
  name: string;
  description: string;
  image: string;
  products: Product[];
}

interface BlogPost {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified: string;
  author: {
    name: string;
    url?: string;
  };
  category?: string;
  tags?: string[];
}

export function generateOrganizationSchema(org: Organization): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: org.name,
    logo: org.logo,
    url: org.url,
    ...(org.description && { description: org.description }),
    ...(org.socialMediaLinks && { sameAs: org.socialMediaLinks }),
    ...(org.address && {
      address: {
        '@type': 'PostalAddress',
        ...org.address,
      },
    }),
  };

  return JSON.stringify(schema);
}

export function generateProductSchema(product: Product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images[0],
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'USD',
      availability: product.availability === 'InStock'
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
    },
  };
}

export function generateCollectionSchema(collection: Collection, baseUrl: string): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: collection.name,
    description: collection.description,
    image: `${baseUrl}${collection.image}`,
    hasPart: collection.products.map(product => ({
      '@type': 'Product',
      name: product.name,
      description: product.description,
      image: product.images.map(img => `${baseUrl}${img}`),
      offers: {
        '@type': 'Offer',
        price: product.price,
        priceCurrency: product.currency,
      },
    })),
  };

  return JSON.stringify(schema);
}

export function generateBlogPostSchema(post: BlogPost, baseUrl: string): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: `${baseUrl}${post.image}`,
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    author: {
      '@type': 'Person',
      name: post.author.name,
      ...(post.author.url && { url: post.author.url }),
    },
    ...(post.category && { articleSection: post.category }),
    ...(post.tags && { keywords: post.tags.join(', ') }),
  };

  return JSON.stringify(schema);
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${process.env.NEXT_PUBLIC_SITE_URL}${item.url}`,
    })),
  };

  return JSON.stringify(schema);
}

export function generateWebsiteSchema(organization: { name: string; url: string }): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: organization.name,
    url: organization.url,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${organization.url}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  return JSON.stringify(schema);
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return JSON.stringify(schema);
} 