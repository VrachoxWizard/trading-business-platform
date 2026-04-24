'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const dealsRow1 = [
    { id: 1, title: 'B2B SaaS Platform', industry: 'Technology', price: '€1.2M', img: '/images/tech.png' },
    { id: 2, title: 'Precision CNC', industry: 'Manufacturing', price: '€2.8M', img: '/images/manufacturing.png' },
    { id: 3, title: 'Boutique Hotel', industry: 'Hospitality', price: '€4.2M', img: '/images/hospitality.png' },
    { id: 4, title: 'Enterprise Software', industry: 'Technology', price: '€5.5M', img: '/images/tech.png' },
    { id: 5, title: 'Industrial Parts', industry: 'Manufacturing', price: '€3.1M', img: '/images/manufacturing.png' },
]

const dealsRow2 = [
    { id: 6, title: 'Luxury Resort', industry: 'Hospitality', price: '€12.5M', img: '/images/hospitality.png' },
    { id: 7, title: 'E-commerce Brand', industry: 'Retail', price: '€850K', img: '/images/tech.png' },
    { id: 8, title: 'Regional Logistics', industry: 'Logistics', price: '€3.5M', img: '/images/manufacturing.png' },
    { id: 9, title: 'Fintech Startup', industry: 'Technology', price: '€2.1M', img: '/images/tech.png' },
    { id: 10, title: 'Coastal Marina', industry: 'Hospitality', price: '€6.8M', img: '/images/hospitality.png' },
]

const dealsRow3 = [
    { id: 11, title: 'Packaging Plant', industry: 'Manufacturing', price: '€4.5M', img: '/images/manufacturing.png' },
    { id: 12, title: 'HealthTech App', industry: 'Technology', price: '€1.8M', img: '/images/tech.png' },
    { id: 13, title: 'Boutique Vineyard', industry: 'Agriculture', price: '€5.2M', img: '/images/hospitality.png' },
    { id: 14, title: 'AI Automation', industry: 'Technology', price: '€3.6M', img: '/images/tech.png' },
    { id: 15, title: 'Plastics Factory', industry: 'Manufacturing', price: '€2.4M', img: '/images/manufacturing.png' },
]

// Duplicate arrays to create the seamless infinite scroll effect
const doubleRow1 = [...dealsRow1, ...dealsRow1]
const doubleRow2 = [...dealsRow2, ...dealsRow2]
const doubleRow3 = [...dealsRow3, ...dealsRow3]

function DealCard({ deal }: { deal: typeof dealsRow1[0] }) {
    return (
        <div className="w-[320px] h-[380px] md:w-[400px] md:h-[450px] shrink-0 rounded-3xl overflow-hidden relative group">
            {/* Background Image */}
            <Image
                src={deal.img}
                alt={deal.industry}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Dark overlay for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/40 to-transparent" />

            {/* Content */}
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-white/90 text-xs font-semibold uppercase tracking-wider mb-3 w-max border border-white/20">
                    {deal.industry}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 leading-tight">
                    {deal.title}
                </h3>
                <p className="text-gold-400 font-semibold text-xl">
                    {deal.price}
                </p>
            </div>
        </div>
    )
}

export default function DealMarquee() {
    return (
        <section className="relative w-full py-24 bg-navy-950 overflow-hidden min-h-[900px] flex items-center justify-center">
            {/* Optional Top/Bottom fades to blend the section seamlessly */}
            <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-navy-950 to-transparent z-10 pointer-events-none" />
            <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-navy-950 to-transparent z-10 pointer-events-none" />

            {/* Left/Right fades for the marquee edges */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-navy-950 to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-navy-950 to-transparent z-10 pointer-events-none" />

            {/* Marquee Tracks container */}
            <div className="absolute inset-0 flex flex-col justify-center gap-6 opacity-40 blur-[2px] transition-opacity duration-700 hover:opacity-60 hover:blur-0">

                {/* ROW 1: Moves Left */}
                <div className="flex w-full">
                    <motion.div
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{ ease: "linear", duration: 80, repeat: Infinity }}
                        className="flex gap-6 w-max"
                    >
                        {doubleRow1.map((deal, i) => (
                            <DealCard key={`r1-${i}`} deal={deal} />
                        ))}
                    </motion.div>
                </div>

                {/* ROW 2: Moves Right */}
                <div className="flex w-full">
                    <motion.div
                        animate={{ x: ["-50%", "0%"] }}
                        transition={{ ease: "linear", duration: 100, repeat: Infinity }}
                        className="flex gap-6 w-max"
                    >
                        {doubleRow2.map((deal, i) => (
                            <DealCard key={`r2-${i}`} deal={deal} />
                        ))}
                    </motion.div>
                </div>

                {/* ROW 3: Moves Left */}
                <div className="flex w-full">
                    <motion.div
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{ ease: "linear", duration: 90, repeat: Infinity }}
                        className="flex gap-6 w-max"
                    >
                        {doubleRow3.map((deal, i) => (
                            <DealCard key={`r3-${i}`} deal={deal} />
                        ))}
                    </motion.div>
                </div>

            </div>

            {/* Centered CTA Overlay */}
            <div className="relative z-20 text-center max-w-3xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="glass-dark p-12 md:p-16 rounded-[3rem] border border-white/10 shadow-2xl backdrop-blur-xl"
                >
                    <div className="w-20 h-20 bg-gradient-to-br from-gold-400 to-gold-600 rounded-2xl mx-auto flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(212,168,83,0.4)]">
                        <svg className="w-10 h-10 text-navy-950" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                        Exclusive Deals.<br />Absolute Discretion.
                    </h2>
                    <p className="text-xl md:text-2xl text-navy-200 mb-10 leading-relaxed font-light max-w-2xl mx-auto">
                        Join the region's elite platform for confidential business acquisitions and exits.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/sell"
                            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-gold-500 text-navy-950 font-bold text-xl transition-all duration-300 hover:bg-gold-400 hover:scale-105 hover:shadow-[0_0_30px_rgba(212,168,83,0.5)]"
                        >
                            List a Business
                        </Link>
                        <Link
                            href="/listings"
                            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white/10 text-white font-bold text-xl border border-white/20 transition-all duration-300 hover:bg-white/20 hover:scale-105"
                        >
                            Browse Network
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
