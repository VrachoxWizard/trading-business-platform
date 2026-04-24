import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Prodaja tvrtke',
  description:
    'Diskretan, strukturiran i savjetovan proces prodaje tvrtke za hrvatske vlasnike koji žele kontrolu, povjerljivost i kvalitetne kupce.',
}

export default function SellLayout({ children }: { children: React.ReactNode }) {
  return children
}
