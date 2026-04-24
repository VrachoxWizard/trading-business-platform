'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
    Building2,
    Plus,
    FileText,
    Clock,
    CheckCircle2,
    XCircle,
    ExternalLink,
    TrendingUp,
    Users,
    BarChart3,
    LogOut,
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

const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
}

export default function SellerDashboardClient({ profile, listings, ndas }: Props) {
    const totalListings = listings.length
    const activeListings = listings.filter((l) => l.status === 'active').length
    const totalNdas = ndas.length
    const pendingNdas = ndas.filter((n) => n.status === 'pending').length

    const stats = [
        { icon: Building2, label: 'Total Listings', value: totalListings, color: 'bg-accent-100 text-accent-600' },
        { icon: CheckCircle2, label: 'Active', value: activeListings, color: 'bg-green-100 text-green-600' },
        { icon: FileText, label: 'NDA Requests', value: totalNdas, color: 'bg-gold-100 text-gold-600' },
        { icon: Clock, label: 'Pending NDAs', value: pendingNdas, color: 'bg-amber-100 text-amber-600' },
    ]

    return (
        <div className="min-h-screen bg-navy-50 pt-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-navy-950">
                            Welcome, {profile?.full_name || 'Seller'}
                        </h1>
                        <p className="text-navy-500 mt-1">Manage your listings and track deal progress</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link
                            href="/sell/onboard"
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-gold text-navy-950 font-semibold text-sm shadow-lg hover:shadow-xl transition-all"
                        >
                            <Plus className="w-4 h-4" />
                            New Listing
                        </Link>
                        <form action="/auth/signout" method="POST">
                            <button
                                type="submit"
                                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-navy-200 text-navy-600 text-sm font-medium hover:bg-white transition-all"
                            >
                                <LogOut className="w-4 h-4" />
                                Sign Out
                            </button>
                        </form>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {stats.map((stat) => {
                        const Icon = stat.icon
                        return (
                            <motion.div
                                key={stat.label}
                                {...fadeIn}
                                className="bg-white rounded-2xl shadow-card border border-navy-100 p-5"
                            >
                                <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center mb-3`}>
                                    <Icon className="w-5 h-5" />
                                </div>
                                <p className="text-2xl font-bold text-navy-950">{stat.value}</p>
                                <p className="text-xs text-navy-400 mt-1">{stat.label}</p>
                            </motion.div>
                        )
                    })}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Listings Table */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-card border border-navy-100">
                            <div className="px-6 py-4 border-b border-navy-100 flex items-center justify-between">
                                <h2 className="text-lg font-bold text-navy-950">Your Listings</h2>
                                <Link href="/sell/onboard" className="text-sm text-accent-600 font-medium hover:text-accent-700">
                                    + Add New
                                </Link>
                            </div>
                            {listings.length > 0 ? (
                                <div className="divide-y divide-navy-100">
                                    {listings.map((listing) => {
                                        const status = LISTING_STATUSES[listing.status as keyof typeof LISTING_STATUSES]
                                        return (
                                            <div key={listing.id} className="px-6 py-4 flex items-center justify-between hover:bg-navy-50/50 transition-colors">
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <h3 className="text-sm font-semibold text-navy-950 truncate">{listing.title}</h3>
                                                        <span
                                                            className="inline-flex px-2 py-0.5 rounded-full text-xs font-semibold"
                                                            style={{
                                                                backgroundColor: status?.color + '20',
                                                                color: status?.color,
                                                            }}
                                                        >
                                                            {status?.label}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-4 text-xs text-navy-400">
                                                        <span>{listing.industry}</span>
                                                        <span>{listing.asking_price ? formatCurrency(listing.asking_price) : '—'}</span>
                                                        <span>{timeAgo(listing.created_at)}</span>
                                                    </div>
                                                </div>
                                                <Link href={`/listings/${listing.id}`} className="text-navy-400 hover:text-accent-600 transition-colors">
                                                    <ExternalLink className="w-4 h-4" />
                                                </Link>
                                            </div>
                                        )
                                    })}
                                </div>
                            ) : (
                                <div className="p-12 text-center">
                                    <Building2 className="w-12 h-12 text-navy-200 mx-auto mb-4" />
                                    <p className="text-navy-500 font-medium mb-2">No listings yet</p>
                                    <p className="text-sm text-navy-400 mb-4">Create your first listing to start attracting buyers.</p>
                                    <Link
                                        href="/sell/onboard"
                                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-accent text-white font-semibold text-sm shadow-lg"
                                    >
                                        <Plus className="w-4 h-4" />
                                        Create Listing
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* NDA Activity */}
                    <div>
                        <div className="bg-white rounded-2xl shadow-card border border-navy-100">
                            <div className="px-6 py-4 border-b border-navy-100">
                                <h2 className="text-lg font-bold text-navy-950">NDA Activity</h2>
                            </div>
                            {ndas.length > 0 ? (
                                <div className="divide-y divide-navy-100">
                                    {ndas.map((nda) => (
                                        <div key={nda.id} className="px-6 py-4">
                                            <div className="flex items-center gap-2 mb-1">
                                                {nda.status === 'pending' && <Clock className="w-4 h-4 text-amber-500" />}
                                                {nda.status === 'approved' && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                                                {nda.status === 'rejected' && <XCircle className="w-4 h-4 text-red-500" />}
                                                {nda.status === 'signed' && <FileText className="w-4 h-4 text-accent-500" />}
                                                <span className="text-sm font-medium text-navy-700 capitalize">{nda.status}</span>
                                            </div>
                                            <p className="text-xs text-navy-400 truncate">
                                                {nda.listings?.title} · {timeAgo(nda.requested_at)}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-8 text-center">
                                    <FileText className="w-10 h-10 text-navy-200 mx-auto mb-3" />
                                    <p className="text-sm text-navy-400">No NDA requests yet</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
