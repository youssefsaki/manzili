import type { Metadata } from 'next'
import { Inter, Playfair_Display, Cinzel } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
})

const cinzel = Cinzel({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cinzel',
})

export const metadata: Metadata = {
  title: 'Manizili - Hello World',
  description: 'A minimal Next.js project with TypeScript, Tailwind CSS, and Framer Motion',
  keywords: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'React'],
  authors: [{ name: 'Manizili' }],
  creator: 'Manizili',
  publisher: 'Manizili',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Manizili - Hello World',
    description: 'A minimal Next.js project with TypeScript, Tailwind CSS, and Framer Motion',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Manizili - Hello World',
    description: 'A minimal Next.js project with TypeScript, Tailwind CSS, and Framer Motion',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#ffffff',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${cinzel.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <main id="main" role="main">
          {children}
        </main>
      </body>
    </html>
  )
}
