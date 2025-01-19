import Link from 'next/link'
import { Instagram, Facebook, Twitter, MapPin, Phone, Mail } from 'lucide-react'
import NewsletterForm from '../../ui/forms/newsletter-form'

const navigation = {
  shop: [
    { name: 'Collections', href: '/collections' },
    { name: 'New Arrivals', href: '/new-arrivals' },
    { name: 'Best Sellers', href: '/best-sellers' },
    { name: 'Our Story', href: '/about' },
  ],
  support: [
    { name: 'Contact Us', href: '/contact' },
    { name: 'FAQs', href: '/faqs' },
    { name: 'Shipping & Returns', href: '/shipping' },
    { name: 'Size Guide', href: '/size-guide' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ],
}

const socialLinks = [
  {
    name: 'Instagram',
    href: 'https://instagram.com',
    icon: Instagram,
  },
  {
    name: 'Facebook',
    href: 'https://facebook.com',
    icon: Facebook,
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com',
    icon: Twitter,
  },
]

const contactInfo = [
  {
    icon: MapPin,
    text: '123 Jewelry Lane, Luxury District, NY 10001',
  },
  {
    icon: Phone,
    text: '+1 (555) 123-4567',
  },
  {
    icon: Mail,
    text: 'contact@eglanto.com',
  },
]

export default function Footer() {
  return (
    <footer className="bg-dark-teal text-white">
      <div className="container mx-auto px-6 pb-12 pt-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Brand column */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block">
              <h2 className="text-3xl font-serif tracking-wide">Eglanto</h2>
            </Link>
            <p className="mt-6 text-base text-gray-300 leading-relaxed max-w-md">
              Discover our exquisite collection of handcrafted jewelry, where timeless elegance meets contemporary design.
            </p>
            <div className="mt-8 space-y-4">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-center space-x-3 text-gray-300">
                  <item.icon size={20} className="text-gold" />
                  <span className="text-sm">{item.text}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 flex space-x-6">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-gold transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-4 lg:ml-auto">
            <div>
              <h3 className="text-lg font-serif mb-6">Shop</h3>
              <ul className="space-y-4">
                {navigation.shop.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-gray-300 hover:text-gold transition-colors text-sm"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-serif mb-6">Support</h3>
              <ul className="space-y-4">
                {navigation.support.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-gray-300 hover:text-gold transition-colors text-sm"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-serif mb-6">Legal</h3>
              <ul className="space-y-4">
                {navigation.legal.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-gray-300 hover:text-gold transition-colors text-sm"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter column */}
          <div className="lg:col-span-4">
            <h3 className="text-lg font-serif mb-4">
              Subscribe to our newsletter
            </h3>
            <p className="text-sm text-gray-300 mb-6">
              Stay updated with our latest collections, styling tips, and exclusive offers.
            </p>
            <div className="bg-white/5 p-6 rounded-lg backdrop-blur-sm">
              <NewsletterForm />
              <p className="mt-4 text-xs text-gray-400">
                By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <p className="text-center text-sm text-gray-400">
            © {new Date().getFullYear()} Eglanto Jewelry. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
