'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
    ArrowRight,
    BarChart3,
    Building2,
    CheckCircle2,
    FileText,
    Handshake,
    Lock,
    MessageSquare,
    Search,
    Shield,
    TrendingUp,
    Users,
} from 'lucide-react'

const fadeIn = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0 },
}

const benefits = [
    { icon: BarChart3, title: 'Realna početna vrijednost', desc: 'Prije izlaska na tržište znate raspon, faktore rizika i argumente za kupce.' },
    { icon: Shield, title: 'Potpuna diskrecija', desc: 'Identitet tvrtke i vlasnika štitimo kroz anonimni teaser, NDA i kontrolirani pristup.' },
    { icon: Users, title: 'Kvalificirani kupci', desc: 'Razgovarate s kupcima koji imaju motiv, kapital i jasan razlog za akviziciju.' },
    { icon: Building2, title: 'Premium pozicioniranje', desc: 'Tvrtka se predstavlja uredno, ozbiljno i bez nepotrebnog otkrivanja osjetljivih detalja.' },
]

const steps = [
    { icon: TrendingUp, title: '1. Procjena vrijednosti', desc: 'AI procjena daje raspon i Sell-Readiness signal prije bilo kakvog javnog koraka.', detail: 'Povjerljivo i bez obveze.' },
    { icon: MessageSquare, title: '2. Strategijski razgovor', desc: 'Razjašnjavamo motive, rok, idealnog kupca i što se ne smije otkriti prerano.', detail: 'Savjetnik vodi razgovor, ne skripta.' },
    { icon: FileText, title: '3. Teaser i priprema', desc: 'Pripremamo anoniman profil, ključne brojke i dokumentaciju za ozbiljan interes.', detail: 'Vlasnik odobrava sadržaj prije slanja.' },
    { icon: Lock, title: '4. NDA pristup', desc: 'Kupci dobivaju dublji uvid tek nakon provjere i potpisanog NDA-a.', detail: 'Manje znatiželje, više ozbiljnih razgovora.' },
    { icon: Search, title: '5. Uparivanje kupaca', desc: 'Ciljamo strateške kupce, investitore i poduzetnike s relevantnim kriterijima.', detail: 'Kvaliteta interesa ispred količine upita.' },
    { icon: Handshake, title: '6. Pregovori i struktura', desc: 'Uspoređujemo ponude, uvjete, earn-out, prijenos i očekivanja obje strane.', detail: 'Fokus je na izvedivom dogovoru.' },
    { icon: CheckCircle2, title: '7. Zatvaranje i tranzicija', desc: 'Koordiniramo pravne, financijske i operativne korake do prijenosa.', detail: 'Proces ostaje organiziran do zadnjeg potpisa.' },
]

export default function SellPage() {
    return (
        <div className="min-h-screen">
            <section className="gradient-hero pt-32 pb-20 overflow-hidden">
                <div className="section-shell">
                    <motion.div
                        initial={false}
                        animate="show"
                        transition={{ staggerChildren: 0.1 }}
                        className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center"
                    >
                        <div className="max-w-3xl">
                            <motion.p variants={fadeIn} className="text-xs font-bold uppercase tracking-wider text-gold-400 mb-5">
                                Prodaja tvrtke
                            </motion.p>
                            <motion.h1 variants={fadeIn} className="text-4xl md:text-6xl font-bold text-white mb-6">
                                Prodajte tvrtku bez pritiska, buke i improvizacije.
                            </motion.h1>
                            <motion.p variants={fadeIn} className="text-lg md:text-xl text-navy-200 mb-9 leading-relaxed font-sans">
                                Heritance kombinira indikativnu procjenu, anonimno pozicioniranje, provjerene kupce i savjetnika koji zna kada ubrzati, a kada zaštititi mir vlasnika.
                            </motion.p>
                            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4">
                                <Link href="/valuate" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg gradient-gold text-navy-950 font-bold shadow-lg transition-all hover:-translate-y-0.5">
                                    Pokrenite procjenu
                                    <TrendingUp className="w-5 h-5" />
                                </Link>
                                <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border border-white/20 text-white font-bold hover:bg-white/10 transition-all">
                                    Povjerljiv razgovor
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                            </motion.div>
                        </div>

                        <motion.div variants={fadeIn} className="premium-panel p-6 md:p-8">
                            <p className="text-sm font-bold uppercase tracking-wider text-gold-400 mb-6">Kontrolirani izlazak na tržište</p>
                            <div className="space-y-4">
                                {[
                                    'Anonimni teaser prije otkrivanja identiteta',
                                    'Provjera kupca prije slanja osjetljivih podataka',
                                    'Pregovori vođeni kriterijima, ne emocijama',
                                    'Plan tranzicije za kupca, zaposlenike i vlasnika',
                                ].map((item) => (
                                    <div key={item} className="flex items-start gap-3 rounded-lg bg-white/[0.06] p-4">
                                        <CheckCircle2 className="w-5 h-5 text-gold-400 mt-0.5" />
                                        <span className="text-sm text-navy-100 font-sans">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="section-shell">
                    <div className="text-center max-w-3xl mx-auto mb-14">
                        <p className="eyebrow mb-4">Zašto Heritance</p>
                        <h2 className="text-3xl md:text-4xl font-bold text-navy-950">
                            Proces koji čuva vrijednost i reputaciju.
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

            <section id="process" className="py-20 quiet-band">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <p className="eyebrow mb-4">Savjetnički proces</p>
                        <h2 className="text-3xl md:text-4xl font-bold text-navy-950 mb-4">
                            Od procjene do prijenosa vlasništva.
                        </h2>
                        <p className="text-lg text-muted-foreground font-sans">
                            Jasno definirani koraci pomažu vlasniku ostati u kontroli dok se interes tržišta provjerava.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {steps.map((step) => {
                            const Icon = step.icon
                            return (
                                <div key={step.title} className="premium-card p-6 md:p-7">
                                    <div className="flex gap-5">
                                        <div className="flex-shrink-0 w-12 h-12 rounded-lg gradient-accent flex items-center justify-center">
                                            <Icon className="w-6 h-6 text-gold-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-navy-950 mb-2">{step.title}</h3>
                                            <p className="text-navy-600 mb-2 font-sans">{step.desc}</p>
                                            <p className="text-sm text-muted-foreground font-sans">{step.detail}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="max-w-3xl mx-auto px-4 text-center">
                    <p className="eyebrow mb-4">Prvi korak</p>
                    <h2 className="text-3xl md:text-4xl font-bold text-navy-950 mb-6">
                        Saznajte okvirnu vrijednost prije nego otvorite razgovore.
                    </h2>
                    <p className="text-lg text-muted-foreground mb-9 font-sans">
                        Procjena traje nekoliko minuta i ne pokreće javni proces prodaje.
                    </p>
                    <Link href="/valuate" className="inline-flex items-center gap-2 px-9 py-4 rounded-lg gradient-gold text-navy-950 font-bold shadow-lg transition-all hover:-translate-y-0.5">
                        Start procjene
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>
        </div>
    )
}
