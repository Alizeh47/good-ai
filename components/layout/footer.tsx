'use client';

import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter subscription logic
  };

  return (
    <footer className="bg-dark-teal text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <h2 className="text-2xl font-serif">Eglanto</h2>
            </Link>
            <p className="text-black-300">
              Crafting timeless elegance since 1970. Each piece tells a unique story of luxury and tradition.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="hover:text-gold transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={30} />
              </a>
              <a
                href="#"
                className="hover:text-gold transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="hover:text-gold transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* About Column */}
          <div>
            <h3 className="text-lg font-serif font-semibold mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/discover" className="text-gray-300 hover:text-gold transition-colors">
                  Discover
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="text-gray-300 hover:text-gold transition-colors">
                  Jewelry Journal
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-gold transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-gold transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h3 className="text-lg font-serif font-semibold mb-4">Help</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-gold transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-300 hover:text-gold transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="text-gray-300 hover:text-gold transition-colors">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link href="/care-guide" className="text-gray-300 hover:text-gold transition-colors">
                  Care Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-black-300 mb-4">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md focus:outline-none focus:border-gold text-white placeholder-gray-400"
                required
              />
              <button
                type="submit"
                className="w-full bg-gold hover:bg-gold/90 text-white py-2 px-4 rounded-md transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-black-300 text-sm">
              © {new Date().getFullYear()} Eglanto. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-black-300 hover:text-gold transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-black-300 hover:text-gold transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 