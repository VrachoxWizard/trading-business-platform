import Link from 'next/link'
import { ArrowRight, Lock, MapPin, Users } from 'lucide-react'
import { LISTING_STATUSES } from '@/lib/constants'
import { formatCurrency } from '@/lib/utils'

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
}: ListingCardProps) {
    const statusConfig = LISTING_STATUSES[status] || LISTING_STATUSES.active

    return (
        <div className="premium-card card-interactive hover:shadow-elevated hover:border-gold-600/30 group overflow-hidden">
            <div className="px-6 pt-5 pb-4 border-b border-navy-100">
                <div className="flex items-start justify-between gap-3 mb-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-navy-50 text-navy-700 font-sans">
                        {industry}
                    </span>
                    <span
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold font-sans"
                        style={{
                            backgroundColor: `${statusConfig.color}15`,
                            color: statusConfig.color,
                        }}
                    >
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: statusConfig.color }} />
                        {statusConfig.label}
                    </span>
                </div>

                <h3 className="text-xl font-display font-bold text-navy-950 mb-2 group-hover:text-gold-700 transition-colors line-clamp-2 leading-snug tracking-tight">
                    {title}
                </h3>

                <div className="flex items-center gap-1.5 text-sm text-muted-foreground font-sans">
                    <MapPin className="w-3.5 h-3.5" />
                    {region}
                </div>
            </div>

            <div className="px-6 py-4">
                <div className="grid grid-cols-3 gap-4">
                    <Metric label="Prihod" value={revenue ? formatCurrency(revenue) : '-'} />
                    <Metric label="EBITDA" value={ebitda ? formatCurrency(ebitda) : '-'} />
                    <Metric label="Cijena" value={askingPrice ? formatCurrency(askingPrice) : 'Na upit'} accent />
                </div>

                {employeeCount && (
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-3 font-sans">
                        <Users className="w-3.5 h-3.5" />
                        {employeeCount} zaposlenih
                    </div>
                )}
            </div>

            <div className="px-6 pb-5 flex gap-3">
                <Link
                    href={`/listings/${id}`}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-navy-950 text-white font-bold text-sm font-sans hover:bg-navy-800 transition-colors"
                >
                    Detalji
                    <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <button className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-navy-200 text-navy-700 font-bold text-sm font-sans hover:bg-navy-50 transition-colors">
                    <Lock className="w-3.5 h-3.5" />
                    NDA
                </button>
            </div>
        </div>
    )
}

function Metric({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
    return (
        <div>
            <p className="text-xs text-muted-foreground font-sans mb-1">{label}</p>
            <p className={`text-sm font-bold font-mono metric-numeral ${accent ? 'text-gold-700' : 'text-navy-950'}`}>
                {value}
            </p>
        </div>
    )
}
