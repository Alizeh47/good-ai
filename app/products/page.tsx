import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Our Collection | Luxury Jewelry Store',
  description: 'Explore our exquisite collection of fine jewelry, from stunning rings to elegant necklaces and bracelets.',
};

// Mock product data - in a real app, this would come from an API or database
const products = [
  {
    id: 1,
    name: 'Diamond Solitaire Ring',
    category: 'Rings',
    price: 2999,
    image: '/images/jewelry-1.jpg',
    slug: 'diamond-solitaire-ring',
  },
  {
    id: 2,
    name: 'Pearl Strand Necklace',
    category: 'Necklaces',
    price: 1299,
    image: '/images/jewelry-5.jpg',
    slug: 'pearl-strand-necklace',
  },
  {
    id: 3,
    name: 'Sapphire Drop Earrings',
    category: 'Earrings',
    price: 1599,
    image: '/images/jewelry-2.jpg',
    slug: 'sapphire-drop-earrings',
  },
  // Add more products as needed
];

const categories = ['All', 'Rings', 'Necklaces', 'Earrings', 'Bracelets'];
const sortOptions = ['Newest', 'Price: Low to High', 'Price: High to Low'];

export default function ProductsPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="relative h-[300px] mb-12 rounded-lg overflow-hidden">
        <Image
          src="/images/collection-necklaces.jpg"
          alt="Jewelry Collection"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-serif text-white text-center">
            Our Collection
          </h1>
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              className="px-4 py-2 rounded-full bg-neutral-100 hover:bg-neutral-200 transition"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <select className="px-4 py-2 rounded-lg border border-gray-200 bg-white">
          {sortOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <Link href={`/product/${product.slug}`} key={product.id}>
            <div className="group">
              <div className="relative aspect-square mb-4 rounded-lg overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
              <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
              <p className="text-gray-600 mb-2">{product.category}</p>
              <p className="text-lg font-serif">${product.price.toLocaleString()}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Load More Button */}
      <div className="mt-12 text-center">
        <button className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition">
          Load More
        </button>
      </div>

      {/* Newsletter Section */}
      <section className="mt-20 bg-neutral-50 p-12 rounded-lg text-center">
        <h2 className="text-3xl font-serif mb-4">Stay Updated</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Subscribe to our newsletter to receive updates about new collections, special offers, and styling tips.
        </p>
        <div className="flex max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-l-lg border border-r-0 border-gray-200 focus:outline-none focus:ring-1 focus:ring-black"
          />
          <button className="bg-black text-white px-6 py-3 rounded-r-lg hover:bg-gray-800 transition">
            Subscribe
          </button>
        </div>
      </section>
    </main>
  );
} 