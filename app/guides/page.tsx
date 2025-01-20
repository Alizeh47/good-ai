import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Size Guide & Jewelry Care | Luxury Jewelry Store',
  description: 'Learn how to find your perfect jewelry size and keep your pieces looking beautiful with our comprehensive care guide.',
};

export default function GuidesPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="relative h-[300px] mb-12 rounded-lg overflow-hidden">
        <Image
          src="/images/jewelry-5.jpg"
          alt="Jewelry Care"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-serif text-white text-center">
            Size Guide & Care Instructions
          </h1>
        </div>
      </div>

      {/* Size Guide Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-serif mb-8 text-center">Size Guide</h2>
        
        {/* Ring Size Guide */}
        <div className="bg-neutral-50 p-8 rounded-lg mb-8">
          <h3 className="text-2xl font-serif mb-4">Ring Size Guide</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-semibold mb-3">How to Measure</h4>
              <ul className="space-y-3 text-gray-600">
                <li>1. Wrap a piece of string or paper around your finger</li>
                <li>2. Mark where the string or paper overlaps</li>
                <li>3. Measure the length in millimeters</li>
                <li>4. Compare with our size chart below</li>
              </ul>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2">US Size</th>
                    <th className="p-2">UK Size</th>
                    <th className="p-2">EU Size</th>
                    <th className="p-2">Circumference (mm)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="p-2">4</td><td className="p-2">H</td><td className="p-2">47</td><td className="p-2">47.0</td></tr>
                  <tr><td className="p-2">5</td><td className="p-2">J</td><td className="p-2">49</td><td className="p-2">49.3</td></tr>
                  <tr><td className="p-2">6</td><td className="p-2">L</td><td className="p-2">51</td><td className="p-2">51.5</td></tr>
                  <tr><td className="p-2">7</td><td className="p-2">N</td><td className="p-2">54</td><td className="p-2">53.8</td></tr>
                  <tr><td className="p-2">8</td><td className="p-2">P</td><td className="p-2">57</td><td className="p-2">56.0</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Necklace & Bracelet Size Guide */}
        <div className="bg-neutral-50 p-8 rounded-lg">
          <h3 className="text-2xl font-serif mb-4">Necklace & Bracelet Lengths</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-semibold mb-3">Necklace Lengths</h4>
              <ul className="space-y-2 text-gray-600">
                <li>Choker: 14-16 inches</li>
                <li>Princess: 17-19 inches</li>
                <li>Matinee: 20-24 inches</li>
                <li>Opera: 28-36 inches</li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3">Bracelet Sizes</h4>
              <ul className="space-y-2 text-gray-600">
                <li>Small: 6.5-7 inches</li>
                <li>Medium: 7-7.5 inches</li>
                <li>Large: 7.5-8 inches</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Care Guide Section */}
      <section>
        <h2 className="text-3xl font-serif mb-8 text-center">Jewelry Care Guide</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Daily Care */}
          <div className="bg-neutral-50 p-8 rounded-lg">
            <h3 className="text-2xl font-serif mb-4">Daily Care</h3>
            <ul className="space-y-4 text-gray-600">
              <li>• Remove jewelry before swimming, showering, or exercising</li>
              <li>• Apply perfume and cosmetics before putting on jewelry</li>
              <li>• Store pieces separately to prevent scratching</li>
              <li>• Clean regularly with a soft polishing cloth</li>
            </ul>
          </div>

          {/* Storage Tips */}
          <div className="bg-neutral-50 p-8 rounded-lg">
            <h3 className="text-2xl font-serif mb-4">Storage Tips</h3>
            <ul className="space-y-4 text-gray-600">
              <li>• Keep jewelry in a cool, dry place</li>
              <li>• Use individual soft pouches or compartments</li>
              <li>• Store silver pieces in anti-tarnish bags</li>
              <li>• Keep diamonds and gemstones wrapped separately</li>
            </ul>
          </div>

          {/* Cleaning Instructions */}
          <div className="bg-neutral-50 p-8 rounded-lg">
            <h3 className="text-2xl font-serif mb-4">Cleaning Instructions</h3>
            <ul className="space-y-4 text-gray-600">
              <li>• Use warm water and mild soap for basic cleaning</li>
              <li>• Gently brush with a soft toothbrush if needed</li>
              <li>• Rinse thoroughly and pat dry with a soft cloth</li>
              <li>• For professional cleaning, visit us every 6-12 months</li>
            </ul>
          </div>

          {/* Professional Care */}
          <div className="bg-neutral-50 p-8 rounded-lg">
            <h3 className="text-2xl font-serif mb-4">Professional Care</h3>
            <ul className="space-y-4 text-gray-600">
              <li>• Have settings checked annually</li>
              <li>• Professional cleaning every 6-12 months</li>
              <li>• Immediate repair of any loose stones or clasps</li>
              <li>• Regular replating for gold-plated pieces</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="mt-12 text-center">
        <p className="text-gray-600 mb-6">
          Need additional assistance with sizing or care? Our jewelry experts are here to help.
        </p>
        <Link href="/contact" className="inline-block bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition">
          Contact Our Experts
        </Link>
      </section>
    </main>
  );
} 