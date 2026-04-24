'use client'

import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Pause, Play, Star } from 'lucide-react'

const testimonials = [
    {
        id: 1,
        name: 'Marko K.',
        role: 'vlasnik ugostiteljskog obrta',
        type: 'Prodavatelj',
        quote: 'Prvi put sam imao osjećaj da mogu istražiti prodaju bez panike i bez toga da zaposlenici išta naslute.',
        initials: 'MK',
    },
    {
        id: 2,
        name: 'Ivan P.',
        role: 'privatni investitor',
        type: 'Kupac',
        quote: 'Dokumenti su bili uredni, proces jasan, a razgovor s vlasnikom krenuo je tek kad je imalo smisla za obje strane.',
        initials: 'IP',
    },
    {
        id: 3,
        name: 'Ana M.',
        role: 'osnivačica salona',
        type: 'Prodavateljica',
        quote: 'Procjena mi je dala realan raspon i mirniji razgovor s obitelji o tome što želim napraviti iduće.',
        initials: 'AM',
    },
    {
        id: 4,
        name: 'Petra L.',
        role: 'poslovna savjetnica',
        type: 'Savjetnica',
        quote: 'Heritance uvodi red u male transakcije koje su inače često neformalne, osjetljive i teško usporedive.',
        initials: 'PL',
    },
]

export default function TestimonialCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isPaused, setIsPaused] = useState(false)
    const shouldReduceMotion = useReducedMotion()

    const total = testimonials.length
    const current = testimonials[currentIndex]

    const next = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % total)
    }, [total])

    const prev = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + total) % total)
    }, [total])

    useEffect(() => {
        if (isPaused || shouldReduceMotion) return
        const timer = setInterval(next, 11000)
        return () => clearInterval(timer)
    }, [isPaused, next, shouldReduceMotion])

    return (
        <div className="w-full max-w-4xl mx-auto">
            <div
                className="relative min-h-[360px] flex items-center justify-center"
                role="region"
                aria-roledescription="carousel"
                aria-label="Iskustva klijenata"
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={current.id}
                        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -20 }}
                        transition={{ duration: shouldReduceMotion ? 0 : 0.35 }}
                        className="premium-card p-8 md:p-10 text-left w-full"
                    >
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
                            <div>
                                <div className="flex gap-1 text-gold-500 mb-4">
                                    {[...Array(5)].map((_, index) => (
                                        <Star key={index} className="w-4 h-4 fill-current" />
                                    ))}
                                </div>
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-navy-50 text-navy-700">
                                    {current.type}
                                </span>
                            </div>
                            <div className="w-14 h-14 rounded-lg gradient-accent flex items-center justify-center text-gold-400 font-bold tracking-wider shadow-inner">
                                {current.initials}
                            </div>
                        </div>

                        <p className="text-2xl md:text-4xl font-display font-bold text-navy-950 leading-[1.15] tracking-tight mb-10">
                            “{current.quote}”
                        </p>

                        <div>
                            <h4 className="font-bold text-navy-950 text-base">{current.name}</h4>
                            <p className="text-sm text-navy-500 font-medium">{current.role}</p>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-5 mt-8">
                <button
                    onClick={prev}
                    aria-label="Prethodno iskustvo"
                    className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex gap-2" role="group" aria-label="Slajdovi iskustava">
                    {testimonials.map((testimonial, index) => (
                        <button
                            key={testimonial.id}
                            onClick={() => setCurrentIndex(index)}
                            aria-label={`Prikaži iskustvo ${index + 1}`}
                            aria-current={currentIndex === index ? 'true' : 'false'}
                            className={`h-2 rounded-full transition-all ${currentIndex === index ? 'w-8 bg-gold-400' : 'w-2 bg-white/25 hover:bg-white/45'}`}
                        />
                    ))}
                </div>

                <button
                    onClick={next}
                    aria-label="Sljedeće iskustvo"
                    className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>

                <button
                    onClick={() => setIsPaused((paused) => !paused)}
                    aria-label={isPaused ? 'Pokreni automatsku izmjenu' : 'Pauziraj automatsku izmjenu'}
                    aria-pressed={isPaused}
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-navy-300 hover:text-white transition-colors"
                >
                    {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                </button>
            </div>
        </div>
    )
}
