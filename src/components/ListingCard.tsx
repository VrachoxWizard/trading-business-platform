import Link from 'next/link'
import { MapPin, Users, ArrowRight, Lock } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import { LISTING_STATUSES } from '@/lib/constants'

interface ListingCardProps {
    id: string
    title: string
    industry: string
    region: string
    status: keyof typeof LISTING_STATUSES
    revenue?: number | null
    ebitda?: number | null
    askingPrice?: number | null
    employeeCount?: number | null
    isAnonymous?: boolean
}

export default function ListingCard({
    id,
    title,
    industry,
    region,
    status,
    revenue,
    ebitda,
    askingPrice,
    employeeCount,
    isAnonymous = true,
}: ListingCardProps) {
    const statusConfig = LISTING_STATUSES[status] || LISTING_STATUSES.active

    return (
        <div className="bg-white rounded-[8px] shadow-card border border-[var(--border)] hover:shadow-elevated hover:border-gold-600/30 transition-all group overflow-hidden">
            {/* Top Bar */}
            <div className="px-6 pt-5 pb-4 border-b border-[var(--border)]">
                <div className="flex items-start justify-between gap-3 mb-3">
                    {/* Sector Badge */}
                    <span className="inline-flex items-center px-3 py-1 rounded-[999px] text-xs font-semibold bg-navy-50 text-navy-700 font-sans">
                        {industry}
                    </span>
                    {/* Status */}
                    <span
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[999px] text-xs font-semibold font-sans"
                        style={{
                            backgroundColor: `${statusConfig.color}15`,
                            color: statusConfig.color,
                        }}
                    >
                        <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: statusConfig.color }}
                        />
                        {statusConfig.label}
                    </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-navy-950 mb-2 group-hover:text-gold-600 transition-colors line-clamp-2">
                    {isAnonymous ? title : title}
                </h3>

                {/* Region */}
                <div className="flex items-center gap-1.5 text-sm text-[var(--muted-foreground)] font-sans">
                    <MapPin className="w-3.5 h-3.5" />
                    {region}
                </div>
            </div>

            {/* Financials */}
            <div className="px-6 py-4">
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <p className="text-xs text-[var(--muted-foreground)] font-sans mb-1">Revenue</p>
                        <p className="text-sm font-bold text-navy-950 font-mono">
                            {revenue ? formatCurrency(revenue) : '—'}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-[var(--muted-foreground)] font-sans mb-1">EBITDA</p>
                        <p className="text-sm font-bold text-navy-950 font-mono">
                            {ebitda ? formatCurrency(ebitda) : '—'}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-[var(--muted-foreground)] font-sans mb-1">Asking Price</p>
                        <p className="text-sm font-bold text-gold-600 font-mono">
                            {askingPrice ? formatCurrency(askingPrice) : 'On Request'}
                        </p>
                    </div>
                </div>

                {employeeCount && (
                    <div className="flex items-center gap-1.5 text-xs text-[var(--muted-foreground)] mt-3 font-sans">
                        <Users className="w-3.5 h-3.5" />
                        {employeeCount} employees
                    </div>
                )}
            </div>

            {/* CTAs */}
            <div className="px-6 pb-5 flex gap-3">
                <Link
                    href={`/listings/${id}`}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-navy-950 text-white font-semibold text-sm font-sans hover:bg-navy-800 transition-colors"
                >
                    View Details
                    <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <button className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-[var(--border)] text-navy-700 font-semibold text-sm font-sans hover:bg-navy-50 transition-colors">
                    <Lock className="w-3.5 h-3.5" />
                    Request NDA
                </button>
            </div>
        </div>
    )
}
