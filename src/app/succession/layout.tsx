import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Poslovna sukcesija',
  description:
    'Savjetovanje i strukturiranje poslovne sukcesije za vlasnike tvrtki u Hrvatskoj koji žele siguran prijenos vlasništva.',
}

export default function SuccessionLayout({ children }: { children: React.ReactNode }) {
  return children
}
