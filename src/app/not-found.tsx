import Link from 'next/link'
import { Compass, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background pt-28">
      <div className="section-shell py-16">
        <div className="premium-card p-8 md:p-12 text-center max-w-2xl mx-auto">
          <div className="w-14 h-14 rounded-xl bg-navy-50 border border-navy-100 flex items-center justify-center mx-auto mb-5">
            <Compass className="w-7 h-7 text-gold-700" />
          </div>
          <p className="eyebrow mb-4">404</p>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-navy-950 mb-3">
            Stranica nije pronađena
          </h1>
          <p className="text-navy-500 mb-8 font-sans">
            Ova adresa ne postoji ili je premještena. Vratite se na početnu ili otvorite tržnicu prilika.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg gradient-accent text-white font-bold text-sm"
            >
              <Home className="w-4 h-4" />
              Početna
            </Link>
            <Link
              href="/listings"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-navy-200 text-navy-700 font-bold text-sm hover:bg-navy-50"
            >
              Tržnica prilika
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
