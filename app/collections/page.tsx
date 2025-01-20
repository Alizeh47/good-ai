import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Collections | Luxury Jewelry Store',
  description: 'Explore our curated collections of fine jewelry, from timeless classics to modern masterpieces.',
};

const collections = [
  {
    id: 1,
    name: 'Timeless Elegance',
    description: 'Classic pieces that transcend trends and become cherished heirlooms.',
    image: '/images/collection-necklaces.jpg',
    itemCount: 24,
    slug: 'timeless-elegance',
  },
  {
    id: 2,
    name: 'Modern Romance',
    description: 'Contemporary designs that capture the essence of modern love stories.',
    image: '/images/collection-earrings.jpg',
    itemCount: 18,
    slug: 'modern-romance',
  },
  {
    id: 3,
    name: 'Heritage',
    description: 'Pieces inspired by our rich heritage of craftsmanship and artistry.',
    image: '/images/heritage/craft-1.jpg',
    itemCount: 15,
    slug: 'heritage',
  },
  {
    id: 4,
    name: 'Bridal Dreams',
    description: 'Exquisite engagement rings and wedding bands for your special day.',
    image: '/images/jewelry-1.jpg',
    itemCount: 30,
    slug: 'bridal-dreams',
  },
];

export default function CollectionsPage() {
  return (
    <main className="min-h-screen bg-warm-cream">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px]">
        <Image
          src="/images/jewelry-5.jpg"
          alt="Luxury Jewelry Collections"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30">
          <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
            <h1 className="text-4xl md:text-6xl font-serif text-white mb-6">
              Our Collections
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl">
              Discover our carefully curated collections, each telling its own unique story of beauty and craftsmanship.
            </p>
          </div>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {collections.map((collection) => (
            <Link
              key={collection.id}
              href={`/collections/${collection.slug}`}
              className="group block"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg mb-6">
                <Image
                  src={collection.image}
                  alt={collection.name}
                  fill
                  className="object-cover transform group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-serif text-dark-teal mb-2">
                    {collection.name}
                  </h2>
                  <p className="text-gray-600 mb-3">
                    {collection.description}
                  </p>
                  <p className="text-sm text-gold">
                    {collection.itemCount} pieces
                  </p>
                </div>
                <ArrowRight 
                  className="text-dark-teal transform translate-x-0 group-hover:translate-x-2 transition-transform" 
                  size={24} 
                />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Craftsmanship Section */}
      <section className="bg-dark-teal text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif mb-6">
                Crafted with Excellence
              </h2>
              <p className="text-white/90 mb-8">
                Each piece in our collections is meticulously crafted by master artisans, 
                combining traditional techniques with modern innovation to create jewelry 
                that stands the test of time.
              </p>
              <Link 
                href="/about"
                className="inline-flex items-center text-gold hover:text-white transition-colors"
              >
                Learn about our craft
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </div>
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <Image
                src="/images/heritage/craft-3.jpg"
                alt="Jewelry Craftsmanship"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-serif text-dark-teal mb-6">
          Need Assistance?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          Our jewelry experts are here to help you find the perfect piece from our collections.
          Schedule a consultation or visit our boutique for a personalized experience.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center bg-dark-teal text-white px-8 py-3 rounded-full
                   hover:bg-opacity-90 transition-colors"
        >
          Contact Us
          <ArrowRight className="ml-2" size={20} />
        </Link>
      </section>
    </main>
  );
} 