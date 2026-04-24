'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import ProcessTimeline from '@/components/ProcessTimeline'
import TestimonialCarousel from '@/components/TestimonialCarousel'
import DealMarquee from '@/components/DealMarquee'
import CroatiaDealNetwork from '@/components/CroatiaDealNetwork'
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
    color: 'from-navy-700 to-navy-950',
  },
  {
    icon: Briefcase,
    title: 'Acquirers & Investors',
    desc: 'Access curated deal flow with verified financials and NDA-protected data rooms.',
    cta: 'Browse Listings',
    href: '/listings',
    color: 'from-gold-600 to-gold-400',
  },
  {
    icon: Users,
    title: 'Advisors & Funds',
    desc: 'Partner with us for co-brokerage, deal sourcing, and portfolio company exits.',
    cta: 'Partner With Us',
    href: '/contact',
    color: 'from-navy-600 to-navy-800',
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
  { feature: 'AI-Powered Valuation', heritance: true, traditional: false },
  { feature: 'Anonymous Listings', heritance: true, traditional: false },
  { feature: 'Intelligent Buyer Matching', heritance: true, traditional: false },
  { feature: 'Secure Digital Deal Room', heritance: true, traditional: false },
  { feature: 'Auto-Generated Blind Teasers', heritance: true, traditional: false },
  { feature: 'Personal Broker Support', heritance: true, traditional: true },
  { feature: 'Online 24/7 Access', heritance: true, traditional: false },
  { feature: 'Real-Time Pipeline Tracking', heritance: true, traditional: false },
]

