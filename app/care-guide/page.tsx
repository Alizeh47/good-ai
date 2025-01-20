import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Jewelry Care Guide | Luxury Jewelry Store',
  description: 'Learn how to care for and maintain your fine jewelry to keep it looking beautiful for generations.',
};

export default function CareGuidePage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="relative h-[400px] mb-16 rounded-lg overflow-hidden">
        <Image
          src="/images/jewelry-5.jpg"
          alt="Jewelry Care"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-serif text-white text-center">
            Jewelry Care Guide
          </h1>
        </div>
      </div>

      {/* Introduction */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <p className="text-lg text-gray-600">
          Your fine jewelry is an investment meant to last a lifetime. Follow our comprehensive care guide to maintain its beauty and ensure it can be treasured for generations to come.
        </p>
      </div>

      {/* Care Guide Sections */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {/* Daily Care */}
        <div className="bg-neutral-50 p-8 rounded-lg">
          <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
            <Image
              src="/images/jewelry-1.jpg"
              alt="Daily Jewelry Care"
              fill
              className="object-cover"
            />
          </div>
          <h2 className="text-2xl font-serif mb-4">Daily Care</h2>
          <ul className="space-y-4 text-gray-600">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              Remove jewelry before swimming, showering, or exercising
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              Apply perfume, cosmetics, and lotions before putting on jewelry
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              Store pieces separately to prevent scratching
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              Clean regularly with a soft polishing cloth
            </li>
          </ul>
        </div>

        {/* Storage Tips */}
        <div className="bg-neutral-50 p-8 rounded-lg">
          <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
            <Image
              src="/images/jewelry-6.jpg"
              alt="Jewelry Storage"
              fill
              className="object-cover"
            />
          </div>
          <h2 className="text-2xl font-serif mb-4">Storage Tips</h2>
          <ul className="space-y-4 text-gray-600">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              Keep jewelry in a cool, dry place away from direct sunlight
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              Use individual soft pouches or compartments for each piece
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              Store silver pieces in anti-tarnish bags
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              Keep diamonds and gemstones wrapped separately
            </li>
          </ul>
        </div>

        {/* Cleaning Instructions */}
        <div className="bg-neutral-50 p-8 rounded-lg">
          <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
            <Image
              src="/images/collection-necklaces.jpg"
              alt="Jewelry Cleaning"
              fill
              className="object-cover"
            />
          </div>
          <h2 className="text-2xl font-serif mb-4">Cleaning Instructions</h2>
          <ul className="space-y-4 text-gray-600">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              Use warm water and mild soap for basic cleaning
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              Gently brush with a soft toothbrush if needed
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              Rinse thoroughly and pat dry with a soft cloth
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              For professional cleaning, visit us every 6-12 months
            </li>
          </ul>
        </div>

        {/* Professional Care */}
        <div className="bg-neutral-50 p-8 rounded-lg">
          <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
            <Image
              src="/images/collection-earrings.jpg"
              alt="Professional Jewelry Care"
              fill
              className="object-cover"
            />
          </div>
          <h2 className="text-2xl font-serif mb-4">Professional Care</h2>
          <ul className="space-y-4 text-gray-600">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              Have settings checked annually by a professional
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              Schedule professional cleaning every 6-12 months
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              Seek immediate repair of any loose stones or clasps
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              Consider regular replating for gold-plated pieces
            </li>
          </ul>
        </div>
      </div>

      {/* Material-Specific Care */}
      <section className="mb-16">
        <h2 className="text-3xl font-serif mb-8 text-center">Material-Specific Care</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-neutral-50 p-6 rounded-lg">
            <h3 className="text-xl font-serif mb-3">Gold Jewelry</h3>
            <p className="text-gray-600">
              Clean with warm water and mild soap. Avoid harsh chemicals and chlorine. Polish with a soft cloth to maintain shine.
            </p>
          </div>
          <div className="bg-neutral-50 p-6 rounded-lg">
            <h3 className="text-xl font-serif mb-3">Silver Jewelry</h3>
            <p className="text-gray-600">
              Use a silver polishing cloth regularly. Store in anti-tarnish bags. Clean with specialized silver cleaning solutions.
            </p>
          </div>
          <div className="bg-neutral-50 p-6 rounded-lg">
            <h3 className="text-xl font-serif mb-3">Pearls & Gemstones</h3>
            <p className="text-gray-600">
              Wipe with a soft, damp cloth after wearing. Avoid ultrasonic cleaners. Store separately from other jewelry.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-neutral-50 p-8 rounded-lg text-center">
        <h2 className="text-3xl font-serif mb-4">Need Professional Care?</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Our expert jewelers are here to help maintain and restore your precious pieces.
          Schedule a professional cleaning or repair consultation today.
        </p>
        <Link href="/contact" className="inline-block bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition">
          Contact Our Experts
        </Link>
      </section>
    </main>
  );
} 