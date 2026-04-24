import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kupnja tvrtke',
  description:
    'Kurirana tržnica akvizicijskih prilika u Hrvatskoj s NDA procesom, ključnim metrikama i savjetničkom podrškom za ozbiljne kupce.',
}

export default function BuyLayout({ children }: { children: React.ReactNode }) {
  return children
}
