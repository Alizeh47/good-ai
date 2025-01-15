'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const collections = [
  {
    title: 'Rings for Joyful Connection',
    image: '/images/collection-rings.jpg',
    slug: 'rings',
  },
  {
    title: 'Inspiration with Necklaces',
    image: '/images/collection-necklaces.jpg',
    slug: 'necklaces',
  },
  {
    title: 'Discover Amazing Earrings',
    image: '/images/collection-earrings.jpg',
    slug: 'earrings',
  },
];

const CollectionCard = ({ title, image, slug }: {
  title: string;
  image: string;
  slug: string;
}) => {
  return (
    <motion.div 
      className="group relative overflow-hidden rounded-2xl"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div className="aspect-[4/5] relative">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
      
      <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
        <h3 className="text-2xl font-serif mb-4 transform transition-transform duration-300 group-hover:-translate-y-2">
          {title}
        </h3>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link 
            href={`/collections/${slug}`}
            className="inline-block px-6 py-2 bg-white/20 backdrop-blur-sm rounded-full
                     hover:bg-white hover:text-dark-teal transition-colors"
          >
            See All
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

const CollectionShowcase = () => {
  return (
    <section className="py-20 bg-warm-cream">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-serif mb-4">
            Discover Jewellery Collection
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our carefully curated collections, each piece telling its own story of elegance and craftsmanship.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <CollectionCard {...collection} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollectionShowcase; 