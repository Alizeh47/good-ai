'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  getImageDimensions,
  generateBlurDataUrl,
  getResponsiveImageProps,
  getOptimalImageFormat,
  preloadImage,
} from '../../lib/utils/image-optimization';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  withBlur?: boolean;
  blurDataUrl?: string;
  aspectRatio?: number;
  sizes?: string;
  onLoad?: () => void;
}

export default function OptimizedImage({
  src,
  alt,
  className = '',
  priority = false,
  withBlur = true,
  blurDataUrl,
  aspectRatio,
  sizes,
  onLoad,
}: OptimizedImageProps) {
  const [loading, setLoading] = useState(true);
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);
  const [format, setFormat] = useState<'webp' | 'jpeg'>('webp');
  const [generatedBlurDataUrl, setGeneratedBlurDataUrl] = useState<string | null>(null);

  useEffect(() => {
    async function initialize() {
      try {
        // Get optimal image format based on browser support
        const optimalFormat = await getOptimalImageFormat();
        setFormat(optimalFormat);

        // Get image dimensions if not provided through aspect ratio
        if (!aspectRatio) {
          const dims = await getImageDimensions(src);
          setDimensions(dims);
        }

        // Generate blur data URL if needed and not provided
        if (withBlur && !blurDataUrl) {
          const dataUrl = await generateBlurDataUrl(src);
          setGeneratedBlurDataUrl(dataUrl);
        }

        // Preload image if priority is true
        if (priority) {
          preloadImage(src, { format });
        }
      } catch (error) {
        console.error('Error initializing image:', error);
      }
    }

    initialize();
  }, [src, aspectRatio, withBlur, blurDataUrl, priority, format]);

  const imageProps = getResponsiveImageProps(src, { format });

  const handleLoad = () => {
    setLoading(false);
    onLoad?.();
  };

  const containerStyle = {
    position: 'relative' as const,
    width: '100%',
    height: aspectRatio ? 0 : 'auto',
    paddingBottom: aspectRatio ? `${100 / aspectRatio}%` : undefined,
    overflow: 'hidden' as const,
  };

  return (
    <div style={containerStyle} className={className}>
      <AnimatePresence>
        {loading && (withBlur || blurDataUrl) && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url(${blurDataUrl || generatedBlurDataUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(20px)',
            }}
          />
        )}
      </AnimatePresence>

      <Image
        {...imageProps}
        alt={alt}
        sizes={sizes || imageProps.sizes}
        width={dimensions?.width || 1920}
        height={dimensions?.height || (aspectRatio ? 1920 / aspectRatio : 1080)}
        onLoad={handleLoad}
        priority={priority}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: loading ? 0 : 1,
          transition: 'opacity 0.3s ease-in-out',
        }}
      />
    </div>
  );
} 