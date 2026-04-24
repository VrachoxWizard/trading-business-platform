'use client'

import { useState } from 'react'
import type { ElementType } from 'react'
import Link from 'next/link'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
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
    AlertCircle,
} from 'lucide-react'
import { INDUSTRIES, INDUSTRY_MULTIPLIERS, REGIONS } from '@/lib/constants'
import { formatCurrency } from '@/lib/utils'

const valuateSchema = z.object({
    industry: z.string().min(1, 'Odaberite industriju'),
    region: z.string().min(1, 'Odaberite regiju'),
    yearEstablished: z.string().optional(),
    employeeCount: z.string().optional(),
    revenue: z.string().min(1, 'Unesite godišnji prihod'),
    ebitda: z.string().min(1, 'Unesite EBITDA'),
    sde: z.string().optional(),
    revenueGrowth: z.string().optional(),
    ownerDependence: z.number().min(1).max(10),
    digitalMaturity: z.number().min(1).max(10),
    customerConcentration: z.number().min(1).max(10),
    recurringRevenue: z.number().min(1).max(10),
    marketTrend: z.enum(['growing', 'stable', 'declining']),
    competitiveAdvantage: z.string().optional(),
})

type ValuationData = z.infer<typeof valuateSchema>

type Step = 1 | 2 | 3 | 4 | 5

const stepLabels = ['Osnovno', 'Financije', 'Kvaliteta', 'Tržište', 'Izvještaj']

