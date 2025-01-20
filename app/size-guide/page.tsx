import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Size Guide | Luxury Jewelry Store',
  description: 'Find your perfect jewelry fit with our comprehensive size guide for rings, necklaces, and bracelets.',
};

export default function SizeGuidePage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="relative h-[400px] mb-16 rounded-lg overflow-hidden">
        <Image
          src="/images/jewelry-1.jpg"
          alt="Jewelry Sizing"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-serif text-white text-center">
            Jewelry Size Guide
          </h1>
        </div>
      </div>

      {/* Introduction */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <p className="text-lg text-gray-600">
          Finding the perfect fit is essential for both comfort and style. Use our comprehensive size guide to determine your ideal measurements for rings, necklaces, and bracelets.
        </p>
      </div>

      {/* Ring Size Guide */}
      <section className="mb-16">
        <h2 className="text-3xl font-serif mb-8 text-center">Ring Size Guide</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-neutral-50 p-8 rounded-lg">
            <h3 className="text-2xl font-serif mb-6">How to Measure Your Ring Size</h3>
            <div className="space-y-6">
              <div className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center mr-4">1</span>
                <p className="text-gray-600">Wrap a piece of string or paper around your finger where you'd wear the ring</p>
              </div>
              <div className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center mr-4">2</span>
                <p className="text-gray-600">Mark where the string or paper overlaps to complete the circle</p>
              </div>
              <div className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center mr-4">3</span>
                <p className="text-gray-600">Measure the length in millimeters</p>
              </div>
              <div className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center mr-4">4</span>
                <p className="text-gray-600">Use our size chart to find your ring size</p>
              </div>
            </div>
          </div>
          <div className="bg-neutral-50 p-8 rounded-lg">
            <h3 className="text-2xl font-serif mb-6">Ring Size Chart</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 text-left">US Size</th>
                    <th className="p-3 text-left">UK Size</th>
                    <th className="p-3 text-left">EU Size</th>
                    <th className="p-3 text-left">Circumference (mm)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr><td className="p-3">4</td><td className="p-3">H</td><td className="p-3">47</td><td className="p-3">47.0</td></tr>
                  <tr><td className="p-3">5</td><td className="p-3">J</td><td className="p-3">49</td><td className="p-3">49.3</td></tr>
                  <tr><td className="p-3">6</td><td className="p-3">L</td><td className="p-3">51</td><td className="p-3">51.5</td></tr>
                  <tr><td className="p-3">7</td><td className="p-3">N</td><td className="p-3">54</td><td className="p-3">53.8</td></tr>
                  <tr><td className="p-3">8</td><td className="p-3">P</td><td className="p-3">57</td><td className="p-3">56.0</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Necklace Length Guide */}
      <section className="mb-16">
        <h2 className="text-3xl font-serif mb-8 text-center">Necklace Length Guide</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-neutral-50 p-8 rounded-lg">
            <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
              <Image
                src="/images/jewelry-5.jpg"
                alt="Necklace Lengths"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-2xl font-serif mb-4">Standard Lengths</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex justify-between items-center">
                <span>Choker</span>
                <span className="font-medium">14-16 inches</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Princess</span>
                <span className="font-medium">17-19 inches</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Matinee</span>
                <span className="font-medium">20-24 inches</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Opera</span>
                <span className="font-medium">28-36 inches</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Rope</span>
                <span className="font-medium">36+ inches</span>
              </li>
            </ul>
          </div>
          <div className="bg-neutral-50 p-8 rounded-lg">
            <h3 className="text-2xl font-serif mb-6">How to Choose the Right Length</h3>
            <div className="space-y-4 text-gray-600">
              <p>Consider these factors when choosing your necklace length:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Your neck size</li>
                <li>Face shape</li>
                <li>Body type</li>
                <li>Neckline of your clothing</li>
                <li>Style of the pendant</li>
              </ul>
              <p className="mt-4">
                For the most accurate measurement, use a soft measuring tape around your neck at the desired position.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bracelet Size Guide */}
      <section className="mb-16">
        <h2 className="text-3xl font-serif mb-8 text-center">Bracelet Size Guide</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-neutral-50 p-8 rounded-lg">
            <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
              <Image
                src="/images/jewelry-6.jpg"
                alt="Bracelet Sizing"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-2xl font-serif mb-4">Standard Sizes</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex justify-between items-center">
                <span>Extra Small</span>
                <span className="font-medium">6.0-6.5 inches</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Small</span>
                <span className="font-medium">6.5-7.0 inches</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Medium</span>
                <span className="font-medium">7.0-7.5 inches</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Large</span>
                <span className="font-medium">7.5-8.0 inches</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Extra Large</span>
                <span className="font-medium">8.0-8.5 inches</span>
              </li>
            </ul>
          </div>
          <div className="bg-neutral-50 p-8 rounded-lg">
            <h3 className="text-2xl font-serif mb-6">How to Measure</h3>
            <div className="space-y-4 text-gray-600">
              <p>To find your perfect bracelet size:</p>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Wrap a measuring tape around your wrist where you'd wear the bracelet</li>
                <li>Add 0.5-1 inch to your wrist measurement for comfort</li>
                <li>Consider the bracelet style - chains need less room than bangles</li>
                <li>Account for any charms or embellishments</li>
              </ol>
              <p className="mt-4 text-sm">
                Note: For bangles, you'll need to measure the widest part of your hand when your thumb is tucked in.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-neutral-50 p-8 rounded-lg text-center">
        <h2 className="text-3xl font-serif mb-4">Need Help Finding Your Size?</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Our jewelry experts are here to help you find the perfect fit.
          Visit our store for a professional sizing or contact us for assistance.
        </p>
        <Link href="/contact" className="inline-block bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition">
          Contact Our Experts
        </Link>
      </section>
    </main>
  );
} 