'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
    ArrowRight,
    BookOpen,
    Briefcase,
    Clock,
    Heart,
    Shield,
    TrendingUp,
    Users,
} from 'lucide-react'

const fadeIn = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0 },
}

const challenges = [
    { icon: Clock, title: 'Vrijeme odluke', desc: 'Mnogi vlasnici čekaju predugo, pa tržište, obitelj ili zdravlje počnu diktirati tempo.' },
    { icon: Heart, title: 'Emocionalna težina', desc: 'Tvrtka nije samo imovina. Strukturiran proces pomaže odvojiti emociju od odluke.' },
    { icon: Users, title: 'Nasljednik ili kupac', desc: 'Obitelj, menadžment, strateški kupac ili investitor imaju različite posljedice.' },
    { icon: Briefcase, title: 'Priprema tvrtke', desc: 'Dokumentacija, financije, uloge i procesi moraju biti razumljivi novom vlasniku.' },
]

const options = [
    { title: 'Procijeniti sadašnju vrijednost', desc: 'Dobiti realan raspon i razumjeti što najviše utječe na vrijednost tvrtke.' },
    { title: 'Usporediti scenarije', desc: 'Potpuna prodaja, djelomična prodaja, management buyout ili obiteljski prijenos.' },
    { title: 'Pripremiti tvrtku bez javnosti', desc: 'Dokumentacija i teaser mogu se pripremiti dok je proces još potpuno privatan.' },
    { title: 'Otvoriti razgovore samo kad ima smisla', desc: 'Kupci se provjeravaju prije nego dobiju identitet ili osjetljive podatke.' },
]

const resources = [
    { title: 'Počnite s procjenom', desc: 'Saznajte okvirnu vrijednost tvrtke i spremnost za izlazak.', cta: 'Procjena vrijednosti', href: '/valuate' },
    { title: 'Razgovarajte sa savjetnikom', desc: 'Povjerljiv razgovor o obiteljskim, tržišnim i osobnim opcijama.', cta: 'Kontakt', href: '/contact' },
    { title: 'Pogledajte tržište', desc: 'Upoznajte kako se slične prilike strukturiraju na Heritance tržnici.', cta: 'Tržnica prilika', href: '/listings' },
]

export default function SuccessionPage() {
    return (
        <div className="min-h-screen">
            <section className="gradient-hero pt-32 pb-20">
                <div className="section-shell">
                    <motion.div initial={false} animate="show" transition={{ staggerChildren: 0.1 }} className="max-w-3xl">
                        <motion.div variants={fadeIn} className="mb-6">
                            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-sm font-sans">
                                <BookOpen className="w-3 h-3" />
                                Sukcesija i izlaz vlasnika
                            </span>
                        </motion.div>
                        <motion.h1 variants={fadeIn} className="text-4xl md:text-6xl font-bold text-white mb-6">
                            Svaka dobra tvrtka treba plan za sljedeće poglavlje.
                        </motion.h1>
                        <motion.p variants={fadeIn} className="text-lg md:text-xl text-navy-200 mb-9 leading-relaxed font-sans">
                            Sukcesija nije samo pitanje prodaje. To je pitanje vrijednosti, obitelji, zaposlenika i vremena. Heritance pomaže vlasniku razumjeti opcije prije nego odluka postane hitna.
                        </motion.p>
                        <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4">
                            <Link href="/valuate" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg gradient-gold text-navy-950 font-bold shadow-lg transition-all hover:-translate-y-0.5">
                                Krenite s procjenom
                                <TrendingUp className="w-5 h-5" />
                            </Link>
                            <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border border-white/20 text-white font-bold hover:bg-white/10 transition-all">
                                Povjerljiv razgovor
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="section-shell">
                    <div className="text-center max-w-3xl mx-auto mb-14">
                        <p className="eyebrow mb-4">Zašto planirati ranije</p>
                        <h2 className="text-3xl md:text-4xl font-bold text-navy-950 mb-4">
                            Najbolji izlazi se ne događaju u žurbi.
                        </h2>
                        <p className="text-lg text-muted-foreground font-sans">
                            Kad vlasnik ima vrijeme i podatke, može birati između opcija, umjesto da reagira na okolnosti.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {challenges.map((challenge) => {
                            const Icon = challenge.icon
                            return (
                                <div key={challenge.title} className="premium-card p-6 text-center">
                                    <div className="w-12 h-12 rounded-lg bg-navy-50 flex items-center justify-center mx-auto mb-4">
                                        <Icon className="w-6 h-6 text-navy-700" />
                                    </div>
                                    <h3 className="text-lg font-bold text-navy-950 mb-2">{challenge.title}</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed font-sans">{challenge.desc}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            <section className="py-20 quiet-band">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <p className="eyebrow mb-4">Kako Heritance pomaže</p>
                        <h2 className="text-3xl md:text-4xl font-bold text-navy-950 mb-4">
                            Opcije postaju jasne kada ih stavite u isti okvir.
                        </h2>
                    </div>
                    <div className="space-y-4">
                        {options.map((option, index) => (
                            <div key={option.title} className="premium-card p-6 md:p-7 flex gap-5">
                                <div className="w-10 h-10 rounded-lg gradient-gold flex items-center justify-center flex-shrink-0">
                                    <span className="text-navy-950 font-mono font-bold text-sm">{index + 1}</span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-navy-950 mb-2">{option.title}</h3>
                                    <p className="text-navy-600 font-sans">{option.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 bg-navy-950">
                <div className="section-shell">
                    <div className="text-center mb-14">
                        <p className="text-xs font-bold uppercase tracking-wider text-gold-400 mb-4">Prvi korak bez obveze</p>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Istražite opcije bez javnog signala tržištu.
                        </h2>
                        <p className="text-navy-300 text-lg font-sans">
                            Nasljedstvo, prodaja i prijenos vlasništva mogu se planirati tiho.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {resources.map((resource) => (
                            <div key={resource.title} className="premium-panel p-7">
                                <Shield className="w-7 h-7 text-gold-400 mb-5" />
                                <h3 className="text-xl font-bold text-white mb-3">{resource.title}</h3>
                                <p className="text-navy-300 text-sm leading-relaxed mb-6 font-sans">{resource.desc}</p>
                                <Link href={resource.href} className="inline-flex items-center gap-2 text-gold-400 font-bold text-sm hover:gap-3 transition-all font-sans">
                                    {resource.cta}
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
