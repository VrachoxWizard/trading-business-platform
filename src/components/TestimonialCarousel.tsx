'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

const testimonials = [
    {
        id: 1,
        quote: "Dealflow found a buyer in under 60 days. The valuation was remarkably close to the final sale price.",
        author: "Marko V.",
        title: "Exited a manufacturing business",
        image: "/testimonials/marko.png"
    },
    {
        id: 2,
        quote: "I use DealFlow to source pre-vetted deals. The matchmaking algorithm saves me hours of screening.",
        author: "Ana K.",
        title: "Tech Executive & Acquirer",
        image: "/testimonials/ana.png"
    },
    {
        id: 3,
        quote: "The NDAs and Deal Room made the due diligence process smooth and secure. Highly professional platform.",
        author: "Ivan P.",
        title: "Serial Investor",
        image: "/testimonials/ivan.png"
    }
]

export default function TestimonialCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [direction, setDirection] = useState(0)
    const [isHovered, setIsHovered] = useState(false)

    const slideLeft = () => {
        setDirection(-1)
        setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
    }

    const slideRight = () => {
        setDirection(1)
        setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
    }

    // Auto-advance
    useEffect(() => {
        if (isHovered) return
        const timer = setInterval(() => {
            slideRight()
        }, 5000)
        return () => clearInterval(timer)
    }, [currentIndex, isHovered])

    return (
        <div
            className="relative w-full max-w-4xl mx-auto h-[400px] flex items-center justify-center perspective-[1000px]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                <div className="w-[80%] h-[60%] bg-accent-500/10 blur-[80px] rounded-full" />
            </div>

            <AnimatePresence mode="popLayout" custom={direction}>
                {testimonials.map((t, i) => {
                    if (i !== currentIndex) return null

                    return (
                        <motion.div
                            key={t.id}
                            custom={direction}
                            initial={{
                                opacity: 0,
                                rotateY: direction > 0 ? 45 : -45,
                                scale: 0.8,
                                x: direction > 0 ? 100 : -100,
                                z: -300
                            }}
                            animate={{
                                opacity: 1,
                                rotateY: 0,
                                scale: 1,
                                x: 0,
                                z: 0
                            }}
                            exit={{
                                opacity: 0,
                                rotateY: direction > 0 ? -45 : 45,
                                scale: 0.8,
                                x: direction > 0 ? -100 : 100,
                                z: -300
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 150,
                                damping: 20,
                                mass: 1
                            }}
                            className="absolute w-full max-w-2xl"
                        >
                            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-navy-50 flex flex-col items-center text-center transform-gpu">
                                <div className="flex gap-1 mb-6 text-gold-500">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 fill-current" />
                                    ))}
                                </div>

                                <p className="text-xl md:text-2xl font-medium text-navy-900 mb-8 leading-relaxed">
                                    "{t.quote}"
                                </p>

                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-accent-100 shadow-md">
                                        <Image
                                            src={t.image}
                                            alt={t.author}
                                            width={64}
                                            height={64}
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                    <div className="text-left">
                                        <h4 className="font-bold text-navy-950 text-lg">{t.author}</h4>
                                        <p className="text-sm text-navy-500">{t.title}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )
                })}
            </AnimatePresence>

            <div className="absolute top-1/2 -translate-y-1/2 left-0 md:-left-12 z-20">
                <button
                    onClick={slideLeft}
                    className="w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center text-navy-500 hover:text-accent-600 hover:scale-110 transition-all border border-navy-50"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
            </div>

            <div className="absolute top-1/2 -translate-y-1/2 right-0 md:-right-12 z-20">
                <button
                    onClick={slideRight}
                    className="w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center text-navy-500 hover:text-accent-600 hover:scale-110 transition-all border border-navy-50"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>
        </div>
    )
}
