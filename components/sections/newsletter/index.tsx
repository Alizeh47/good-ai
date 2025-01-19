"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { useAnalytics } from '../../ui/common/analytics';

export default function NewsletterSection() {
  const { trackEvent } = useAnalytics();
  const [email, setEmail] = React.useState('');
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    setMessage('');

    try {
      // TODO: Implement newsletter subscription API call
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      
      setStatus('success');
      setMessage('Thank you for subscribing to our newsletter!');
      setEmail('');
      
      trackEvent('newsletter_subscribe', { email });
    } catch (error) {
      setStatus('error');
      setMessage('An error occurred. Please try again later.');
      
      trackEvent('newsletter_error', { 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
    }
  };

  return (
    <section className="py-20 bg-dark-teal text-white">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-serif mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-white/80">
              Stay updated with our latest collections, styling tips, and exclusive offers.
            </p>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="relative max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm
                       border border-white/20 text-white placeholder:text-white/60
                       focus:outline-none focus:ring-2 focus:ring-white/30"
              disabled={status === 'loading'}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={status === 'loading'}
              className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2
                       bg-gold text-dark-teal rounded-full font-medium
                       disabled:opacity-50 disabled:cursor-not-allowed
                       hover:bg-gold/90 transition-colors"
            >
              {status === 'loading' ? (
                <div className="w-6 h-6 border-2 border-dark-teal border-t-transparent rounded-full animate-spin" />
              ) : (
                <Send size={20} />
              )}
            </motion.button>
          </motion.form>

          {/* Status Message */}
          {message && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`mt-4 text-sm ${
                status === 'success' ? 'text-green-300' : 'text-red-300'
              }`}
            >
              {message}
            </motion.p>
          )}

          {/* Privacy Notice */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-6 text-sm text-white/60"
          >
            By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
