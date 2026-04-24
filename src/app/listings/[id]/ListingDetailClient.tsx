'use client'

import { useState } from 'react'
import type { ReactNode } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
    AlertCircle,
    ArrowLeft,
    Building2,
    CheckCircle2,
    Clock,
    Euro,
    FileText,
    Lock,
    MapPin,
    Send,
    Shield,
    Star,
    TrendingUp,
    Users,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { formatCurrency, timeAgo } from '@/lib/utils'

interface ListingDetailProps {
    listing: {
        id: string
        title: string
        industry: string
        sub_industry: string | null
        region: string
        city: string | null
        description: string | null
        revenue: number | null
        ebitda: number | null
        sde: number | null
        asking_price: number | null
        employee_count: number | null
        reason_for_sale: string | null
        status: string
        is_anonymous: boolean
        year_established: number | null
        business_model: string | null
        digital_maturity_score: number | null
        owner_dependence_score: number | null
        seller_id: string
        created_at: string
    }
    user: { id: string; email?: string } | null
    hasNda: boolean
}

export default function ListingDetailClient({ listing, user, hasNda }: ListingDetailProps) {
    const [ndaRequested, setNdaRequested] = useState(false)
    const [ndaLoading, setNdaLoading] = useState(false)
    const supabase = createClient()

    const requestNda = async () => {
        if (!user) return
        setNdaLoading(true)
        try {
            await supabase.from('nda_requests').insert({
                listing_id: listing.id,
                buyer_id: user.id,
                status: 'pending',
            })
            setNdaRequested(true)
        } catch (err) {
            console.error('NDA request failed:', err)
        } finally {
            setNdaLoading(false)
        }
    }

    const ebitdaMultiple = listing.ebitda && listing.asking_price
        ? (listing.asking_price / listing.ebitda).toFixed(1)
        : null
    const dataAccessLabel = hasNda ? 'NDA aktivan' : 'NDA potreban'

    return (
        <div className="min-h-screen bg-background pt-24">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Link href="/listings" className="inline-flex items-center gap-2 text-sm text-navy-500 hover:text-navy-700 mb-6 transition-colors font-bold">
                    <ArrowLeft className="w-4 h-4" />
                    Povratak na tržnicu
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="premium-card p-6 md:p-8">
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5 mb-7">
                                <div>
                                    <div className="flex flex-wrap items-center gap-2 mb-4">
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gold-100 text-gold-700 text-xs font-bold">
                                            <Building2 className="w-3 h-3" />
                                            {listing.industry}
                                        </span>
                                        {listing.is_anonymous && (
                                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-navy-100 text-navy-600 text-xs font-bold">
                                                <Shield className="w-3 h-3" />
                                                Anonimno
                                            </span>
                                        )}
                                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold ${hasNda ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
                                            <Lock className="w-3 h-3" />
                                            {dataAccessLabel}
                                        </span>
                                    </div>
                                    <h1 className="text-3xl md:text-4xl font-bold text-navy-950 mb-3">{listing.title}</h1>
                                    <div className="flex flex-wrap items-center gap-4 text-sm text-navy-500 font-sans">
                                        <span className="flex items-center gap-1">
                                            <MapPin className="w-4 h-4" />
                                            {listing.region}{listing.city && !listing.is_anonymous ? `, ${listing.city}` : ''}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-4 h-4" />
                                            Objavljeno {timeAgo(listing.created_at)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {listing.description && (
                                <div className="mb-8">
                                    <h2 className="text-lg font-bold text-navy-950 mb-3">Pregled poslovanja</h2>
                                    <p className="text-navy-600 leading-relaxed font-sans">{listing.description}</p>
                                </div>
                            )}

                            <div className="mb-8">
                                <h2 className="text-lg font-bold text-navy-950 mb-4">Ključni detalji</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {listing.year_established && <Metric label="Osnovano" value={listing.year_established.toString()} />}
                                    {listing.business_model && <Metric label="Model" value={listing.business_model} />}
                                    {listing.employee_count && <Metric label="Zaposleni" value={listing.employee_count.toString()} icon={Users} />}
                                    {listing.reason_for_sale && <Metric label="Razlog prodaje" value={listing.reason_for_sale} />}
                                </div>
                            </div>

                            <div className="premium-card p-5 bg-navy-50/70 border-navy-100">
                                <p className="text-xs font-bold uppercase tracking-wider text-navy-500 mb-3">Diligence fokus</p>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm font-sans">
                                    <p className="rounded-lg bg-white border border-navy-100 px-3 py-2 text-navy-700">Kvaliteta prihoda i marži</p>
                                    <p className="rounded-lg bg-white border border-navy-100 px-3 py-2 text-navy-700">Operativna ovisnost o vlasniku</p>
                                    <p className="rounded-lg bg-white border border-navy-100 px-3 py-2 text-navy-700">Ugovori i stabilnost kupaca</p>
                                </div>
                            </div>

                            {!hasNda && (
                                <div className="bg-gold-100 border border-gold-200 rounded-lg p-6 text-center">
                                    <Lock className="w-8 h-8 text-gold-700 mx-auto mb-3" />
                                    <h3 className="text-lg font-bold text-navy-950 mb-2">Detaljni dokumenti su pod NDA pristupom</h3>
                                    <p className="text-sm text-navy-600 font-sans">
                                        Zatražite pristup za uvid u CIM, dodatne financije i transakcijsku sobu.
                                    </p>
                                </div>
                            )}
                        </motion.div>
                    </div>

                    <div className="space-y-6">
                        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="premium-card p-6">
                            <h3 className="text-sm font-bold text-navy-500 uppercase tracking-wider mb-5">Financijski sažetak</h3>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs text-navy-400 mb-1">Tražena cijena</p>
                                    <p className="text-2xl font-bold text-navy-950 flex items-center gap-1 metric-numeral">
                                        <Euro className="w-5 h-5 text-gold-600" />
                                        {listing.asking_price ? formatCurrency(listing.asking_price) : 'Na upit'}
                                    </p>
                                </div>
                                <hr className="border-navy-100" />
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs text-navy-400 mb-1">Prihod</p>
                                        <p className="text-sm font-bold text-navy-950 metric-numeral">{listing.revenue ? formatCurrency(listing.revenue) : hasNda ? '-' : 'Zaključano'}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-navy-400 mb-1">EBITDA</p>
                                        <p className="text-sm font-bold text-navy-950 metric-numeral">{listing.ebitda ? formatCurrency(listing.ebitda) : hasNda ? '-' : 'Zaključano'}</p>
                                    </div>
                                </div>
                                {ebitdaMultiple && (
                                    <>
                                        <hr className="border-navy-100" />
                                        <div>
                                            <p className="text-xs text-navy-400 mb-1">EBITDA multiplikator</p>
                                            <p className="text-sm font-bold text-gold-700 flex items-center gap-1">
                                                <TrendingUp className="w-3.5 h-3.5" />
                                                {ebitdaMultiple}x
                                            </p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14 }} className="premium-card p-6">
                            {!user ? (
                                <ActionState icon={Shield} title="Prijavite se za pristup" desc="Kreirajte račun kako biste zatražili NDA pristup i pratili priliku.">
                                    <Link href="/login?mode=signup" className="cta-primary cta-primary-ink w-full">
                                        Kreirajte račun
                                    </Link>
                                </ActionState>
                            ) : hasNda ? (
                                <ActionState icon={CheckCircle2} title="NDA pristup odobren" desc="Možete pristupiti dodatnim dokumentima i pitanjima u transakcijskoj sobi.">
                                    <button className="cta-primary cta-primary-ink w-full">
                                        <FileText className="w-4 h-4 inline mr-2" />
                                        Otvori data room
                                    </button>
                                </ActionState>
                            ) : ndaRequested ? (
                                <ActionState icon={AlertCircle} title="Zahtjev je poslan" desc="Savjetnik će pregledati zahtjev i javiti se s idućim korakom." />
                            ) : listing.seller_id === user.id ? (
                                <ActionState icon={Star} title="Vaš profil" desc="Ovim profilom upravljate kroz prodavateljsku nadzornu ploču.">
                                    <Link href="/dashboard/seller" className="cta-primary cta-primary-gold w-full">
                                        Nadzorna ploča
                                    </Link>
                                </ActionState>
                            ) : (
                                <ActionState icon={Lock} title="Zatražite NDA pristup" desc="Nakon odobrenja otvara se puni set dokumenata i dodatnih financija.">
                                    <button onClick={requestNda} disabled={ndaLoading} className="cta-primary cta-primary-ink w-full hover:shadow-lg disabled:opacity-50">
                                        {ndaLoading ? (
                                            <span className="block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
                                        ) : (
                                            <>
                                                <Send className="w-4 h-4 inline mr-2" />
                                                Pošalji zahtjev
                                            </>
                                        )}
                                    </button>
                                </ActionState>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Metric({ label, value, icon: Icon }: { label: string; value: string; icon?: LucideIcon }) {
    return (
        <div className="bg-navy-50 rounded-lg p-4">
            <p className="text-xs text-navy-400 uppercase tracking-wider mb-1">{label}</p>
            <p className="text-base font-bold text-navy-950 flex items-center gap-1.5">
                {Icon && <Icon className="w-4 h-4 text-gold-600" />}
                {value}
            </p>
        </div>
    )
}

function ActionState({ icon: Icon, title, desc, children }: {
    icon: LucideIcon
    title: string
    desc: string
    children?: ReactNode
}) {
    return (
        <div className="text-center">
            <Icon className="w-10 h-10 text-gold-600 mx-auto mb-3" />
            <h3 className="font-bold text-navy-950 mb-2">{title}</h3>
            <p className="text-sm text-navy-500 mb-4 font-sans">{desc}</p>
            {children}
        </div>
    )
}
