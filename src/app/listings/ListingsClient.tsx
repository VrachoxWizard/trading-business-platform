'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
    Search,
    Filter,
    MapPin,
    Euro,
    Users,
    TrendingUp,
    ChevronDown,
    X,
    Building2,
    Calendar,
} from 'lucide-react'
import { INDUSTRIES, REGIONS, EV_RANGES } from '@/lib/constants'
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

const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4 },
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
            const s = search.toLowerCase()
            result = result.filter(
                (l) =>
                    l.title.toLowerCase().includes(s) ||
                    l.industry.toLowerCase().includes(s) ||
                    l.region.toLowerCase().includes(s)
            )
        }

        if (industry) result = result.filter((l) => l.industry === industry)
        if (region) result = result.filter((l) => l.region === region)

        if (evRange) {
            const range = EV_RANGES.find((r) => r.label === evRange)
            if (range) {
                result = result.filter(
                    (l) =>
                        l.asking_price !== null &&
                        l.asking_price >= range.min &&
                        l.asking_price <= range.max
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
                result.sort(
                    (a, b) =>
                        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
                )
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
        <div className="min-h-screen bg-navy-50 pt-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-navy-950 mb-2">Deal Flow</h1>
                    <p className="text-navy-500 text-lg">
                        Explore pre-screened M&A opportunities across Croatia and the region.
                    </p>
                </div>

                {/* Search & Filter Bar */}
                <div className="bg-white rounded-2xl shadow-card border border-navy-100 p-4 mb-8">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-400" />
                            <input
                                type="text"
                                placeholder="Search by industry, region, or keyword..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 rounded-xl border border-navy-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                            />
                        </div>
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className={`flex items-center gap-2 px-5 py-3 rounded-xl border text-sm font-medium transition-all ${showFilters || activeFilters > 0
                                    ? 'bg-accent-600 text-white border-accent-600'
                                    : 'border-navy-200 text-navy-700 hover:bg-navy-50'
                                }`}
                        >
                            <Filter className="w-4 h-4" />
                            Filters
                            {activeFilters > 0 && (
                                <span className="bg-white text-accent-600 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                    {activeFilters}
                                </span>
                            )}
                            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                        </button>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                            className="px-4 py-3 rounded-xl border border-navy-200 text-sm text-navy-700 focus:outline-none focus:ring-2 focus:ring-accent-500"
                        >
                            <option value="newest">Newest First</option>
                            <option value="price_asc">Price: Low to High</option>
                            <option value="price_desc">Price: High to Low</option>
                        </select>
                    </div>

                    {/* Expandable Filters */}
                    {showFilters && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mt-4 pt-4 border-t border-navy-100"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-navy-500 uppercase tracking-wider mb-2">
                                        Industry
                                    </label>
                                    <select
                                        value={industry}
                                        onChange={(e) => setIndustry(e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-navy-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500"
                                    >
                                        <option value="">All Industries</option>
                                        {INDUSTRIES.map((i) => (
                                            <option key={i} value={i}>{i}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-navy-500 uppercase tracking-wider mb-2">
                                        Region
                                    </label>
                                    <select
                                        value={region}
                                        onChange={(e) => setRegion(e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-navy-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500"
                                    >
                                        <option value="">All Regions</option>
                                        {REGIONS.map((r) => (
                                            <option key={r} value={r}>{r}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-navy-500 uppercase tracking-wider mb-2">
                                        Enterprise Value
                                    </label>
                                    <select
                                        value={evRange}
                                        onChange={(e) => setEvRange(e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-navy-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500"
                                    >
                                        <option value="">All Ranges</option>
                                        {EV_RANGES.map((r) => (
                                            <option key={r.label} value={r.label}>{r.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            {activeFilters > 0 && (
                                <button
                                    onClick={clearFilters}
                                    className="mt-4 flex items-center gap-1 text-sm text-red-500 hover:text-red-600 font-medium"
                                >
                                    <X className="w-4 h-4" />
                                    Clear all filters
                                </button>
                            )}
                        </motion.div>
                    )}
                </div>

                {/* Results count */}
                <p className="text-sm text-navy-500 mb-6">
                    Showing <span className="font-semibold text-navy-700">{filtered.length}</span> {filtered.length === 1 ? 'deal' : 'deals'}
                </p>

                {/* Listings Grid */}
                {filtered.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filtered.map((listing, i) => (
                            <motion.div
                                key={listing.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                            >
                                <Link href={`/listings/${listing.id}`}>
                                    <div className="bg-white rounded-2xl shadow-card border border-navy-100 hover:shadow-elevated hover:border-accent-200 transition-all duration-300 overflow-hidden group cursor-pointer h-full flex flex-col">
                                        {/* Card header */}
                                        <div className="p-6 flex-1">
                                            <div className="flex items-start justify-between mb-4">
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-accent-100 text-accent-700 text-xs font-semibold">
                                                    <Building2 className="w-3 h-3" />
                                                    {listing.industry}
                                                </span>
                                                <span className="text-xs text-navy-400 flex items-center gap-1">
                                                    <Calendar className="w-3 h-3" />
                                                    {timeAgo(listing.created_at)}
                                                </span>
                                            </div>

                                            <h3 className="text-lg font-bold text-navy-950 mb-2 group-hover:text-accent-600 transition-colors line-clamp-2">
                                                {listing.title}
                                            </h3>

                                            <div className="flex items-center gap-1.5 text-sm text-navy-500 mb-4">
                                                <MapPin className="w-3.5 h-3.5" />
                                                {listing.region}
                                            </div>

                                            {listing.reason_for_sale && (
                                                <p className="text-sm text-navy-400 mb-4 line-clamp-2">
                                                    {listing.reason_for_sale}
                                                </p>
                                            )}
                                        </div>

                                        {/* Card footer with metrics */}
                                        <div className="px-6 py-4 bg-navy-50/50 border-t border-navy-100">
                                            <div className="grid grid-cols-3 gap-3">
                                                <div>
                                                    <p className="text-xs text-navy-400 mb-0.5">Asking Price</p>
                                                    <p className="text-sm font-bold text-navy-950">
                                                        {listing.asking_price ? formatCurrency(listing.asking_price) : 'On Request'}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-navy-400 mb-0.5">Revenue</p>
                                                    <p className="text-sm font-bold text-navy-950">
                                                        {listing.revenue ? formatCurrency(listing.revenue) : '—'}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-navy-400 mb-0.5">Team</p>
                                                    <p className="text-sm font-bold text-navy-950 flex items-center gap-1">
                                                        <Users className="w-3 h-3 text-navy-400" />
                                                        {listing.employee_count || '—'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-card border border-navy-100 p-16 text-center">
                        <div className="w-16 h-16 rounded-2xl bg-navy-100 flex items-center justify-center mx-auto mb-6">
                            <Search className="w-8 h-8 text-navy-400" />
                        </div>
                        <h3 className="text-xl font-bold text-navy-950 mb-2">No deals found</h3>
                        <p className="text-navy-500 mb-6">
                            {activeFilters > 0
                                ? 'Try adjusting your filters to see more results.'
                                : 'No active listings at the moment. Check back soon or create an alert.'}
                        </p>
                        {activeFilters > 0 && (
                            <button
                                onClick={clearFilters}
                                className="px-6 py-3 rounded-xl gradient-accent text-white font-semibold text-sm"
                            >
                                Clear Filters
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
