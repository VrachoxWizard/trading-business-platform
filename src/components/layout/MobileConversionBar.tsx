'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRight, MessageCircle, TrendingUp } from 'lucide-react'

const ROUTES: Record<
  string,
  { primary: { href: string; label: string }; secondary: { href: string; label: string } }
> = {
  '/': {
    primary: { href: '/valuate', label: 'Procjena' },
    secondary: { href: '/contact', label: 'Kontakt' },
  },
  '/valuate': {
    primary: { href: '/contact', label: 'Kontakt' },
    secondary: { href: '/listings', label: 'Prilike' },
  },
  '/sell': {
    primary: { href: '/valuate', label: 'Procjena' },
    secondary: { href: '/contact', label: 'Kontakt' },
  },
  '/buy': {
    primary: { href: '/listings', label: 'Tržnica' },
    secondary: { href: '/contact', label: 'Kontakt' },
  },
  '/listings': {
    primary: { href: '/valuate', label: 'Procjena' },
    secondary: { href: '/contact', label: 'Kontakt' },
  },
  '/succession': {
    primary: { href: '/contact', label: 'Kontakt' },
    secondary: { href: '/valuate', label: 'Procjena' },
  },
}

/**
 * Sticky two-action bar on small screens for high-intent marketing routes.
 * Hidden on md+; respects safe-area insets.
 */
export default function MobileConversionBar() {
  const pathname = usePathname()
  if (!pathname) return null
  const config = ROUTES[pathname]
  if (!config) return null

  return (
    <div
      className="md:hidden fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-navy-950/95 backdrop-blur-md pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 px-3 shadow-[0_-8px_32px_rgba(0,0,0,0.35)]"
      role="region"
      aria-label="Brzi pristup"
    >
      <div className="mx-auto flex max-w-lg gap-2">
        <Link
          href={config.primary.href}
          className="cta-primary cta-primary-gold min-h-12 flex-1 text-sm active:scale-[0.99]"
        >
          <TrendingUp className="h-4 w-4 shrink-0 opacity-90" aria-hidden />
          {config.primary.label}
        </Link>
        <Link
          href={config.secondary.href}
          className="cta-primary cta-ghost-hero min-h-12 flex-1 text-sm active:scale-[0.99]"
        >
          <MessageCircle className="h-4 w-4 shrink-0 opacity-90" aria-hidden />
          {config.secondary.label}
          <ArrowRight className="h-4 w-4 shrink-0 opacity-80" aria-hidden />
        </Link>
      </div>
    </div>
  )
}
