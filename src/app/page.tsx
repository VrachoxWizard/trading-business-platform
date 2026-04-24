'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import ProcessTimeline from '@/components/ProcessTimeline'
import {
  TrendingUp,
  Shield,
  Zap,
  Users,
  Building2,
  Briefcase,
  Search,
  ChevronRight,
  Star,
  ArrowRight,
  CheckCircle2,
  Clock,
  Lock,
  BarChart3,
  FileText,
  Handshake,
} from 'lucide-react'

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } },
}

const personas = [
  {
    icon: Building2,
    title: 'Business Owners',
    desc: 'Get an AI valuation in 5 minutes and find pre-qualified buyers discretely.',
    cta: 'Value My Business',
    href: '/valuate',
    color: 'from-accent-600 to-accent-400',
  },
  {
    icon: Briefcase,
    title: 'Acquirers & Investors',
    desc: 'Access curated deal flow with verified financials and NDA-protected data rooms.',
    cta: 'Browse Deals',
    href: '/listings',
    color: 'from-gold-600 to-gold-400',
  },
  {
    icon: Users,
    title: 'Advisors & Funds',
    desc: 'Partner with us for co-brokerage, deal sourcing, and portfolio company exits.',
    cta: 'Partner With Us',
    href: '#',
    color: 'from-navy-700 to-navy-500',
  },
]

const features = [
  {
    icon: Zap,
    title: 'AI Valuation in 5 Min',
    desc: 'Proprietary algorithm using industry multipliers and 30+ data points.',
  },
  {
    icon: Shield,
    title: 'Confidential & Anonymous',
    desc: 'Your identity is protected until you sign an NDA. Full GDPR compliance.',
  },
  {
    icon: BarChart3,
    title: 'Smart Matching',
    desc: 'AI pairs buyers and sellers based on sector, size, geography, and fit.',
  },
  {
    icon: FileText,
    title: 'Blind Teaser Generator',
    desc: 'AI drafts professional, anonymous business teasers from your data.',
  },
  {
    icon: Lock,
    title: 'Secure Deal Rooms',
    desc: 'NDA-gated document sharing for financial reports and contracts.',
  },
  {
    icon: Handshake,
    title: 'Expert Guidance',
    desc: 'Personal broker support through every step of the transaction.',
  },
]



const comparisons = [
  { feature: 'AI-Powered Valuation', dealflow: true, traditional: false },
  { feature: 'Anonymous Listings', dealflow: true, traditional: false },
  { feature: 'Intelligent Buyer Matching', dealflow: true, traditional: false },
  { feature: 'Secure Digital Deal Room', dealflow: true, traditional: false },
  { feature: 'Auto-Generated Blind Teasers', dealflow: true, traditional: false },
  { feature: 'Personal Broker Support', dealflow: true, traditional: true },
  { feature: 'Online 24/7 Access', dealflow: true, traditional: false },
  { feature: 'Real-Time Pipeline Tracking', dealflow: true, traditional: false },
]

const testimonials = [
  {
    name: 'Marko V.',
    role: 'Sold his manufacturing business',
    quote: 'DealFlow found a buyer in under 60 days. The AI valuation was remarkably close to the final sale price.',
    rating: 5,
  },
  {
    name: 'Ana K.',
    role: 'Acquired a SaaS company',
    quote: 'The deal room and NDA process was seamless. I could review financials without wasting time on unqualified leads.',
    rating: 5,
  },
  {
    name: 'Ivan P.',
    role: 'Serial acquirer',
    quote: 'Best deal flow platform in the region. The matching algorithm saves me hours of screening.',
    rating: 5,
  },
]

