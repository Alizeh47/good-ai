'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';

// Mock Instagram posts - replace with actual Instagram API data
const instagramPosts = [
  {
    id: 1,
    image: '/images/instagram/post-1.jpg',
    likes: 234,
    comments: 12,
    link: 'https://instagram.com/p/1',
  },
  {
    id: 2,
    image: '/images/instagram/post-2.jpg',
    likes: 456,
    comments: 23,
    link: 'https://instagram.com/p/2',
  },
  {
    id: 3,
    image: '/images/instagram/post-3.jpg',
    likes: 789,
    comments: 45,
    link: 'https://instagram.com/p/3',
  },
  {
    id: 4,
    image: '/images/instagram/post-4.jpg',
    likes: 321,
    comments: 15,
    link: 'https://instagram.com/p/4',
  },
  {
    id: 5,
    image: '/images/instagram/post-5.jpg',
    likes: 654,
    comments: 32,
    link: 'https://instagram.com/p/5',
  },
  {
    id: 6,
    image: '/images/instagram/post-6.jpg',
    likes: 987,
    comments: 56,
    link: 'https://instagram.com/p/6',
  },
];

const InstagramPost = ({ post }: { post: typeof instagramPosts[0] }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="group relative aspect-square rounded-lg overflow-hidden shadow-lg"
    >
      <Link href={post.link} target="_blank" rel="noopener noreferrer">
        <Image
          src={post.image}
          alt="Instagram post"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-dark-teal/0 group-hover:bg-dark-teal/80
                     flex items-center justify-center opacity-0 group-hover:opacity-100
                     transition-all duration-300 backdrop-blur-sm">
          <div className="text-white text-center transform scale-90 group-hover:scale-100 transition-transform duration-300">
            <div className="flex items-center gap-4 mb-3">
              <span className="flex items-center gap-1 text-lg">❤️ {post.likes}</span>
              <span className="flex items-center gap-1 text-lg">💬 {post.comments}</span>
            </div>
            <Instagram size={28} className="mx-auto text-gold" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const InstagramFeed = () => {
  return (
    <section className="py-24 bg-warm-cream">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif mb-6 text-dark-teal tracking-wide">
            Follow Our Journey
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto text-lg font-light leading-relaxed">
            Join our community and discover the latest collections, behind-the-scenes moments,
            and styling inspiration on Instagram.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 px-4">
          {instagramPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <InstagramPost post={post} />
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-16"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            href="https://instagram.com/eglanto"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-4 bg-dark-teal text-white
                     rounded-full hover:bg-opacity-90 transition-colors shadow-lg
                     text-lg font-medium tracking-wide hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
          >
            <Instagram size={24} className="text-gold" />
            Follow @eglanto
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default InstagramFeed; 