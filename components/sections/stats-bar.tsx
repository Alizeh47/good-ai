'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const stats = [
  { value: 12, label: 'All over World' },
  { value: 150, label: 'Product Available' },
  { value: 1000, label: 'Product Reviews' },
];

const StatCounter = ({ value, label }: { value: number; label: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl md:text-4xl font-serif mb-2">
        {count}{value >= 100 ? '+' : ''}
      </div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );
};

const StatsBar = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <StatCounter value={stat.value} label={stat.label} />
            </motion.div>
          ))}

          {/* Circular Brand Emblem */}
          <motion.div 
            className="relative w-24 h-24"
            initial={{ opacity: 0, rotate: -180 }}
            whileInView={{ opacity: 1, rotate: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 border-2 border-dark-teal rounded-full" />
            <div className="absolute inset-2 border border-gold rounded-full" />
            <div className="absolute inset-0 flex items-center justify-center">
              <ChevronDown 
                className="text-dark-teal animate-bounce" 
                size={24}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StatsBar; 