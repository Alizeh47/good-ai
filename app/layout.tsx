import './globals.css'
import { Inter, Fraunces } from 'next/font/google'
import type { Metadata } from 'next'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-freight',
})

export const metadata: Metadata = {
  title: 'Eglanto Jewelry',
  description: 'Discover our exquisite collection of luxury jewelry pieces.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body>
        {children}
      </body>
    </html>
  )
}
