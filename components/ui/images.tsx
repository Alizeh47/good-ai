import { cn } from '../../lib/utils';
import OptimizedImage from './optimized-image';

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  withBlur?: boolean;
  blurDataUrl?: string;
  onLoad?: () => void;
}

export function ProductImage({
  src,
  alt,
  className,
  priority = false,
  withBlur = true,
  blurDataUrl,
  onLoad,
}: ImageProps) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      className={cn('aspect-square rounded-lg', className)}
      priority={priority}
      withBlur={withBlur}
      blurDataUrl={blurDataUrl}
      aspectRatio={1}
      sizes="(min-width: 1280px) 400px, (min-width: 1024px) 350px, (min-width: 768px) 300px, 250px"
      onLoad={onLoad}
    />
  );
}

export function CollectionImage({
  src,
  alt,
  className,
  priority = false,
  withBlur = true,
  blurDataUrl,
  onLoad,
}: ImageProps) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      className={cn('aspect-[4/5] rounded-2xl', className)}
      priority={priority}
      withBlur={withBlur}
      blurDataUrl={blurDataUrl}
      aspectRatio={0.8}
      sizes="(min-width: 1280px) 600px, (min-width: 1024px) 500px, (min-width: 768px) 400px, 350px"
      onLoad={onLoad}
    />
  );
}

export function TestimonialImage({
  src,
  alt,
  className,
  priority = false,
  withBlur = true,
  blurDataUrl,
  onLoad,
}: ImageProps) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      className={cn('rounded-full', className)}
      priority={priority}
      withBlur={withBlur}
      blurDataUrl={blurDataUrl}
      aspectRatio={1}
      sizes="(min-width: 1280px) 192px, (min-width: 1024px) 160px, (min-width: 768px) 128px, 96px"
      onLoad={onLoad}
    />
  );
}

export function HeroImage({
  src,
  alt,
  className,
  priority = true,
  withBlur = true,
  blurDataUrl,
  onLoad,
}: ImageProps) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      className={cn('aspect-[16/9] rounded-none', className)}
      priority={priority}
      withBlur={withBlur}
      blurDataUrl={blurDataUrl}
      aspectRatio={16/9}
      sizes="100vw"
      onLoad={onLoad}
    />
  );
}

export function BannerImage({
  src,
  alt,
  className,
  priority = false,
  withBlur = true,
  blurDataUrl,
  onLoad,
}: ImageProps) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      className={cn('aspect-[21/9] rounded-lg', className)}
      priority={priority}
      withBlur={withBlur}
      blurDataUrl={blurDataUrl}
      aspectRatio={21/9}
      sizes="(min-width: 1280px) 1200px, (min-width: 1024px) 960px, (min-width: 768px) 720px, 100vw"
      onLoad={onLoad}
    />
  );
}

export function ThumbnailImage({
  src,
  alt,
  className,
  priority = false,
  withBlur = true,
  blurDataUrl,
  onLoad,
}: ImageProps) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      className={cn('aspect-square rounded-md', className)}
      priority={priority}
      withBlur={withBlur}
      blurDataUrl={blurDataUrl}
      aspectRatio={1}
      sizes="(min-width: 1280px) 120px, (min-width: 1024px) 100px, (min-width: 768px) 80px, 60px"
      onLoad={onLoad}
    />
  );
} 