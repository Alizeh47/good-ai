'use client';

import { useEffect } from 'react';
import Head from 'next/head';
import { usePathname } from 'next/navigation';
import {
  generateOrganizationSchema,
  generateProductSchema,
  generateCollectionSchema,
  generateBlogPostSchema,
  generateBreadcrumbSchema,
  generateWebsiteSchema,
  generateFAQSchema,
} from '../../lib/utils/schema';

interface MetaTagsProps {
  title: string;
  description: string;
  image?: string;
  type?: 'website' | 'article' | 'product';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  schema?: string;
  noindex?: boolean;
  nofollow?: boolean;
  canonicalUrl?: string;
  breadcrumbs?: { name: string; url: string }[];
  organization?: {
    name: string;
    logo: string;
    url: string;
    description?: string;
    socialMediaLinks?: string[];
  };
}

const defaultOrganization = {
  name: 'Your Brand Name',
  logo: '/images/logo.png',
  url: process.env.NEXT_PUBLIC_SITE_URL || '',
  description: 'Your brand description',
  socialMediaLinks: [
    'https://facebook.com/yourbrand',
    'https://twitter.com/yourbrand',
    'https://instagram.com/yourbrand',
  ],
};

export default function MetaTags({
  title,
  description,
  image,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  schema,
  noindex = false,
  nofollow = false,
  canonicalUrl,
  breadcrumbs,
  organization = defaultOrganization,
}: MetaTagsProps) {
  const pathname = usePathname();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || '';
  const url = canonicalUrl || `${baseUrl}${pathname}`;
  const imageUrl = image ? `${baseUrl}${image}` : `${baseUrl}/images/og-image.jpg`;

  // Generate website and organization schema
  const websiteSchema = generateWebsiteSchema(organization);
  const organizationSchema = generateOrganizationSchema({
    ...organization,
    logo: `${baseUrl}${organization.logo}`,
  });

  // Generate breadcrumb schema if breadcrumbs are provided
  const breadcrumbSchema = breadcrumbs ? generateBreadcrumbSchema(breadcrumbs) : null;

  // Combine all schema markup
  const schemas = [websiteSchema, organizationSchema];
  if (breadcrumbSchema) schemas.push(breadcrumbSchema);
  if (schema) schemas.push(schema);

  useEffect(() => {
    // Track page view
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
        page_path: pathname,
      });
    }
  }, [pathname]);

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {noindex && <meta name="robots" content={`noindex${nofollow ? ',nofollow' : ''}`} />}
      <link rel="canonical" href={url} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content={organization.name} />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {/* Article Meta Tags */}
      {type === 'article' && publishedTime && (
        <>
          <meta property="article:published_time" content={publishedTime} />
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {author && <meta property="article:author" content={author} />}
        </>
      )}

      {/* PWA Meta Tags */}
      <meta name="application-name" content={organization.name} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={organization.name} />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="theme-color" content="#ffffff" />

      {/* Favicons */}
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/manifest.json" />

      {/* Schema.org Markup */}
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schema }}
        />
      ))}
    </Head>
  );
} 