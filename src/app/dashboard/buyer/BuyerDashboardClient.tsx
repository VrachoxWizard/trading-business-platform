'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
    CheckCircle2,
    Clock,
    ExternalLink,
    FileText,
    Heart,
    LogOut,
    MapPin,
    Search,
    Sparkles,
    Target,
    XCircle,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { formatCurrency, timeAgo } from '@/lib/utils'

interface Props {
    profile: { full_name: string; email: string } | null
    buyerProfile: {
        target_industries: string[]
        target_regions: string[]
        min_ev: number | null
        max_ev: number | null
    } | null
    shortlists: Array<{
        id: string
        listing_id: string
        notes: string | null
        created_at: string
        listings: {
            title: string
            industry: string
            region: string
            asking_price: number | null
            status: string
        }
    }>
    ndas: Array<{
        id: string
        status: string
        requested_at: string
        listings: { title: string; industry: string; region: string }
    }>
}

export default function BuyerDashboardClient({ profile, buyerProfile, shortlists, ndas }: Props) {
    const [activeTab, setActiveTab] = useState<'shortlists' | 'ndas' | 'matches'>('shortlists')

    const stats = [
        { icon: Heart, label: 'Spremljene prilike', value: shortlists.length, color: 'bg-red-50 text-red-600' },
        { icon: FileText, label: 'Aktivni NDA', value: ndas.filter((nda) => nda.status === 'signed' || nda.status === 'approved').length, color: 'bg-green-50 text-green-600' },
        { icon: Clock, label: 'Na čekanju', value: ndas.filter((nda) => nda.status === 'pending').length, color: 'bg-amber-50 text-amber-600' },
        { icon: Target, label: 'Ciljne industrije', value: buyerProfile?.target_industries?.length || 0, color: 'bg-gold-100 text-gold-700' },
    ]
    const preferredRange =
        buyerProfile?.min_ev && buyerProfile?.max_ev
            ? `${formatCurrency(buyerProfile.min_ev)} - ${formatCurrency(buyerProfile.max_ev)}`
            : 'Nije definirano'

    return (
        <div className="min-h-screen bg-background pt-24">
            <div className="section-shell py-8">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 mb-8">
                    <div>
                        <p className="eyebrow mb-4">Nadzorna ploča kupca</p>
                        <h1 className="text-3xl font-bold text-navy-950">
                            Dobro došli, {profile?.full_name || 'investitor'}
                        </h1>
                        <p className="text-navy-500 mt-1 font-sans">Pratite spremljene prilike, NDA zahtjeve i buduća uparivanja.</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                        <Link href="/listings" className="cta-primary cta-primary-ink hover:-translate-y-0.5 hover:shadow-lg">
                            <Search className="w-4 h-4" />
                            Tržnica prilika
                        </Link>
                        <form action="/auth/signout" method="POST">
                            <button type="submit" className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-navy-200 text-navy-600 text-sm font-bold hover:bg-white transition-all">
                                <LogOut className="w-4 h-4" />
                                Odjava
                            </button>
                        </form>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-6 mb-8">
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
                        <p className="text-xs font-bold uppercase tracking-wider text-navy-500 mb-3">Investicijski profil</p>
                        <div className="space-y-2 text-sm font-sans">
                            <p className="text-navy-700"><span className="font-semibold">Raspon EV:</span> <span className="metric-numeral">{preferredRange}</span></p>
                            <p className="text-navy-700"><span className="font-semibold">Industrije:</span> {buyerProfile?.target_industries?.length || 0}</p>
                            <p className="text-navy-700"><span className="font-semibold">Regije:</span> {buyerProfile?.target_regions?.length || 0}</p>
                        </div>
                    </aside>
                </div>

                <div className="premium-card">
                    <div className="flex overflow-x-auto border-b border-navy-100">
                        {[
                            { key: 'shortlists' as const, label: 'Spremljeno', icon: Heart },
                            { key: 'ndas' as const, label: 'NDA zahtjevi', icon: FileText },
                            { key: 'matches' as const, label: 'AI match', icon: Sparkles },
                        ].map((tab) => {
                            const Icon = tab.icon
                            return (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveTab(tab.key)}
                                    className={`flex items-center gap-2 px-6 py-4 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${activeTab === tab.key
                                        ? 'border-gold-600 text-gold-700'
                                        : 'border-transparent text-navy-500 hover:text-navy-700'
                                        }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    {tab.label}
                                </button>
                            )
                        })}
                    </div>

                    <div className="p-6">
                        {activeTab === 'shortlists' && (
                            shortlists.length > 0 ? (
                                <div className="space-y-3">
                                    {shortlists.map((item) => (
                                        <div key={item.id} className="flex items-center justify-between gap-4 p-4 rounded-lg bg-navy-50 hover:bg-navy-100 card-interactive border border-navy-100">
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-sm font-bold text-navy-950 truncate">{item.listings?.title}</h3>
                                                <div className="flex flex-wrap items-center gap-3 text-xs text-navy-400 mt-1">
                                                    <span>{item.listings?.industry}</span>
                                                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {item.listings?.region}</span>
                                                    {item.listings?.asking_price && <span className="metric-numeral">{formatCurrency(item.listings.asking_price)}</span>}
                                                </div>
                                            </div>
                                            <Link href={`/listings/${item.listing_id}`} className="text-gold-700 hover:text-gold-600" aria-label="Otvori priliku">
                                                <ExternalLink className="w-4 h-4" />
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <EmptyState icon={Heart} title="Nema spremljenih prilika" desc="Pregledajte tržnicu i spremite prilike koje odgovaraju vašoj tezi." href="/listings" cta="Pregled tržnice" />
                            )
                        )}

                        {activeTab === 'ndas' && (
                            ndas.length > 0 ? (
                                <div className="space-y-3">
                                    {ndas.map((nda) => (
                                        <div key={nda.id} className="flex items-center justify-between gap-4 p-4 rounded-lg bg-navy-50 border border-navy-100 card-interactive">
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    {nda.status === 'pending' && <Clock className="w-4 h-4 text-amber-500" />}
                                                    {nda.status === 'approved' && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                                                    {nda.status === 'signed' && <FileText className="w-4 h-4 text-gold-600" />}
                                                    {nda.status === 'rejected' && <XCircle className="w-4 h-4 text-red-500" />}
                                                    <span className="text-sm font-bold text-navy-950">{nda.listings?.title}</span>
                                                </div>
                                                <p className="text-xs text-navy-400">
                                                    {nda.listings?.industry} / {nda.listings?.region} / {timeAgo(nda.requested_at)}
                                                </p>
                                            </div>
                                            <span className="px-3 py-1 rounded-full text-xs font-bold capitalize bg-white text-navy-700">
                                                {nda.status}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <EmptyState icon={FileText} title="Nema NDA zahtjeva" desc="Zatražite pristup na pojedinoj prilici kada želite vidjeti detaljne dokumente." />
                            )
                        )}

                        {activeTab === 'matches' && (
                            <EmptyState icon={Sparkles} title="AI uparivanje se priprema" desc="Profil kupca koristit će se za preporuke prema industriji, regiji i rasponu vrijednosti." />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

function EmptyState({ icon: Icon, title, desc, href, cta }: {
    icon: LucideIcon
    title: string
    desc: string
    href?: string
    cta?: string
}) {
    return (
        <div className="py-12 text-center">
            <Icon className="w-12 h-12 text-navy-200 mx-auto mb-4" />
            <p className="text-navy-600 font-bold mb-2">{title}</p>
            <p className="text-sm text-navy-400 max-w-md mx-auto mb-5 font-sans">{desc}</p>
            {href && cta && (
                <Link href={href} className="cta-primary cta-primary-ink">
                    <Search className="w-4 h-4" />
                    {cta}
                </Link>
            )}
        </div>
    )
}
