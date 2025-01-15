import Image from 'next/image'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

interface ProductCardProps {
  id: string
  name: string
  price: number
  image: string
  category: string
  className?: string
}

export default function ProductCard({
  id,
  name,
  price,
  image,
  category,
  className
}: ProductCardProps) {
  return (
    <Link 
      href={`/product/${id}`}
      className={twMerge(
        'group relative flex flex-col overflow-hidden bg-white',
        'transition-all duration-300 ease-in-out',
        'hover:shadow-lg',
        className
      )}
    >
      <div className="aspect-square overflow-hidden">
        <Image
          src={image}
          alt={name}
          width={400}
          height={400}
          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col space-y-1 p-4">
        <p className="text-small text-text-secondary uppercase tracking-wider">
          {category}
        </p>
        <h3 className="font-serif text-lg font-medium text-text-primary">
          {name}
        </h3>
        <p className="text-accent font-medium">
          ${price.toLocaleString()}
        </p>
      </div>
    </Link>
  )
}
