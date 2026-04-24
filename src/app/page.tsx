'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import ProcessTimeline from '@/components/ProcessTimeline'
import TestimonialCarousel from '@/components/TestimonialCarousel'
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
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-navy-200 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-20"
          >
            <motion.h2 variants={fadeIn} className="text-3xl md:text-5xl font-bold text-navy-950 mb-6 tracking-tight">
              A Platform Built for You
            </motion.h2>
            <motion.p variants={fadeIn} className="text-navy-500 text-lg md:text-xl max-w-2xl mx-auto">
              DealFlow serves every stakeholder in the M&A process with tailored tools and elite experiences.
            </motion.p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {personas.map((p, i) => {
              const Icon = p.icon
              const isCenter = i === 1
              return (
                <motion.div
                  key={p.title}
                  variants={fadeIn}
                  className={`group relative rounded-3xl p-8 sm:p-10 transition-all duration-500 hover:-translate-y-2 overflow-hidden ${isCenter
                      ? 'bg-navy-950 text-white shadow-2xl ring-1 ring-white/10'
                      : 'bg-white text-navy-950 shadow-card border border-navy-100 hover:shadow-elevated hover:border-accent-200'
                    }`}
                >
                  {/* Subtle hover gradient background */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${isCenter ? 'from-accent-500/10 to-transparent' : 'from-accent-50/50 to-transparent'
                    }`} />

                  <div className="relative z-10">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-transform duration-500 group-hover:scale-110 shadow-lg ${isCenter ? 'bg-gradient-to-br from-accent-500 to-accent-600' : 'bg-gradient-to-br ' + p.color
                      }`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{p.title}</h3>
                    <p className={`mb-8 leading-relaxed text-lg ${isCenter ? 'text-navy-300' : 'text-navy-500'
                      }`}>{p.desc}</p>

                    <Link
                      href={p.href}
                      className={`inline-flex items-center justify-between w-full p-4 rounded-xl font-bold text-sm transition-all duration-300 ${isCenter
                          ? 'bg-white/5 hover:bg-white/10 text-white'
                          : 'bg-navy-50 hover:bg-accent-50 text-accent-700 hover:text-accent-800'
                        }`}
                    >
                      {p.cta}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* FEATURES GRID - Bento Box */}
      <section className="py-32 bg-navy-50 border-t border-navy-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-20"
          >
            <motion.h2 variants={fadeIn} className="text-3xl md:text-5xl font-bold text-navy-950 mb-6 tracking-tight">
              Engineered for Alpha
            </motion.h2>
            <motion.p variants={fadeIn} className="text-navy-500 text-lg md:text-xl max-w-2xl mx-auto">
              We combine proprietary AI technology with human brokerage expertise to deliver the most efficient transaction experience.
            </motion.p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[240px]"
          >
            {features.map((f, i) => {
              const Icon = f.icon

              // Define bento grid layout classes
              const bentoClasses = [
                "md:col-span-2 md:row-span-2 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 text-white shadow-2xl relative overflow-hidden",
                "md:col-span-1 md:row-span-1 bg-white border border-navy-100 shadow-sm",
                "md:col-span-1 md:row-span-2 bg-gradient-to-b from-white to-navy-50/50 border border-navy-100 shadow-sm",
                "md:col-span-1 md:row-span-1 bg-white border border-navy-100 shadow-sm",
                "md:col-span-2 md:row-span-1 bg-white border border-navy-100 shadow-sm",
                "md:col-span-2 md:row-span-1 bg-gradient-to-br from-accent-600 to-accent-700 text-white shadow-lg overflow-hidden relative",
              ]

              const isDark = i === 0 || i === 5

              return (
                <motion.div
                  key={f.title}
                  variants={fadeIn}
                  className={`rounded-3xl p-8 hover:-translate-y-1 transition-transform duration-300 flex flex-col justify-between ${bentoClasses[i]}`}
                >
                  {/* Decorative background accents for dark cards */}
                  {i === 0 && <div className="absolute top-0 right-0 w-64 h-64 bg-accent-500/20 blur-3xl rounded-full" />}
                  {i === 5 && <div className="absolute bottom-[-10%] right-[-10%] w-40 h-40 bg-gold-400/30 blur-2xl rounded-full" />}

                  <div className="relative z-10">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm ${isDark ? 'bg-white/10 border border-white/20' : 'bg-navy-50'
                      }`}>
                      <Icon className={`w-7 h-7 ${isDark ? 'text-white' : 'text-accent-600'}`} />
                    </div>
                    <h3 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-navy-950'}`}>{f.title}</h3>
                    <p className={`text-base leading-relaxed ${isDark ? 'text-navy-200' : 'text-navy-600'}`}>{f.desc}</p>
                  </div>

                  {/* Large cards get an extra CTA link at bottom */}
                  {i === 0 && (
                    <div className="mt-8 relative z-10 flex items-center text-accent-400 font-semibold cursor-pointer group">
                      Try Valuator Tool <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  )}
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
      <section className="py-32 bg-navy-950 relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeIn} className="text-3xl md:text-5xl font-bold text-white mb-6">
              Trusted by Business Owners
            </motion.h2>
            <motion.p variants={fadeIn} className="text-navy-300 text-lg md:text-xl max-w-2xl mx-auto">
              Real outcomes from real transactions guided by DealFlow.
            </motion.p>
          </motion.div>

          <TestimonialCarousel />
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
