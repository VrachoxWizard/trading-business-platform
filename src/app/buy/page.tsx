'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
    Search,
    TrendingUp,
    Shield,
    BarChart3,
    ArrowRight,
    CheckCircle2,
    Users,
    FileText,
    Target,
    Bell,
} from 'lucide-react'

const fadeIn = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
}

const stagger = { animate: { transition: { staggerChildren: 0.1 } } }

const benefits = [
    { icon: Search, title: 'Curated Deal Flow', desc: 'Browse pre-vetted, anonymous listings with key financials visible. No tire-kickers, no time-wasters.' },
    { icon: BarChart3, title: 'AI-Powered Matching', desc: 'Our matching engine surfaces the best opportunities based on your industry, size, and geography criteria.' },
    { icon: Shield, title: 'NDA-Protected Access', desc: 'Sign NDAs digitally to unlock full financials, CIMs, and direct broker introductions.' },
    { icon: Target, title: 'Personalized Alerts', desc: 'Get notified when new listings match your acquisition profile. Never miss an opportunity.' },
]

const steps = [
    {
        num: '01',
        title: 'Create Your Buyer Profile',
        desc: 'Tell us your target industries, regions, size range, and investment thesis.',
        detail: 'Takes under 3 minutes. 100% confidential.',
    },
    {
        num: '02',
        title: 'Browse & Get Matched',
        desc: 'Explore anonymous listings on the marketplace, or let our AI match you with relevant opportunities.',
        detail: 'Only matches above 70% fit score are presented.',
    },
    {
        num: '03',
        title: 'Request NDA Access',
        desc: 'Interested in a listing? Sign an NDA to unlock the data room with full financials.',
        detail: 'Secure, digital NDA process with broker oversight.',
    },
    {
        num: '04',
        title: 'Due Diligence & Offer',
        desc: 'Review documents, ask questions through the deal room, and submit your Letter of Intent.',
        detail: 'Your Heritance broker guides negotiations and deal structuring.',
    },
]

export default function BuyPage() {
    return (
        <div className="min-h-screen">
            {/* Hero */}
            <section className="gradient-hero pt-32 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div initial="initial" animate="animate" variants={stagger} className="max-w-3xl">
                        <motion.h1 variants={fadeIn} className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                            Acquire with{' '}
                            <span className="text-gold-400">confidence</span>
                        </motion.h1>
                        <motion.p variants={fadeIn} className="text-lg md:text-xl text-navy-200 mb-10 leading-relaxed font-sans">
                            Heritance gives acquirers and investors access to pre-vetted Croatian businesses with verified financials, NDA-protected data rooms, and AI-powered deal matching.
                        </motion.p>
                        <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href="/listings"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg gradient-gold text-navy-950 font-bold text-lg font-sans shadow-md hover:shadow-lg transition-all hover:scale-[1.02]"
                            >
                                <Search className="w-5 h-5" />
                                Browse Listings
                            </Link>
                            <Link
                                href="/login?mode=signup"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border-2 border-white/20 text-white font-bold text-lg font-sans hover:bg-white/10 transition-all"
                            >
                                Create Buyer Profile
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Benefits */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger}>
                        <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold text-navy-950 text-center mb-16">
                            Why buy through Heritance?
                        </motion.h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {benefits.map((b) => {
                                const Icon = b.icon
                                return (
                                    <motion.div key={b.title} variants={fadeIn} className="text-center">
                                        <div className="w-14 h-14 rounded-[8px] bg-navy-950 flex items-center justify-center mx-auto mb-4 shadow-sm">
                                            <Icon className="w-7 h-7 text-gold-400" />
                                        </div>
                                        <h3 className="text-lg font-bold text-navy-950 mb-2">{b.title}</h3>
                                        <p className="text-sm text-[var(--muted-foreground)] leading-relaxed font-sans">{b.desc}</p>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* How it works */}
            <section className="py-20 bg-[var(--background)]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger}>
                        <motion.div variants={fadeIn} className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-navy-950 mb-4">
                                How buying works
                            </h2>
                            <p className="text-[var(--muted-foreground)] text-lg max-w-2xl mx-auto font-sans">
                                From browsing to closing — a transparent, broker-guided acquisition process.
                            </p>
                        </motion.div>

                        <div className="space-y-6">
                            {steps.map((step) => (
                                <motion.div
                                    key={step.num}
                                    variants={fadeIn}
                                    className="bg-white rounded-[8px] p-6 md:p-8 shadow-card border border-[var(--border)] hover:shadow-elevated transition-all"
                                >
                                    <div className="flex gap-5">
                                        <div className="flex-shrink-0">
                                            <div className="w-12 h-12 rounded-[8px] bg-navy-950 flex items-center justify-center shadow-sm">
                                                <span className="text-gold-400 font-mono font-bold text-sm">{step.num}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-navy-950 mb-2">{step.title}</h3>
                                            <p className="text-navy-600 mb-2 font-sans">{step.desc}</p>
                                            <p className="text-sm text-[var(--muted-foreground)] italic font-sans">{step.detail}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-20 bg-white">
                <div className="max-w-3xl mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-navy-950 mb-6">
                        Ready to find your next acquisition?
                    </h2>
                    <p className="text-lg text-[var(--muted-foreground)] mb-10 font-sans">
                        Create a free buyer profile and start receiving matched opportunities today.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/listings"
                            className="inline-flex items-center gap-2 px-10 py-5 rounded-lg gradient-gold text-navy-950 font-bold text-lg font-sans shadow-md hover:shadow-lg transition-all hover:scale-[1.02]"
                        >
                            <Search className="w-5 h-5" />
                            Browse Listings
                        </Link>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-10 py-5 rounded-lg border-2 border-navy-950 text-navy-950 font-bold text-lg font-sans hover:bg-navy-50 transition-all"
                        >
                            Talk to an Advisor
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
