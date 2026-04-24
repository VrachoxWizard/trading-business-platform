'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
    ArrowRight,
    BarChart3,
    Bell,
    FileText,
    Lock,
    Search,
    Shield,
    Target,
} from 'lucide-react'

const fadeIn = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0 },
}

const benefits = [
    { icon: Search, title: 'Kurirane prilike', desc: 'Pregled anonimnih tvrtki s ključnim metrikama, bez šuma i nerelevantnih oglasa.' },
    { icon: Target, title: 'Uparivanje po tezi', desc: 'Sektor, veličina, regija i investicijska logika koriste se za kvalitetniji match.' },
    { icon: Shield, title: 'NDA prije detalja', desc: 'Dublji financijski uvid otvara se tek nakon digitalnog NDA-a i odobrenja.' },
    { icon: Bell, title: 'Upozorenja za nove prilike', desc: 'Kupci mogu pratiti profil interesa i reagirati kada se pojavi dobra prilika.' },
]

const steps = [
    { num: '01', title: 'Definirajte profil kupnje', desc: 'Industrije, regije, raspon vrijednosti, izvor kapitala i strateški razlog akvizicije.' },
    { num: '02', title: 'Pregledajte ili dobijte match', desc: 'Tržnica prikazuje anonimne prilike, a savjetnik pomaže procijeniti što je relevantno.' },
    { num: '03', title: 'Zatražite NDA pristup', desc: 'Nakon provjere interesa otvara se pristup detaljnijim financijama i dokumentima.' },
    { num: '04', title: 'Due diligence i ponuda', desc: 'Pitanja, dokumenti, LOI i struktura dogovora vode se kroz organiziran proces.' },
]

export default function BuyPage() {
    return (
        <div className="min-h-screen">
            <section className="gradient-hero pt-32 pb-20">
                <div className="section-shell">
                    <motion.div
                        initial={false}
                        animate="show"
                        transition={{ staggerChildren: 0.1 }}
                        className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center"
                    >
                        <div className="max-w-3xl">
                            <motion.p variants={fadeIn} className="text-xs font-bold uppercase tracking-wider text-gold-400 mb-5">
                                Kupnja tvrtke
                            </motion.p>
                            <motion.h1 variants={fadeIn} className="text-4xl md:text-6xl font-bold text-white mb-6">
                                Pronađite tvrtku koja ima smisla za vašu tezu.
                            </motion.h1>
                            <motion.p variants={fadeIn} className="text-lg md:text-xl text-navy-200 mb-9 leading-relaxed font-sans">
                                Heritance kupcima i investitorima daje pristup strukturiranim prilikama, jasnim metrikama i kontroliranom NDA procesu prije dubinskog uvida.
                            </motion.p>
                            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4">
                                <Link href="/listings" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg gradient-gold text-navy-950 font-bold shadow-lg transition-all hover:-translate-y-0.5">
                                    Pregledajte prilike
                                    <Search className="w-5 h-5" />
                                </Link>
                                <Link href="/login?mode=signup" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border border-white/20 text-white font-bold hover:bg-white/10 transition-all">
                                    Kreirajte profil kupca
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                            </motion.div>
                        </div>

                        <motion.div variants={fadeIn} className="premium-panel p-6 md:p-8">
                            <p className="text-sm font-bold uppercase tracking-wider text-gold-400 mb-6">Što kupac vidi prvo</p>
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { label: 'Industrija', value: 'Proizvodnja' },
                                    { label: 'Prihod', value: '€1.8M' },
                                    { label: 'EBITDA', value: '€320K' },
                                    { label: 'Status', value: 'NDA' },
                                ].map((item) => (
                                    <div key={item.label} className="rounded-lg bg-white/[0.06] p-4 border border-white/10">
                                        <p className="text-xs uppercase tracking-wider text-navy-300 mb-1">{item.label}</p>
                                        <p className="text-xl font-bold text-white">{item.value}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-5 flex items-start gap-3 rounded-lg bg-gold-400/10 border border-gold-400/20 p-4">
                                <Lock className="w-5 h-5 text-gold-400 mt-0.5" />
                                <p className="text-sm text-navy-100 font-sans">Identitet i puni dokumenti ostaju zatvoreni dok interes ne prođe provjeru.</p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="section-shell">
                    <div className="text-center max-w-3xl mx-auto mb-14">
                        <p className="eyebrow mb-4">Za ozbiljne kupce</p>
                        <h2 className="text-3xl md:text-4xl font-bold text-navy-950">
                            Manje nasumičnog pretraživanja, više kvalitetnih razgovora.
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {benefits.map((benefit) => {
                            const Icon = benefit.icon
                            return (
                                <div key={benefit.title} className="premium-card p-6 text-center">
                                    <div className="w-12 h-12 rounded-lg gradient-accent flex items-center justify-center mx-auto mb-4">
                                        <Icon className="w-6 h-6 text-gold-400" />
                                    </div>
                                    <h3 className="text-lg font-bold text-navy-950 mb-2">{benefit.title}</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed font-sans">{benefit.desc}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            <section className="py-20 quiet-band">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <p className="eyebrow mb-4">Proces kupnje</p>
                        <h2 className="text-3xl md:text-4xl font-bold text-navy-950 mb-4">
                            Od profila interesa do ponude.
                        </h2>
                        <p className="text-lg text-muted-foreground font-sans">
                            Kupac dobiva dovoljno informacija za odluku, a vlasnik zadržava kontrolu nad povjerljivošću.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {steps.map((step) => (
                            <div key={step.num} className="premium-card p-6 md:p-7">
                                <div className="flex gap-5">
                                    <div className="w-12 h-12 rounded-lg gradient-accent flex items-center justify-center flex-shrink-0">
                                        <span className="text-gold-400 font-mono font-bold text-sm">{step.num}</span>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-navy-950 mb-2">{step.title}</h3>
                                        <p className="text-navy-600 font-sans">{step.desc}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="max-w-3xl mx-auto px-4 text-center">
                    <p className="eyebrow mb-4">Sljedeći korak</p>
                    <h2 className="text-3xl md:text-4xl font-bold text-navy-950 mb-6">
                        Počnite s pregledom aktivnih prilika.
                    </h2>
                    <p className="text-lg text-muted-foreground mb-9 font-sans">
                        Ako trenutno nema odgovarajućih prilika, profil kupca pomaže da budete prvi u redu kada se pojave.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/listings" className="inline-flex items-center justify-center gap-2 px-9 py-4 rounded-lg gradient-gold text-navy-950 font-bold shadow-lg transition-all hover:-translate-y-0.5">
                            Tržnica prilika
                            <BarChart3 className="w-5 h-5" />
                        </Link>
                        <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-9 py-4 rounded-lg border border-navy-200 text-navy-950 font-bold hover:bg-navy-50 transition-all">
                            Razgovor sa savjetnikom
                            <FileText className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
