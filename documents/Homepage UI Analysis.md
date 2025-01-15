# UI Implementation Guidelines - Eglanto Jewelry Website

## Design System Fundamentals

### Typography System
Primary Fonts:
- Headings: Serif font family (suggested: Playfair Display)
  - H1: 48px/60px, font-weight: 500
  - H2: 40px/48px, font-weight: 500
  - H3: 32px/40px, font-weight: 500
- Body: Sans-serif font family (suggested: Inter)
  - Regular: 16px/24px, font-weight: 400
  - Small: 14px/20px, font-weight: 400
  - Caption: 12px/16px, font-weight: 400

### Color Palette
Primary Colors:
- Dark Teal: #1A3A3A (Backgrounds, primary buttons)
- Beige: #F5F0EB (Section backgrounds)
- White: #FFFFFF (Text, cards)

Accent Colors:
- Gold: #C5A992 (CTAs, highlights)
- Light Gray: #F8F8F8 (Subtle backgrounds)
- Text Gray: #6B7280 (Secondary text)

### Spacing System
- Base unit: 4px
- Content padding: 24px mobile, 40px desktop
- Section spacing: 80px desktop, 48px mobile
- Grid gap: 24px desktop, 16px mobile

## Layout Corrections

### Header Navigation
Current Issues:
- Inconsistent spacing between navigation items
- Logo size varies across breakpoints

Improvements:
- Implement fixed 32px spacing between nav items
- Standardize logo size: 120px desktop, 100px mobile
- Add hover states for all interactive elements
- Ensure consistent alignment of utility icons

### Hero Section
Current Issues:
- Text overlay readability issues on light images
- Inconsistent button styles
- Missing loading states for images

Improvements:
- Add subtle gradient overlay for text contrast
- Standardize CTA button sizes: 48px height, 16px padding
- Implement progressive image loading
- Add aria-labels for accessibility

### Product Categories
Current Issues:
- Grid layout breaks on certain viewport widths
- Inconsistent image aspect ratios
- Missing loading states

Improvements:
- Implement responsive grid: 3 columns desktop, 2 tablets, 1 mobile
- Standardize image aspect ratios: 1:1 for products, 4:3 for lifestyle
- Add skeleton loading states
- Implement proper image lazy loading

### New Arrivals Section
Current Issues:
- Carousel navigation not obvious
- Product card styles inconsistent
- Price formatting varies

Improvements:
- Add visible carousel indicators
- Standardize product cards:
  - Fixed height: 360px desktop, 280px mobile
  - Consistent padding: 16px
  - Uniform price format: "$XX.XX"
- Implement touch-friendly carousel navigation

### Testimonials Section
Current Issues:
- Quote marks inconsistent
- Image placement varies
- Navigation controls hard to spot

Improvements:
- Standardize quote styling
- Fix image aspect ratio to 1:1
- Make navigation controls more prominent
- Add proper attribution styling

### Footer
Current Issues:
- Newsletter input styling inconsistent
- Social icons misaligned
- Column widths vary

Improvements:
- Standardize input field height: 48px
- Align social icons with baseline
- Set fixed column widths for larger screens
- Add hover states for all links

## Responsive Behavior

### Breakpoints
- Mobile: 320px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px+

### Critical Adjustments
- Implement proper hamburger menu for mobile
- Ensure touch targets minimum 44px
- Maintain readable text size across devices
- Adjust grid layouts for different screen sizes

## Performance Optimizations

### Image Guidelines
- Use WebP format with JPEG fallback
- Implement responsive images using srcset
- Lazy load images below the fold
- Optimize image compression: 80% quality

### Animation Guidelines
- Use CSS transforms for performance
- Implement reduced motion media query
- Keep animations under 300ms
- Use hardware acceleration where appropriate

## Accessibility Requirements

### Essential Implementations
- Implement proper heading hierarchy
- Ensure 3:1 minimum contrast ratio for text
- Add skip links for keyboard navigation
- Implement proper ARIA labels

### Focus Management
- Visible focus indicators
- Logical tab order
- Keyboard accessible carousel
- Screen reader announcements for dynamic content


# Eglanto Jewelry Website Design Specification

## Brand Identity & Color Palette
- Primary Colors:
  - Deep Teal: #1A3635 (Navigation and feature sections)
  - Warm Cream: #F9F3EF (Background)
  - Rose Gold: #B87C6B (Accent elements)
- Secondary Colors:
  - Pure White: #FFFFFF (Product backgrounds)
  - Dark Navy: #0A1F1F (Text)
  - Bronze: #CD7F32 (Social media elements)

## Typography
- Primary Heading Font: "Bodoni Moda" or similar serif
  - Hero Text: 64px/1.2
  - Section Headers: 48px/1.3
  - Subsection Headers: 32px/1.4
- Body Text: "Inter" or similar sans-serif
  - Navigation: 16px, letter-spacing: 0.5px
  - Regular Text: 18px/1.6
  - Small Text: 14px/1.5

## Layout Structure

### Header Section
- Logo centered, 48px height
- Navigation menu left-aligned
- Search, wishlist, and cart icons right-aligned
- Subtle divider line below header

### Hero Section "Desire Meets New Style"
- Split layout: 60% text, 40% imagery
- Floating image composition with hands showcase
- Decorative oval shapes in background
- Two CTAs: "See All" button and "Play Video" button
- Subtle geometric patterns

### Statistics Bar
- Four key metrics displayed horizontally
- Circle icon with downward arrow on right
- Metrics include:
  - "12 All over World"
  - "150+ Product Available"
  - "1K+ Product Reviews"
  - Circular brand emblem

### Collection Showcase
- Grid layout with asymmetrical image placement
- Three featured categories:
  - "Rings for Joyful Connection"
  - "Inspiration with necklaces"
  - "Discover Amazing Earrings"
- Each with "See All" CTA button

### New Arrivals Section
- Dark teal background (#1A3635)
- Horizontal product slider
- Product cards showing:
  - Clean product image
  - Product name
  - Price
  - Wishlist heart icon
- Navigation arrows for slider

### Heritage Section
- Split layout with circular imagery
- "Tradition Cared For Since 1970" heading
- Supporting text and CTA button

### Testimonials
- Customer quote with photo
- Navigation arrows
- Author name and location
- Professional portrait style photography

### Instagram Footer
- Four-image grid
- Instagram CTA in bronze color
- Full website footer with:
  - Company logo
  - Contact information
  - Navigation links
  - Newsletter signup

## Interactive Elements
- Hover states: Subtle opacity changes
- Buttons: Smooth transition animations
- Image zooms: Subtle scale increase
- Navigation: Underline indicators
- Form fields: Minimal outline style

## Responsive Behavior
- Breakpoints at:
  - Mobile: 375px
  - Tablet: 768px
  - Desktop: 1280px
- Stack elements vertically on mobile
- Adjust font sizes proportionally
- Maintain visual hierarchy across devices