import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Procjena vrijednosti',
  description:
    'Indikativna procjena vrijednosti tvrtke i sell-readiness signal za hrvatske vlasnike koji žele diskretan prvi korak.',
}

export default function ValuateLayout({ children }: { children: React.ReactNode }) {
  return children
}
