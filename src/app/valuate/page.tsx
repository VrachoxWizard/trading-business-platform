'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
    TrendingUp,
    Building2,
    DollarSign,
    BarChart3,
    Globe,
    ChevronRight,
    ChevronLeft,
    CheckCircle2,
    Download,
    Calendar,
    ArrowRight,
    Sparkles,
} from 'lucide-react'
import { INDUSTRIES, REGIONS, INDUSTRY_MULTIPLIERS } from '@/lib/constants'
import { formatCurrency } from '@/lib/utils'

type Step = 1 | 2 | 3 | 4 | 5

interface ValuationData {
    industry: string
    region: string
    yearEstablished: string
    employeeCount: string
    revenue: string
    ebitda: string
    sde: string
    revenueGrowth: string
    ownerDependence: number
    digitalMaturity: number
    customerConcentration: number
    recurringRevenue: number
    competitiveAdvantage: string
    marketTrend: string
}

const initialData: ValuationData = {
    industry: '',
    region: '',
    yearEstablished: '',
    employeeCount: '',
    revenue: '',
    ebitda: '',
    sde: '',
    revenueGrowth: '',
    ownerDependence: 5,
    digitalMaturity: 5,
    customerConcentration: 5,
    recurringRevenue: 3,
    competitiveAdvantage: '',
    marketTrend: 'stable',
}

const stepLabels = [
    'Basic Info',
    'Financials',
    'Qualitative',
    'Market',
    'Report',
]

