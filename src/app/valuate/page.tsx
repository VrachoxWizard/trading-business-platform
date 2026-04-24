'use client'

import { useState } from 'react'
import type { ElementType } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import {
    BarChart3,
    Building2,
    Calendar,
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
    DollarSign,
    Download,
    Globe,
    Sparkles,
    TrendingUp,
} from 'lucide-react'
import { INDUSTRIES, INDUSTRY_MULTIPLIERS, REGIONS } from '@/lib/constants'
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

const stepLabels = ['Osnovno', 'Financije', 'Kvaliteta', 'Tržište', 'Izvještaj']

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

        const multipliers = INDUSTRY_MULTIPLIERS[data.industry] || { evToEbitda: 6, evToRevenue: 1 }
        const ebitda = parseFloat(data.ebitda) || 0
        const revenue = parseFloat(data.revenue) || 0

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

        let readiness = 50
        if (data.ownerDependence <= 4) readiness += 10
        if (data.digitalMaturity >= 6) readiness += 10
        if (data.customerConcentration <= 4) readiness += 10
        if (data.recurringRevenue >= 5) readiness += 10
        if (parseFloat(data.revenueGrowth) > 10) readiness += 10
        readiness = Math.min(100, Math.max(0, readiness))

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
                setReport({ low, mid, high, readiness, narrative: generateFallbackNarrative(low, mid, high, readiness) })
            }
        } catch {
            setReport({ low, mid, high, readiness, narrative: generateFallbackNarrative(low, mid, high, readiness) })
        }

        setLoading(false)
        setStep(5)
    }

    function generateFallbackNarrative(low: number, mid: number, high: number, readiness: number) {
        return `Na temelju podataka za ${data.industry} tvrtku u regiji ${data.region}, indikativni raspon vrijednosti procjenjujemo između ${formatCurrency(low)} i ${formatCurrency(high)}, s realističnim središtem oko ${formatCurrency(mid)}.

Sell-Readiness rezultat od ${readiness}/100 odražava pripremljenost tvrtke za razgovor s kupcima. U obzir su uzeti ovisnost o vlasniku, digitalna zrelost, koncentracija kupaca, ponovljivi prihodi i tržišni trend.

${readiness >= 70 ? 'Tvrtka pokazuje dobre signale za strukturiran izlazak na tržište. Sljedeći korak bio bi povjerljiv razgovor o tajmingu, dokumentaciji i profilu kupca.' : 'Postoji prostor za poboljšanje atraktivnosti prije izlaska na tržište. Fokus bi trebao biti na smanjenju operativne ovisnosti, urednijoj dokumentaciji i jasnijim ponovljivim prihodima.'}

Ovo je indikativna procjena, a formalna valuacija zahtijeva detaljniji uvid u financije, ugovore i operativne rizike.`
    }

    return (
        <div className="min-h-screen bg-background pt-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center mb-8">
                    <p className="eyebrow mb-4">
                        <Sparkles className="w-3.5 h-3.5" />
                        Indikativno i povjerljivo
                    </p>
                    <h1 className="text-3xl md:text-5xl font-bold text-navy-950 mb-3">
                        Procjena vrijednosti tvrtke
                    </h1>
                    <p className="text-navy-500 text-lg max-w-2xl mx-auto font-sans">
                        Dobijte okvirni raspon vrijednosti i signal spremnosti za prodaju u nekoliko minuta.
                    </p>
                </div>

                <div className="mb-10">
                    <div className="flex items-center justify-between gap-2 mb-3">
                        {stepLabels.map((label, index) => (
                            <div key={label} className="flex items-center gap-2 min-w-0">
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${index + 1 <= step
                                        ? 'gradient-accent text-white'
                                        : 'bg-navy-100 text-navy-400'
                                        }`}
                                >
                                    {index + 1 < step ? <CheckCircle2 className="w-4 h-4" /> : index + 1}
                                </div>
                                <span className="hidden sm:block text-xs font-bold text-navy-500 truncate">{label}</span>
                            </div>
                        ))}
                    </div>
                    <div className="w-full bg-navy-100 rounded-full h-2">
                        <div className="gradient-accent h-2 rounded-full transition-all duration-500" style={{ width: `${(step / 5) * 100}%` }} />
                    </div>
                </div>

                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 18 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -18 }}
                        transition={{ duration: 0.25 }}
                    >
                        <div className="premium-card p-6 md:p-8">
                            {step === 1 && (
                                <div className="space-y-6">
                                    <SectionTitle icon={Building2} title="Osnovni podaci" desc="Prvo definiramo kontekst tvrtke." />
                                    <SelectField label="Industrija *" value={data.industry} onChange={(value) => update('industry', value)} placeholder="Odaberite industriju" options={INDUSTRIES} />
                                    <SelectField label="Regija *" value={data.region} onChange={(value) => update('region', value)} placeholder="Odaberite regiju" options={REGIONS} />
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <InputField label="Godina osnivanja" value={data.yearEstablished} onChange={(value) => update('yearEstablished', value)} placeholder="2010" type="number" />
                                        <InputField label="Broj zaposlenih" value={data.employeeCount} onChange={(value) => update('employeeCount', value)} placeholder="25" type="number" />
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="space-y-6">
                                    <SectionTitle icon={DollarSign} title="Financijski podaci" desc="Unesite ključne godišnje metrike u eurima." />
                                    <InputField label="Godišnji prihod (EUR) *" value={data.revenue} onChange={(value) => update('revenue', value)} placeholder="500000" type="number" />
                                    <InputField label="EBITDA (EUR) *" value={data.ebitda} onChange={(value) => update('ebitda', value)} placeholder="100000" type="number" helper="Dobit prije kamata, poreza, amortizacije i deprecijacije." />
                                    <InputField label="SDE (opcionalno)" value={data.sde} onChange={(value) => update('sde', value)} placeholder="150000" type="number" />
                                    <InputField label="Rast prihoda (%)" value={data.revenueGrowth} onChange={(value) => update('revenueGrowth', value)} placeholder="12" type="number" />
                                </div>
                            )}

                            {step === 3 && (
                                <div className="space-y-6">
                                    <SectionTitle icon={BarChart3} title="Kvalitativni faktori" desc="Procijenite faktore koji utječu na atraktivnost za kupca." />
                                    {[
                                        { key: 'ownerDependence' as const, label: 'Ovisnost o vlasniku', desc: '1 = tvrtka radi bez vlasnika, 10 = vlasnik je nezamjenjiv' },
                                        { key: 'digitalMaturity' as const, label: 'Digitalna zrelost', desc: '1 = minimalno digitalno, 10 = zreli digitalni procesi' },
                                        { key: 'customerConcentration' as const, label: 'Koncentracija kupaca', desc: '1 = diverzificirano, 10 = ovisnost o 1-2 kupca' },
                                        { key: 'recurringRevenue' as const, label: 'Ponovljivi prihodi', desc: '1 = nema ponavljanja, 10 = većina prihoda je ponovljiva' },
                                    ].map((factor) => (
                                        <div key={factor.key}>
                                            <div className="flex justify-between mb-1.5">
                                                <label className="text-sm font-bold text-navy-700">{factor.label}</label>
                                                <span className="text-sm font-bold text-gold-700">{data[factor.key]}/10</span>
                                            </div>
                                            <input
                                                type="range"
                                                min="1"
                                                max="10"
                                                value={data[factor.key]}
                                                onChange={(event) => update(factor.key, parseInt(event.target.value))}
                                                className="w-full accent-gold-600"
                                            />
                                            <p className="text-xs text-navy-400 mt-1">{factor.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {step === 4 && (
                                <div className="space-y-6">
                                    <SectionTitle icon={Globe} title="Tržišni kontekst" desc="Dodajte signal o smjeru tržišta i prednostima tvrtke." />
                                    <div>
                                        <label className="block text-sm font-bold text-navy-700 mb-2">Tržišni trend</label>
                                        <div className="grid grid-cols-3 gap-3">
                                            {[
                                                { key: 'growing', label: 'Rastuće' },
                                                { key: 'stable', label: 'Stabilno' },
                                                { key: 'declining', label: 'U padu' },
                                            ].map((trend) => (
                                                <button
                                                    key={trend.key}
                                                    type="button"
                                                    onClick={() => update('marketTrend', trend.key)}
                                                    className={`py-3 rounded-lg border text-sm font-bold transition-all ${data.marketTrend === trend.key
                                                        ? 'border-gold-600 bg-gold-100 text-gold-700'
                                                        : 'border-navy-200 text-navy-600 hover:border-navy-300'
                                                        }`}
                                                >
                                                    {trend.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-navy-700 mb-1.5">Konkurentska prednost</label>
                                        <textarea
                                            value={data.competitiveAdvantage}
                                            onChange={(event) => update('competitiveAdvantage', event.target.value)}
                                            className="field-shell resize-none"
                                            rows={4}
                                            placeholder="Lokacija, brend, ugovori, procesi, baza kupaca, licence..."
                                        />
                                    </div>
                                </div>
                            )}

                            {step === 5 && report && (
                                <div className="space-y-8">
                                    <div className="text-center">
                                        <div className="w-16 h-16 rounded-lg gradient-gold flex items-center justify-center mx-auto mb-4 shadow-lg">
                                            <TrendingUp className="w-8 h-8 text-navy-950" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-navy-950 mb-2">Indikativni izvještaj</h2>
                                        <p className="text-navy-500">{data.industry} / {data.region}</p>
                                    </div>

                                    <div className="bg-navy-50 rounded-lg p-6">
                                        <p className="text-xs text-navy-400 uppercase tracking-wider text-center mb-4">
                                            Raspon procijenjene vrijednosti
                                        </p>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                                            <ValueBlock label="Konzervativno" value={formatCurrency(report.low)} />
                                            <div className="bg-white rounded-lg p-4 shadow-sm border border-gold-200">
                                                <p className="text-xs text-gold-700 font-bold mb-1">Realistično</p>
                                                <p className="text-2xl font-bold text-navy-950">{formatCurrency(report.mid)}</p>
                                            </div>
                                            <ValueBlock label="Optimistično" value={formatCurrency(report.high)} />
                                        </div>
                                    </div>

                                    <div className="bg-navy-50 rounded-lg p-6">
                                        <div className="flex items-center justify-between mb-3">
                                            <p className="text-sm font-bold text-navy-700">Sell-Readiness rezultat</p>
                                            <span className={`text-2xl font-bold ${report.readiness >= 70 ? 'text-green-600' : report.readiness >= 40 ? 'text-amber-500' : 'text-red-500'}`}>
                                                {report.readiness}/100
                                            </span>
                                        </div>
                                        <div className="w-full bg-navy-200 rounded-full h-3">
                                            <div
                                                className={`h-3 rounded-full transition-all duration-1000 ${report.readiness >= 70 ? 'bg-green-500' : report.readiness >= 40 ? 'bg-amber-500' : 'bg-red-500'}`}
                                                style={{ width: `${report.readiness}%` }}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-bold text-navy-950 mb-3">Analiza</h3>
                                        <div className="text-navy-600 leading-relaxed whitespace-pre-line text-sm font-sans">
                                            {report.narrative}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                                        <Link href="/contact" className="flex items-center justify-center gap-2 py-3.5 rounded-lg gradient-gold text-navy-950 font-bold text-sm shadow-lg hover:shadow-xl transition-all">
                                            <Calendar className="w-4 h-4" />
                                            Povjerljiv razgovor
                                        </Link>
                                        <button className="flex items-center justify-center gap-2 py-3.5 rounded-lg border border-navy-200 text-navy-700 font-bold text-sm hover:bg-navy-50 transition-all">
                                            <Download className="w-4 h-4" />
                                            Spremi PDF
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {step < 5 && (
                            <div className="flex items-center justify-between mt-6">
                                <button
                                    onClick={() => setStep((current) => Math.max(1, current - 1) as Step)}
                                    disabled={step === 1}
                                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold text-navy-600 hover:bg-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                    Natrag
                                </button>

                                {step < 4 ? (
                                    <button
                                        onClick={() => setStep((current) => Math.min(4, current + 1) as Step)}
                                        disabled={!canProceed()}
                                        className="flex items-center gap-2 px-6 py-2.5 rounded-lg gradient-accent text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Nastavi
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                ) : (
                                    <button
                                        onClick={generateReport}
                                        disabled={loading || !canProceed()}
                                        className="flex items-center gap-2 px-6 py-2.5 rounded-lg gradient-gold text-navy-950 font-bold text-sm shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                                    >
                                        {loading ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-navy-950/30 border-t-navy-950 rounded-full animate-spin" />
                                                Analiza...
                                            </>
                                        ) : (
                                            <>
                                                <Sparkles className="w-4 h-4" />
                                                Generiraj izvještaj
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

function SectionTitle({ icon: Icon, title, desc }: { icon: ElementType; title: string; desc: string }) {
    return (
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gold-100 flex items-center justify-center">
                <Icon className="w-5 h-5 text-gold-700" />
            </div>
            <div>
                <h2 className="text-xl font-bold text-navy-950">{title}</h2>
                <p className="text-sm text-navy-500 font-sans">{desc}</p>
            </div>
        </div>
    )
}

function InputField({ label, value, onChange, placeholder, type = 'text', helper }: {
    label: string
    value: string
    onChange: (value: string) => void
    placeholder: string
    type?: string
    helper?: string
}) {
    return (
        <div>
            <label className="block text-sm font-bold text-navy-700 mb-1.5">{label}</label>
            <input type={type} value={value} onChange={(event) => onChange(event.target.value)} className="field-shell" placeholder={placeholder} />
            {helper && <p className="text-xs text-navy-400 mt-1">{helper}</p>}
        </div>
    )
}

function SelectField({ label, value, onChange, placeholder, options }: {
    label: string
    value: string
    onChange: (value: string) => void
    placeholder: string
    options: readonly string[]
}) {
    return (
        <div>
            <label className="block text-sm font-bold text-navy-700 mb-1.5">{label}</label>
            <select value={value} onChange={(event) => onChange(event.target.value)} className="field-shell">
                <option value="">{placeholder}</option>
                {options.map((option) => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    )
}

function ValueBlock({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-lg p-4">
            <p className="text-xs text-navy-400 mb-1">{label}</p>
            <p className="text-xl font-bold text-navy-700">{value}</p>
        </div>
    )
}
