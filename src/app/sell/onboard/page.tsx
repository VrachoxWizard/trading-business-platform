'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Building2,
    DollarSign,
    BarChart3,
    Eye,
    CheckCircle2,
    ChevronRight,
    ChevronLeft,
    Sparkles,
} from 'lucide-react'
import { INDUSTRIES, REGIONS } from '@/lib/constants'
import { createClient } from '@/lib/supabase/client'

type Step = 1 | 2 | 3 | 4 | 5

export default function OnboardPage() {
    const [step, setStep] = useState<Step>(1)
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const supabase = createClient()

    const [formData, setFormData] = useState({
        title: '',
        industry: '',
        sub_industry: '',
        region: '',
        city: '',
        description: '',
        year_established: '',
        business_model: '',
        employee_count: '',
        revenue: '',
        ebitda: '',
        sde: '',
        asking_price: '',
        reason_for_sale: '',
        digital_maturity_score: 5,
        owner_dependence_score: 5,
        is_anonymous: true,
    })

    const update = (field: string, value: string | number | boolean) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const stepLabels = ['Basic Info', 'Financials', 'Details', 'Preview', 'Confirm']

    const handleSubmit = async () => {
        setLoading(true)
        try {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) {
                router.push('/login')
                return
            }

            const { error } = await supabase.from('listings').insert({
                seller_id: user.id,
                title: formData.title,
                industry: formData.industry,
                sub_industry: formData.sub_industry || null,
                region: formData.region,
                city: formData.city || null,
                description: formData.description || null,
                year_established: formData.year_established ? parseInt(formData.year_established) : null,
                business_model: formData.business_model || null,
                employee_count: formData.employee_count ? parseInt(formData.employee_count) : null,
                revenue: formData.revenue ? parseFloat(formData.revenue) : null,
                ebitda: formData.ebitda ? parseFloat(formData.ebitda) : null,
                sde: formData.sde ? parseFloat(formData.sde) : null,
                asking_price: formData.asking_price ? parseFloat(formData.asking_price) : null,
                reason_for_sale: formData.reason_for_sale || null,
                digital_maturity_score: formData.digital_maturity_score,
                owner_dependence_score: formData.owner_dependence_score,
                is_anonymous: formData.is_anonymous,
                status: 'draft',
            })

            if (error) throw error
            router.push('/dashboard/seller')
        } catch (err) {
            console.error('Failed to create listing:', err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-navy-50 pt-24">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-navy-950 mb-2">List Your Business</h1>
                    <p className="text-navy-500">Complete the form to create a confidential listing.</p>
                </div>

                {/* Progress */}
                <div className="mb-10">
                    <div className="flex items-center justify-between mb-3">
                        {stepLabels.map((label, i) => (
                            <div key={label} className="flex items-center gap-1">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${i + 1 <= step ? 'gradient-accent text-white' : 'bg-navy-100 text-navy-400'}`}>
                                    {i + 1 < step ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                                </div>
                                <span className="hidden sm:block text-xs text-navy-400">{label}</span>
                            </div>
                        ))}
                    </div>
                    <div className="w-full bg-navy-100 rounded-full h-2">
                        <div className="gradient-accent h-2 rounded-full transition-all duration-500" style={{ width: `${(step / 5) * 100}%` }} />
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                        <div className="bg-white rounded-2xl shadow-card border border-navy-100 p-8">
                            {step === 1 && (
                                <div className="space-y-5">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-xl bg-accent-100 flex items-center justify-center">
                                            <Building2 className="w-5 h-5 text-accent-600" />
                                        </div>
                                        <h2 className="text-xl font-bold text-navy-950">Basic Information</h2>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-navy-700 mb-1.5">Listing Title *</label>
                                        <input type="text" value={formData.title} onChange={(e) => update('title', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-navy-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500" placeholder="e.g. Profitable SaaS Company in Zagreb" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-navy-700 mb-1.5">Industry *</label>
                                            <select value={formData.industry} onChange={(e) => update('industry', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-navy-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500">
                                                <option value="">Select</option>
                                                {INDUSTRIES.map((i) => <option key={i} value={i}>{i}</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-navy-700 mb-1.5">Region *</label>
                                            <select value={formData.region} onChange={(e) => update('region', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-navy-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500">
                                                <option value="">Select</option>
                                                {REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-navy-700 mb-1.5">City</label>
                                            <input type="text" value={formData.city} onChange={(e) => update('city', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-navy-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500" placeholder="Zagreb" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-navy-700 mb-1.5">Year Established</label>
                                            <input type="number" value={formData.year_established} onChange={(e) => update('year_established', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-navy-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500" placeholder="2010" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-navy-700 mb-1.5">Business Description</label>
                                        <textarea value={formData.description} onChange={(e) => update('description', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-navy-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500 resize-none" rows={4} placeholder="Describe your business, operations, and key strengths..." />
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="space-y-5">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-xl bg-gold-100 flex items-center justify-center">
                                            <DollarSign className="w-5 h-5 text-gold-600" />
                                        </div>
                                        <h2 className="text-xl font-bold text-navy-950">Financial Data</h2>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-navy-700 mb-1.5">Annual Revenue (€)</label>
                                            <input type="number" value={formData.revenue} onChange={(e) => update('revenue', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-navy-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500" placeholder="500000" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-navy-700 mb-1.5">EBITDA (€)</label>
                                            <input type="number" value={formData.ebitda} onChange={(e) => update('ebitda', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-navy-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500" placeholder="100000" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-navy-700 mb-1.5">SDE (€)</label>
                                            <input type="number" value={formData.sde} onChange={(e) => update('sde', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-navy-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500" placeholder="150000" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-navy-700 mb-1.5">Asking Price (€)</label>
                                            <input type="number" value={formData.asking_price} onChange={(e) => update('asking_price', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-navy-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500" placeholder="750000" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-navy-700 mb-1.5">Employees</label>
                                            <input type="number" value={formData.employee_count} onChange={(e) => update('employee_count', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-navy-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500" placeholder="25" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-navy-700 mb-1.5">Business Model</label>
                                            <input type="text" value={formData.business_model} onChange={(e) => update('business_model', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-navy-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500" placeholder="B2B SaaS" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-navy-700 mb-1.5">Reason for Sale</label>
                                        <input type="text" value={formData.reason_for_sale} onChange={(e) => update('reason_for_sale', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-navy-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500" placeholder="Retirement, new venture, etc." />
                                    </div>
                                </div>
                            )}

                            {step === 3 && (
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-xl bg-accent-100 flex items-center justify-center">
                                            <BarChart3 className="w-5 h-5 text-accent-600" />
                                        </div>
                                        <h2 className="text-xl font-bold text-navy-950">Qualitative Details</h2>
                                    </div>
                                    <div>
                                        <div className="flex justify-between mb-1.5">
                                            <label className="text-sm font-medium text-navy-700">Owner Dependence</label>
                                            <span className="text-sm font-bold text-accent-600">{formData.owner_dependence_score}/10</span>
                                        </div>
                                        <input type="range" min="1" max="10" value={formData.owner_dependence_score} onChange={(e) => update('owner_dependence_score', parseInt(e.target.value))} className="w-full accent-accent-600" />
                                        <p className="text-xs text-navy-400 mt-1">1 = runs without owner, 10 = owner irreplaceable</p>
                                    </div>
                                    <div>
                                        <div className="flex justify-between mb-1.5">
                                            <label className="text-sm font-medium text-navy-700">Digital Maturity</label>
                                            <span className="text-sm font-bold text-accent-600">{formData.digital_maturity_score}/10</span>
                                        </div>
                                        <input type="range" min="1" max="10" value={formData.digital_maturity_score} onChange={(e) => update('digital_maturity_score', parseInt(e.target.value))} className="w-full accent-accent-600" />
                                        <p className="text-xs text-navy-400 mt-1">1 = no digital presence, 10 = full digital operations</p>
                                    </div>
                                    <div>
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input type="checkbox" checked={formData.is_anonymous} onChange={(e) => update('is_anonymous', e.target.checked)} className="w-5 h-5 rounded border-navy-300 text-accent-600 focus:ring-accent-500" />
                                            <div>
                                                <span className="text-sm font-medium text-navy-700">List anonymously</span>
                                                <p className="text-xs text-navy-400">Recommended. Your identity will be hidden until NDA is signed.</p>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            )}

                            {step === 4 && (
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-xl bg-gold-100 flex items-center justify-center">
                                            <Eye className="w-5 h-5 text-gold-600" />
                                        </div>
                                        <h2 className="text-xl font-bold text-navy-950">Preview Your Listing</h2>
                                    </div>
                                    <div className="bg-navy-50 rounded-xl p-6 space-y-4">
                                        <h3 className="text-lg font-bold text-navy-950">{formData.title || 'Untitled Listing'}</h3>
                                        <div className="grid grid-cols-2 gap-3 text-sm">
                                            <div><span className="text-navy-400">Industry:</span> <span className="font-medium text-navy-700">{formData.industry || '—'}</span></div>
                                            <div><span className="text-navy-400">Region:</span> <span className="font-medium text-navy-700">{formData.region || '—'}</span></div>
                                            <div><span className="text-navy-400">Revenue:</span> <span className="font-medium text-navy-700">{formData.revenue ? `€${Number(formData.revenue).toLocaleString()}` : '—'}</span></div>
                                            <div><span className="text-navy-400">EBITDA:</span> <span className="font-medium text-navy-700">{formData.ebitda ? `€${Number(formData.ebitda).toLocaleString()}` : '—'}</span></div>
                                            <div><span className="text-navy-400">Asking Price:</span> <span className="font-medium text-navy-700">{formData.asking_price ? `€${Number(formData.asking_price).toLocaleString()}` : '—'}</span></div>
                                            <div><span className="text-navy-400">Employees:</span> <span className="font-medium text-navy-700">{formData.employee_count || '—'}</span></div>
                                        </div>
                                        {formData.description && <p className="text-sm text-navy-500">{formData.description}</p>}
                                    </div>
                                    <p className="text-xs text-navy-400 text-center">This listing will be saved as a draft. A broker will review it before publishing.</p>
                                </div>
                            )}

                            {step === 5 && (
                                <div className="text-center py-8">
                                    <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center mx-auto mb-4">
                                        <CheckCircle2 className="w-8 h-8 text-green-600" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-navy-950 mb-2">Ready to Submit</h2>
                                    <p className="text-navy-500 mb-6">Your listing will be saved as a draft and reviewed by our team before going live.</p>
                                    <button
                                        onClick={handleSubmit}
                                        disabled={loading}
                                        className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl gradient-gold text-navy-950 font-bold text-lg shadow-xl hover:shadow-2xl transition-all disabled:opacity-50"
                                    >
                                        {loading ? (
                                            <div className="w-5 h-5 border-2 border-navy-950/30 border-t-navy-950 rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                <Sparkles className="w-5 h-5" />
                                                Submit Listing
                                            </>
                                        )}
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Navigation */}
                        {step < 5 && (
                            <div className="flex items-center justify-between mt-6">
                                <button
                                    onClick={() => setStep((s) => Math.max(1, s - 1) as Step)}
                                    disabled={step === 1}
                                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-navy-600 hover:bg-white transition-all disabled:opacity-30"
                                >
                                    <ChevronLeft className="w-4 h-4" /> Back
                                </button>
                                <button
                                    onClick={() => setStep((s) => Math.min(5, s + 1) as Step)}
                                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl gradient-accent text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-all"
                                >
                                    Continue <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    )
}
