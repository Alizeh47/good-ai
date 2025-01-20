import { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { RootProvider } from '@/providers/root-provider';
import { cn } from '@/lib/utils';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: 'Eglanto | Luxury Jewelry',
    template: '%s | Eglanto',
  },
  description: 'Discover our curated collection of luxury jewelry. From elegant rings to stunning necklaces, find the perfect piece to express your style.',
  keywords: ['jewelry', 'luxury', 'accessories', 'fashion', 'rings', 'necklaces', 'earrings'],
  authors: [{ name: 'Eglanto' }],
  creator: 'Eglanto',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    title: 'Eglanto | Luxury Jewelry',
    description: 'Discover our curated collection of luxury jewelry. From elegant rings to stunning necklaces, find the perfect piece to express your style.',
    siteName: 'Eglanto',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Eglanto | Luxury Jewelry',
    description: 'Discover our curated collection of luxury jewelry.',
    creator: '@eglanto',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${playfair.variable}`}>
      <body className={cn('min-h-screen bg-background antialiased font-sans')}>
        <RootProvider>
          <Header />
          {children}
          <Footer />
        </RootProvider>
      </body>
    </html>
  );
}
