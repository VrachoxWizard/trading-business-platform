'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Lock } from 'lucide-react'

const dealsRow1 = [
    { id: 1, title: 'B2B SaaS platforma', industry: 'Tehnologija', price: '€1.2M', img: '/images/tech.png' },
    { id: 2, title: 'CNC proizvodnja', industry: 'Proizvodnja', price: '€2.8M', img: '/images/manufacturing.png' },
    { id: 3, title: 'Boutique hotel', industry: 'Turizam', price: '€4.2M', img: '/images/hospitality.png' },
    { id: 4, title: 'Enterprise softver', industry: 'Tehnologija', price: '€5.5M', img: '/images/tech.png' },
    { id: 5, title: 'Industrijski dijelovi', industry: 'Proizvodnja', price: '€3.1M', img: '/images/manufacturing.png' },
]

const dealsRow2 = [
    { id: 6, title: 'Premium resort', industry: 'Hospitality', price: '€12.5M', img: '/images/hospitality.png' },
    { id: 7, title: 'E-commerce brand', industry: 'Maloprodaja', price: '€850K', img: '/images/tech.png' },
    { id: 8, title: 'Regionalna logistika', industry: 'Logistika', price: '€3.5M', img: '/images/manufacturing.png' },
    { id: 9, title: 'Fintech usluga', industry: 'Tehnologija', price: '€2.1M', img: '/images/tech.png' },
    { id: 10, title: 'Obalna marina', industry: 'Turizam', price: '€6.8M', img: '/images/hospitality.png' },
]

const dealRows = [[...dealsRow1, ...dealsRow1], [...dealsRow2, ...dealsRow2]]

function DealCard({ deal }: { deal: typeof dealsRow1[0] }) {
    return (
        <div className="w-[280px] h-[320px] md:w-[340px] md:h-[380px] shrink-0 rounded-lg overflow-hidden relative group border border-white/10">
            <Image
                src={deal.img}
                alt={deal.industry}
                fill
                sizes="(min-width: 768px) 340px, 280px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/92 via-navy-950/48 to-transparent" />
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-white/90 text-xs font-bold uppercase tracking-wider mb-3 w-max border border-white/15">
                    {deal.industry}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 leading-tight">{deal.title}</h3>
                <p className="text-gold-400 font-bold text-xl">{deal.price}</p>
            </div>
        </div>
    )
}

export default function DealMarquee() {
    const shouldReduceMotion = useReducedMotion()

    return (
        <section className="relative w-full py-24 bg-navy-950 overflow-hidden min-h-[720px] flex items-center justify-center border-t border-white/10">
            <div className="absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-navy-950 to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-navy-950 to-transparent z-10 pointer-events-none" />

            <div className="absolute inset-0 flex flex-col justify-center gap-6 opacity-35 blur-[1px]">
                {dealRows.map((row, index) => (
                    <div className="flex w-full" key={index}>
                        <motion.div
                            animate={shouldReduceMotion ? undefined : { x: index % 2 === 0 ? ['0%', '-50%'] : ['-50%', '0%'] }}
                            transition={{ ease: 'linear', duration: index % 2 === 0 ? 78 : 96, repeat: Infinity }}
                            className="flex gap-5 w-max"
                        >
                            {row.map((deal, dealIndex) => (
                                <DealCard key={`${deal.id}-${dealIndex}`} deal={deal} />
                            ))}
                        </motion.div>
                    </div>
                ))}
            </div>

            <div className="relative z-20 text-center max-w-3xl mx-auto px-4">
                <div className="glass-dark p-8 md:p-12 rounded-lg shadow-2xl">
                    <div className="w-14 h-14 gradient-gold rounded-lg mx-auto flex items-center justify-center mb-7 shadow-[0_0_34px_rgba(231,201,95,0.28)]">
                        <Lock className="w-7 h-7 text-navy-950" />
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-5">
                        Prilike se vide tek kada postoji povjerenje.
                    </h2>
                    <p className="text-lg md:text-xl text-navy-200 mb-8 leading-relaxed font-sans max-w-2xl mx-auto">
                        Heritance gradi zatvorenu mrežu za akvizicije i izlaze u kojoj se ozbiljan interes odvaja od znatiželje.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link
                            href="/sell"
                            className="inline-flex items-center justify-center px-7 py-3.5 rounded-lg gradient-gold text-navy-950 font-bold transition-all hover:-translate-y-0.5"
                        >
                            Pripremite prodaju
                        </Link>
                        <Link
                            href="/listings"
                            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-white/10 text-white font-bold border border-white/20 transition-all hover:bg-white/[0.16]"
                        >
                            Pregled prilika
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
