import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0A323C',    // Deep Teal
        secondary: '#F5EFE8',  // Warm Beige
        accent: '#B1906A',     // Bronze/Gold
        text: {
          primary: '#1A2B3B',  // Dark Navy
          secondary: '#4A4A4A', // Charcoal Gray
          light: '#FFFFFF'     // White
        }
      },
      fontFamily: {
        serif: ['var(--font-freight)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif']
      },
      fontSize: {
        // Headings
        'h1': ['64px', '72px'],
        'h2': ['48px', '56px'],
        'h3': ['32px', '40px'],
        // Body
        'body': ['16px', '24px'],
        'small': ['14px', '20px']
      },
      spacing: {
        // Base spacing unit: 4px
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '5': '20px',
        '6': '24px',
        '8': '32px',
        '10': '40px',
        '20': '80px'
      },
      gridTemplateColumns: {
        '12': 'repeat(12, minmax(0, 1fr))',
      },
      gap: {
        'default': '24px'
      },
      padding: {
        'section-desktop': '80px',
        'section-mobile': '40px',
        'component': '24px'
      }
    },
  },
  plugins: [],
}

export default config
