import type { Metadata } from 'next'
import { DM_Sans, JetBrains_Mono, Playfair_Display } from 'next/font/google'
import './globals.css'
import AppMain from '@/components/layout/AppMain'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { cn } from '@/lib/utils'

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
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
    : new URL('https://heritance.hr'),
  title: {
    default: 'Heritance - diskretna kupoprodaja tvrtki',
    template: '%s | Heritance',
  },
  description:
    'Diskretne procjene vrijednosti, povjerljive sobe za transakcije i savjetovanje pri kupoprodaji malih i srednjih tvrtki u Hrvatskoj.',
  keywords: [
    'M&A Hrvatska',
    'prodaja tvrtke',
    'kupnja tvrtke',
    'procjena vrijednosti poduzeća',
    'poslovna sukcesija',
    'business broker Croatia',
    'Heritance',
  ],
  authors: [{ name: 'Heritance' }],
  openGraph: {
    type: 'website',
    locale: 'hr_HR',
    url: 'https://heritance.hr',
    siteName: 'Heritance',
    title: 'Heritance - diskretna kupoprodaja tvrtki',
    description:
      'Premium M&A savjetovanje i digitalna platforma za hrvatske vlasnike, kupce i investitore.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Heritance - diskretna kupoprodaja tvrtki',
    description:
      'Premium M&A savjetovanje i digitalna platforma za hrvatske vlasnike, kupce i investitore.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="hr"
      className={cn(
        playfairDisplay.variable,
        dmSans.variable,
        jetbrainsMono.variable,
        'font-sans antialiased'
      )}
    >
      <body className="min-h-screen flex flex-col bg-background text-foreground">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-4 focus:py-2.5 focus:text-sm focus:font-bold focus:text-navy-950 focus:shadow-elevated focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-gold-500"
        >
          Preskoči na sadržaj
        </a>
        <Header />
        <AppMain>{children}</AppMain>
        <Footer />
      </body>
    </html>
  )
}
