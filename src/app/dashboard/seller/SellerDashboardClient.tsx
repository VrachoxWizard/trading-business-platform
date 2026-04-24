'use client'

import Link from 'next/link'
import {
    Building2,
    CheckCircle2,
    Clock,
    ExternalLink,
    FileText,
    LogOut,
    Plus,
    XCircle,
} from 'lucide-react'
import { LISTING_STATUSES } from '@/lib/constants'
import { formatCurrency, timeAgo } from '@/lib/utils'

interface Props {
    profile: { full_name: string; email: string; role: string } | null
    listings: Array<{
        id: string
        title: string
        industry: string
        status: string
        asking_price: number | null
        created_at: string
        revenue: number | null
        ebitda: number | null
    }>
    ndas: Array<{
        id: string
        status: string
        requested_at: string
        buyer_id: string
        listings: { title: string }
    }>
}

export default function SellerDashboardClient({ profile, listings, ndas }: Props) {
    const totalListings = listings.length
    const activeListings = listings.filter((listing) => listing.status === 'active').length
    const totalNdas = ndas.length
    const pendingNdas = ndas.filter((nda) => nda.status === 'pending').length

    const stats = [
        { icon: Building2, label: 'Ukupno profila', value: totalListings, color: 'bg-gold-100 text-gold-700' },
        { icon: CheckCircle2, label: 'Aktivno', value: activeListings, color: 'bg-green-50 text-green-600' },
        { icon: FileText, label: 'NDA zahtjevi', value: totalNdas, color: 'bg-blue-50 text-blue-600' },
        { icon: Clock, label: 'Na čekanju', value: pendingNdas, color: 'bg-amber-50 text-amber-600' },
    ]
    const draftListings = listings.filter((listing) => listing.status === 'draft').length

    return (
        <div className="min-h-screen bg-background pt-24">
            <div className="section-shell py-8">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 mb-8">
                    <div>
                        <p className="eyebrow mb-4">Nadzorna ploča prodavatelja</p>
                        <h1 className="text-3xl font-bold text-navy-950">
                            Dobro došli, {profile?.full_name || 'vlasniče'}
                        </h1>
                        <p className="text-navy-500 mt-1 font-sans">Upravljajte profilima tvrtki, NDA zahtjevima i pripremom procesa.</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                        <Link href="/sell/onboard" className="cta-primary cta-primary-gold hover:-translate-y-0.5 hover:shadow-lg">
                            <Plus className="w-4 h-4" />
                            Novi profil
                        </Link>
                        <form action="/auth/signout" method="POST">
                            <button type="submit" className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-navy-200 text-navy-600 text-sm font-bold hover:bg-white transition-all">
                                <LogOut className="w-4 h-4" />
                                Odjava
                            </button>
                        </form>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_0.75fr] gap-6 mb-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {stats.map((stat) => {
                            const Icon = stat.icon
                            return (
                                <div key={stat.label} className="premium-card p-5">
                                    <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center mb-3`}>
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <p className="text-2xl font-bold text-navy-950 metric-numeral">{stat.value}</p>
                                    <p className="text-xs text-navy-400 mt-1 font-sans">{stat.label}</p>
                                </div>
                            )
                        })}
                    </div>
                    <aside className="premium-card p-5">
                        <p className="text-xs font-bold uppercase tracking-wider text-navy-500 mb-3">Status mandata</p>
                        <div className="space-y-2 text-sm font-sans text-navy-700">
                            <p><span className="font-semibold">Nacrti u pripremi:</span> <span className="metric-numeral">{draftListings}</span></p>
                            <p><span className="font-semibold">Aktivni profili:</span> <span className="metric-numeral">{activeListings}</span></p>
                            <p className="text-navy-500">Savjet: održavajte 1-2 aktivna profila kako biste zadržali kvalitetu kupaca.</p>
                        </div>
                    </aside>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <div className="premium-card overflow-hidden">
                            <div className="px-6 py-4 border-b border-navy-100 flex items-center justify-between">
                                <h2 className="text-lg font-bold text-navy-950">Profili tvrtki</h2>
                                <Link href="/sell/onboard" className="text-sm text-gold-700 font-bold hover:text-gold-600">
                                    + Novi
                                </Link>
                            </div>
                            {listings.length > 0 ? (
                                <div className="divide-y divide-navy-100">
                                    {listings.map((listing) => {
                                        const status = LISTING_STATUSES[listing.status as keyof typeof LISTING_STATUSES]
                                        return (
                                            <div key={listing.id} className="px-6 py-4 flex items-center justify-between gap-4 hover:bg-navy-50/70 card-interactive border-l-2 border-l-transparent hover:border-l-gold-500">
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex flex-wrap items-center gap-2 mb-1">
                                                        <h3 className="text-sm font-bold text-navy-950 truncate">{listing.title}</h3>
                                                        <span
                                                            className="inline-flex px-2 py-0.5 rounded-full text-xs font-bold"
                                                            style={{
                                                                backgroundColor: `${status?.color}20`,
                                                                color: status?.color,
                                                            }}
                                                        >
                                                            {status?.label}
                                                        </span>
                                                    </div>
                                                    <div className="flex flex-wrap items-center gap-4 text-xs text-navy-400">
                                                        <span>{listing.industry}</span>
                                                        <span className="metric-numeral">{listing.asking_price ? formatCurrency(listing.asking_price) : 'Na upit'}</span>
                                                        <span>{timeAgo(listing.created_at)}</span>
                                                    </div>
                                                </div>
                                                <Link href={`/listings/${listing.id}`} className="text-navy-400 hover:text-gold-700 transition-colors" aria-label="Otvori profil">
                                                    <ExternalLink className="w-4 h-4" />
                                                </Link>
                                            </div>
                                        )
                                    })}
                                </div>
                            ) : (
                                <div className="p-12 text-center">
                                    <Building2 className="w-12 h-12 text-navy-200 mx-auto mb-4" />
                                    <p className="text-navy-600 font-bold mb-2">Još nema profila</p>
                                    <p className="text-sm text-navy-400 mb-5 font-sans">Kreirajte prvi anonimni nacrt za savjetnički pregled.</p>
                                    <Link href="/sell/onboard" className="cta-primary cta-primary-ink hover:-translate-y-0.5 hover:shadow-lg">
                                        <Plus className="w-4 h-4" />
                                        Kreiraj profil
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                    <div>
                        <div className="premium-card overflow-hidden">
                            <div className="px-6 py-4 border-b border-navy-100">
                                <h2 className="text-lg font-bold text-navy-950">NDA aktivnost</h2>
                            </div>
                            {ndas.length > 0 ? (
                                <div className="divide-y divide-navy-100">
                                    {ndas.map((nda) => (
                                        <div key={nda.id} className="px-6 py-4">
                                            <div className="flex items-center gap-2 mb-1">
                                                {nda.status === 'pending' && <Clock className="w-4 h-4 text-amber-500" />}
                                                {nda.status === 'approved' && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                                                {nda.status === 'rejected' && <XCircle className="w-4 h-4 text-red-500" />}
                                                {nda.status === 'signed' && <FileText className="w-4 h-4 text-gold-600" />}
                                                <span className="text-sm font-bold text-navy-700 capitalize">{nda.status}</span>
                                            </div>
                                            <p className="text-xs text-navy-400 truncate">
                                                {nda.listings?.title} / {timeAgo(nda.requested_at)}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-8 text-center">
                                    <FileText className="w-10 h-10 text-navy-200 mx-auto mb-3" />
                                    <p className="text-sm text-navy-400 font-sans">Nema NDA zahtjeva. Nakon objave profila zahtjevi se pojavljuju ovdje.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
