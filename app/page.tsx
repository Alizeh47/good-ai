import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Components with heavy client-side interactions are dynamically imported
const HeroSection = dynamic(() => import('../components/sections/hero'));
const StatsBar = dynamic(() => import('../components/sections/stats-bar'));
const CollectionShowcase = dynamic(() => import('../components/sections/collection-showcase'));
const NewArrivals = dynamic(() => import('../components/sections/new-arrivals'));
const Testimonials = dynamic(() => import('../components/sections/testimonials'));
const Heritage = dynamic(() => import('../components/sections/heritage'));
const InstagramFeed = dynamic(() => import('../components/sections/instagram-feed'));
const BlogSection = dynamic(() => import('../components/sections/blog/blog-section'));
const NewsletterSection = dynamic(() => import('../components/sections/newsletter'));

// Loading components for Suspense fallbacks
import HeroSkeleton from '../components/skeletons/hero-skeleton';
import SectionSkeleton from '../components/skeletons/section-skeleton';

// Mock data for blog posts
const blogPosts = [
  {
    id: '1',
    title: 'The Art of Layering Necklaces: A Complete Guide',
    excerpt: 'Learn how to master the art of necklace layering with our comprehensive guide to creating the perfect stack.',
    image: '/images/blog/layering-necklaces.jpg',
    category: 'Style Guide',
    author: {
      name: 'Emma Stone',
      avatar: '/images/team/emma.jpg',
    },
    date: '2024-01-15',
    commentsCount: 8,
  },
  {
    id: '2',
    title: 'Understanding Diamond Clarity: What You Need to Know',
    excerpt: 'Dive deep into the world of diamonds and learn what makes them truly special, from clarity grades to cut quality.',
    image: '/images/blog/diamond-clarity.jpg',
    category: 'Education',
    author: {
      name: 'Michael Chen',
      avatar: '/images/team/michael.jpg',
    },
    date: '2024-01-10',
    commentsCount: 12,
  },
  {
    id: '3',
    title: 'Spring 2024 Jewelry Trends You Cannot Miss',
    excerpt: 'Discover the hottest jewelry trends for Spring 2024, from bold statement pieces to delicate minimalist designs.',
    image: '/images/blog/spring-trends.jpg',
    category: 'Trends',
    author: {
      name: 'Sophie Williams',
      avatar: '/images/team/sophie.jpg',
    },
    date: '2024-01-05',
    commentsCount: 15,
  },
];

// Metadata for SEO
export const metadata: Metadata = {
  title: 'Luxury Jewelry Store | Exquisite Collection of Fine Jewelry',
  description: 'Discover our curated collection of luxury jewelry. From elegant rings to stunning necklaces, find the perfect piece to express your style.',
  keywords: 'luxury jewelry, fine jewelry, diamond rings, necklaces, earrings, bracelets',
  openGraph: {
    title: 'Luxury Jewelry Store | Exquisite Collection of Fine Jewelry',
    description: 'Discover our curated collection of luxury jewelry. From elegant rings to stunning necklaces, find the perfect piece to express your style.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Luxury Jewelry Collection',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luxury Jewelry Store | Exquisite Collection',
    description: 'Discover our curated collection of luxury jewelry.',
    images: ['/images/og-image.jpg'],
  },
};

export default function Home() {
  return (
    <main>
      <Suspense fallback={<HeroSkeleton />}>
        <HeroSection />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <StatsBar />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <CollectionShowcase />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <NewArrivals />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <Testimonials />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <Heritage />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <BlogSection posts={blogPosts} />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <NewsletterSection />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <InstagramFeed />
      </Suspense>
    </main>
  );
}
