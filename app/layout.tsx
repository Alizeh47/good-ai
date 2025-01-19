import { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { RootProvider } from '@/providers/root-provider';
import { cn } from '@/lib/utils';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: 'Your Brand Name',
    template: '%s | Your Brand Name',
  },
  description: 'Your brand description',
  keywords: ['jewelry', 'luxury', 'accessories', 'fashion'],
  authors: [{ name: 'Your Brand Name' }],
  creator: 'Your Brand Name',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    title: 'Your Brand Name',
    description: 'Your brand description',
    siteName: 'Your Brand Name',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Your Brand Name',
    description: 'Your brand description',
    creator: '@yourbrand',
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
    <html lang="en" suppressHydrationWarning>
      <body className={cn('min-h-screen bg-background antialiased', inter.className)}>
        <RootProvider>
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