export default function ValuatePage() {
    const [step, setStep] = useState<Step>(1)
    const [data, setData] = useState<ValuationData>(initialData)
    const [loading, setLoading] = useState(false)
    const [report, setReport] = useState<{
        low: number
        mid: number
        high: number
        readiness: number
        narrative: string
    } | null>(null)

    const update = (field: keyof ValuationData, value: string | number) => {
        setData((prev) => ({ ...prev, [field]: value }))
    }

    const canProceed = () => {
        switch (step) {
            case 1: return data.industry && data.region
            case 2: return data.revenue && data.ebitda
            case 3: return true
            case 4: return data.marketTrend
            default: return true
        }
    }

    const generateReport = async () => {
        setLoading(true)

        // Calculate valuation using industry multipliers
        const multipliers = INDUSTRY_MULTIPLIERS[data.industry] || { evToEbitda: 6, evToRevenue: 1 }
        const ebitda = parseFloat(data.ebitda) || 0
        const revenue = parseFloat(data.revenue) || 0

        // Adjustments based on qualitative factors
        let qualityMultiplier = 1.0
        if (data.ownerDependence <= 3) qualityMultiplier += 0.15
        if (data.ownerDependence >= 8) qualityMultiplier -= 0.15
        if (data.digitalMaturity >= 7) qualityMultiplier += 0.1
        if (data.digitalMaturity <= 3) qualityMultiplier -= 0.1
        if (data.customerConcentration <= 3) qualityMultiplier += 0.1
        if (data.customerConcentration >= 8) qualityMultiplier -= 0.1
        if (data.recurringRevenue >= 7) qualityMultiplier += 0.15
        if (data.marketTrend === 'growing') qualityMultiplier += 0.1
        if (data.marketTrend === 'declining') qualityMultiplier -= 0.15

        const baseEV = ebitda * multipliers.evToEbitda * qualityMultiplier
        const revenueEV = revenue * multipliers.evToRevenue * qualityMultiplier

        const avgEV = (baseEV + revenueEV) / 2

        const low = Math.round(avgEV * 0.75)
        const mid = Math.round(avgEV)
        const high = Math.round(avgEV * 1.3)

        // Readiness score
        let readiness = 50
        if (data.ownerDependence <= 4) readiness += 10
        if (data.digitalMaturity >= 6) readiness += 10
        if (data.customerConcentration <= 4) readiness += 10
        if (data.recurringRevenue >= 5) readiness += 10
        if (parseFloat(data.revenueGrowth) > 10) readiness += 10
        readiness = Math.min(100, Math.max(0, readiness))

        // Try AI narrative or use template
        try {
            const res = await fetch('/api/ai/valuate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...data,
                    valuationLow: low,
                    valuationMid: mid,
                    valuationHigh: high,
                    readinessScore: readiness,
                }),
            })

            if (res.ok) {
                const aiData = await res.json()
                setReport({
                    low,
                    mid,
                    high,
                    readiness,
                    narrative: aiData.narrative || generateFallbackNarrative(low, mid, high, readiness),
                })
            } else {
                setReport({
                    low, mid, high, readiness,
                    narrative: generateFallbackNarrative(low, mid, high, readiness),
                })
            }
        } catch {
            setReport({
                low, mid, high, readiness,
                narrative: generateFallbackNarrative(low, mid, high, readiness),
            })
        }

        setLoading(false)
        setStep(5)
    }

    function generateFallbackNarrative(low: number, mid: number, high: number, readiness: number) {
        return `Based on our analysis of your ${data.industry} business in ${data.region}, we estimate an enterprise value range of ${formatCurrency(low)} to ${formatCurrency(high)}, with a realistic midpoint of ${formatCurrency(mid)}.

Your Sell-Readiness Score of ${readiness}/100 reflects the overall attractiveness of your business to potential acquirers. Key factors considered include owner dependence, digital maturity, customer concentration, and recurring revenue streams.

${readiness >= 70 ? 'Your business shows strong fundamentals for a successful sale. Consider scheduling a consultation with one of our brokers to discuss timing and strategy.' : 'There are opportunities to improve your business\'s attractiveness before going to market. Our brokers can help you create a pre-sale value enhancement plan.'}

This is an indicative estimate based on industry multiples and the information you provided. A formal valuation with access to detailed financials would provide a more precise range.`
    }

    return (
        <div className="min-h-screen bg-navy-50 pt-24">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-100 text-accent-700 text-xs font-semibold mb-4">
                        <Sparkles className="w-3 h-3" />
                        AI-Powered · Free · 5 Minutes
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-navy-950 mb-2">
                        Business Valuator
                    </h1>
                    <p className="text-navy-500 text-lg">
                        Get an estimated valuation range for your business in under 5 minutes.
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="mb-10">
                    <div className="flex items-center justify-between mb-2">
                        {stepLabels.map((label, i) => (
                            <div key={label} className="flex items-center gap-1">
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${i + 1 <= step
                                            ? 'gradient-accent text-white'
                                            : 'bg-navy-100 text-navy-400'
                                        }`}
                                >
                                    {i + 1 <= step && step > i + 1 ? (
                                        <CheckCircle2 className="w-4 h-4" />
                                    ) : (
                                        i + 1
                                    )}
                                </div>
                                <span className="hidden sm:block text-xs font-medium text-navy-500">{label}</span>
                            </div>
                        ))}
                    </div>
                    <div className="w-full bg-navy-100 rounded-full h-2">
                        <div
                            className="gradient-accent h-2 rounded-full transition-all duration-500"
                            style={{ width: `${(step / 5) * 100}%` }}
                        />
                    </div>
                </div>

                {/* Steps */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="bg-white rounded-2xl shadow-card border border-navy-100 p-8">
                            {step === 1 && (
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-10 h-10 rounded-xl bg-accent-100 flex items-center justify-center">
                                            <Building2 className="w-5 h-5 text-accent-600" />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-navy-950">Basic Information</h2>
                                            <p className="text-sm text-navy-500">Tell us about your business</p>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-navy-700 mb-1.5">Industry *</label>
                                        <select value={data.industry} onChange={(e) => update('industry', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-navy-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500">
                                            <option value="">Select industry</option>
                                            {INDUSTRIES.map((i) => <option key={i} value={i}>{i}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-navy-700 mb-1.5">Region *</label>
                                        <select value={data.region} onChange={(e) => update('region', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-navy-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500">
                                            <option value="">Select region</option>
                                            {REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
                                        </select>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-navy-700 mb-1.5">Year Established</label>
                                            <input type="number" value={data.yearEstablished} onChange={(e) => update('yearEstablished', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-navy-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500" placeholder="2010" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-navy-700 mb-1.5">Employees</label>
                                            <input type="number" value={data.employeeCount} onChange={(e) => update('employeeCount', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-navy-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500" placeholder="25" />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-10 h-10 rounded-xl bg-gold-100 flex items-center justify-center">
                                            <DollarSign className="w-5 h-5 text-gold-600" />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-navy-950">Financial Data</h2>
                                            <p className="text-sm text-navy-500">Enter your key financial metrics (EUR)</p>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-navy-700 mb-1.5">Annual Revenue (EUR) *</label>
                                        <input type="number" value={data.revenue} onChange={(e) => update('revenue', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-navy-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500" placeholder="500,000" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-navy-700 mb-1.5">EBITDA (EUR) *</label>
                                        <input type="number" value={data.ebitda} onChange={(e) => update('ebitda', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-navy-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500" placeholder="100,000" />
                                        <p className="text-xs text-navy-400 mt-1">Earnings Before Interest, Taxes, Depreciation & Amortization</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-navy-700 mb-1.5">SDE (Seller Discretionary Earnings)</label>
                                        <input type="number" value={data.sde} onChange={(e) => update('sde', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-navy-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500" placeholder="150,000" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-navy-700 mb-1.5">Revenue Growth (%)</label>
                                        <input type="number" value={data.revenueGrowth} onChange={(e) => update('revenueGrowth', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-navy-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500" placeholder="15" />
                                    </div>
                                </div>
                            )}

                            {step === 3 && (
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-10 h-10 rounded-xl bg-accent-100 flex items-center justify-center">
                                            <BarChart3 className="w-5 h-5 text-accent-600" />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-navy-950">Qualitative Factors</h2>
                                            <p className="text-sm text-navy-500">Rate these factors on a scale of 1–10</p>
                                        </div>
                                    </div>
                                    {[
                                        { key: 'ownerDependence' as const, label: 'Owner Dependence', desc: '1 = business runs without owner, 10 = owner is irreplaceable' },
                                        { key: 'digitalMaturity' as const, label: 'Digital Maturity', desc: '1 = no digital presence, 10 = fully digital operations' },
                                        { key: 'customerConcentration' as const, label: 'Customer Concentration', desc: '1 = highly diversified, 10 = depends on 1-2 clients' },
                                        { key: 'recurringRevenue' as const, label: 'Recurring Revenue', desc: '1 = no recurring revenue, 10 = 100% subscription/recurring' },
                                    ].map((factor) => (
                                        <div key={factor.key}>
                                            <div className="flex justify-between mb-1.5">
                                                <label className="text-sm font-medium text-navy-700">{factor.label}</label>
                                                <span className="text-sm font-bold text-accent-600">{data[factor.key]}/10</span>
                                            </div>
                                            <input
                                                type="range"
                                                min="1"
                                                max="10"
                                                value={data[factor.key]}
                                                onChange={(e) => update(factor.key, parseInt(e.target.value))}
                                                className="w-full accent-accent-600"
                                            />
                                            <p className="text-xs text-navy-400 mt-0.5">{factor.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {step === 4 && (
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-10 h-10 rounded-xl bg-gold-100 flex items-center justify-center">
                                            <Globe className="w-5 h-5 text-gold-600" />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-navy-950">Market Context</h2>
                                            <p className="text-sm text-navy-500">Help us understand your market position</p>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-navy-700 mb-1.5">Market Trend</label>
                                        <div className="grid grid-cols-3 gap-3">
                                            {['growing', 'stable', 'declining'].map((t) => (
                                                <button
                                                    key={t}
                                                    type="button"
                                                    onClick={() => update('marketTrend', t)}
                                                    className={`py-3 rounded-xl border text-sm font-medium transition-all capitalize ${data.marketTrend === t
                                                            ? 'border-accent-500 bg-accent-50 text-accent-700'
                                                            : 'border-navy-200 text-navy-600 hover:border-navy-300'
                                                        }`}
                                                >
                                                    {t === 'growing' ? '📈' : t === 'stable' ? '➡️' : '📉'} {t}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-navy-700 mb-1.5">Competitive Advantage</label>
                                        <textarea
                                            value={data.competitiveAdvantage}
                                            onChange={(e) => update('competitiveAdvantage', e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl border border-navy-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500 resize-none"
                                            rows={3}
                                            placeholder="What makes your business unique? Patents, brand, location, relationships..."
                                        />
                                    </div>
                                </div>
                            )}

                            {step === 5 && report && (
                                <div className="space-y-8">
                                    <div className="text-center">
                                        <div className="w-16 h-16 rounded-2xl gradient-gold flex items-center justify-center mx-auto mb-4 shadow-lg">
                                            <TrendingUp className="w-8 h-8 text-navy-950" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-navy-950 mb-2">Your Valuation Report</h2>
                                        <p className="text-navy-500">{data.industry} · {data.region}</p>
                                    </div>

                                    {/* Valuation Range */}
                                    <div className="bg-navy-50 rounded-2xl p-6">
                                        <p className="text-xs text-navy-400 uppercase tracking-wider text-center mb-4">
                                            Estimated Enterprise Value Range
                                        </p>
                                        <div className="grid grid-cols-3 gap-4 text-center">
                                            <div>
                                                <p className="text-xs text-navy-400 mb-1">Conservative</p>
                                                <p className="text-xl font-bold text-navy-700">{formatCurrency(report.low)}</p>
                                            </div>
                                            <div className="bg-white rounded-xl p-4 shadow-sm -mt-2 -mb-2">
                                                <p className="text-xs text-accent-500 font-semibold mb-1">Realistic</p>
                                                <p className="text-2xl font-bold text-navy-950">{formatCurrency(report.mid)}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-navy-400 mb-1">Optimistic</p>
                                                <p className="text-xl font-bold text-navy-700">{formatCurrency(report.high)}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Readiness Score */}
                                    <div className="bg-navy-50 rounded-2xl p-6">
                                        <div className="flex items-center justify-between mb-3">
                                            <p className="text-sm font-semibold text-navy-700">Sell-Readiness Score</p>
                                            <span className={`text-2xl font-bold ${report.readiness >= 70 ? 'text-green-600' : report.readiness >= 40 ? 'text-amber-500' : 'text-red-500'
                                                }`}>
                                                {report.readiness}/100
                                            </span>
                                        </div>
                                        <div className="w-full bg-navy-200 rounded-full h-3">
                                            <div
                                                className={`h-3 rounded-full transition-all duration-1000 ${report.readiness >= 70 ? 'bg-green-500' : report.readiness >= 40 ? 'bg-amber-500' : 'bg-red-500'
                                                    }`}
                                                style={{ width: `${report.readiness}%` }}
                                            />
                                        </div>
                                    </div>

                                    {/* Narrative */}
                                    <div>
                                        <h3 className="text-lg font-bold text-navy-950 mb-3">Analysis</h3>
                                        <div className="text-navy-600 leading-relaxed whitespace-pre-line text-sm">
                                            {report.narrative}
                                        </div>
                                    </div>

                                    {/* CTAs */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                                        <Link
                                            href="/sell"
                                            className="flex items-center justify-center gap-2 py-3.5 rounded-xl gradient-gold text-navy-950 font-semibold text-sm shadow-lg hover:shadow-xl transition-all"
                                        >
                                            <Calendar className="w-4 h-4" />
                                            Schedule Consultation
                                        </Link>
                                        <button className="flex items-center justify-center gap-2 py-3.5 rounded-xl border border-navy-200 text-navy-700 font-semibold text-sm hover:bg-navy-50 transition-all">
                                            <Download className="w-4 h-4" />
                                            Export as PDF
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Navigation */}
                        {step < 5 && (
                            <div className="flex items-center justify-between mt-6">
                                <button
                                    onClick={() => setStep((s) => Math.max(1, s - 1) as Step)}
                                    disabled={step === 1}
                                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-navy-600 hover:bg-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                    Back
                                </button>

                                {step < 4 ? (
                                    <button
                                        onClick={() => setStep((s) => Math.min(4, s + 1) as Step)}
                                        disabled={!canProceed()}
                                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl gradient-accent text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Continue
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                ) : (
                                    <button
                                        onClick={generateReport}
                                        disabled={loading || !canProceed()}
                                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl gradient-gold text-navy-950 font-semibold text-sm shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                                    >
                                        {loading ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-navy-950/30 border-t-navy-950 rounded-full animate-spin" />
                                                Analyzing...
                                            </>
                                        ) : (
                                            <>
                                                <Sparkles className="w-4 h-4" />
                                                Generate Report
                                            </>
                                        )}
                                    </button>
                                )}
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    )
}
