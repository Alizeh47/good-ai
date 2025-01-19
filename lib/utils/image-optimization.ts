interface ImageConfig {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'jpeg' | 'png';
}

interface ImageDimensions {
  width: number;
  height: number;
}

const defaultConfig: ImageConfig = {
  quality: 80,
  format: 'webp',
};

// CDN configuration
const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL || '';
const IMAGE_BREAKPOINTS = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];

export function getImageUrl(src: string, config: ImageConfig = {}): string {
  const { width, height, quality, format } = { ...defaultConfig, ...config };

  // If using a CDN, construct the URL with optimization parameters
  if (CDN_URL && src.startsWith('/')) {
    const params = new URLSearchParams();
    if (width) params.append('w', width.toString());
    if (height) params.append('h', height.toString());
    if (quality) params.append('q', quality.toString());
    if (format) params.append('fm', format);

    return `${CDN_URL}${src}?${params.toString()}`;
  }

  // If no CDN, return the original URL
  return src;
}

export function getSrcSet(src: string, config: ImageConfig = {}): string {
  if (!CDN_URL) return '';

  return IMAGE_BREAKPOINTS.map(width => {
    const imageUrl = getImageUrl(src, { ...config, width });
    return `${imageUrl} ${width}w`;
  }).join(', ');
}

export function getImageDimensions(src: string): Promise<ImageDimensions> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
    };
    img.onerror = reject;
    img.src = src;
  });
}

export function generateBlurDataUrl(src: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // Create a small 10x10 thumbnail
      canvas.width = 10;
      canvas.height = 10;
      
      if (ctx) {
        ctx.imageSmoothingEnabled = true;
        ctx.drawImage(img, 0, 0, 10, 10);
        resolve(canvas.toDataURL('image/jpeg', 0.1));
      } else {
        reject(new Error('Could not get canvas context'));
      }
    };
    img.onerror = reject;
    img.src = src;
  });
}

export function getResponsiveImageProps(
  src: string,
  config: ImageConfig = {}
): {
  src: string;
  srcSet: string;
  sizes: string;
} {
  const optimizedSrc = getImageUrl(src, config);
  const srcSet = getSrcSet(src, config);
  const sizes = '(min-width: 1280px) 1200px, (min-width: 1024px) 960px, (min-width: 768px) 720px, 100vw';

  return {
    src: optimizedSrc,
    srcSet,
    sizes,
  };
}

export function preloadImage(src: string, config: ImageConfig = {}): void {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = getImageUrl(src, config);
  document.head.appendChild(link);
}

export function preloadCriticalImages(images: string[]): void {
  images.forEach(src => preloadImage(src));
}

export function supportsWebP(): Promise<boolean> {
  return new Promise(resolve => {
    const webP = new Image();
    webP.onload = () => resolve(true);
    webP.onerror = () => resolve(false);
    webP.src = 'data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==';
  });
}

export async function getOptimalImageFormat(): Promise<'webp' | 'jpeg'> {
  const webpSupported = await supportsWebP();
  return webpSupported ? 'webp' : 'jpeg';
} 