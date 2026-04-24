'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
    BookOpen,
    Users,
    TrendingUp,
    Shield,
    ArrowRight,
    CheckCircle2,
    Heart,
    Briefcase,
    Clock,
} from 'lucide-react'

const fadeIn = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
}

const stagger = { animate: { transition: { staggerChildren: 0.1 } } }

const challenges = [
    {
        icon: Clock,
        title: 'Timing Is Everything',
        desc: 'Most owners wait too long to plan their exit, leaving value on the table and limiting options.',
    },
    {
        icon: Heart,
        title: 'Emotional Attachment',
        desc: 'Your business is personal. Separating emotion from decision-making requires structure and guidance.',
    },
    {
        icon: Users,
        title: 'Finding the Right Successor',
        desc: 'Whether family, management, or external — identifying the right buyer protects your legacy.',
    },
    {
        icon: Briefcase,
        title: 'Complex Processes',
        desc: 'Legal, financial, and operational preparation for a sale or transfer is multi-layered.',
    },
]

const resources = [
    {
        title: 'Start With a Valuation',
        desc: 'Understand what your business is worth today with our free AI-powered valuator.',
        cta: 'Get Free Valuation',
        href: '/valuate',
    },
    {
        title: 'Talk to an Expert',
        desc: 'Schedule a free, confidential 30-minute consultation with a Heritance advisor.',
        cta: 'Contact Us',
        href: '/contact',
    },
    {
        title: 'Explore the Market',
        desc: 'See how similar businesses are positioned on the Heritance marketplace.',
        cta: 'Browse Listings',
        href: '/listings',
    },
]

export default function SuccessionPage() {
    return (
        <div className="min-h-screen">
            {/* Hero */}
            <section className="gradient-hero pt-32 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div initial="initial" animate="animate" variants={stagger} className="max-w-3xl">
                        <motion.div variants={fadeIn} className="mb-6">
                            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-sm font-sans">
                                <BookOpen className="w-3 h-3" />
                                Business Succession Planning
                            </span>
                        </motion.div>
                        <motion.h1 variants={fadeIn} className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                            Every business deserves a{' '}
                            <span className="text-gold-400">next chapter</span>
                        </motion.h1>
                        <motion.p variants={fadeIn} className="text-lg md:text-xl text-navy-200 mb-10 leading-relaxed font-sans">
                            Business succession planning is one of the most important — and overlooked — decisions a founder makes. Heritance provides the tools, expertise, and discretion to navigate it with confidence.
                        </motion.p>
                        <motion.div variants={fadeIn}>
                            <Link
                                href="/valuate"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg gradient-gold text-navy-950 font-bold text-lg font-sans shadow-md hover:shadow-lg transition-all hover:scale-[1.02]"
                            >
                                <TrendingUp className="w-5 h-5" />
                                Start With a Valuation
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* The Challenge */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger}>
                        <motion.div variants={fadeIn} className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-navy-950 mb-4">
                                Why succession matters
                            </h2>
                            <p className="text-[var(--muted-foreground)] text-lg max-w-2xl mx-auto font-sans">
                                In Croatia, over 60% of small businesses face succession challenges within the next decade. Most owners haven&apos;t started planning.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {challenges.map((c) => {
                                const Icon = c.icon
                                return (
                                    <motion.div key={c.title} variants={fadeIn} className="text-center">
                                        <div className="w-14 h-14 rounded-[8px] bg-navy-50 flex items-center justify-center mx-auto mb-4">
                                            <Icon className="w-7 h-7 text-navy-700" />
                                        </div>
                                        <h3 className="text-lg font-bold text-navy-950 mb-2">{c.title}</h3>
                                        <p className="text-sm text-[var(--muted-foreground)] leading-relaxed font-sans">{c.desc}</p>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* How Heritance Helps */}
            <section className="py-20 bg-[var(--background)]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger}>
                        <motion.div variants={fadeIn} className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-navy-950 mb-4">
                                How Heritance can help
                            </h2>
                            <p className="text-[var(--muted-foreground)] text-lg max-w-2xl mx-auto font-sans">
                                Whether you&apos;re ready to sell, exploring options, or planning for the future — we meet you where you are.
                            </p>
                        </motion.div>

                        <div className="space-y-6">
                            {[
                                { title: 'Understand Your Position', desc: 'Our AI valuator gives you a realistic view of your business\'s market value, sell-readiness score, and areas for improvement.' },
                                { title: 'Explore Your Options', desc: 'Full sale, partial sale, management buyout, or family transfer — we help you evaluate each path objectively.' },
                                { title: 'Prepare Confidentially', desc: 'When you\'re ready, we create professional documentation and connect you with verified buyers — all under strict NDA.' },
                                { title: 'Close With Confidence', desc: 'Your dedicated Heritance broker negotiates terms, coordinates legal, and ensures a smooth transition for you, your employees, and your clients.' },
                            ].map((step, i) => (
                                <motion.div
                                    key={step.title}
                                    variants={fadeIn}
                                    className="bg-white rounded-[8px] p-6 md:p-8 shadow-card border border-[var(--border)] flex gap-5"
                                >
                                    <div className="flex-shrink-0">
                                        <div className="w-10 h-10 rounded-full bg-gold-600 flex items-center justify-center">
                                            <span className="text-white font-mono font-bold text-sm">{i + 1}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-navy-950 mb-2">{step.title}</h3>
                                        <p className="text-navy-600 font-sans">{step.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Resources */}
            <section className="py-20 bg-navy-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Take the first step
                        </h2>
                        <p className="text-navy-300 text-lg font-sans">
                            No commitment required. Start exploring your options today.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {resources.map((r) => (
                            <div key={r.title} className="bg-white/5 backdrop-blur-sm rounded-[8px] p-8 border border-white/10">
                                <h3 className="text-xl font-bold text-white mb-3">{r.title}</h3>
                                <p className="text-navy-300 text-sm leading-relaxed mb-6 font-sans">{r.desc}</p>
                                <Link
                                    href={r.href}
                                    className="inline-flex items-center gap-2 text-gold-400 font-semibold text-sm hover:gap-3 transition-all font-sans"
                                >
                                    {r.cta}
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
