I'll help you create a detailed UI Elements & Features documentation based on the Eglanto jewelry website design. Here's a comprehensive breakdown:

# UI Elements & Features Documentation

## 1. Navigation & Header
- Logo placement: Centered, using custom "Eglanto" typography
- Primary navigation items: Home, Products, Discover, Blogs
- Utility navigation: Search, Wishlist, Cart icons
- Transparent background with high contrast for visibility
- Sticky header behavior for continuous access

## 2. Hero Section
- Split-screen layout with text and image collage
- Heading: "Desire Meets New Style" in serif typography
- Secondary text for context/description
- Two CTA buttons: "See All" and "Play Video"
- Right-side image collage with jewelry and hand poses
- Peach/nude color palette background
- Custom decorative elements and curved lines

## 3. Statistics Bar
- Three-column layout with key metrics
- Custom iconography and typography
- Metrics displayed:
  - "12 All over World"
  - "150+ Product Available"
  - "1K+ Product Reviews"
- Subtle background color differentiation
- Circular decorative element with arrow

## 4. Collection Showcase
- Grid layout with asymmetric image placement
- Three main categories:
  - "Rings for Joyful Connection"
  - "Inspiration with necklaces"
  - "Discover Amazing Earrings"
- Each category features:
  - Custom heading typography
  - "See All" CTA button with arrow
  - High-quality product/lifestyle imagery
- White space utilization for elegant spacing

## 5. New Arrivals Section
- Dark teal background (#1A3A3A or similar)
- Horizontal product carousel
- Product cards featuring:
  - Product image
  - Wishlist heart icon
  - Product name
  - Price
  - Category label
- Navigation arrows for carousel control

## 6. Heritage Section
- Split circular image layout
- "Tradition Cared For Since 1970" heading
- Descriptive text about brand heritage
- "See More" CTA button
- Decorative elements and typography

## 7. Testimonials
- Clean, minimalist testimonial layout
- Customer photo
- Quote design with decorative elements
- Customer name and location
- Navigation arrows for multiple testimonials
- Subtle background color treatment

## 8. Instagram Gallery
- Four-column grid layout
- Three lifestyle images
- One CTA tile for Instagram
- Consistent color treatment
- Interactive hover states

## 9. Footer
- Four-column layout
- Brand information:
  - Logo
  - Contact details
  - Address
  - Social media icons
- Navigation sections:
  - About
  - Support
- Newsletter subscription:
  - Email input field
  - Submit button
  - Promotional text
- Legal links and copyright

## 10. Design System Elements
### Typography
- Serif headings (possibly "Americana Std" or similar)
- Sans-serif body text
- Hierarchy with clear size distinctions

### Color Palette
- Primary: Dark teal (#1A3A3A)
- Secondary: Peach/nude (#F5E6E0)
- Accent: Gold/bronze (#B87C4C)
- Text: Deep navy (#0F172A)
- Background variations of white and cream

### Interactive Elements
- Hover states on all buttons and links
- Smooth transitions (300ms duration)
- Custom cursor styles on interactive elements
- Clear focus states for accessibility

### Spacing System
- Consistent vertical rhythm
- Generous white space
- Grid-based layout system
- Responsive padding and margins

This documentation provides a comprehensive reference for implementing the UI elements and features in your Next.js project with TypeScript, following the design system.


5. UI Elements & Features Detailing
-Fonts & Typography

Primary font: Serif-based typography with clean letter spacing
Secondary font: Sans-serif for smaller text elements

-Colors

Background: Cream/white
Text: Dark green and black
Accent: Gold

-Features
--Hero Section

Large image with overlay text
"Play Video" button
"See All" button

--Product Cards

Image, title, price
Hover effect for "Add to Cart"

--Testimonials

Rotating carousel with customer feedback

-Footer

Links to About Us, Privacy Policy, and Terms & Conditions

-Dynamic Homepage Components

Product grids and testimonials fetched dynamically from backend APIs
Videos embedded via a CDN for smooth playback

-SEO and Performance Optimizations

Use next-seo package for improving metadata
Schema Markup for product listings and reviews
Compress images to WebP format