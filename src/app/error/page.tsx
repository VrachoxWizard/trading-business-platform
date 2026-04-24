import Link from 'next/link'
import { AlertTriangle } from 'lucide-react'

export default function ErrorPage() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-navy-50">
            <div className="text-center max-w-md">
                <div className="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center mx-auto mb-6">
                    <AlertTriangle className="w-8 h-8 text-red-500" />
                </div>
                <h1 className="text-2xl font-bold text-navy-950 mb-3">Something went wrong</h1>
                <p className="text-navy-500 mb-8">
                    We encountered an error processing your request. Please try again or contact support.
                </p>
                <div className="flex gap-3 justify-center">
                    <Link
                        href="/"
                        className="px-6 py-3 rounded-xl gradient-accent text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-all"
                    >
                        Go Home
                    </Link>
                    <Link
                        href="/login"
                        className="px-6 py-3 rounded-xl border border-navy-200 text-navy-700 font-semibold text-sm hover:bg-navy-50 transition-all"
                    >
                        Try Again
                    </Link>
                </div>
            </div>
        </div>
    )
}
