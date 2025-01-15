'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Heritage = () => {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-serif">
              Tradition Cared For Since 1970
            </h2>
            <p className="text-gray-600">
              For over five decades, we've been crafting exquisite jewelry that captures
              the essence of timeless elegance. Our commitment to quality and attention
              to detail has made us a trusted name in luxury jewelry.
            </p>
            <p className="text-gray-600">
              Each piece tells a story of artisanal excellence, passed down through
              generations of master craftsmen who pour their heart and soul into
              creating pieces that become cherished family heirlooms.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Link
                href="/about"
                className="inline-block px-8 py-3 bg-dark-teal text-white rounded-full
                         hover:bg-opacity-90 transition-colors"
              >
                Discover Our Story
              </Link>
            </motion.div>
          </motion.div>

          {/* Circular Images */}
          <div className="relative h-[500px]">
            {/* Large Circle */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                       w-[400px] h-[400px] rounded-full border-2 border-gold/20"
            >
              {/* Image Circles */}
              <motion.div
                initial={{ rotate: -180, opacity: 0 }}
                whileInView={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="absolute -top-12 left-1/2 -translate-x-1/2"
              >
                <div className="relative w-24 h-24 rounded-full overflow-hidden">
                  <Image
                    src="/images/heritage/craft-1.jpg"
                    alt="Jewelry crafting"
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ rotate: 180, opacity: 0 }}
                whileInView={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="absolute top-1/2 -right-12 -translate-y-1/2"
              >
                <div className="relative w-32 h-32 rounded-full overflow-hidden">
                  <Image
                    src="/images/heritage/craft-2.jpg"
                    alt="Jewelry design"
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ rotate: -180, opacity: 0 }}
                whileInView={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="absolute -bottom-12 left-1/2 -translate-x-1/2"
              >
                <div className="relative w-24 h-24 rounded-full overflow-hidden">
                  <Image
                    src="/images/heritage/craft-3.jpg"
                    alt="Final product"
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ rotate: 180, opacity: 0 }}
                whileInView={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="absolute top-1/2 -left-12 -translate-y-1/2"
              >
                <div className="relative w-32 h-32 rounded-full overflow-hidden">
                  <Image
                    src="/images/heritage/craft-4.jpg"
                    alt="Workshop"
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>

              {/* Center Logo */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1 }}
                  className="text-2xl font-serif text-dark-teal"
                >
                  Eglanto
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Heritage; 