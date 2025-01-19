import Head from 'next/head';
import { useRouter } from 'next/router';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  type?: 'website' | 'article' | 'product';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  schema?: object;
}

const defaultMeta = {
  title: 'Luxury Jewelry Store | Exquisite Collection',
  description: 'Discover our curated collection of luxury jewelry. From elegant rings to stunning necklaces, find the perfect piece to express your style.',
  image: '/images/og-image.jpg',
  type: 'website' as const,
};

export default function SEO({
  title = defaultMeta.title,
  description = defaultMeta.description,
  image = defaultMeta.image,
  type = defaultMeta.type,
  publishedTime,
  modifiedTime,
  author,
  schema,
}: SEOProps) {
  const router = useRouter();
  const canonicalUrl = `${process.env.NEXT_PUBLIC_SITE_URL}${router.asPath}`;
  const ogImage = image.startsWith('http') ? image : `${process.env.NEXT_PUBLIC_SITE_URL}${image}`;

  // Generate breadcrumb schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: router.asPath.split('/').filter(Boolean).map((path, index, array) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@id': `${process.env.NEXT_PUBLIC_SITE_URL}/${array.slice(0, index + 1).join('/')}`,
        name: path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' '),
      },
    })),
  };

  // Generate organization schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Your Jewelry Store',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    logo: `${process.env.NEXT_PUBLIC_SITE_URL}/images/logo.png`,
    sameAs: [
      'https://facebook.com/yourstore',
      'https://instagram.com/yourstore',
      'https://pinterest.com/yourstore',
    ],
  };

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Your Jewelry Store" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Article Meta Tags */}
      {type === 'article' && (
        <>
          <meta property="article:published_time" content={publishedTime} />
          {modifiedTime && (
            <meta property="article:modified_time" content={modifiedTime} />
          )}
          {author && <meta property="article:author" content={author} />}
        </>
      )}

      {/* Schema.org Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            breadcrumbSchema,
            organizationSchema,
            ...(schema ? [schema] : []),
          ]),
        }}
      />

      {/* Preconnect to CDN */}
      <link rel="preconnect" href="https://cdn.yourdomain.com" />
      <link rel="dns-prefetch" href="https://cdn.yourdomain.com" />

      {/* PWA Meta Tags */}
      <meta name="application-name" content="Your Jewelry Store" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Your Jewelry Store" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="theme-color" content="#1F4D46" />

      {/* Favicons */}
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#1F4D46" />
      <meta name="msapplication-TileColor" content="#1F4D46" />
    </Head>
  );
} 