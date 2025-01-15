# Eglanto Jewelry Website - Project Structure Documentation

## Overview
This document outlines the file structure for the Eglanto Jewelry e-commerce website built with Next.js (App Router), TypeScript, and Tailwind CSS. The structure is optimized for an image-rich, performance-focused luxury jewelry website.

## Core Principles
- App directory at root level (no src folder)
- Modular component architecture
- Type-safe development
- Performance optimization
- Scalable structure

## Root Directory Structure
```
eglanto-jewelry/
├── app/                    # Main application directory (at root level)
├── public/                 # Static assets
├── components/            # Reusable components
├── lib/                   # Utility functions and shared logic
├── hooks/                 # Custom React hooks
├── types/                 # TypeScript type definitions
├── styles/                # Global styles and Tailwind config
├── config/                # Configuration files
└── services/             # API and external service integrations
```

## Detailed Directory Structure

### `/app` (Root Level App Directory)
```
app/
├── layout.tsx             # Root layout
├── page.tsx              # Homepage
├── loading.tsx           # Loading UI
├── error.tsx             # Error boundary
├── not-found.tsx         # 404 page
├── collections/          # Collection routes
│   ├── [slug]/           # Dynamic collection pages
│   └── page.tsx          # Collections overview
├── product/             # Product routes
│   └── [id]/            # Dynamic product pages
├── about/               # About page
└── contact/            # Contact page
```

### `/components`
```
components/
├── ui/                    # Base UI components
│   ├── buttons/
│   │   ├── primary-button.tsx
│   │   └── secondary-button.tsx
│   ├── cards/
│   │   ├── product-card.tsx
│   │   └── collection-card.tsx
│   └── forms/
│       ├── newsletter-form.tsx
│       └── contact-form.tsx
├── layout/               # Layout components
│   ├── header/
│   │   ├── navbar.tsx
│   │   └── search-bar.tsx
│   ├── footer/
│   └── navigation/
├── sections/             # Page sections
│   ├── hero/
│   │   └── hero-section.tsx
│   ├── featured/
│   ├── collections/
│   ├── testimonials/
│   └── newsletter/
└── shared/              # Shared components
```

### `/lib`
```
lib/
├── utils/                # Utility functions
│   ├── price-formatter.ts
│   └── image-loader.ts
├── constants/            # Constants and static data
│   ├── routes.ts
│   └── collections.ts
├── helpers/             # Helper functions
└── validators/          # Form validation schemas
```

### `/hooks`
```
hooks/
├── useCart/
│   ├── index.ts
│   └── types.ts
├── useProduct/
├── useAuth/
└── useCollection/
```

### `/types`
```
types/
├── product.ts            # Product-related types
├── collection.ts         # Collection-related types
├── user.ts              # User-related types
└── common.ts            # Shared types
```

### `/public`
```
public/
├── images/
│   ├── products/        # Product images
│   ├── banners/         # Banner images
│   └── icons/          # UI icons
├── fonts/              # Custom fonts
└── favicons/          # Favicon files
```

### `/styles`
```
styles/
├── globals.css          # Global styles
└── tailwind/
    ├── components.css   # Component styles
    └── utilities.css    # Utility styles
```

### `/config`
```
config/
├── site.ts              # Site configuration
├── menu.ts             # Navigation menus
└── api.ts              # API configuration
```

### `/services`
```
services/
├── api/                # API services
│   ├── products.ts
│   └── collections.ts
├── auth/               # Authentication
└── analytics/         # Analytics integration
```

## Configuration Files (Root Level)
```
├── tailwind.config.js    # Tailwind configuration
├── tsconfig.json         # TypeScript configuration
├── package.json         # Project dependencies
├── next.config.js       # Next.js configuration
└── .env.local          # Environment variables
```

## Key Features Implementation

### Product Showcase
- High-quality image optimization
- Responsive grid layouts
- Lazy loading implementation
- Quick view functionality

### User Experience
- Smooth transitions
- Responsive design
- Loading states
- Error boundaries

### Performance Optimization
- Image optimization
- Code splitting
- Route prefetching
- API response caching

### E-commerce Features
- Shopping cart
- Wishlist
- Product search
- Filter functionality

## Best Practices
1. Use TypeScript for all components and functions
2. Implement proper error boundaries
3. Follow atomic design principles
4. Maintain consistent naming conventions
5. Optimize for performance
6. Implement proper SEO practices
7. Ensure accessibility compliance

## Notes
- All React components use `.tsx` extension
- Styles primarily use Tailwind CSS
- Images are optimized using Next.js Image component
- API routes follow REST conventions
- Environment variables are properly segregated