export default function HomePage() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-20 pb-24">

        {/* Background Image Container */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero_croatian_owner.png"
            alt="Croatian small business owner reviewing documents in his artisanal shop"
            fill
            priority
            className="object-cover object-center lg:object-[60%_50%] scale-105"
            sizes="100vw"
            quality={90}
          />

          <style dangerouslySetInnerHTML={{
            __html: `
            .bg-slow-zoom img {
              animation: slowZoom 25s ease-out forwards;
            }
            @keyframes slowZoom {
              from { transform: scale(1.05); }
              to { transform: scale(1); }
            }
            @media (prefers-reduced-motion: reduce) {
              .bg-slow-zoom img { animation: none; transform: scale(1); }
            }
          `}} />

          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/90 to-navy-900/10 hidden lg:block" />
          <div className="absolute inset-0 bg-navy-950/80 lg:hidden" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy-950 via-navy-950/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-12 sm:mt-0">
          <div className="max-w-2xl lg:max-w-3xl">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Badge */}
              <div className="mb-6">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-sm font-sans">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                  Built for Croatian business owners
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-[1.05] mb-6 tracking-tight drop-shadow-lg">
                Where businesses find their{' '}
                <span className="text-gold-400">next chapter.</span>
              </h1>

              {/* Subheadline */}
              <p className="text-lg lg:text-xl text-white/90 mb-10 max-w-xl leading-relaxed font-sans font-light drop-shadow-md">
                Heritance helps Croatian small-business owners understand their valuation, prepare for sale, and connect with serious buyers — privately and professionally.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Link
                  href="/valuate"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-gold-600 text-white font-bold text-lg font-sans transition-transform hover:-translate-y-0.5 hover:shadow-[0_10px_40px_rgba(184,150,12,0.4)] focus:outline-none focus:ring-4 focus:ring-gold-500/50"
                  aria-label="Get a free business valuation"
                >
                  Get free valuation
                </Link>
                <Link
                  href="#how-it-works"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-navy-900/40 backdrop-blur-md text-white font-semibold text-lg font-sans border border-white/20 transition-colors hover:bg-white/10 focus:outline-none focus:ring-4 focus:ring-white/20"
                  aria-label="Talk to our advisory team"
                >
                  Talk to an advisor
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-semibold text-white/80 uppercase tracking-wider font-sans backdrop-blur-sm bg-navy-950/20 w-max px-4 py-2.5 rounded-lg border border-white/5">
                <div className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-gold-400" />
                  100% confidential
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                  Verified buyers
                </div>
                <div className="flex items-center gap-1.5">
                  <Handshake className="w-3.5 h-3.5 text-blue-400" />
                  Advisor-guided
                </div>
              </div>

            </motion.div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF — Deal Network */}
      <CroatiaDealNetwork />

      {/* DEAL MARQUEE */}
      <DealMarquee />

      {/* 3-STEP PERSONA CARDS */}
      <section className="py-24 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeIn} className="text-3xl md:text-5xl font-bold text-navy-950 mb-4">
              How can we help?
            </motion.h2>
            <motion.p variants={fadeIn} className="text-[var(--muted-foreground)] text-lg font-sans max-w-2xl mx-auto">
              Whether you&apos;re selling, buying, or advising — Heritance provides the tools, intelligence, and discretion you need.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {personas.map((persona) => {
              const Icon = persona.icon
              return (
                <motion.div
                  key={persona.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-[8px] p-8 shadow-card border border-[var(--border)] hover:shadow-elevated transition-all hover:-translate-y-1 group"
                >
                  <div className={`w-14 h-14 rounded-[8px] bg-gradient-to-br ${persona.color} flex items-center justify-center mb-6 shadow-sm`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-navy-950 mb-3">{persona.title}</h3>
                  <p className="text-[var(--muted-foreground)] text-sm mb-6 leading-relaxed font-sans">{persona.desc}</p>
                  <Link
                    href={persona.href}
                    className="inline-flex items-center gap-2 text-gold-600 font-semibold text-sm group-hover:gap-3 transition-all font-sans"
                  >
                    {persona.cta}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="py-24 bg-navy-950 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[10%] right-[-10%] w-[600px] h-[600px] bg-gold-600/5 rounded-full blur-3xl opacity-50" />
          <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-navy-700/30 rounded-full blur-3xl opacity-50" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeIn} className="text-3xl md:text-5xl font-bold text-white mb-4">
              Built for serious transactions
            </motion.h2>
            <motion.p variants={fadeIn} className="text-navy-300 text-lg max-w-2xl mx-auto font-sans">
              Every feature is designed to protect your confidentiality and maximize your deal outcome.
            </motion.p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white/5 backdrop-blur-sm rounded-[8px] p-6 border border-white/10 hover:border-gold-600/30 transition-all"
                >
                  <div className="w-12 h-12 rounded-[8px] bg-gold-600/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-gold-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-navy-300 text-sm leading-relaxed font-sans">{feature.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* PROCESS TIMELINE */}
      <section id="how-it-works" className="py-32 bg-navy-950 overflow-hidden relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[10%] right-[-10%] w-[600px] h-[600px] bg-gold-600/5 rounded-full blur-3xl opacity-50" />
          <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-navy-700/20 rounded-full blur-3xl opacity-50" />
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
            <motion.p variants={fadeIn} className="text-navy-300 text-lg md:text-xl max-w-2xl mx-auto font-sans">
              From valuation to closing, we guide you through every stage of the transaction.
            </motion.p>
          </motion.div>

          <ProcessTimeline />

          <div className="text-center mt-16">
            <Link
              href="/sell"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg gradient-gold text-navy-950 font-bold text-lg font-sans shadow-md hover:shadow-lg transition-all hover:scale-[1.02]"
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
            <motion.p variants={fadeIn} className="text-navy-300 text-lg md:text-xl max-w-2xl mx-auto font-sans">
              Stories from sellers, buyers, and advisors who moved through the deal process with clarity and confidence.
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
              Heritance vs. Traditional Brokers
            </motion.h2>
            <motion.p variants={fadeIn} className="text-[var(--muted-foreground)] text-lg font-sans">
              See why forward-thinking business owners choose Heritance.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-[8px] overflow-hidden shadow-card border border-[var(--border)]"
          >
            <table className="w-full">
              <thead>
                <tr className="bg-navy-50">
                  <th className="text-left py-4 px-6 text-sm font-semibold text-navy-700 font-sans">Feature</th>
                  <th className="text-center py-4 px-6 text-sm font-semibold text-gold-600 font-sans">Heritance</th>
                  <th className="text-center py-4 px-6 text-sm font-semibold text-navy-400 font-sans">Traditional</th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((c, i) => (
                  <tr key={c.feature} className={i % 2 === 0 ? 'bg-white' : 'bg-navy-50/50'}>
                    <td className="py-4 px-6 text-sm text-navy-700 font-medium font-sans">{c.feature}</td>
                    <td className="text-center py-4 px-6">
                      {c.heritance ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600 mx-auto" />
                      ) : (
                        <span className="text-navy-300">—</span>
                      )}
                    </td>
                    <td className="text-center py-4 px-6">
                      {c.traditional ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600 mx-auto" />
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
          <div className="absolute top-10 right-20 w-64 h-64 bg-gold-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-20 w-80 h-80 bg-navy-700/20 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Your next chapter starts here
            </h2>
            <p className="text-xl text-navy-200 mb-10 max-w-2xl mx-auto font-sans">
              Join Croatian business owners who&apos;ve discovered
              what their business is worth — for free.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/valuate"
                className="inline-flex items-center justify-center gap-2 px-10 py-5 rounded-lg gradient-gold text-navy-950 font-bold text-lg font-sans shadow-md hover:shadow-lg transition-all hover:scale-[1.02]"
              >
                <TrendingUp className="w-5 h-5" />
                Get My Free Valuation
              </Link>
              <Link
                href="/sell"
                className="inline-flex items-center justify-center gap-2 px-10 py-5 rounded-lg border-2 border-white/20 text-white font-bold text-lg font-sans hover:bg-white/10 transition-all"
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
