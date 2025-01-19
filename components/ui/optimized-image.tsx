'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends React.ComponentPropsWithoutRef<typeof Image> {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  quality?: number;
}

export function OptimizedImage({
  src,
  alt,
  className,
  priority = false,
  quality = 85,
  ...props
}: OptimizedImageProps) {
  return (
    <div className={cn('relative overflow-hidden', className)}>
      <Image
        src={src}
        alt={alt}
        quality={quality}
        priority={priority}
        {...props}
      />
    </div>
  );
}

export function ProductImage({
  src,
  alt,
  className,
  priority = false,
}: Omit<OptimizedImageProps, 'width' | 'height' | 'quality'>) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={1200}
      height={1200}
      className={className}
      priority={priority}
    />
  );
}

export function HeroImage({
  src,
  alt,
  className,
  priority = true,
}: Omit<OptimizedImageProps, 'width' | 'height' | 'quality'>) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={1920}
      height={1080}
      className={cn('aspect-[16/9]', className)}
      priority={priority}
    />
  );
}

export function CollectionBanner({
  src,
  alt,
  className,
  priority = false,
}: Omit<OptimizedImageProps, 'width' | 'height' | 'quality'>) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={1920}
      height={600}
      className={cn('aspect-[3.2/1]', className)}
      priority={priority}
    />
  );
}

export function TeamPhoto({
  src,
  alt,
  className,
  priority = false,
}: Omit<OptimizedImageProps, 'width' | 'height' | 'quality'>) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={800}
      height={800}
      className={cn('aspect-square rounded-full', className)}
      priority={priority}
    />
  );
}

export function InstagramPost({
  src,
  alt,
  className,
  priority = false,
}: Omit<OptimizedImageProps, 'width' | 'height' | 'quality'>) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={1080}
      height={1080}
      className={cn('aspect-square', className)}
      priority={priority}
    />
  );
} 