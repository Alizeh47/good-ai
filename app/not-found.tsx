"use client"

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="text-center space-y-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-8xl font-serif text-dark-teal"
        >
          404
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-medium">Page Not Found</h2>
          <p className="text-gray-600 max-w-md mx-auto">
            The page you are looking for might have been removed, had its name changed,
            or is temporarily unavailable.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center gap-4"
        >
          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-3 bg-dark-teal text-white rounded-full hover:bg-opacity-90 transition-colors"
          >
            <Home size={20} />
            Back to Home
          </Link>
          <Link
            href="/search"
            className="flex items-center gap-2 px-6 py-3 border border-dark-teal text-dark-teal rounded-full hover:bg-dark-teal hover:text-white transition-colors"
          >
            <Search size={20} />
            Search Products
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
