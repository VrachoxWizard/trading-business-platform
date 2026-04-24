'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import {
    BarChart3,
    CheckCircle2,
    FileText,
    Handshake,
    Lock,
    Search,
    Shield,
    TrendingUp,
} from 'lucide-react'

const process = [
    { step: '01', title: 'Indikativna procjena', desc: 'Vlasnik dobiva raspon vrijednosti i početnu sliku spremnosti za prodaju.' },
    { step: '02', title: 'Povjerljiv razgovor', desc: 'Definiraju se motivi, rokovi, rizici i poželjni profil kupca.' },
    { step: '03', title: 'Priprema teasera', desc: 'Tvrtka se pozicionira profesionalno, bez otkrivanja identiteta.' },
    { step: '04', title: 'Uparivanje kupaca', desc: 'Provjeravaju se kriteriji, kapacitet i strateški razlog interesa.' },
    { step: '05', title: 'NDA i data room', desc: 'Osjetljivi dokumenti otvaraju se tek nakon kontroliranog pristupa.' },
    { step: '06', title: 'Ponude i pregovori', desc: 'Savjetnik pomaže oko strukture cijene, uvjeta i dinamike procesa.' },
    { step: '07', title: 'Zatvaranje', desc: 'Koordiniraju se pravni, financijski i operativni elementi transakcije.' },
    { step: '08', title: 'Tranzicija', desc: 'Planira se prijenos znanja, odnosa i operativne kontrole.' },
]

const icons = [BarChart3, Handshake, FileText, Search, Lock, TrendingUp, CheckCircle2, Shield]

function TimelineStep({ step, index }: { step: typeof process[0]; index: number }) {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, margin: '-80px 0px -80px 0px' })
    const shouldReduceMotion = useReducedMotion()
    const isLeft = index % 2 === 0
    const Icon = icons[index]

    return (
        <div
            ref={ref}
            className={`relative flex items-start mb-10 last:mb-0 md:mb-20 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
        >
            <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10 mt-2">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.35 }}
                    className="w-12 h-12 rounded-full gradient-gold flex items-center justify-center text-navy-950 font-bold text-sm shadow-lg ring-4 ring-navy-950"
                >
                    {step.step}
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, x: shouldReduceMotion ? 0 : isLeft ? -40 : 40 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: shouldReduceMotion ? 0 : isLeft ? -40 : 40 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.45 }}
                className={`ml-20 md:ml-0 md:w-[calc(50%-58px)] ${isLeft ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left'}`}
            >
                <div className="premium-panel p-6 group transition-all hover:border-gold-500/35">
                    <div className={`flex flex-col sm:flex-row items-start gap-4 ${isLeft ? 'sm:flex-row-reverse' : ''}`}>
                        <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-gold-400/12 border border-gold-400/20 flex items-center justify-center">
                            <Icon className="w-5 h-5 text-gold-400" />
                        </div>
                        <div className={isLeft ? 'sm:text-right' : ''}>
                            <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                            <p className="text-sm md:text-base text-navy-300 leading-relaxed font-sans">{step.desc}</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default function ProcessTimeline() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start 0.85', 'end 0.65'],
    })
    const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1])
    const lineGlow = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.55, 0.18])

    return (
        <div ref={containerRef} className="relative mt-12 md:mt-20">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-white/10 md:-translate-x-1/2" />
            <motion.div
                style={{ scaleY: lineScaleY, originY: 0 }}
                className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold-400 via-gold-300 to-gold-600 md:-translate-x-1/2"
            />
            <motion.div
                style={{ scaleY: lineScaleY, opacity: lineGlow, originY: 0 }}
                className="absolute left-6 md:left-1/2 top-0 bottom-0 w-10 -translate-x-[19px] md:-translate-x-1/2 bg-gradient-to-b from-gold-400/35 via-gold-400/25 to-gold-400/10 blur-xl pointer-events-none"
            />
            <div className="relative pt-8 pb-14">
                {process.map((item, index) => (
                    <TimelineStep key={item.step} step={item} index={index} />
                ))}
            </div>
            <div className="absolute left-6 md:left-1/2 -translate-x-1/2 bottom-0 z-10">
                <div className="w-5 h-5 rounded-full gradient-gold shadow-lg ring-4 ring-navy-950" />
            </div>
        </div>
    )
}
