import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import Header from '../components/layout/header';
import Footer from '../components/layout/footer';
import { StoreProvider } from '../components/providers/store-provider';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: 'Eglanto - Luxury Jewelry',
  description: 'Discover timeless elegance with our luxury jewelry collection.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen flex flex-col">
        <StoreProvider>
          <Header />
          <main className="flex-grow pt-20">
            {children}
          </main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
