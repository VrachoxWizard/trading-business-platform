import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kontakt',
  description:
    'Diskretno nas kontaktirajte za prodaju, kupnju ili sukcesiju tvrtke. Prvi razgovor je povjerljiv i bez javnog signala.',
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
