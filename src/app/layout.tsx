import type { Metadata } from 'next'
import { Inter, DM_Sans, Geist } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-dm-sans',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'DealFlow — Premium M&A Advisory for Croatian Businesses',
    template: '%s | DealFlow',
  },
  description:
    'AI-powered business valuations, confidential deal rooms, and expert M&A brokerage for micro and small businesses in Croatia and the wider region. Get your free valuation in 5 minutes.',
  keywords: [
    'M&A Croatia',
    'business for sale Croatia',
    'sell my business',
    'buy a business Croatia',
    'business valuation',
    'mergers and acquisitions',
    'DealFlow',
    'business broker Croatia',
  ],
  authors: [{ name: 'DealFlow' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://dealflow.hr',
    siteName: 'DealFlow',
    title: 'DealFlow — Premium M&A Advisory',
    description: 'AI-powered M&A advisory platform for Croatian businesses.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={cn(inter.variable, dmSans.variable, "font-sans", geist.variable)}>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
