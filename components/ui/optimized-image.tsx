'use client';

import { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { cn } from '../../lib/utils';

interface OptimizedImageProps extends Omit<ImageProps, 'onLoadingComplete'> {
  aspectRatio?: number;
}

export function OptimizedImage({
  src,
  alt,
  className,
  aspectRatio = 1,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      className={cn(
        'overflow-hidden bg-gray-100 dark:bg-gray-800',
        isLoading && 'animate-pulse',
        className
      )}
      style={{ aspectRatio }}
    >
      <Image
        src={src}
        alt={alt}
        className={cn(
          'transition-all duration-300',
          isLoading && 'scale-110 blur-lg',
        )}
        onLoadingComplete={() => setIsLoading(false)}
        {...props}
      />
    </div>
  );
}

export function ProductImage({
  src,
  alt,
  className,
  ...props
}: Omit<ImageProps, 'onLoadingComplete'>) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      className={cn('aspect-square rounded-lg', className)}
      width={600}
      height={600}
      quality={90}
      {...props}
    />
  );
}

export function CollectionImage({
  src,
  alt,
  className,
  ...props
}: Omit<ImageProps, 'onLoadingComplete'>) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      className={cn('aspect-[4/5] rounded-2xl', className)}
      width={800}
      height={1000}
      quality={90}
      {...props}
    />
  );
}

export function TestimonialImage({
  src,
  alt,
  className,
  ...props
}: Omit<ImageProps, 'onLoadingComplete'>) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      className={cn('rounded-full', className)}
      width={192}
      height={192}
      quality={90}
      {...props}
    />
  );
} 