'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
    TrendingUp,
    Shield,
    Users,
    FileText,
    Handshake,
    ArrowRight,
    CheckCircle2,
    Search,
    MessageSquare,
    BarChart3,
    Lock,
    Building2,
} from 'lucide-react'

const fadeIn = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
}

const stagger = { animate: { transition: { staggerChildren: 0.1 } } }

const steps = [
    {
        icon: TrendingUp,
        title: '1. Free Valuation',
        desc: 'Our AI analyzes your financials and market data to provide a valuation range in under 5 minutes.',
        detail: 'Conservative, realistic, and optimistic estimates with a Sell-Readiness Score.',
    },
    {
        icon: MessageSquare,
        title: '2. Strategy Consultation',
        desc: 'A dedicated Heritance broker discusses your goals, timeline, and optimal exit strategy.',
        detail: 'Free 30-minute call. No obligation. Completely confidential.',
    },
    {
        icon: FileText,
        title: '3. Engagement & Preparation',
        desc: 'We prepare a professional Confidential Information Memorandum (CIM) and blind teaser.',
        detail: 'Engagement fee: €1,500 – €5,000 depending on complexity.',
    },
    {
        icon: Shield,
        title: '4. Confidential Listing',
        desc: 'Your business is listed anonymously on Heritance. No identifying information is shared.',
        detail: 'AI generates a blind teaser that you must approve before publishing.',
    },
    {
        icon: Search,
        title: '5. Buyer Matching & Outreach',
        desc: 'Our AI matching engine identifies pre-qualified buyers based on sector, size, and geography.',
        detail: 'Only matches above 70% fit score are presented. Quality over quantity.',
    },
    {
        icon: Lock,
        title: '6. NDA & Due Diligence',
        desc: 'Interested buyers sign an NDA to access the deal room with your confidential documents.',
        detail: 'Secure, digital NDA process with broker oversight.',
    },
    {
        icon: Handshake,
        title: '7. Negotiation & Structuring',
        desc: 'Your broker guides LOI negotiation, deal structuring, and terms optimization.',
        detail: 'We protect your interests while finding win-win solutions.',
    },
    {
        icon: CheckCircle2,
        title: '8. Closing & Transition',
        desc: 'Legal coordination, closing support, and post-sale transition planning.',
        detail: 'Success fee: 5% – 8% of transaction value. Only paid on closing.',
    },
]

const benefits = [
    { icon: BarChart3, title: 'Data-Driven Valuation', desc: 'Know exactly what your business is worth before entering the market.' },
    { icon: Shield, title: 'Total Confidentiality', desc: 'Your employees, competitors, and partners never know you\'re selling.' },
    { icon: Users, title: 'Pre-Qualified Buyers', desc: 'No tire-kickers. Every buyer is vetted and financially capable.' },
    { icon: Building2, title: 'Premium Positioning', desc: 'Professional CIM and teaser that showcase your business\'s best qualities.' },
]

export default function SellPage() {
    return (
        <div className="min-h-screen">
            {/* Hero */}
            <section className="gradient-hero pt-32 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div initial="initial" animate="animate" variants={stagger} className="max-w-3xl">
                        <motion.h1 variants={fadeIn} className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                            Sell your business with{' '}
                            <span className="text-gold-400">confidence</span>
                        </motion.h1>
                        <motion.p variants={fadeIn} className="text-lg md:text-xl text-navy-200 mb-10 leading-relaxed">
                            Heritance combines AI-powered tools with personal brokerage to maximize your exit value while maintaining complete confidentiality.
                        </motion.p>
                        <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href="/valuate"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl gradient-gold text-navy-950 font-bold text-lg shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02]"
                            >
                                <TrendingUp className="w-5 h-5" />
                                Get My Free Valuation
                            </Link>
                            <Link
                                href="/login?mode=signup"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border-2 border-white/20 text-white font-bold text-lg hover:bg-white/10 transition-all"
                            >
                                Create Seller Account
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
                            Why sell with Heritance?
                        </motion.h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {benefits.map((b) => {
                                const Icon = b.icon
                                return (
                                    <motion.div key={b.title} variants={fadeIn} className="text-center">
                                        <div className="w-14 h-14 rounded-2xl gradient-accent flex items-center justify-center mx-auto mb-4 shadow-lg">
                                            <Icon className="w-7 h-7 text-white" />
                                        </div>
                                        <h3 className="text-lg font-bold text-navy-950 mb-2">{b.title}</h3>
                                        <p className="text-sm text-navy-500 leading-relaxed">{b.desc}</p>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 8-Step Process */}
            <section id="process" className="py-20 bg-navy-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger}>
                        <motion.div variants={fadeIn} className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-navy-950 mb-4">
                                Our 8-Step Brokerage Process
                            </h2>
                            <p className="text-navy-500 text-lg max-w-2xl mx-auto">
                                A proven, transparent methodology that guides you from valuation to closing.
                            </p>
                        </motion.div>

                        <div className="space-y-6">
                            {steps.map((step, i) => {
                                const Icon = step.icon
                                return (
                                    <motion.div
                                        key={step.title}
                                        variants={fadeIn}
                                        className="bg-white rounded-2xl p-6 md:p-8 shadow-card border border-navy-100 hover:shadow-elevated hover:border-accent-200 transition-all"
                                    >
                                        <div className="flex gap-5">
                                            <div className="flex-shrink-0">
                                                <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center shadow-md">
                                                    <Icon className="w-6 h-6 text-white" />
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-navy-950 mb-2">{step.title}</h3>
                                                <p className="text-navy-600 mb-2">{step.desc}</p>
                                                <p className="text-sm text-navy-400 italic">{step.detail}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-20 bg-white">
                <div className="max-w-3xl mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-navy-950 mb-6">
                        Ready to explore your options?
                    </h2>
                    <p className="text-lg text-navy-500 mb-10">
                        Start with a free, no-obligation AI valuation. It takes less than 5 minutes.
                    </p>
                    <Link
                        href="/valuate"
                        className="inline-flex items-center gap-2 px-10 py-5 rounded-2xl gradient-gold text-navy-950 font-bold text-lg shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02]"
                    >
                        <TrendingUp className="w-5 h-5" />
                        Start Free Valuation
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>
        </div>
    )
}
