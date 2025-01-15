import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

interface Collection {
  id: string
  title: string
  category: string
  image: string
  width: number
  height: number
}

const categories = [
  { id: 'all', name: 'All Collections' },
  { id: 'rings', name: 'Rings' },
  { id: 'necklaces', name: 'Necklaces' },
  { id: 'earrings', name: 'Earrings' },
  { id: 'bracelets', name: 'Bracelets' },
]

const collections: Collection[] = [
  {
    id: '1',
    title: 'Diamond Engagement Rings',
    category: 'rings',
    image: '/images/collections/rings-1.jpg',
    width: 2,
    height: 3,
  },
  {
    id: '2',
    title: 'Gold Necklaces',
    category: 'necklaces',
    image: '/images/collections/necklaces-1.jpg',
    width: 1,
    height: 1,
  },
  // Add more collections here
]

export default function CollectionsGrid() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [filteredCollections, setFilteredCollections] = useState(collections)

  useEffect(() => {
    const filtered = selectedCategory === 'all'
      ? collections
      : collections.filter(item => item.category === selectedCategory)
    setFilteredCollections(filtered)
  }, [selectedCategory])

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center">
          <h2 className="text-h2 font-serif font-medium text-text-primary">
            Our Collections
          </h2>
          <p className="mt-4 text-text-secondary">
            Explore our curated collections of fine jewelry
          </p>
        </div>

        {/* Category filters */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setSelectedCategory(category.id)}
              className={twMerge(
                'rounded-full px-6 py-2 text-small font-medium transition-all',
                selectedCategory === category.id
                  ? 'bg-primary text-text-light'
                  : 'bg-secondary text-text-primary hover:bg-primary/10'
              )}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Masonry grid */}
        <motion.div
          layout
          className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence>
            {filteredCollections.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className={twMerge(
                  'group relative overflow-hidden rounded-lg',
                  item.width === 2 ? 'lg:col-span-2' : '',
                  item.height === 2 ? 'row-span-2' : ''
                )}
              >
                <div className={`relative aspect-[${item.width}/${item.height}]`}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="text-h3 font-serif font-medium text-white">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