export default function HomePage() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center gradient-hero overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-10 w-72 h-72 bg-accent-500/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-600/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40">
          <motion.div
            initial="initial"
            animate="animate"
            variants={stagger}
            className="max-w-3xl"
          >
            <motion.div variants={fadeIn} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-white/10 text-gold-400 border border-white/10 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Now serving Croatian M&A market
              </span>
            </motion.div>

            <motion.h1 variants={fadeIn} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6">
              Sell or acquire a business with{' '}
              <span className="text-gradient">AI-powered</span>{' '}
              confidence
            </motion.h1>

            <motion.p variants={fadeIn} className="text-lg md:text-xl text-navy-200 mb-10 max-w-2xl leading-relaxed">
              The premium M&A advisory platform for micro and small businesses.
              Get a free AI valuation in 5 minutes, connect with verified buyers,
              and close with expert guidance.
            </motion.p>

            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/valuate"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl gradient-gold text-navy-950 font-bold text-lg shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02]"
              >
                <TrendingUp className="w-5 h-5" />
                Free Valuation
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/listings"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border-2 border-white/20 text-white font-bold text-lg hover:bg-white/10 transition-all backdrop-blur-sm"
              >
                <Search className="w-5 h-5" />
                Browse Deals
              </Link>
            </motion.div>

            <motion.div variants={fadeIn} className="mt-12 flex items-center gap-8 text-sm text-navy-300">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gold-400" />
                <span>5-minute valuation</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-gold-400" />
                <span>100% confidential</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold-400" />
                <span>Free to start</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* PERSONA SELECTORS */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold text-navy-950 mb-4">
              Who are you?
            </motion.h2>
            <motion.p variants={fadeIn} className="text-navy-500 text-lg max-w-2xl mx-auto">
              DealFlow serves every stakeholder in the M&A process with tailored tools and experiences.
            </motion.p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {personas.map((p) => {
              const Icon = p.icon
              return (
                <motion.div
                  key={p.title}
                  variants={fadeIn}
                  className="group relative bg-white rounded-2xl p-8 shadow-card hover:shadow-elevated transition-all duration-300 border border-navy-100 hover:border-accent-200 cursor-pointer"
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${p.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-navy-950 mb-3">{p.title}</h3>
                  <p className="text-navy-500 mb-6 leading-relaxed">{p.desc}</p>
                  <Link
                    href={p.href}
                    className="inline-flex items-center gap-2 text-accent-600 font-semibold text-sm group-hover:gap-3 transition-all"
                  >
                    {p.cta}
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="py-24 bg-navy-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold text-navy-950 mb-4">
              Why DealFlow?
            </motion.h2>
            <motion.p variants={fadeIn} className="text-navy-500 text-lg max-w-2xl mx-auto">
              We combine AI technology with human expertise to deliver the most efficient M&A experience in the region.
            </motion.p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((f) => {
              const Icon = f.icon
              return (
                <motion.div
                  key={f.title}
                  variants={fadeIn}
                  className="bg-white rounded-2xl p-8 shadow-card hover:shadow-elevated transition-all duration-300 border border-navy-100"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent-100 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-accent-600" />
                  </div>
                  <h3 className="text-lg font-bold text-navy-950 mb-2">{f.title}</h3>
                  <p className="text-navy-500 text-sm leading-relaxed">{f.desc}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* PROCESS TIMELINE — Cinematic Vertical Canvas */}
      <section className="py-32 bg-navy-950 overflow-hidden relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[10%] right-[-10%] w-[600px] h-[600px] bg-accent-500/5 rounded-full blur-3xl opacity-50" />
          <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-gold-500/5 rounded-full blur-3xl opacity-50" />
          <div className="absolute top-[50%] left-[50%] -translate-x-1/2 w-[800px] h-[800px] bg-accent-400/5 rounded-full blur-3xl opacity-30" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-20"
          >
            <motion.h2 variants={fadeIn} className="text-3xl md:text-5xl font-bold text-white mb-6">
              Our 8-Step Process
            </motion.h2>
            <motion.p variants={fadeIn} className="text-navy-300 text-lg md:text-xl max-w-2xl mx-auto">
              From valuation to closing, we guide you through every stage of the transaction.
            </motion.p>
          </motion.div>

          <ProcessTimeline />

          <div className="text-center mt-16">
            <Link
              href="/sell"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl gradient-accent text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
            >
              Start Your Journey
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold text-white mb-4">
              Trusted by Business Owners
            </motion.h2>
            <motion.p variants={fadeIn} className="text-navy-300 text-lg max-w-2xl mx-auto">
              Real outcomes from real transactions guided by DealFlow.
            </motion.p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.name}
                variants={fadeIn}
                className="glass-dark rounded-2xl p-8"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-gold-500 fill-gold-500" />
                  ))}
                </div>
                <p className="text-white/90 mb-6 leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <p className="text-white font-semibold">{t.name}</p>
                  <p className="text-navy-400 text-sm">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold text-navy-950 mb-4">
              DealFlow vs. Traditional Brokers
            </motion.h2>
            <motion.p variants={fadeIn} className="text-navy-500 text-lg">
              See why forward-thinking business owners choose DealFlow.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl overflow-hidden shadow-card border border-navy-100"
          >
            <table className="w-full">
              <thead>
                <tr className="bg-navy-50">
                  <th className="text-left py-4 px-6 text-sm font-semibold text-navy-700">Feature</th>
                  <th className="text-center py-4 px-6 text-sm font-semibold text-accent-600">DealFlow</th>
                  <th className="text-center py-4 px-6 text-sm font-semibold text-navy-400">Traditional</th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((c, i) => (
                  <tr key={c.feature} className={i % 2 === 0 ? 'bg-white' : 'bg-navy-50/50'}>
                    <td className="py-4 px-6 text-sm text-navy-700 font-medium">{c.feature}</td>
                    <td className="text-center py-4 px-6">
                      {c.dealflow ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" />
                      ) : (
                        <span className="text-navy-300">—</span>
                      )}
                    </td>
                    <td className="text-center py-4 px-6">
                      {c.traditional ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" />
                      ) : (
                        <span className="text-navy-300">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 right-20 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-20 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Your exit strategy starts here
            </h2>
            <p className="text-xl text-navy-200 mb-10 max-w-2xl mx-auto">
              Join hundreds of Croatian business owners who&apos;ve discovered
              what their business is worth — for free.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/valuate"
                className="inline-flex items-center justify-center gap-2 px-10 py-5 rounded-2xl gradient-gold text-navy-950 font-bold text-lg shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02]"
              >
                <TrendingUp className="w-5 h-5" />
                Get My Free Valuation
              </Link>
              <Link
                href="/sell"
                className="inline-flex items-center justify-center gap-2 px-10 py-5 rounded-2xl border-2 border-white/20 text-white font-bold text-lg hover:bg-white/10 transition-all"
              >
                Learn About Selling
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
