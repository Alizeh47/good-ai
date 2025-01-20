import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  params: {
    slug: string;
  };
};

// This is a dynamic metadata function for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // In a real app, fetch collection data based on slug
  const collection = collections.find(c => c.slug === params.slug);
  
  return {
    title: `${collection?.name || 'Collection'} | Luxury Jewelry Store`,
    description: collection?.description || 'Explore our exquisite collection of fine jewelry.',
  };
}

// Mock collections data - in a real app, this would come from an API or database
const collections = [
  {
    slug: 'rings',
    name: 'Rings Collection',
    description: 'Discover our stunning collection of rings, from classic solitaires to modern designs.',
    image: '/images/jewelry-1.jpg',
    products: [
      {
        id: 1,
        name: 'Diamond Solitaire Ring',
        price: 2999,
        image: '/images/jewelry-1.jpg',
      },
      // Add more products...
    ],
  },
  // Add more collections...
];

export default function CollectionPage({ params }: Props) {
  // In a real app, fetch collection data based on slug
  const collection = collections.find(c => c.slug === params.slug) || collections[0];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="relative h-[300px] mb-12 rounded-lg overflow-hidden">
        <Image
          src={collection.image}
          alt={collection.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-serif text-white text-center">
            {collection.name}
          </h1>
        </div>
      </div>

      {/* Collection Description */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <p className="text-gray-600 text-lg">
          {collection.description}
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {collection.products.map((product) => (
          <Link href={`/product/${product.id}`} key={product.id}>
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
              <p className="text-lg font-serif">${product.price.toLocaleString()}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Newsletter Section */}
      <section className="mt-20 bg-neutral-50 p-12 rounded-lg text-center">
        <h2 className="text-3xl font-serif mb-4">Join Our Newsletter</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Be the first to know about new pieces in this collection and exclusive offers.
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
