'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, Search, Heart, ShoppingBag, X } from 'lucide-react';
import { cn } from '../../lib/utils';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const primaryNavItems = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Discover', href: '/discover' },
    { label: 'Blogs', href: '/blogs' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white shadow-sm'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <div className="flex-1 lg:flex-none text-center lg:text-left">
            <Link href="/" className="inline-block">
              <h1 className="text-2xl font-serif">Eglanto</h1>
            </Link>
          </div>

          {/* Primary Navigation - Desktop */}
          <nav className="hidden lg:flex items-center space-x-8">
            {primaryNavItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-base hover:text-gold transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Secondary Navigation */}
          <div className="flex items-center space-x-4">
            <button aria-label="Search" className="p-2 hover:text-gold transition-colors">
              <Search size={20} />
            </button>
            <button aria-label="Wishlist" className="p-2 hover:text-gold transition-colors">
              <Heart size={20} />
            </button>
            <button aria-label="Cart" className="p-2 hover:text-gold transition-colors">
              <ShoppingBag size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            'lg:hidden fixed inset-0 bg-white z-50 transition-transform duration-300',
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          <div className="p-4">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-4 right-4"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
            <nav className="mt-16 space-y-4">
              {primaryNavItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block text-lg py-2 hover:text-gold transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 