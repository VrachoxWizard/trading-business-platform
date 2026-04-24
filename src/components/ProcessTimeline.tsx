'use client'

import { useRef } from 'react'
import {
    motion,
    useScroll,
    useTransform,
    useInView,
} from 'framer-motion'
import {
    TrendingUp,
    Search,
    Shield,
    Users,
    Lock,
    Handshake,
    CheckCircle2,
    Star,
} from 'lucide-react'

const process = [
    { step: '01', title: 'Free Valuation', desc: 'Get an AI-powered estimate in 5 minutes' },
    { step: '02', title: 'Strategy Call', desc: 'Discuss goals with a dedicated broker' },
    { step: '03', title: 'Confidential Listing', desc: 'We create your anonymous teaser' },
    { step: '04', title: 'Buyer Matching', desc: 'AI finds qualified, pre-screened buyers' },
    { step: '05', title: 'NDA & Due Diligence', desc: 'Secure document exchange via deal room' },
    { step: '06', title: 'Negotiation', desc: 'Expert-guided terms and structuring' },
    { step: '07', title: 'Closing', desc: 'Legal support through final transaction' },
    { step: '08', title: 'Transition', desc: 'Smooth handover and post-sale support' },
]

const icons = [TrendingUp, Search, Shield, Users, Lock, Handshake, CheckCircle2, Star]

/* ───────────────────────────────────────────────────
   Individual step – uses useInView for checkpoint pop
   ─────────────────────────────────────────────────── */
function TimelineStep({ step, index }: { step: typeof process[0]; index: number }) {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, margin: '-100px 0px -100px 0px' })
    const isLeft = index % 2 === 0
    const Icon = icons[index]

    return (
        <div
            ref={ref}
            className={`relative flex items-start mb-12 last:mb-0 md:mb-24 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
        >
            {/* ── Checkpoint dot ── */}
            <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10 mt-2">
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.15 }}
                    className="w-12 h-12 rounded-full gradient-accent flex items-center justify-center text-white font-bold text-sm shadow-[0_0_20px_rgba(37,99,235,0.4)] ring-4 ring-navy-950"
                >
                    {step.step}
                </motion.div>

                {/* Pulse ring on arrival */}
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={isInView ? { scale: 2.5, opacity: [0, 0.4, 0] } : {}}
                    transition={{ duration: 1.2, delay: 0.3 }}
                    className="absolute inset-0 rounded-full bg-accent-400 pointer-events-none"
                />
            </div>

            {/* ── Connector arm (desktop) ── */}
            <motion.div
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.6, delay: 0.35, ease: 'easeOut' }}
                style={{ originX: isLeft ? 1 : 0 }}
                className={`hidden md:block absolute top-[28px] w-12 h-[2px] bg-gradient-to-r ${isLeft ? 'from-transparent to-accent-500/50' : 'from-accent-500/50 to-transparent'
                    } z-0 ${isLeft
                        ? 'left-[calc(50%+24px)]'
                        : 'right-[calc(50%+24px)]'
                    }`}
            />

            {/* ── Content card ── */}
            <motion.div
                initial={{ opacity: 0, x: isLeft ? -80 : 80, y: 0 }}
                animate={
                    isInView
                        ? { opacity: 1, x: 0, y: 0 }
                        : { opacity: 0, x: isLeft ? -80 : 80, y: 0 }
                }
                transition={{ duration: 0.8, delay: 0.25, type: 'spring', stiffness: 100, damping: 20 }}
                className={`ml-20 md:ml-0 md:w-[calc(50%-60px)] ${isLeft ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left'
                    }`}
            >
                {/* Cinematic Glassmorphism Card */}
                <div className="bg-white/[0.04] backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/10 hover:bg-white/[0.08] hover:border-accent-400/40 hover:shadow-[0_0_30px_rgba(37,99,235,0.15)] transition-all duration-500 group relative overflow-hidden">

                    {/* Subtle internal glow on hover */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-accent-500/0 via-accent-500/0 to-accent-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className={`flex flex-col sm:flex-row items-start gap-5 relative z-10 ${isLeft ? 'sm:flex-row-reverse' : ''}`}>
                        <motion.div
                            initial={{ rotate: -45, scale: 0.5 }}
                            animate={isInView ? { rotate: 0, scale: 1 } : {}}
                            transition={{ type: 'spring', stiffness: 220, damping: 15, delay: 0.45 }}
                            className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent-500/10 group-hover:bg-accent-500/20 border border-accent-500/20 flex items-center justify-center transition-colors duration-500"
                        >
                            <Icon className="w-6 h-6 text-accent-400 group-hover:text-accent-300 transition-colors duration-500" />
                        </motion.div>
                        <div className={isLeft ? 'sm:text-right' : ''}>
                            <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                            <p className="text-base text-navy-300 leading-relaxed group-hover:text-navy-200 transition-colors duration-500">{step.desc}</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

/* ───────────────────────────────────────────────────
   Main timeline component with scroll-driven line
   ─────────────────────────────────────────────────── */
export default function ProcessTimeline() {
    const containerRef = useRef<HTMLDivElement>(null)

    // Track scroll progress through the timeline container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start 0.85', 'end 0.6'], // start growing early, finish near the bottom
    })

    // The line's scaleY goes from 0 → 1 as you scroll through the section
    const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1])
    // Glow opacity peaks in the middle of the scroll
    const lineGlow = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.6, 0.2])

    return (
        <div ref={containerRef} className="relative mt-12 md:mt-24">
            {/* ── Background track (faint) ── */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-navy-800 md:-translate-x-1/2 rounded-full" />

            {/* ── Animated fill line ── */}
            <motion.div
                style={{ scaleY: lineScaleY, originY: 0 }}
                className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-accent-400 via-accent-300 to-gold-400 md:-translate-x-1/2 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.6)]"
            />

            {/* ── Glow effect that follows the line ── */}
            <motion.div
                style={{ scaleY: lineScaleY, opacity: lineGlow, originY: 0 }}
                className="absolute left-6 md:left-1/2 top-0 bottom-0 w-12 -translate-x-[22px] md:-translate-x-1/2 bg-gradient-to-b from-accent-400/40 via-accent-400/30 to-gold-400/20 blur-xl pointer-events-none"
            />

            {/* ── Steps ── */}
            <div className="relative pt-8 pb-16">
                {process.map((p, i) => (
                    <TimelineStep key={p.step} step={p} index={i} />
                ))}
            </div>

            {/* ── Terminal dot ── */}
            <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="absolute left-6 md:left-1/2 -translate-x-1/2 bottom-0 z-10"
            >
                <div className="w-6 h-6 rounded-full gradient-gold shadow-[0_0_20px_rgba(212,168,83,0.5)] ring-4 ring-navy-950" />
            </motion.div>
        </div>
    )
}