export default function ValuatePage() {
    const [step, setStep] = useState<Step>(1)
    const [report, setReport] = useState<{
        low: number
        mid: number
        high: number
        readiness: number
        narrative: string
    } | null>(null)

    const {
        register,
        control,
        trigger,
        handleSubmit,
        watch,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<ValuationData>({
        resolver: zodResolver(valuateSchema),
        defaultValues: {
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
            marketTrend: 'stable',
            competitiveAdvantage: '',
        },
        mode: 'onChange',
    })

    const watchMarketTrend = watch('marketTrend')
    const allData = watch()

    const handleNextStep = async () => {
        let fieldsToValidate: (keyof ValuationData)[] = []
        if (step === 1) fieldsToValidate = ['industry', 'region']
        if (step === 2) fieldsToValidate = ['revenue', 'ebitda']

        const isStepValid = await trigger(fieldsToValidate)
        if (isStepValid) {
            setStep((current) => Math.min(4, current + 1) as Step)
        }
    }

    const generateReport = async (data: ValuationData) => {
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
        if (parseFloat(data.revenueGrowth || '0') > 10) readiness += 10
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
            }).catch(() => null)

            if (res && res.ok) {
                const aiData = await res.json()
                setReport({
                    low,
                    mid,
                    high,
                    readiness,
                    narrative: aiData.narrative || generateFallbackNarrative(data, low, mid, high, readiness),
                })
            } else {
                // If API doesn't exist, simulate delay and use fallback narrative
                await new Promise((resolve) => setTimeout(resolve, 800))
                setReport({ low, mid, high, readiness, narrative: generateFallbackNarrative(data, low, mid, high, readiness) })
            }
        } catch {
            setReport({ low, mid, high, readiness, narrative: generateFallbackNarrative(data, low, mid, high, readiness) })
        }

        setStep(5)
    }

    function generateFallbackNarrative(data: ValuationData, low: number, mid: number, high: number, readiness: number) {
        return `Na temelju unesenih pokazatelja za tvrtku iz sektora ${data.industry} u regiji ${data.region}, indikativni raspon vrijednosti procjenjujemo između ${formatCurrency(low)} i ${formatCurrency(high)}, s realističnim očekivanjem oko ${formatCurrency(mid)} (bez uključivanja gotovine i dugova na bilanci).

Sell-Readiness rezultat od ${readiness}/100 odražava trenutnu pripremljenost tvrtke za razgovor s potencijalnim investitorima ili strateškim kupcima. U obzir su uzeti kritični faktori poput ovisnosti o vama kao vlasniku (ocjena ${data.ownerDependence}/10), stupnju digitalizacije, koncentraciji kupaca te stabilnosti prihoda.

${readiness >= 70 ? 'Vaša tvrtka pokazuje izvrsne signale za strukturiran izlazak na tržište. Sljedeći korak bio bi povjerljiv razgovor kako bismo definirali idealan profil kupca i optimalan tajming.' : 'Postoji prostor za značajno poboljšanje atraktivnosti tvrtke prije izlaska na tržište. Preporučujemo strateški fokus na smanjenje operativne ovisnosti o vlasniku, diverzifikaciju kupaca te uvođenje jasnijih ponovljivih modela prihoda.'}

Napomena: Ovo je isključivo indikativna procjena temeljna na vlastitoj procjeni kvalitativnih faktora. Formalna i obvezujuća valuacija zahtijeva detaljnu financijsku dubinsku analizu (due diligence), pregled pravnih ugovora i procjenu operativnih rizika.`
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
                        Dobijte okvirni raspon vrijednosti i jasan signal spremnosti za prodaju.
                    </p>
                </div>

                <div className="mb-10">
                    <div className="flex items-center justify-between gap-2 mb-3">
                        {stepLabels.map((label, index) => (
                            <div key={label} className="flex items-center gap-2 min-w-0">
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${index + 1 <= step
                                        ? 'bg-navy-950 text-white shadow-sm'
                                        : 'bg-navy-100 text-navy-400'
                                        }`}
                                >
                                    {index + 1 < step ? <CheckCircle2 className="w-4 h-4" /> : index + 1}
                                </div>
                                <span className={`hidden sm:block text-xs font-bold truncate ${index + 1 <= step ? 'text-navy-950' : 'text-navy-400'}`}>{label}</span>
                            </div>
                        ))}
                    </div>
                    <div className="w-full bg-navy-100 rounded-full h-2">
                        <div className="bg-navy-950 h-2 rounded-full transition-all duration-500" style={{ width: `${(step / 5) * 100}%` }} />
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
                            <form onSubmit={handleSubmit(generateReport)}>
                                {step === 1 && (
                                    <div className="space-y-6">
                                        <SectionTitle icon={Building2} title="Osnovni podaci" desc="Prvo definiramo kontekst i okvir poslovanja tvrtke." />
                                        
                                        <div>
                                            <label className="block text-sm font-bold text-navy-700 mb-1.5 font-sans">Industrija *</label>
                                            <select {...register('industry')} className={`field-shell bg-white ${errors.industry ? 'border-red-300 ring-1 ring-red-300' : ''}`}>
                                                <option value="">Odaberite industriju</option>
                                                {INDUSTRIES.map((option) => (
                                                    <option key={option} value={option}>{option}</option>
                                                ))}
                                            </select>
                                            {errors.industry && <p className="text-xs text-red-500 mt-1.5 font-sans">{errors.industry.message}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-bold text-navy-700 mb-1.5 font-sans">Regija *</label>
                                            <select {...register('region')} className={`field-shell bg-white ${errors.region ? 'border-red-300 ring-1 ring-red-300' : ''}`}>
                                                <option value="">Odaberite regiju</option>
                                                {REGIONS.map((option) => (
                                                    <option key={option} value={option}>{option}</option>
                                                ))}
                                            </select>
                                            {errors.region && <p className="text-xs text-red-500 mt-1.5 font-sans">{errors.region.message}</p>}
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-bold text-navy-700 mb-1.5 font-sans">Godina osnivanja</label>
                                                <input type="number" {...register('yearEstablished')} className="field-shell" placeholder="2010" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-navy-700 mb-1.5 font-sans">Broj zaposlenih</label>
                                                <input type="number" {...register('employeeCount')} className="field-shell" placeholder="25" />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {step === 2 && (
                                    <div className="space-y-6">
                                        <SectionTitle icon={DollarSign} title="Financijski podaci" desc="Unesite ključne godišnje metrike (u eurima) kako bismo izračunali bazu za valuaciju." />
                                        
                                        <div>
                                            <label className="block text-sm font-bold text-navy-700 mb-1.5 font-sans">Godišnji prihod (EUR) *</label>
                                            <input type="number" {...register('revenue')} className={`field-shell ${errors.revenue ? 'border-red-300 ring-1 ring-red-300' : ''}`} placeholder="500000" />
                                            {errors.revenue && <p className="text-xs text-red-500 mt-1.5 font-sans">{errors.revenue.message}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-bold text-navy-700 mb-1.5 font-sans">EBITDA (EUR) *</label>
                                            <input type="number" {...register('ebitda')} className={`field-shell ${errors.ebitda ? 'border-red-300 ring-1 ring-red-300' : ''}`} placeholder="100000" />
                                            {errors.ebitda ? (
                                                <p className="text-xs text-red-500 mt-1.5 font-sans">{errors.ebitda.message}</p>
                                            ) : (
                                                <p className="text-xs text-navy-400 mt-1 font-sans">Dobit prije kamata, poreza, amortizacije i deprecijacije.</p>
                                            )}
                                        </div>

                                        <div className="pt-4 border-t border-navy-100 space-y-4 mt-4">
                                            <p className="text-sm font-semibold text-navy-950 font-sans">Opcionalni financijski pokazatelji</p>
                                            <div>
                                                <label className="block text-sm font-bold text-navy-700 mb-1.5 font-sans">SDE (Seller's Discretionary Earnings)</label>
                                                <input type="number" {...register('sde')} className="field-shell" placeholder="150000" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-navy-700 mb-1.5 font-sans">Rast prihoda zadnje 3 godine (%)</label>
                                                <input type="number" {...register('revenueGrowth')} className="field-shell" placeholder="12" />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {step === 3 && (
                                    <div className="space-y-6">
                                        <SectionTitle icon={BarChart3} title="Kvalitativni faktori" desc="Kupci ne kupuju samo brojke, već i kvalitetu poslovanja. Procijenite realno." />
                                        {[
                                            { key: 'ownerDependence' as const, label: 'Ovisnost o vlasniku', desc: '1 = tvrtka radi potpuno autonomno, 10 = vlasnik je potpuno nezamjenjiv za operacije i prodaju.' },
                                            { key: 'digitalMaturity' as const, label: 'Digitalna zrelost procesa', desc: '1 = poslovanje se vodi "na papiru", 10 = implementiran moderan ERP/CRM i automatizacija.' },
                                            { key: 'customerConcentration' as const, label: 'Koncentracija kupaca', desc: '1 = tisuće malih kupaca, 10 = ogromna ovisnost o samo 1 ili 2 ključna kupca.' },
                                            { key: 'recurringRevenue' as const, label: 'Ponovljivi (recurring) prihodi', desc: '1 = svaki projekt se traži ispočetka, 10 = većina prihoda je putem sigurnih višekratnih ugovora.' },
                                        ].map((factor) => (
                                            <div key={factor.key} className="bg-navy-50 p-4 rounded-lg border border-navy-100">
                                                <div className="flex justify-between mb-2">
                                                    <label className="text-sm font-bold text-navy-950 font-sans">{factor.label}</label>
                                                    <span className="text-sm font-bold text-gold-700 font-sans">{allData[factor.key] || 5}/10</span>
                                                </div>
                                                <Controller
                                                    control={control}
                                                    name={factor.key}
                                                    render={({ field }) => (
                                                        <input
                                                            type="range"
                                                            min="1"
                                                            max="10"
                                                            value={field.value}
                                                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                                                            className="w-full accent-navy-950"
                                                        />
                                                    )}
                                                />
                                                <p className="text-xs text-navy-500 mt-2 font-sans">{factor.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {step === 4 && (
                                    <div className="space-y-6">
                                        <SectionTitle icon={Globe} title="Tržišni kontekst" desc="Dodajte makro signal o smjeru tržišta i jedinstvenim prednostima tvrtke." />
                                        <div>
                                            <label className="block text-sm font-bold text-navy-700 mb-3 font-sans">Kakav je dugoročni trend vašeg specifičnog tržišta?</label>
                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                                {[
                                                    { key: 'growing', label: 'Rastuće tržište' },
                                                    { key: 'stable', label: 'Stabilno tržište' },
                                                    { key: 'declining', label: 'Tržište u padu' },
                                                ].map((trend) => (
                                                    <button
                                                        key={trend.key}
                                                        type="button"
                                                        onClick={() => setValue('marketTrend', trend.key as 'growing'|'stable'|'declining', { shouldValidate: true })}
                                                        className={`py-3.5 rounded-lg border text-sm font-bold transition-all shadow-sm ${watchMarketTrend === trend.key
                                                            ? 'border-navy-950 bg-navy-950 text-white'
                                                            : 'border-navy-200 bg-white text-navy-700 hover:border-navy-400'
                                                            }`}
                                                    >
                                                        {trend.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="pt-2">
                                            <label className="block text-sm font-bold text-navy-700 mb-1.5 font-sans">Što je vaša glavna konkurentska prednost?</label>
                                            <textarea
                                                {...register('competitiveAdvantage')}
                                                className="field-shell resize-none"
                                                rows={4}
                                                placeholder="Npr. odlična lokacija, snažan brend građen 20 godina, ekskluzivni ugovori s dobavljačima, jedinstven proizvod, specifične licence..."
                                            />
                                        </div>
                                    </div>
                                )}

                                {step === 5 && report && (
                                    <div className="space-y-8">
                                        <div className="text-center">
                                            <div className="w-16 h-16 rounded-lg gradient-gold flex items-center justify-center mx-auto mb-4 shadow-sm border border-gold-200">
                                                <TrendingUp className="w-8 h-8 text-navy-950" />
                                            </div>
                                            <h2 className="text-2xl md:text-3xl font-display font-bold text-navy-950 mb-2">Vaš indikativni izvještaj</h2>
                                            <p className="text-navy-500 font-sans">{allData.industry} / {allData.region}</p>
                                        </div>

                                        <div className="bg-white border border-navy-100 rounded-lg p-6 md:p-8 shadow-sm">
                                            <p className="text-xs font-bold text-navy-400 uppercase tracking-wider text-center mb-6">
                                                Procjena vrijednosti tvrtke (Enterprise Value)
                                            </p>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center items-center">
                                                <ValueBlock label="Konzervativno" value={formatCurrency(report.low)} />
                                                <div className="bg-navy-50 rounded-lg p-6 shadow-sm border border-navy-100 scale-105">
                                                    <p className="text-xs font-bold text-navy-700 uppercase tracking-wider mb-2">Središnja vrijednost</p>
                                                    <p className="text-3xl font-bold text-navy-950 tracking-tight">{formatCurrency(report.mid)}</p>
                                                </div>
                                                <ValueBlock label="Optimistično" value={formatCurrency(report.high)} />
                                            </div>
                                        </div>

                                        <div className="bg-white border border-navy-100 rounded-lg p-6 md:p-8 shadow-sm">
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                                                <div>
                                                    <h3 className="text-lg font-bold text-navy-950">Indeks spremnosti za prodaju</h3>
                                                    <p className="text-xs text-navy-500 font-sans">Sell-Readiness Score baziran na kvaliteti i ovisnosti o vlasniku.</p>
                                                </div>
                                                <span className={`text-3xl font-bold ${report.readiness >= 70 ? 'text-green-600' : report.readiness >= 40 ? 'text-amber-500' : 'text-red-500'}`}>
                                                    {report.readiness}/100
                                                </span>
                                            </div>
                                            <div className="w-full bg-navy-100 rounded-full h-3 overflow-hidden shadow-inner">
                                                <div
                                                    className={`h-3 rounded-full transition-all duration-1000 ${report.readiness >= 70 ? 'bg-green-500' : report.readiness >= 40 ? 'bg-amber-500' : 'bg-red-500'}`}
                                                    style={{ width: `${report.readiness}%` }}
                                                />
                                            </div>
                                        </div>

                                        <div className="bg-navy-50 rounded-lg p-6 md:p-8 border border-navy-100">
                                            <h3 className="text-lg font-bold text-navy-950 mb-4 flex items-center gap-2">
                                                <AlertCircle className="w-5 h-5 text-gold-600" />
                                                Savjetnička analiza
                                            </h3>
                                            <div className="text-navy-700 leading-relaxed whitespace-pre-line text-sm font-sans">
                                                {report.narrative}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                                            <Link href="/contact" className="flex items-center justify-center gap-2 py-4 rounded-lg bg-navy-950 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5">
                                                <Calendar className="w-4 h-4" />
                                                Besplatno stručno savjetovanje
                                            </Link>
                                            <button type="button" className="flex items-center justify-center gap-2 py-4 rounded-lg border-2 border-navy-200 text-navy-800 font-bold text-sm hover:bg-navy-50 transition-all hover:border-navy-300">
                                                <Download className="w-4 h-4" />
                                                Preuzmi cjelovit izvještaj (PDF)
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {step < 5 && (
                                    <div className="flex items-center justify-between mt-10 pt-6 border-t border-navy-100">
                                        <button
                                            type="button"
                                            onClick={() => setStep((current) => Math.max(1, current - 1) as Step)}
                                            disabled={step === 1}
                                            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold text-navy-600 hover:bg-navy-50 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                                        >
                                            <ChevronLeft className="w-4 h-4" />
                                            Natrag
                                        </button>

                                        {step < 4 ? (
                                            <button
                                                type="button"
                                                onClick={handleNextStep}
                                                className="flex items-center gap-2 px-8 py-3 rounded-lg bg-navy-950 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5"
                                            >
                                                Nastavi
                                                <ChevronRight className="w-4 h-4" />
                                            </button>
                                        ) : (
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="flex items-center gap-2 px-8 py-3 rounded-lg gradient-gold text-navy-950 font-bold text-sm shadow-md hover:shadow-lg transition-all disabled:opacity-50 hover:-translate-y-0.5 disabled:hover:translate-y-0"
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <div className="w-4 h-4 border-2 border-navy-950/30 border-t-navy-950 rounded-full animate-spin" />
                                                        Izračun...
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
                            </form>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    )
}

function SectionTitle({ icon: Icon, title, desc }: { icon: ElementType; title: string; desc: string }) {
    return (
        <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 rounded-lg bg-navy-50 border border-navy-100 flex items-center justify-center shrink-0 shadow-sm">
                <Icon className="w-6 h-6 text-gold-600" />
            </div>
            <div>
                <h2 className="text-xl font-bold text-navy-950 font-display">{title}</h2>
                <p className="text-sm text-navy-500 font-sans">{desc}</p>
            </div>
        </div>
    )
}

function ValueBlock({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-lg p-4">
            <p className="text-xs font-bold text-navy-500 uppercase tracking-wider mb-1">{label}</p>
            <p className="text-xl font-bold text-navy-800 tracking-tight">{value}</p>
        </div>
    )
}
