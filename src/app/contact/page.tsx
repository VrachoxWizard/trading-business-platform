'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { motion } from 'framer-motion'
import { Building2, CheckCircle2, Mail, MapPin, Phone, Send, Shield, AlertCircle } from 'lucide-react'

const contactSchema = z.object({
    name: z.string().min(2, 'Ime mora imati barem 2 znaka'),
    email: z.string().email('Unesite ispravnu email adresu'),
    company: z.string().optional(),
    topic: z.string().min(1, 'Odaberite temu razgovora'),
    message: z.string().min(10, 'Poruka mora imati barem 10 znakova'),
})

type ContactFormValues = z.infer<typeof contactSchema>

const fadeIn = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0 },
}

export default function ContactPage() {
    const searchParams = useSearchParams()
    const [submitted, setSubmitted] = useState(false)
    const [submitError, setSubmitError] = useState<string | null>(null)

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ContactFormValues>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            name: '',
            email: '',
            company: '',
            topic: searchParams.get('topic') || 'Razmišljam o prodaji tvrtke',
            message: '',
        },
    })

    const onSubmit = async (data: ContactFormValues) => {
        setSubmitError(null)
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })

            if (!res.ok) {
                const responseData = (await res.json().catch(() => null)) as { error?: string } | null
                setSubmitError(responseData?.error || 'Došlo je do greške prilikom slanja poruke. Molimo pokušajte ponovno.')
                return
            }

            setSubmitted(true)
        } catch {
            setSubmitError('Došlo je do greške prilikom slanja poruke. Molimo pokušajte ponovno.')
        }
    }

    return (
        <div className="min-h-screen bg-background pt-24">
            <div className="section-shell py-12">
                <motion.div initial={false} animate="show" transition={{ staggerChildren: 0.1 }}>
                    <motion.div variants={fadeIn} className="text-center mb-14">
                        <p className="eyebrow mb-4">Kontakt</p>
                        <h1 className="text-3xl md:text-5xl font-bold text-navy-950 mb-4">
                            Razgovarajmo diskretno o vašoj situaciji.
                        </h1>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-sans">
                            Bez javnog signala, bez obveze i bez slanja osjetljivih podataka dok ne definiramo pravi okvir.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                        <motion.div variants={fadeIn} className="lg:col-span-3">
                            <div className="premium-card p-6 md:p-8">
                                {submitted ? (
                                    <div className="text-center py-14">
                                        <div className="w-16 h-16 rounded-lg bg-green-50 flex items-center justify-center mx-auto mb-5 border border-green-100">
                                            <CheckCircle2 className="w-8 h-8 text-green-600" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-navy-950 mb-2">Poruka je zaprimljena</h2>
                                        <p className="text-muted-foreground font-sans max-w-md mx-auto">
                                            Javit ćemo se u najkraćem roku s prijedlogom povjerljivog sljedećeg koraka.
                                        </p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                        {submitError && (
                                            <div className="p-4 rounded-lg bg-red-50 border border-red-200 flex items-start gap-3">
                                                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                                                <p className="text-sm text-red-800 font-sans">{submitError}</p>
                                            </div>
                                        )}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                            <div>
                                                <label className="block text-sm font-bold text-navy-700 mb-1.5 font-sans">Ime i prezime *</label>
                                                <input 
                                                    {...register('name')} 
                                                    className={`field-shell ${errors.name ? 'border-red-300 ring-1 ring-red-300' : ''}`} 
                                                    placeholder="Vaše ime" 
                                                />
                                                {errors.name && <p className="text-xs text-red-500 mt-1.5">{errors.name.message}</p>}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-navy-700 mb-1.5 font-sans">Email *</label>
                                                <input 
                                                    {...register('email')} 
                                                    className={`field-shell ${errors.email ? 'border-red-300 ring-1 ring-red-300' : ''}`} 
                                                    placeholder="ime@tvrtka.hr" 
                                                />
                                                {errors.email && <p className="text-xs text-red-500 mt-1.5">{errors.email.message}</p>}
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-navy-700 mb-1.5 font-sans">Tvrtka</label>
                                            <input 
                                                {...register('company')} 
                                                className="field-shell" 
                                                placeholder="Naziv tvrtke (opcionalno)" 
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-navy-700 mb-1.5 font-sans">Tema razgovora</label>
                                            <select {...register('topic')} className="field-shell bg-white">
                                                <option value="Razmišljam o prodaji tvrtke">Razmišljam o prodaji tvrtke</option>
                                                <option value="Želim kupiti tvrtku">Želim kupiti tvrtku</option>
                                                <option value="Planiram sukcesiju">Planiram sukcesiju</option>
                                                <option value="Partnerstvo ili savjetnička suradnja">Partnerstvo ili savjetnička suradnja</option>
                                                <option value="Opći upit">Opći upit</option>
                                            </select>
                                            {errors.topic && <p className="text-xs text-red-500 mt-1.5">{errors.topic.message}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-navy-700 mb-1.5 font-sans">Poruka *</label>
                                            <textarea
                                                {...register('message')}
                                                rows={5}
                                                className={`field-shell resize-none ${errors.message ? 'border-red-300 ring-1 ring-red-300' : ''}`}
                                                placeholder="U nekoliko rečenica opišite što želite istražiti."
                                            />
                                            {errors.message && <p className="text-xs text-red-500 mt-1.5">{errors.message.message}</p>}
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg gradient-gold text-navy-950 font-bold text-sm font-sans shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md disabled:opacity-50 disabled:hover:translate-y-0"
                                        >
                                            {isSubmitting ? (
                                                <div className="w-4 h-4 border-2 border-navy-950/30 border-t-navy-950 rounded-full animate-spin" />
                                            ) : (
                                                <Send className="w-4 h-4" />
                                            )}
                                            {isSubmitting ? 'Slanje...' : 'Pošaljite poruku'}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </motion.div>

                        <motion.div variants={fadeIn} className="lg:col-span-2 space-y-5">
                            <div className="premium-card p-6">
                                <h3 className="text-lg font-bold text-navy-950 mb-4">Heritance ured</h3>
                                <div className="space-y-4 text-sm text-muted-foreground font-sans">
                                    <div className="flex items-start gap-3">
                                        <MapPin className="w-5 h-5 text-gold-600 mt-0.5" />
                                        <div>
                                            <p className="font-bold text-navy-700">Zagreb, Hrvatska</p>
                                            <p>Sastanci uživo po dogovoru</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Mail className="w-5 h-5 text-gold-600 mt-0.5" />
                                        <div>
                                            <p className="font-bold text-navy-700">Email</p>
                                            <a href="mailto:info@heritance.hr" className="hover:text-gold-700 transition-colors">info@heritance.hr</a>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Phone className="w-5 h-5 text-gold-600 mt-0.5" />
                                        <div>
                                            <p className="font-bold text-navy-700">Telefon</p>
                                            <a href="tel:+385123456789" className="hover:text-gold-700 transition-colors">+385 1 234 5678</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-navy-950 rounded-lg p-6 shadow-card border border-navy-800">
                                <Shield className="w-8 h-8 text-gold-400 mb-4" />
                                <h3 className="text-lg font-bold text-white mb-3">Povjerljivost je početna postavka</h3>
                                <p className="text-navy-300 text-sm leading-relaxed mb-5 font-sans">
                                    U prvom razgovoru ne trebate otkrivati identitet tvrtke ako to nije potrebno za okvirnu procjenu.
                                </p>
                                <div className="grid grid-cols-1 gap-2 text-xs text-navy-300 font-sans">
                                    <span className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-gold-400" /> Bez obveze</span>
                                    <span className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-gold-400" /> Diskretni prvi korak</span>
                                    <span className="flex items-center gap-2"><Building2 className="w-3.5 h-3.5 text-gold-400" /> Iskustvo u transakcijama</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
