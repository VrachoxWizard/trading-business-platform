'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
    MapPin,
    Building2,
    Users,
    TrendingUp,
    Shield,
    Lock,
    FileText,
    Clock,
    ArrowLeft,
    CheckCircle2,
    AlertCircle,
    Send,
    Star,
    Euro,
} from 'lucide-react'
import { formatCurrency, timeAgo } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'

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

    return (
        <div className="min-h-screen bg-navy-50 pt-24">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Back */}
                <Link
                    href="/listings"
                    className="inline-flex items-center gap-2 text-sm text-navy-500 hover:text-navy-700 mb-6 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Deal Flow
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-2xl shadow-card border border-navy-100 p-8"
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-accent-100 text-accent-700 text-xs font-semibold">
                                            <Building2 className="w-3 h-3" />
                                            {listing.industry}
                                        </span>
                                        {listing.is_anonymous && (
                                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-navy-100 text-navy-600 text-xs font-semibold">
                                                <Shield className="w-3 h-3" />
                                                Anonymous
                                            </span>
                                        )}
                                    </div>
                                    <h1 className="text-2xl md:text-3xl font-bold text-navy-950 mb-2">
                                        {listing.title}
                                    </h1>
                                    <div className="flex items-center gap-4 text-sm text-navy-500">
                                        <span className="flex items-center gap-1">
                                            <MapPin className="w-4 h-4" />
                                            {listing.region}{listing.city && !listing.is_anonymous ? `, ${listing.city}` : ''}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-4 h-4" />
                                            Listed {timeAgo(listing.created_at)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            {listing.description && (
                                <div className="mb-8">
                                    <h2 className="text-lg font-bold text-navy-950 mb-3">Business Overview</h2>
                                    <p className="text-navy-600 leading-relaxed">{listing.description}</p>
                                </div>
                            )}

                            {/* Business Details */}
                            <div className="mb-8">
                                <h2 className="text-lg font-bold text-navy-950 mb-4">Key Details</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    {listing.year_established && (
                                        <div className="bg-navy-50 rounded-xl p-4">
                                            <p className="text-xs text-navy-400 uppercase tracking-wider mb-1">Established</p>
                                            <p className="text-lg font-bold text-navy-950">{listing.year_established}</p>
                                        </div>
                                    )}
                                    {listing.business_model && (
                                        <div className="bg-navy-50 rounded-xl p-4">
                                            <p className="text-xs text-navy-400 uppercase tracking-wider mb-1">Business Model</p>
                                            <p className="text-lg font-bold text-navy-950">{listing.business_model}</p>
                                        </div>
                                    )}
                                    {listing.employee_count && (
                                        <div className="bg-navy-50 rounded-xl p-4">
                                            <p className="text-xs text-navy-400 uppercase tracking-wider mb-1">Employees</p>
                                            <p className="text-lg font-bold text-navy-950 flex items-center gap-1.5">
                                                <Users className="w-4 h-4 text-accent-500" />
                                                {listing.employee_count}
                                            </p>
                                        </div>
                                    )}
                                    {listing.reason_for_sale && (
                                        <div className="bg-navy-50 rounded-xl p-4">
                                            <p className="text-xs text-navy-400 uppercase tracking-wider mb-1">Reason for Sale</p>
                                            <p className="text-sm font-semibold text-navy-700">{listing.reason_for_sale}</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Confidential section */}
                            {!hasNda && (
                                <div className="bg-gold-100 border border-gold-200 rounded-xl p-6 text-center">
                                    <Lock className="w-8 h-8 text-gold-600 mx-auto mb-3" />
                                    <h3 className="text-lg font-bold text-navy-950 mb-2">
                                        Detailed financials are NDA-protected
                                    </h3>
                                    <p className="text-sm text-navy-600 mb-4">
                                        Request NDA access to view the Confidential Information Memorandum, financial reports, and deal room documents.
                                    </p>
                                </div>
                            )}
                        </motion.div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Financials Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white rounded-2xl shadow-card border border-navy-100 p-6"
                        >
                            <h3 className="text-sm font-semibold text-navy-500 uppercase tracking-wider mb-4">
                                Financial Summary
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs text-navy-400 mb-1">Asking Price</p>
                                    <p className="text-2xl font-bold text-navy-950 flex items-center gap-1">
                                        <Euro className="w-5 h-5 text-gold-500" />
                                        {listing.asking_price ? formatCurrency(listing.asking_price) : 'On Request'}
                                    </p>
                                </div>
                                <hr className="border-navy-100" />
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs text-navy-400 mb-1">Revenue</p>
                                        <p className="text-sm font-bold text-navy-950">
                                            {listing.revenue ? formatCurrency(listing.revenue) : hasNda ? '—' : '🔒'}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-navy-400 mb-1">EBITDA</p>
                                        <p className="text-sm font-bold text-navy-950">
                                            {listing.ebitda ? formatCurrency(listing.ebitda) : hasNda ? '—' : '🔒'}
                                        </p>
                                    </div>
                                </div>
                                {ebitdaMultiple && (
                                    <>
                                        <hr className="border-navy-100" />
                                        <div>
                                            <p className="text-xs text-navy-400 mb-1">EBITDA Multiple</p>
                                            <p className="text-sm font-bold text-accent-600 flex items-center gap-1">
                                                <TrendingUp className="w-3.5 h-3.5" />
                                                {ebitdaMultiple}x
                                            </p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </motion.div>

                        {/* NDA / Action Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-2xl shadow-card border border-navy-100 p-6"
                        >
                            {!user ? (
                                <div className="text-center">
                                    <Shield className="w-10 h-10 text-navy-300 mx-auto mb-3" />
                                    <h3 className="font-bold text-navy-950 mb-2">Sign in to request access</h3>
                                    <p className="text-sm text-navy-500 mb-4">
                                        Create a free account to request NDA access and view full details.
                                    </p>
                                    <Link
                                        href="/login?mode=signup"
                                        className="block w-full py-3 rounded-xl gradient-accent text-white font-semibold text-sm text-center shadow-lg"
                                    >
                                        Create Free Account
                                    </Link>
                                </div>
                            ) : hasNda ? (
                                <div className="text-center">
                                    <CheckCircle2 className="w-10 h-10 text-green-500 mx-auto mb-3" />
                                    <h3 className="font-bold text-navy-950 mb-2">NDA Access Granted</h3>
                                    <p className="text-sm text-navy-500 mb-4">
                                        You have full access to confidential documents and the deal room.
                                    </p>
                                    <button className="block w-full py-3 rounded-xl gradient-accent text-white font-semibold text-sm text-center shadow-lg">
                                        <FileText className="w-4 h-4 inline mr-2" />
                                        View Deal Room
                                    </button>
                                </div>
                            ) : ndaRequested ? (
                                <div className="text-center">
                                    <AlertCircle className="w-10 h-10 text-amber-500 mx-auto mb-3" />
                                    <h3 className="font-bold text-navy-950 mb-2">NDA Request Sent</h3>
                                    <p className="text-sm text-navy-500">
                                        The broker will review your request and respond shortly.
                                    </p>
                                </div>
                            ) : listing.seller_id === user.id ? (
                                <div className="text-center">
                                    <Star className="w-10 h-10 text-gold-500 mx-auto mb-3" />
                                    <h3 className="font-bold text-navy-950 mb-2">Your Listing</h3>
                                    <p className="text-sm text-navy-500 mb-4">
                                        Manage this listing from your dashboard.
                                    </p>
                                    <Link
                                        href="/dashboard/seller"
                                        className="block w-full py-3 rounded-xl gradient-gold text-navy-950 font-semibold text-sm text-center shadow-lg"
                                    >
                                        Go to Dashboard
                                    </Link>
                                </div>
                            ) : (
                                <div className="text-center">
                                    <Lock className="w-10 h-10 text-accent-500 mx-auto mb-3" />
                                    <h3 className="font-bold text-navy-950 mb-2">Request NDA Access</h3>
                                    <p className="text-sm text-navy-500 mb-4">
                                        Sign an NDA to unlock the full CIM, financial reports, and deal room.
                                    </p>
                                    <button
                                        onClick={requestNda}
                                        disabled={ndaLoading}
                                        className="block w-full py-3 rounded-xl gradient-accent text-white font-semibold text-sm text-center shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                                    >
                                        {ndaLoading ? (
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
                                        ) : (
                                            <>
                                                <Send className="w-4 h-4 inline mr-2" />
                                                Request NDA
                                            </>
                                        )}
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    )
}
