'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
    BarChart3,
    Building2,
    Calendar,
    ChevronDown,
    Filter,
    Lock,
    MapPin,
    Search,
    SlidersHorizontal,
    Users,
    X,
} from 'lucide-react'
import { EV_RANGES, INDUSTRIES, REGIONS } from '@/lib/constants'
import { formatCurrency, timeAgo } from '@/lib/utils'

interface Listing {
    id: string
    title: string
    industry: string
    region: string
    revenue: number | null
    ebitda: number | null
    asking_price: number | null
    employee_count: number | null
    status: string
    is_anonymous: boolean
    created_at: string
    reason_for_sale: string | null
    business_model: string | null
}

export default function ListingsClient({ listings }: { listings: Listing[] }) {
    const [search, setSearch] = useState('')
    const [industry, setIndustry] = useState('')
    const [region, setRegion] = useState('')
    const [evRange, setEvRange] = useState('')
    const [showFilters, setShowFilters] = useState(false)
    const [sortBy, setSortBy] = useState<'newest' | 'price_asc' | 'price_desc'>('newest')

    const filtered = useMemo(() => {
        let result = [...listings]

        if (search) {
            const query = search.toLowerCase()
            result = result.filter((listing) =>
                listing.title.toLowerCase().includes(query) ||
                listing.industry.toLowerCase().includes(query) ||
                listing.region.toLowerCase().includes(query)
            )
        }

        if (industry) result = result.filter((listing) => listing.industry === industry)
        if (region) result = result.filter((listing) => listing.region === region)

        if (evRange) {
            const range = EV_RANGES.find((item) => item.label === evRange)
            if (range) {
                result = result.filter((listing) =>
                    listing.asking_price !== null &&
                    listing.asking_price >= range.min &&
                    listing.asking_price <= range.max
                )
            }
        }

        switch (sortBy) {
            case 'price_asc':
                result.sort((a, b) => (a.asking_price || 0) - (b.asking_price || 0))
                break
            case 'price_desc':
                result.sort((a, b) => (b.asking_price || 0) - (a.asking_price || 0))
                break
            default:
                result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        }

        return result
    }, [listings, search, industry, region, evRange, sortBy])

    const activeFilters = [industry, region, evRange].filter(Boolean).length
    const clearFilters = () => {
        setIndustry('')
        setRegion('')
        setEvRange('')
        setSearch('')
    }

    return (
        <div className="min-h-screen bg-background pt-24">
            <div className="section-shell py-8">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start mb-8">
                    <div>
                        <p className="eyebrow mb-4">
                            <Lock className="w-3.5 h-3.5" />
                            Povjerljiva tržnica
                        </p>
                        <h1 className="text-3xl md:text-5xl font-bold text-navy-950 mb-3">Tržnica prilika</h1>
                        <p className="text-navy-500 text-lg max-w-3xl font-sans">
                            Pregledajte strukturirane akvizicijske prilike s anonimnim profilom, osnovnim metrikama i NDA pristupom za detalje.
                        </p>
                    </div>
                    <div className="premium-card p-5">
                        <div className="grid grid-cols-3 gap-3 text-center">
                            <div>
                                <p className="text-2xl font-bold text-navy-950 metric-numeral">{listings.length}</p>
                                <p className="text-xs text-navy-500 font-sans">aktivno</p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-navy-950 metric-numeral">{activeFilters}</p>
                                <p className="text-xs text-navy-500 font-sans">filtera</p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-navy-950 metric-numeral">{filtered.length}</p>
                                <p className="text-xs text-navy-500 font-sans">prikazano</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="premium-card p-4 mb-7">
                    <div className="flex flex-col md:flex-row gap-3">
                        <div className="relative flex-1">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-400" />
                            <input
                                type="text"
                                placeholder="Pretražite industriju, regiju ili ključnu riječ..."
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                className="field-shell pl-11"
                            />
                        </div>
                        <button
                            onClick={() => setShowFilters((visible) => !visible)}
                            className={`flex items-center justify-center gap-2 px-5 py-3 rounded-lg border text-sm font-bold transition-all ${showFilters || activeFilters > 0
                                ? 'bg-navy-950 text-white border-navy-950'
                                : 'border-navy-200 text-navy-700 hover:bg-navy-50'
                                }`}
                        >
                            <Filter className="w-4 h-4" />
                            Filteri
                            {activeFilters > 0 && (
                                <span className="bg-gold-400 text-navy-950 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                    {activeFilters}
                                </span>
                            )}
                            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                        </button>
                        <select
                            value={sortBy}
                            onChange={(event) => setSortBy(event.target.value as typeof sortBy)}
                            className="field-shell md:w-[190px]"
                        >
                            <option value="newest">Najnovije</option>
                            <option value="price_asc">Cijena: niža prvo</option>
                            <option value="price_desc">Cijena: viša prvo</option>
                        </select>
                    </div>

                    {showFilters && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mt-4 pt-4 border-t border-navy-100"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-navy-500 uppercase tracking-wider mb-2">
                                        Industrija
                                    </label>
                                    <select value={industry} onChange={(event) => setIndustry(event.target.value)} className="field-shell">
                                        <option value="">Sve industrije</option>
                                        {INDUSTRIES.map((item) => (
                                            <option key={item} value={item}>{item}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-navy-500 uppercase tracking-wider mb-2">
                                        Regija
                                    </label>
                                    <select value={region} onChange={(event) => setRegion(event.target.value)} className="field-shell">
                                        <option value="">Sve regije</option>
                                        {REGIONS.map((item) => (
                                            <option key={item} value={item}>{item}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-navy-500 uppercase tracking-wider mb-2">
                                        Vrijednost transakcije
                                    </label>
                                    <select value={evRange} onChange={(event) => setEvRange(event.target.value)} className="field-shell">
                                        <option value="">Svi rasponi</option>
                                        {EV_RANGES.map((item) => (
                                            <option key={item.label} value={item.label}>{item.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            {activeFilters > 0 && (
                                <button
                                    onClick={clearFilters}
                                    className="mt-4 flex items-center gap-1 text-sm text-red-600 hover:text-red-700 font-bold"
                                >
                                    <X className="w-4 h-4" />
                                    Očisti sve filtere
                                </button>
                            )}
                        </motion.div>
                    )}
                </div>

                <div className="flex items-center justify-between gap-4 mb-5">
                    <p className="text-sm text-navy-500 font-sans">
                        Prikazano <span className="font-bold text-navy-700 metric-numeral">{filtered.length}</span> {filtered.length === 1 ? 'prilika' : 'prilike'}
                    </p>
                    <div className="hidden sm:flex items-center gap-2 text-xs text-navy-500 font-bold uppercase tracking-wider">
                        <SlidersHorizontal className="w-4 h-4" />
                        Anonimni profili
                    </div>
                </div>

                {filtered.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filtered.map((listing, index) => (
                            <motion.div
                                key={listing.id}
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.03 }}
                            >
                                <Link href={`/listings/${listing.id}`} className="premium-card block overflow-hidden group h-full card-interactive hover:shadow-elevated">
                                    <div className="p-6">
                                        <div className="flex items-start justify-between gap-3 mb-4">
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gold-100 text-gold-700 text-xs font-bold">
                                                <Building2 className="w-3.5 h-3.5" />
                                                {listing.industry}
                                            </span>
                                            <span className="text-xs text-navy-400 flex items-center gap-1">
                                                <Calendar className="w-3.5 h-3.5" />
                                                {timeAgo(listing.created_at)}
                                            </span>
                                        </div>

                                        <h3 className="text-xl font-bold text-navy-950 mb-2 group-hover:text-gold-700 transition-colors">
                                            {listing.title}
                                        </h3>

                                        <div className="flex items-center gap-1.5 text-sm text-navy-500 mb-4">
                                            <MapPin className="w-3.5 h-3.5" />
                                            {listing.region}
                                        </div>

                                        {listing.reason_for_sale && (
                                            <p className="text-sm text-navy-500 mb-4 line-clamp-2 font-sans">
                                                {listing.reason_for_sale}
                                            </p>
                                        )}
                                    </div>

                                    <div className="px-6 py-4 bg-navy-50/70 border-t border-navy-100">
                                        <div className="grid grid-cols-3 gap-3">
                                            <div>
                                                <p className="text-xs text-navy-400 mb-1">Cijena</p>
                                                <p className="text-sm font-bold text-navy-950 metric-numeral">
                                                    {listing.asking_price ? formatCurrency(listing.asking_price) : 'Na upit'}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-navy-400 mb-1">Prihod</p>
                                                <p className="text-sm font-bold text-navy-950 metric-numeral">
                                                    {listing.revenue ? formatCurrency(listing.revenue) : '-'}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-navy-400 mb-1">Tim</p>
                                                <p className="text-sm font-bold text-navy-950 flex items-center gap-1 metric-numeral">
                                                    <Users className="w-3.5 h-3.5 text-navy-400" />
                                                    {listing.employee_count || '-'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="premium-card relative p-12 md:p-20 text-center overflow-hidden border-dashed border-2 border-navy-200">
                        <div className="w-20 h-20 rounded-2xl bg-navy-50 border border-navy-100 flex items-center justify-center mx-auto mb-6 shadow-sm">
                            <BarChart3 className="w-8 h-8 text-gold-600" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-display font-bold text-navy-950 mb-3">Trenutno nema prikazanih prilika</h3>
                        <p className="text-navy-500 text-lg mb-8 max-w-xl mx-auto font-sans">
                            {activeFilters > 0
                                ? 'Niti jedna prilika ne odgovara vašim filterima. Pokušajte proširiti kriterije ili zabilježite svoj profil interesa kako bismo vas obavijestili.'
                                : 'Naše transakcije vode se strogo povjerljivo. Javite nam svoj investicijski fokus kako biste dobili ekskluzivan pristup novim prilikama.'}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            {activeFilters > 0 && (
                                <button onClick={clearFilters} className="px-6 py-3.5 rounded-lg border border-navy-200 text-navy-700 font-bold text-sm hover:bg-navy-50 transition-all">
                                    Očisti filtere
                                </button>
                            )}
                            <Link href="/contact" className="px-6 py-3.5 rounded-lg gradient-gold text-navy-950 font-bold text-sm shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5">
                                Zabilježite profil interesa
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
