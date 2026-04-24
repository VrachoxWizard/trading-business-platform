import type { Metadata } from 'next'
import { DM_Sans, JetBrains_Mono, Playfair_Display } from 'next/font/google'
import './globals.css'
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
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
