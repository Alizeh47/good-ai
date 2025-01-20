import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Shipping & Returns | Luxury Jewelry Store',
  description: 'Learn about our shipping policies and hassle-free returns process for all jewelry purchases.',
};

export default function ShippingPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="relative h-[300px] mb-12 rounded-lg overflow-hidden">
        <Image
          src="/images/jewelry-1.jpg"
          alt="Luxury Jewelry Packaging"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-serif text-white text-center">
            Shipping & Returns
          </h1>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid md:grid-cols-2 gap-12">
        {/* Shipping Information */}
        <section>
          <h2 className="text-3xl font-serif mb-6">Shipping Information</h2>
          <div className="space-y-6">
            <div className="bg-neutral-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Free Standard Shipping</h3>
              <p className="text-gray-600">
                Enjoy complimentary standard shipping on all orders over $500. Standard shipping typically takes 3-5 business days.
              </p>
            </div>
            <div className="bg-neutral-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Express Shipping</h3>
              <p className="text-gray-600">
                Need it faster? Express shipping (1-2 business days) is available for $25, or free on orders over $1000.
              </p>
            </div>
            <div className="bg-neutral-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">International Shipping</h3>
              <p className="text-gray-600">
                We ship worldwide. International shipping rates and delivery times vary by location. All import duties and taxes are the responsibility of the customer.
              </p>
            </div>
          </div>
        </section>

        {/* Returns Policy */}
        <section>
          <h2 className="text-3xl font-serif mb-6">Returns Policy</h2>
          <div className="space-y-6">
            <div className="bg-neutral-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">30-Day Returns</h3>
              <p className="text-gray-600">
                We offer a 30-day return policy on all unworn items in their original condition with all tags attached and original packaging intact.
              </p>
            </div>
            <div className="bg-neutral-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Free Returns</h3>
              <p className="text-gray-600">
                Returns are always free for customers in the United States. Simply use our prepaid return label included with your order.
              </p>
            </div>
            <div className="bg-neutral-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Exchange Process</h3>
              <p className="text-gray-600">
                Prefer a different size or style? We make exchanges easy. Contact our customer service team, and we'll guide you through the process.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Additional Information */}
      <section className="mt-12 bg-neutral-50 p-8 rounded-lg">
        <h2 className="text-3xl font-serif mb-6 text-center">Need Assistance?</h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto">
          Our dedicated customer service team is here to help with any questions about shipping or returns.
          Contact us Monday through Friday, 9am-6pm EST.
        </p>
        <div className="mt-6 text-center">
          <Link href="/contact" className="inline-block bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition">
            Contact Us
          </Link>
        </div>
      </section>
    </main>
  );
} 