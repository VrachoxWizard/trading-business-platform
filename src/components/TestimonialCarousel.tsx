'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'

// Fallback to media query hook for responsive logic without hydration mismatch
function useMediaQuery(query: string) {
    const [matches, setMatches] = useState(false)
    useEffect(() => {
        const media = window.matchMedia(query)
        if (media.matches !== matches) setMatches(media.matches)
        const listener = () => setMatches(media.matches)
        window.addEventListener('resize', listener)
        return () => window.removeEventListener('resize', listener)
    }, [matches, query])
    return matches
}

// Ensure the user hasn't disabled animations
function usePrefersReducedMotion() {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
        setPrefersReducedMotion(mediaQuery.matches)
        const listener = () => setPrefersReducedMotion(mediaQuery.matches)
        mediaQuery.addEventListener('change', listener)
        return () => mediaQuery.removeEventListener('change', listener)
    }, [])
    return prefersReducedMotion
}

const testimonials = [
    {
        id: 1,
        name: "Marko K.",
        role: "Café Owner",
        type: "Seller",
        quote: "DealFlow helped me understand what my business was worth before speaking with buyers. The process felt private, clear, and professional.",
        initials: "MK",
        color: "bg-blue-900"
    },
    {
        id: 2,
        name: "Ivan P.",
        role: "Serial Investor",
        type: "Buyer",
        quote: "The deal room and structured documents made due diligence much smoother. I could quickly understand the opportunity without wasting time.",
        initials: "IP",
        color: "bg-emerald-800"
    },
    {
        id: 3,
        name: "Ana M.",
        role: "Salon Owner",
        type: "Seller",
        quote: "I was nervous about selling, but the valuation gave me confidence and the process felt much more human than I expected.",
        initials: "AM",
        color: "bg-amber-700"
    },
    {
        id: 4,
        name: "Petra L.",
        role: "Business Advisor",
        type: "Advisor",
        quote: "The platform brings structure to small business transactions that are usually messy, emotional, and difficult to compare.",
        initials: "PL",
        color: "bg-purple-900"
    },
    {
        id: 5,
        name: "Tomislav R.",
        role: "Private Buyer",
        type: "Buyer",
        quote: "I liked that the business information was organized and confidential. It made the first conversation much more serious.",
        initials: "TR",
        color: "bg-slate-800"
    },
    {
        id: 6,
        name: "Luka S.",
        role: "Agency Founder",
        type: "Seller",
        quote: "Instead of guessing, I finally had a clear range, buyer interest, and a step-by-step path toward a possible sale.",
        initials: "LS",
        color: "bg-indigo-900"
    }
]

