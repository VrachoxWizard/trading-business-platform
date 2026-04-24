'use client'

import { useState } from 'react'
import type { ElementType } from 'react'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import {
    BarChart3,
    Building2,
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
    DollarSign,
    Eye,
    Lock,
    Sparkles,
} from 'lucide-react'
import { INDUSTRIES, REGIONS } from '@/lib/constants'
import { createClient } from '@/lib/supabase/client'

type Step = 1 | 2 | 3 | 4 | 5

export default function OnboardPage() {
    const [step, setStep] = useState<Step>(1)
    const [loading, setLoading] = useState(false)
    const [submitError, setSubmitError] = useState<string | null>(null)
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

    const stepLabels = ['Osnovno', 'Financije', 'Kvaliteta', 'Pregled', 'Potvrda']

    const canProceed = () => {
        if (step === 1) return formData.title && formData.industry && formData.region
        return true
    }

    const handleSubmit = async () => {
        setLoading(true)
        setSubmitError(null)
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
        } catch {
            setSubmitError('Nismo uspjeli spremiti nacrt. Provjerite podatke i pokušajte ponovno.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-background pt-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center mb-8">
                    <p className="eyebrow mb-4">
                        <Lock className="w-3.5 h-3.5" />
                        Anonimni nacrt
                    </p>
                    <h1 className="text-3xl md:text-5xl font-bold text-navy-950 mb-3">Priprema prodajnog profila</h1>
                    <p className="text-navy-500 font-sans max-w-2xl mx-auto">
                        Profil se sprema kao nacrt. Savjetnik ga pregledava prije bilo kakvog prikaza kupcima.
                    </p>
                </div>

                <div className="mb-10">
                    <div className="flex items-center justify-between mb-3">
                        {stepLabels.map((label, index) => (
                            <div key={label} className="flex items-center gap-2">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${index + 1 <= step ? 'gradient-accent text-white' : 'bg-navy-100 text-navy-400'}`}>
                                    {index + 1 < step ? <CheckCircle2 className="w-4 h-4" /> : index + 1}
                                </div>
                                <span className="hidden sm:block text-xs font-bold text-navy-400">{label}</span>
                            </div>
                        ))}
                    </div>
                    <div className="w-full bg-navy-100 rounded-full h-2">
                        <div className="gradient-accent h-2 rounded-full transition-all duration-500" style={{ width: `${(step / 5) * 100}%` }} />
                    </div>
                </div>

                <AnimatePresence mode="wait" initial={false}>
                    <motion.div key={step} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -18 }} transition={{ duration: 0.25 }}>
                        <div className="premium-card p-6 md:p-8">
                            {step === 1 && (
                                <div className="space-y-5">
                                    <StepHeading icon={Building2} title="Osnovni podaci" />
                                    <TextInput label="Naziv profila *" value={formData.title} onChange={(value) => update('title', value)} placeholder="npr. Profitabilna proizvodna tvrtka u Zagrebu" />
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <SelectInput label="Industrija *" value={formData.industry} onChange={(value) => update('industry', value)} options={INDUSTRIES} placeholder="Odaberite" />
                                        <SelectInput label="Regija *" value={formData.region} onChange={(value) => update('region', value)} options={REGIONS} placeholder="Odaberite" />
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <TextInput label="Grad" value={formData.city} onChange={(value) => update('city', value)} placeholder="Zagreb" />
                                        <TextInput label="Godina osnivanja" value={formData.year_established} onChange={(value) => update('year_established', value)} placeholder="2010" type="number" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-navy-700 mb-1.5">Opis poslovanja</label>
                                        <textarea value={formData.description} onChange={(event) => update('description', event.target.value)} className="field-shell resize-none" rows={4} placeholder="Sažeto opišite poslovanje, kupce, snage i operativni model." />
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="space-y-5">
                                    <StepHeading icon={DollarSign} title="Financijski podaci" />
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <TextInput label="Godišnji prihod (€)" value={formData.revenue} onChange={(value) => update('revenue', value)} placeholder="500000" type="number" />
                                        <TextInput label="EBITDA (€)" value={formData.ebitda} onChange={(value) => update('ebitda', value)} placeholder="100000" type="number" />
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <TextInput label="SDE (€)" value={formData.sde} onChange={(value) => update('sde', value)} placeholder="150000" type="number" />
                                        <TextInput label="Tražena cijena (€)" value={formData.asking_price} onChange={(value) => update('asking_price', value)} placeholder="750000" type="number" />
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <TextInput label="Broj zaposlenih" value={formData.employee_count} onChange={(value) => update('employee_count', value)} placeholder="25" type="number" />
                                        <TextInput label="Poslovni model" value={formData.business_model} onChange={(value) => update('business_model', value)} placeholder="B2B usluge, pretplata..." />
                                    </div>
                                    <TextInput label="Razlog prodaje" value={formData.reason_for_sale} onChange={(value) => update('reason_for_sale', value)} placeholder="Sukcesija, novi projekt, partnerstvo..." />
                                </div>
                            )}

                            {step === 3 && (
                                <div className="space-y-6">
                                    <StepHeading icon={BarChart3} title="Kvalitativni detalji" />
                                    <RangeInput label="Ovisnost o vlasniku" value={formData.owner_dependence_score} onChange={(value) => update('owner_dependence_score', value)} desc="1 = poslovanje radi bez vlasnika, 10 = vlasnik je nezamjenjiv" />
                                    <RangeInput label="Digitalna zrelost" value={formData.digital_maturity_score} onChange={(value) => update('digital_maturity_score', value)} desc="1 = minimalno digitalno, 10 = zreli digitalni procesi" />
                                    <label className="flex items-start gap-3 cursor-pointer rounded-lg border border-navy-100 bg-navy-50 p-4">
                                        <input type="checkbox" checked={formData.is_anonymous} onChange={(event) => update('is_anonymous', event.target.checked)} className="mt-1 w-5 h-5 rounded border-navy-300 accent-gold-600" />
                                        <div>
                                            <span className="text-sm font-bold text-navy-700">Prikaži anonimno</span>
                                            <p className="text-xs text-navy-400 mt-1">Preporučeno. Identitet se ne otkriva prije provjere i NDA-a.</p>
                                        </div>
                                    </label>
                                </div>
                            )}

                            {step === 4 && (
                                <div className="space-y-6">
                                    <StepHeading icon={Eye} title="Pregled nacrta" />
                                    <div className="bg-navy-50 rounded-lg p-6 space-y-4">
                                        <h3 className="text-xl font-bold text-navy-950">{formData.title || 'Neimenovani profil'}</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                                            <PreviewItem label="Industrija" value={formData.industry || '-'} />
                                            <PreviewItem label="Regija" value={formData.region || '-'} />
                                            <PreviewItem label="Prihod" value={formData.revenue ? `€${Number(formData.revenue).toLocaleString('de-DE')}` : '-'} />
                                            <PreviewItem label="EBITDA" value={formData.ebitda ? `€${Number(formData.ebitda).toLocaleString('de-DE')}` : '-'} />
                                            <PreviewItem label="Tražena cijena" value={formData.asking_price ? `€${Number(formData.asking_price).toLocaleString('de-DE')}` : '-'} />
                                            <PreviewItem label="Zaposleni" value={formData.employee_count || '-'} />
                                        </div>
                                        {formData.description && <p className="text-sm text-navy-500 font-sans">{formData.description}</p>}
                                    </div>
                                    <p className="text-xs text-navy-400 text-center">Nacrt neće biti javno prikazan bez pregleda i odobrenja.</p>
                                </div>
                            )}

                            {step === 5 && (
                                <div className="text-center py-8">
                                    <div className="w-16 h-16 rounded-lg bg-green-100 flex items-center justify-center mx-auto mb-4">
                                        <CheckCircle2 className="w-8 h-8 text-green-600" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-navy-950 mb-2">Spremno za predaju</h2>
                                    <p className="text-navy-500 mb-7 font-sans">Profil se sprema kao nacrt i ide na savjetnički pregled prije objave.</p>
                                    {submitError && (
                                        <p className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                            {submitError}
                                        </p>
                                    )}
                                    <button
                                        onClick={handleSubmit}
                                        disabled={loading}
                                        className="inline-flex items-center gap-2 px-8 py-4 rounded-lg gradient-gold text-navy-950 font-bold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                                    >
                                        {loading ? (
                                            <div className="w-5 h-5 border-2 border-navy-950/30 border-t-navy-950 rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                <Sparkles className="w-5 h-5" />
                                                Predaj nacrt
                                            </>
                                        )}
                                    </button>
                                </div>
                            )}
                        </div>

                        {step < 5 && (
                            <div className="flex items-center justify-between mt-6">
                                <button
                                    onClick={() => setStep((current) => Math.max(1, current - 1) as Step)}
                                    disabled={step === 1}
                                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold text-navy-600 hover:bg-white transition-all disabled:opacity-30"
                                >
                                    <ChevronLeft className="w-4 h-4" /> Natrag
                                </button>
                                <button
                                    onClick={() => setStep((current) => Math.min(5, current + 1) as Step)}
                                    disabled={!canProceed()}
                                    className="flex items-center gap-2 px-6 py-2.5 rounded-lg gradient-accent text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                                >
                                    Nastavi <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    )
}

function StepHeading({ icon: Icon, title }: { icon: ElementType; title: string }) {
    return (
        <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-gold-100 flex items-center justify-center">
                <Icon className="w-5 h-5 text-gold-700" />
            </div>
            <h2 className="text-xl font-bold text-navy-950">{title}</h2>
        </div>
    )
}

function TextInput({ label, value, onChange, placeholder, type = 'text' }: {
    label: string
    value: string
    onChange: (value: string) => void
    placeholder: string
    type?: string
}) {
    return (
        <div>
            <label className="block text-sm font-bold text-navy-700 mb-1.5">{label}</label>
            <input type={type} value={value} onChange={(event) => onChange(event.target.value)} className="field-shell" placeholder={placeholder} />
        </div>
    )
}

function SelectInput({ label, value, onChange, placeholder, options }: {
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

function RangeInput({ label, value, onChange, desc }: {
    label: string
    value: number
    onChange: (value: number) => void
    desc: string
}) {
    return (
        <div>
            <div className="flex justify-between mb-1.5">
                <label className="text-sm font-bold text-navy-700">{label}</label>
                <span className="text-sm font-bold text-gold-700">{value}/10</span>
            </div>
            <input type="range" min="1" max="10" value={value} onChange={(event) => onChange(parseInt(event.target.value))} className="w-full accent-gold-600" />
            <p className="text-xs text-navy-400 mt-1">{desc}</p>
        </div>
    )
}

function PreviewItem({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <span className="text-navy-400">{label}:</span>{' '}
            <span className="font-bold text-navy-700">{value}</span>
        </div>
    )
}
