# Image Directory Structure

```
public/
├── images/
│   ├── jewelry-1.jpg        # Homepage hero image (1920x1080px)
│   ├── jewelry-2.jpg        # Homepage featured image (1920x1080px)
│   ├── jewelry-3.jpg        # Homepage gallery image (1200x800px)
│   ├── jewelry-4.jpg        # Homepage gallery image (1200x800px)
│   ├── jewelry-5.jpg        # Homepage gallery image (1200x800px)
│   ├── jewelry-6.jpg        # Homepage gallery image (1200x800px)
│   ├── collection-rings.jpg     # Collection banner (1920x600px)
│   ├── collection-necklaces.jpg # Collection banner (1920x600px)
│   ├── collection-earrings.jpg  # Collection banner (1920x600px)
│   │
│   ├── products/
│   │   ├── ring-1.jpg      # Product image (1200x1200px)
│   │   ├── ring-2.jpg      # Product image (1200x1200px)
│   │   ├── necklace-1.jpg  # Product image (1200x1200px)
│   │   ├── necklace-2.jpg  # Product image (1200x1200px)
│   │   ├── earrings-1.jpg  # Product image (1200x1200px)
│   │   └── bracelet-1.jpg  # Product image (1200x1200px)
│   │
│   ├── testimonials/
│   │   └── customer-1.jpg  # Customer photo (400x400px)
│   │
│   ├── heritage/
│   │   ├── craft-1.jpg     # Craftsmanship image (1600x900px)
│   │   ├── craft-2.jpg     # Workshop image (1600x900px)
│   │   ├── craft-3.jpg     # Detail work image (1600x900px)
│   │   └── craft-4.jpg     # Process image (1600x900px)
│   │
│   ├── blog/
│   │   ├── layering-necklaces.jpg # Blog featured (1200x630px)
│   │   ├── diamond-clarity.jpg    # Blog featured (1200x630px)
│   │   └── spring-trends.jpg      # Blog featured (1200x630px)
│   │
│   ├── team/
│   │   ├── emma.jpg        # Team member photo (800x800px)
│   │   ├── michael.jpg     # Team member photo (800x800px)
│   │   └── sophie.jpg      # Team member photo (800x800px)
│   │
│   └── instagram/
       ├── post-1.jpg       # Instagram feed (1080x1080px)
       ├── post-2.jpg       # Instagram feed (1080x1080px)
       ├── post-3.jpg       # Instagram feed (1080x1080px)
       ├── post-4.jpg       # Instagram feed (1080x1080px)
       ├── post-5.jpg       # Instagram feed (1080x1080px)
       └── post-6.jpg       # Instagram feed (1080x1080px)
```

## Image Requirements

### Homepage Images
- Hero images (jewelry-1.jpg, jewelry-2.jpg): 1920x1080px
- Gallery images (jewelry-3.jpg to jewelry-6.jpg): 1200x800px
- Format: JPG
- Quality: 85%
- Optimization: WebP format will be generated automatically

### Collection Banners
- Size: 1920x600px
- Format: JPG
- Quality: 85%
- Style: Lifestyle shots with text overlay space

### Product Images
- Size: 1200x1200px
- Format: JPG
- Background: White/neutral
- Multiple angles recommended
- Quality: 85%

### Testimonials
- Size: 400x400px
- Format: JPG
- Style: Professional headshots
- Quality: 85%

### Heritage/Craftsmanship
- Size: 1600x900px
- Format: JPG
- Style: Documentary/process shots
- Quality: 85%

### Blog Images
- Size: 1200x630px (optimal for social sharing)
- Format: JPG
- Quality: 85%
- Style: Featured image with text overlay space

### Team Photos
- Size: 800x800px
- Format: JPG
- Style: Professional headshots
- Quality: 85%
- Background: Consistent across all team photos

### Instagram Feed
- Size: 1080x1080px (square)
- Format: JPG
- Quality: 85%
- Style: Consistent with brand aesthetic

## Usage with Next.js Image Component

```jsx
import Image from 'next/image';

// For product images
<Image
  src="/images/products/ring-1.jpg"
  alt="Diamond Ring"
  width={1200}
  height={1200}
  quality={85}
  priority={true}
/>

// For responsive hero images
<Image
  src="/images/jewelry-1.jpg"
  alt="Hero Banner"
  fill
  className="object-cover"
  priority={true}
/>
``` 