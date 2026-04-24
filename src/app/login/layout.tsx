import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Prijava',
  description:
    'Prijavite se ili otvorite Heritance račun za pristup povjerljivim M&A prilikama, NDA procesima i nadzornoj ploči.',
}

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children
}
