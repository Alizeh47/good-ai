import { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://eglanto.com';

interface GenerateMetadataProps {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
  canonical?: string;
}

export function generateMetadata({
  title,
  description,
  image = '/images/og-image.jpg',
  noIndex = false,
  canonical,
}: GenerateMetadataProps): Metadata {
  const metaTitle = title 
    ? `${title} | Eglanto Jewelry`
    : 'Eglanto - Luxury Jewelry Collection';
  
  const metaDescription = description || 
    'Discover our exquisite collection of handcrafted luxury jewelry. Each piece tells a unique story of elegance and craftsmanship.';

  return {
    title: metaTitle,
    description: metaDescription,
    robots: {
      index: !noIndex,
      follow: !noIndex,
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: baseUrl,
      siteName: 'Eglanto Jewelry',
      images: [
        {
          url: `${baseUrl}${image}`,
          width: 1200,
          height: 630,
          alt: metaTitle,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: [`${baseUrl}${image}`],
    },
    alternates: {
      canonical: canonical || baseUrl,
    },
  };
}

export function generateProductMetadata(product: {
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
  slug: string;
}): Metadata {
  const { name, description, image, price, category, slug } = product;
  const url = `${baseUrl}/product/${slug}`;

  return {
    ...generateMetadata({
      title: name,
      description,
      image,
      canonical: url,
    }),
    openGraph: {
      title: name,
      description,
      url,
      siteName: 'Eglanto Jewelry',
      images: [
        {
          url: `${baseUrl}${image}`,
          width: 1200,
          height: 630,
          alt: name,
        },
      ],
      type: 'website',
    },
    alternates: {
      canonical: url,
    },
    other: {
      'og:price:amount': price.toString(),
      'og:price:currency': 'USD',
      'product:price:amount': price.toString(),
      'product:price:currency': 'USD',
      'product:category': category,
    },
  };
} 