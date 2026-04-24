import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { cn } from "@/lib/utils"

const playfairDisplay = Playfair_Display({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-mono',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Heritance — Where Businesses Find Their Next Chapter',
    template: '%s | Heritance',
  },
  description:
    'AI-powered business valuations, confidential deal rooms, and expert M&A brokerage for micro and small businesses in Croatia. Get your free valuation in 5 minutes.',
  keywords: [
    'M&A Croatia',
    'business for sale Croatia',
    'sell my business Croatia',
    'buy a business Croatia',
    'business valuation',
    'mergers and acquisitions',
    'Heritance',
    'business broker Croatia',
    'business succession Croatia',
    'poduzetnička sukcesija',
  ],
  authors: [{ name: 'Heritance' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://heritance.hr',
    siteName: 'Heritance',
    title: 'Heritance — Where Businesses Find Their Next Chapter',
    description: 'AI-powered M&A advisory platform for Croatian businesses.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={cn(
        playfairDisplay.variable,
        dmSans.variable,
        jetbrainsMono.variable,
        "font-sans antialiased"
      )}
    >
      <body className="min-h-screen flex flex-col bg-background text-foreground">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
