'use client'

import { usePathname } from 'next/navigation'
import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import MobileConversionBar from '@/components/layout/MobileConversionBar'

const MOBILE_BAR_PATHS = new Set(['/', '/valuate', '/sell', '/buy', '/listings', '/succession'])

export default function AppMain({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const showMobileBar = pathname ? MOBILE_BAR_PATHS.has(pathname) : false

  return (
    <main
      id="main"
      tabIndex={-1}
      className={cn(
        'flex-1 scroll-mt-0 outline-none',
        showMobileBar && 'pb-[calc(4.5rem+env(safe-area-inset-bottom,0px))] md:pb-0'
      )}
    >
      {children}
      <MobileConversionBar />
    </main>
  )
}
