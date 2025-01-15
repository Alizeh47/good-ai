import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Play } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

interface HeroImage {
  src: string
  alt: string
}

const images: HeroImage[] = [
  {
    src: '/images/hero/hero-1.jpg',
    alt: 'Elegant diamond ring on display',
  },
  {
    src: '/images/hero/hero-2.jpg',
    alt: 'Model wearing gold necklace',
  },
  {
    src: '/images/hero/hero-3.jpg',
    alt: 'Collection of luxury bracelets',
  },
]

export default function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length)
  }

  // Auto-advance images every 5 seconds
  useEffect(() => {
    const timer = setInterval(nextImage, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative min-h-screen bg-secondary">
      <div className="container mx-auto">
        <div className="grid min-h-screen grid-cols-1 items-center gap-8 lg:grid-cols-2">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="z-10 px-4 py-12 sm:px-6 lg:px-8"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-4 inline-block text-small font-medium uppercase tracking-wider text-accent"
            >
              New Collection 2024
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-h1 font-serif font-medium text-text-primary"
            >
              Desire Meets
              <br />
              <span className="text-primary">New Style</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-6 max-w-md text-text-secondary"
            >
              Discover our latest collection of handcrafted jewelry, where timeless elegance meets contemporary design.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-8 flex items-center gap-4"
            >
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-small font-medium text-text-light transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Explore Collection
              </button>
              <button
                type="button"
                onClick={() => setIsVideoModalOpen(true)}
                className="inline-flex items-center gap-2 text-small font-medium text-text-primary hover:text-primary"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md">
                  <Play className="h-4 w-4" />
                </span>
                Watch Video
              </button>
            </motion.div>
          </motion.div>

          {/* Image gallery */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative h-full min-h-[500px] w-full"
          >
            <div className="absolute inset-0 overflow-hidden">
              {images.map((image, index) => (
                <motion.div
                  key={image.src}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: currentImage === index ? 1 : 0,
                    scale: currentImage === index ? 1 : 1.1,
                  }}
                  transition={{ duration: 0.6 }}
                  className={twMerge(
                    'absolute inset-0',
                    currentImage === index ? 'z-10' : 'z-0'
                  )}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover object-center"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-secondary/50 to-transparent" />
                </motion.div>
              ))}
            </div>

            {/* Image navigation dots */}
            <div className="absolute bottom-8 right-8 z-20 flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  className={twMerge(
                    'h-2 w-2 rounded-full transition-all',
                    currentImage === index
                      ? 'bg-primary'
                      : 'bg-text-secondary/30 hover:bg-text-secondary/50'
                  )}
                  onClick={() => setCurrentImage(index)}
                >
                  <span className="sr-only">View image {index + 1}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Custom cursor */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-50 h-8 w-8 rounded-full bg-primary mix-blend-difference"
        animate={{
          x: -16,
          y: -16,
          scale: 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
        }}
      />

      {/* Video modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="relative aspect-video w-full max-w-4xl">
            <button
              type="button"
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute -right-8 -top-8 text-white hover:text-accent"
            >
              <span className="sr-only">Close video</span>
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <iframe
              src="https://www.youtube.com/embed/your-video-id"
              title="Product Video"
              className="h-full w-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  )
}
