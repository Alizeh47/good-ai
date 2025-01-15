import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge'
import { Menu, Search, Heart, ShoppingBag, X } from 'lucide-react'

const navigation = [
  { name: 'Collections', href: '/collections' },
  { name: 'New Arrivals', href: '/new-arrivals' },
  { name: 'Rings', href: '/collections/rings' },
  { name: 'Necklaces', href: '/collections/necklaces' },
  { name: 'Earrings', href: '/collections/earrings' },
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={twMerge(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-white shadow-sm' : 'bg-transparent'
      )}
    >
      <nav className="container mx-auto">
        <div className="relative flex h-20 items-center justify-between px-4 md:px-6">
          {/* Mobile menu button */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-text-primary hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary md:hidden"
            onClick={() => setIsMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>

          {/* Desktop navigation */}
          <div className="hidden md:flex md:gap-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-small font-medium text-text-primary hover:text-primary"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Logo */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo.svg"
                alt="Eglanto Jewelry"
                width={120}
                height={40}
                className="h-10 w-auto md:h-12"
              />
            </Link>
          </div>

          {/* Right navigation */}
          <div className="flex items-center gap-x-4">
            <button
              type="button"
              className="p-2 text-text-primary hover:text-primary focus:outline-none"
              onClick={() => {/* TODO: Implement search */}}
            >
              <span className="sr-only">Search</span>
              <Search className="h-5 w-5" />
            </button>
            <Link
              href="/wishlist"
              className="p-2 text-text-primary hover:text-primary"
            >
              <span className="sr-only">Wishlist</span>
              <Heart className="h-5 w-5" />
            </Link>
            <Link
              href="/cart"
              className="p-2 text-text-primary hover:text-primary"
            >
              <span className="sr-only">Cart</span>
              <ShoppingBag className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={twMerge(
          'fixed inset-0 z-50 transform bg-white transition-transform duration-300 ease-in-out md:hidden',
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-20 items-center justify-between px-4">
          <Image
            src="/images/logo.svg"
            alt="Eglanto Jewelry"
            width={100}
            height={32}
            className="h-8 w-auto"
          />
          <button
            type="button"
            className="rounded-md p-2 text-text-primary hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="sr-only">Close menu</span>
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-6 flow-root px-4">
          <div className="space-y-6 py-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-body font-medium text-text-primary hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}
