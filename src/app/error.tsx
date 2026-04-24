'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { AlertTriangle, RefreshCcw } from 'lucide-react'

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-navy-50">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-8 h-8 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold text-navy-950 mb-3">Dogodila se neočekivana greška</h1>
        <p className="text-navy-500 mb-8">
          Molimo pokušajte ponovno. Ako problem ostane, javite nam se na info@heritance.hr.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => unstable_retry()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-accent text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-all"
          >
            <RefreshCcw className="w-4 h-4" />
            Pokušaj ponovno
          </button>
          <Link
            href="/"
            className="px-6 py-3 rounded-xl border border-navy-200 text-navy-700 font-semibold text-sm hover:bg-navy-50 transition-all"
          >
            Početna
          </Link>
        </div>
      </div>
    </div>
  )
}