export default function TestimonialCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isHovered, setIsHovered] = useState(false)
    const [isPaused, setIsPaused] = useState(false)

    const isMobile = useMediaQuery('(max-width: 768px)')
    const prefersReducedMotion = usePrefersReducedMotion()

    const total = testimonials.length

    const next = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % total)
    }, [total])

    const prev = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + total) % total)
    }, [total])

    const goTo = (index: number) => setCurrentIndex(index)

    // Auto-advance
    useEffect(() => {
        if (isHovered || isPaused || prefersReducedMotion) return
        const timer = setInterval(next, 12000) // Calm 12s rotation
        return () => clearInterval(timer)
    }, [next, isHovered, isPaused, prefersReducedMotion])

    const getPositionStyles = (index: number) => {
        // Determine shortest path offset
        const diff = (index - currentIndex + total) % total
        let offset = diff > 3 ? diff - 6 : diff // maps to -2, -1, 0, 1, 2, 3

        if (isMobile) {
            if (offset === 0) return { opacity: 1, x: '0%', scale: 1, zIndex: 10, rotateY: 0 }
            if (offset === 1 || offset === -1) return { opacity: 0, x: offset > 0 ? '50%' : '-50%', scale: 0.9, zIndex: 5, rotateY: 0 }
            return { opacity: 0, x: '0%', scale: 0.8, zIndex: 0, rotateY: 0 }
        }

        // 3D Ring Math for Desktop/Tablet
        switch (offset) {
            case 0: return { opacity: 1, x: '0%', scale: 1, zIndex: 30, rotateY: 0 }
            case 1: return { opacity: 0.5, x: '45%', scale: 0.85, zIndex: 20, rotateY: -12 }
            case -1: return { opacity: 0.5, x: '-45%', scale: 0.85, zIndex: 20, rotateY: 12 }
            case 2: return { opacity: 0.15, x: '75%', scale: 0.7, zIndex: 10, rotateY: -22 }
            case -2: return { opacity: 0.15, x: '-75%', scale: 0.7, zIndex: 10, rotateY: 22 }
            default: return { opacity: 0, x: '0%', scale: 0.5, zIndex: 0, rotateY: 180 }
        }
    }

    return (
        <div className="w-full relative flex flex-col items-center">

            {/* 3D Container */}
            <div
                className="relative w-full max-w-5xl h-[450px] sm:h-[500px] flex items-center justify-center perspective-[1200px]"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onFocus={() => setIsHovered(true)}
                onBlur={() => setIsHovered(false)}
                role="region"
                aria-roledescription="carousel"
                aria-label="Client Testimonials"
            >
                {/* Soft Background Radial Light */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                    <div className="w-3/4 h-3/4 bg-gold-400/5 blur-[100px] rounded-full" />
                </div>

                <AnimatePresence>
                    {testimonials.map((t, index) => {
                        const styles = getPositionStyles(index)
                        const isActive = index === currentIndex

                        return (
                            <motion.div
                                key={t.id}
                                initial={false}
                                animate={{
                                    opacity: styles.opacity,
                                    x: styles.x,
                                    scale: styles.scale,
                                    rotateY: styles.rotateY,
                                    zIndex: styles.zIndex
                                }}
                                transition={{
                                    duration: prefersReducedMotion ? 0 : 0.8,
                                    ease: [0.32, 0.72, 0, 1] // Custom smooth easing
                                }}
                                className={`absolute w-full max-w-sm sm:max-w-md pointer-events-auto ${!isActive ? 'pointer-events-none' : ''}`}
                                aria-hidden={!isActive}
                            >
                                {/* Testimonial Card */}
                                <div
                                    className={`bg-[#FAFAFA] rounded-2xl p-8 sm:p-10 text-left transform-gpu transition-shadow duration-500
                    ${isActive ? 'shadow-[0_30px_60px_-15px_rgba(0,0,0,0.4)] ring-1 ring-white/20' : 'shadow-none'}
                  `}
                                >
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex gap-1 text-gold-500">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className="w-4 h-4 fill-current" />
                                            ))}
                                        </div>
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-navy-100 text-navy-800">
                                            {t.type}
                                        </span>
                                    </div>

                                    <p className="text-lg sm:text-xl font-medium text-navy-950 mb-8 leading-relaxed">
                                        "{t.quote}"
                                    </p>

                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold tracking-wider shadow-inner ${t.color}`}>
                                            {t.initials}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-navy-950 text-base">{t.name}</h4>
                                            <p className="text-xs text-navy-500 font-medium">{t.role}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    })}
                </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-6 mt-8 z-20">
                <button
                    onClick={prev}
                    aria-label="Previous testimonial"
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-gold-500"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex gap-2" role="group" aria-label="Testimonial slides">
                    {testimonials.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => goTo(idx)}
                            aria-label={`Go to slide ${idx + 1}`}
                            aria-current={currentIndex === idx ? "true" : "false"}
                            className={`h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold-500 ${currentIndex === idx ? 'w-8 bg-gold-400' : 'w-2 bg-white/20 hover:bg-white/40'
                                }`}
                        />
                    ))}
                </div>

                <button
                    onClick={next}
                    aria-label="Next testimonial"
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-gold-500"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>

                {/* Play / Pause Toggle for accessibility */}
                <button
                    onClick={() => setIsPaused(!isPaused)}
                    aria-label={isPaused ? "Play auto-rotation" : "Pause auto-rotation"}
                    aria-pressed={isPaused}
                    className="ml-4 w-8 h-8 flex items-center justify-center text-navy-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-gold-500 rounded-full"
                >
                    {isPaused ? <Play className="w-4 h-4 ml-0.5" /> : <Pause className="w-4 h-4" />}
                </button>
            </div>

            {/* Elegant Trust Strip under controls */}
            <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-4 text-xs font-semibold uppercase tracking-widest text-navy-400">
                <span className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-gold-500" /> Confidential process</span>
                <span className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-gold-500" /> Verified buyers</span>
                <span className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-gold-500" /> Structured deal room</span>
            </div>
        </div>
    )
}
