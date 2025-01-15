import Link from 'next/link'
import Image from 'next/image'
import { Instagram, Facebook, Twitter } from 'lucide-react'
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

export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="container mx-auto px-4 pb-12 pt-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Brand column */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block">
              <Image
                src="/images/logo.svg"
                alt="Eglanto Jewelry"
                width={120}
                height={40}
                className="h-8 w-auto"
              />
            </Link>
            <p className="mt-4 max-w-md text-small text-text-secondary">
              Discover our exquisite collection of handcrafted jewelry, where timeless elegance meets contemporary design.
            </p>
            <div className="mt-6 flex space-x-6">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-text-secondary hover:text-primary"
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
              <h3 className="text-small font-medium text-text-primary">Shop</h3>
              <ul className="mt-4 space-y-3">
                {navigation.shop.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-small text-text-secondary hover:text-primary"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-small font-medium text-text-primary">Support</h3>
              <ul className="mt-4 space-y-3">
                {navigation.support.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-small text-text-secondary hover:text-primary"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-small font-medium text-text-primary">Legal</h3>
              <ul className="mt-4 space-y-3">
                {navigation.legal.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-small text-text-secondary hover:text-primary"
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
            <h3 className="text-small font-medium text-text-primary">
              Subscribe to our newsletter
            </h3>
            <p className="mt-4 text-small text-text-secondary">
              Stay updated with our latest collections, styling tips, and exclusive offers.
            </p>
            <div className="mt-6">
              <NewsletterForm />
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 border-t border-text-secondary/10 pt-8">
          <p className="text-center text-small text-text-secondary">
            © {new Date().getFullYear()} Eglanto Jewelry. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
