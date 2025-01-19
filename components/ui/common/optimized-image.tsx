import { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';
import { motion, useInView } from 'framer-motion';
import { cn } from '../../../lib/utils';

interface OptimizedImageProps extends Omit<ImageProps, 'src'> {
  src: string;
  lowResSrc?: string;
  aspectRatio?: number;
  preload?: boolean;
  withBlur?: boolean;
  containerClassName?: string;
}

export default function OptimizedImage({
  src,
  lowResSrc,
  alt,
  width,
  height,
  aspectRatio = 1,
  preload = false,
  withBlur = true,
  containerClassName,
  className,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [blurDataURL, setBlurDataURL] = useState<string>();
  
  // Generate blur data URL for progressive loading
  useEffect(() => {
    if (withBlur && !props.blurDataURL) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = 40;
      canvas.height = 40;
      
      if (ctx) {
        ctx.filter = 'blur(8px)';
        const img = new window.Image();
        img.src = lowResSrc || src;
        img.onload = () => {
          ctx.drawImage(img, 0, 0, 40, 40);
          setBlurDataURL(canvas.toDataURL());
        };
      }
    }
  }, [src, lowResSrc, withBlur, props.blurDataURL]);

  // Determine sizes based on breakpoints
  const sizes = props.sizes || '(min-width: 1280px) 1200px, (min-width: 1024px) 960px, (min-width: 768px) 720px, 100vw';

  return (
    <div
      className={cn(
        'relative overflow-hidden',
        containerClassName
      )}
      style={{ aspectRatio: String(aspectRatio) }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="relative w-full h-full"
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          quality={90}
          priority={preload}
          loading={preload ? 'eager' : 'lazy'}
          blurDataURL={blurDataURL || props.blurDataURL}
          placeholder={withBlur ? 'blur' : 'empty'}
          className={cn(
            'object-cover transition-opacity duration-300',
            isLoaded ? 'opacity-100' : 'opacity-0',
            className
          )}
          onLoadingComplete={() => setIsLoaded(true)}
          {...props}
        />
      </motion.div>

      {/* Low-res placeholder */}
      {lowResSrc && !isLoaded && (
        <div className="absolute inset-0">
          <Image
            src={lowResSrc}
            alt={alt}
            fill
            className="object-cover blur-sm scale-105"
            priority
          />
        </div>
      )}
    </div>
  );
} 