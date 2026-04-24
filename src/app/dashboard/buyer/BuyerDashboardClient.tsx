'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
    Search,
    Heart,
    FileText,
    Clock,
    CheckCircle2,
    XCircle,
    ExternalLink,
    TrendingUp,
    Target,
    Sparkles,
    LogOut,
    MapPin,
    Building2,
} from 'lucide-react'
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
        { icon: Heart, label: 'Saved Deals', value: shortlists.length, color: 'bg-red-100 text-red-600' },
        { icon: FileText, label: 'Active NDAs', value: ndas.filter((n) => n.status === 'signed' || n.status === 'approved').length, color: 'bg-green-100 text-green-600' },
        { icon: Clock, label: 'Pending NDAs', value: ndas.filter((n) => n.status === 'pending').length, color: 'bg-amber-100 text-amber-600' },
        { icon: Target, label: 'Target Industries', value: buyerProfile?.target_industries?.length || 0, color: 'bg-accent-100 text-accent-600' },
    ]

    return (
        <div className="min-h-screen bg-navy-50 pt-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-navy-950">
                            Welcome, {profile?.full_name || 'Investor'}
                        </h1>
                        <p className="text-navy-500 mt-1">Track your deal pipeline and matches</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link
                            href="/listings"
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-accent text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-all"
                        >
                            <Search className="w-4 h-4" />
                            Browse Deals
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
                            <div key={stat.label} className="bg-white rounded-2xl shadow-card border border-navy-100 p-5">
                                <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center mb-3`}>
                                    <Icon className="w-5 h-5" />
                                </div>
                                <p className="text-2xl font-bold text-navy-950">{stat.value}</p>
                                <p className="text-xs text-navy-400 mt-1">{stat.label}</p>
                            </div>
                        )
                    })}
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-2xl shadow-card border border-navy-100">
                    <div className="flex border-b border-navy-100">
                        {[
                            { key: 'shortlists' as const, label: 'Saved Deals', icon: Heart },
                            { key: 'ndas' as const, label: 'NDA Requests', icon: FileText },
                            { key: 'matches' as const, label: 'AI Matches', icon: Sparkles },
                        ].map((tab) => {
                            const Icon = tab.icon
                            return (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveTab(tab.key)}
                                    className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-all ${activeTab === tab.key
                                            ? 'border-accent-600 text-accent-600'
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
                                        <div key={item.id} className="flex items-center justify-between p-4 rounded-xl bg-navy-50 hover:bg-navy-100 transition-colors">
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-sm font-semibold text-navy-950 truncate">{item.listings?.title}</h3>
                                                <div className="flex items-center gap-3 text-xs text-navy-400 mt-1">
                                                    <span className="flex items-center gap-1"><Building2 className="w-3 h-3" /> {item.listings?.industry}</span>
                                                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {item.listings?.region}</span>
                                                    {item.listings?.asking_price && <span>{formatCurrency(item.listings.asking_price)}</span>}
                                                </div>
                                            </div>
                                            <Link href={`/listings/${item.listing_id}`} className="text-accent-600 hover:text-accent-700">
                                                <ExternalLink className="w-4 h-4" />
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-12 text-center">
                                    <Heart className="w-12 h-12 text-navy-200 mx-auto mb-4" />
                                    <p className="text-navy-500  font-medium mb-2">No saved deals</p>
                                    <p className="text-sm text-navy-400 mb-4">Browse the marketplace and save interesting opportunities.</p>
                                    <Link href="/listings" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-accent text-white font-semibold text-sm">
                                        <Search className="w-4 h-4" /> Browse Deals
                                    </Link>
                                </div>
                            )
                        )}

                        {activeTab === 'ndas' && (
                            ndas.length > 0 ? (
                                <div className="space-y-3">
                                    {ndas.map((nda) => (
                                        <div key={nda.id} className="flex items-center justify-between p-4 rounded-xl bg-navy-50">
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    {nda.status === 'pending' && <Clock className="w-4 h-4 text-amber-500" />}
                                                    {nda.status === 'approved' && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                                                    {nda.status === 'signed' && <FileText className="w-4 h-4 text-accent-500" />}
                                                    {nda.status === 'rejected' && <XCircle className="w-4 h-4 text-red-500" />}
                                                    <span className="text-sm font-semibold text-navy-950">{nda.listings?.title}</span>
                                                </div>
                                                <p className="text-xs text-navy-400">
                                                    {nda.listings?.industry} · {nda.listings?.region} · {timeAgo(nda.requested_at)}
                                                </p>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${nda.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                                                    nda.status === 'approved' || nda.status === 'signed' ? 'bg-green-100 text-green-700' :
                                                        'bg-red-100 text-red-700'
                                                }`}>
                                                {nda.status}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-12 text-center">
                                    <FileText className="w-12 h-12 text-navy-200 mx-auto mb-4" />
                                    <p className="text-navy-500 font-medium mb-2">No NDA requests</p>
                                    <p className="text-sm text-navy-400">Request NDA access on listings to view confidential details.</p>
                                </div>
                            )
                        )}

                        {activeTab === 'matches' && (
                            <div className="py-12 text-center">
                                <Sparkles className="w-12 h-12 text-navy-200 mx-auto mb-4" />
                                <p className="text-navy-500 font-medium mb-2">AI Matching Coming Soon</p>
                                <p className="text-sm text-navy-400 max-w-md mx-auto mb-4">
                                    Set up your buyer profile with target industries, regions, and EV range. Our AI will match you with relevant opportunities.
                                </p>
                                {!buyerProfile && (
                                    <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-gold text-navy-950 font-semibold text-sm shadow-lg">
                                        <Target className="w-4 h-4" /> Set Buyer Preferences
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
