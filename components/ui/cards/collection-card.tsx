import Image from 'next/image'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

interface CollectionCardProps {
  slug: string
  title: string
  description: string
  image: string
  itemCount: number
  className?: string
}

export default function CollectionCard({
  slug,
  title,
  description,
  image,
  itemCount,
  className
}: CollectionCardProps) {
  return (
    <Link
      href={`/collections/${slug}`}
      className={twMerge(
        'group relative flex flex-col overflow-hidden',
        'aspect-[4/5] bg-secondary',
        'transition-all duration-300 ease-in-out',
        className
      )}
    >
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
      
      <div className="relative mt-auto p-6 text-text-light">
        <h3 className="font-serif text-h3 font-medium">
          {title}
        </h3>
        <p className="mt-2 text-small opacity-90">
          {description}
        </p>
        <p className="mt-4 text-small font-medium uppercase tracking-wider">
          {itemCount} {itemCount === 1 ? 'Item' : 'Items'}
        </p>
      </div>
    </Link>
  )
}
