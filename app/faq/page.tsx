'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'What makes Eglanto jewelry unique?',
    answer: 'Each piece of Eglanto jewelry is crafted with meticulous attention to detail, using only the finest materials. Our designs blend timeless elegance with contemporary style, making each piece uniquely special.',
  },
  {
    question: 'How do I care for my jewelry?',
    answer: 'We recommend storing your jewelry in a cool, dry place and cleaning it regularly with a soft cloth. Avoid exposure to harsh chemicals and remove jewelry before swimming or bathing.',
  },
  {
    question: 'What is your return policy?',
    answer: 'We offer a 30-day return policy for all unworn items in their original condition with tags attached. Custom pieces are non-returnable.',
  },
  {
    question: 'Do you offer international shipping?',
    answer: 'Yes, we ship worldwide. Shipping costs and delivery times vary by location. All international orders are fully insured and tracked.',
  },
  {
    question: 'How can I determine my ring size?',
    answer: 'We offer a complimentary ring sizing guide on our website. You can also visit our stores for professional sizing, or contact our customer service for assistance.',
  },
  {
    question: 'Do you offer jewelry repair services?',
    answer: 'Yes, we provide professional jewelry repair and maintenance services. Please contact us for a consultation and quote.',
  },
  {
    question: 'Are your diamonds ethically sourced?',
    answer: 'Yes, all our diamonds are ethically sourced and conflict-free, certified by the Kimberley Process Certification Scheme.',
  },
  {
    question: 'Do you offer custom designs?',
    answer: 'Yes, we offer custom design services. Our experienced designers will work with you to create your perfect piece of jewelry.',
  },
];

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="border-b border-gray-200 last:border-0"
    >
      <button
        className="w-full py-6 flex justify-between items-center text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-medium text-gray-900">{question}</span>
        <ChevronDown
          className={`text-dark-teal transition-transform duration-300 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-gray-600 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function FAQPage() {
  return (
    <main className="pt-32 pb-24 bg-warm-cream min-h-screen">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-serif mb-6 text-dark-teal">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Find answers to common questions about our jewelry, services, and policies.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8"
        >
          <div className="divide-y divide-gray-200">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
} 