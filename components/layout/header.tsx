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
    { label: 'Contact', href: '/contact' },
    { label: 'FAQ', href: '/faq' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/95 backdrop-blur-sm shadow-sm'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-24">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 hover:bg-white/10 rounded-full transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <div className="absolute left-1/2 -translate-x-1/2 lg:static lg:transform-none">
            <Link href="/" className="inline-block">
              <h1 className="text-3xl font-serif tracking-wide">Eglanto</h1>
            </Link>
          </div>

          {/* Primary Navigation - Desktop */}
          <nav className="hidden lg:flex items-center space-x-8 ml-12">
            {primaryNavItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-base font-medium tracking-wide hover:text-gold transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Secondary Navigation */}
          <div className="flex items-center space-x-6">
            <button 
              aria-label="Search" 
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <Search size={20} strokeWidth={1.5} />
            </button>
            <button 
              aria-label="Wishlist" 
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <Heart size={20} strokeWidth={1.5} />
            </button>
            <button 
              aria-label="Cart" 
              className="p-2 hover:bg-white/10 rounded-full transition-colors relative"
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-gold text-white text-xs rounded-full flex items-center justify-center">
                0
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            'lg:hidden fixed inset-0 bg-dark-teal text-white z-50 transition-transform duration-500 ease-in-out',
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          <div className="p-6">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
            
            {/* Mobile Logo */}
            <div className="mt-8 mb-12 text-center">
              <h1 className="text-3xl font-serif tracking-wide">Eglanto</h1>
            </div>
            
            <nav className="space-y-6">
              {primaryNavItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block text-lg font-medium tracking-wide py-2 hover:text-gold transition-colors text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Mobile Secondary Navigation */}
            <div className="absolute bottom-12 left-0 right-0">
              <div className="flex justify-center space-x-8">
                <button 
                  aria-label="Search" 
                  className="p-3 hover:bg-white/10 rounded-full transition-colors"
                >
                  <Search size={24} strokeWidth={1.5} />
                </button>
                <button 
                  aria-label="Wishlist" 
                  className="p-3 hover:bg-white/10 rounded-full transition-colors"
                >
                  <Heart size={24} strokeWidth={1.5} />
                </button>
                <button 
                  aria-label="Cart" 
                  className="p-3 hover:bg-white/10 rounded-full transition-colors relative"
                >
                  <ShoppingBag size={24} strokeWidth={1.5} />
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-gold text-white text-xs rounded-full flex items-center justify-center">
                    0
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 