'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, TrendingUp, Shield, Handshake } from 'lucide-react'

// Hook to check for reduced motion preferences
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

type City = {
    id: string
    name: string
    region: string
    tags: string
    desc: string
    x: number
    y: number
    connections: string[]
}

const CITIES: City[] = [
    { id: 'zagreb', name: 'Zagreb', region: 'Central Croatia', tags: 'Advisors, buyers, agencies', desc: 'Main DealFlow hub for verified acquisition interest.', x: 324, y: 145, connections: ['split', 'rijeka', 'osijek', 'zadar', 'varazdin', 'karlovac'] },
    { id: 'split', name: 'Split', region: 'Dalmatia', tags: 'Hospitality, tourism, family biz', desc: 'Connect local sellers with serious buyers across Croatia.', x: 388, y: 598, connections: ['zadar', 'dubrovnik', 'zagreb'] },
    { id: 'rijeka', name: 'Rijeka', region: 'Kvarner', tags: 'Logistics, trade, services', desc: 'Regional business opportunities with confidential buyer interest.', x: 110, y: 242, connections: ['pula', 'zagreb', 'zadar', 'karlovac'] },
    { id: 'osijek', name: 'Osijek', region: 'Slavonia', tags: 'Agriculture, IT, manufacturing', desc: 'Growing eastern hub for local manufacturing acquisitions.', x: 703, y: 197, connections: ['slavonskiBrod', 'zagreb'] },
    { id: 'zadar', name: 'Zadar', region: 'Dalmatia', tags: 'Real estate, hospitality, retail', desc: 'Premium coastal market for business exits and expansions.', x: 219, y: 479, connections: ['split', 'rijeka', 'zagreb'] },
    { id: 'pula', name: 'Pula', region: 'Istria', tags: 'Hospitality, services, boutiques', desc: 'Strong acquisition interest in the Istrian peninsula.', x: 27, y: 333, connections: ['rijeka'] },
    { id: 'dubrovnik', name: 'Dubrovnik', region: 'South Dalmatia', tags: 'Premium tourism, luxury services', desc: 'High-value transactions in the premier tourism sector.', x: 619, y: 761, connections: ['split'] },
    { id: 'varazdin', name: 'Varaždin', region: 'Northern Croatia', tags: 'Manufacturing, tech, trade', desc: 'Industrial and family business exits in the North.', x: 374, y: 47, connections: ['zagreb'] },
    { id: 'slavonskiBrod', name: 'Slavonski Brod', region: 'Slavonia', tags: 'Logistics, industrial, services', desc: 'Connecting the eastern logistics corridor.', x: 608, y: 275, connections: ['osijek', 'zagreb'] },
    { id: 'karlovac', name: 'Karlovac', region: 'Central Croatia', tags: 'Trade, production, transport', desc: 'Strategic center for supply chain transactions.', x: 265, y: 209, connections: ['zagreb', 'rijeka'] }
]

export default function CroatiaDealNetwork() {
    const [activeCityId, setActiveCityId] = useState<string>('zagreb')
    const prefersReducedMotion = usePrefersReducedMotion()

    const activeCity = useMemo(() => CITIES.find(c => c.id === activeCityId) || CITIES[0], [activeCityId])

    // Generate unique connection lines avoiding backwards duplication
    const connectionLines = useMemo(() => {
        const lines: { id: string; x1: number; y1: number; x2: number; y2: number; source: string; target: string; isActive: boolean }[] = []

        CITIES.forEach(city => {
            city.connections.forEach(targetId => {
                const targetCity = CITIES.find(c => c.id === targetId)
                if (!targetCity) return

                // Create a unique ID that's order-independent (e.g., 'zagreb-split' == 'split-zagreb')
                const lineId = [city.id, targetId].sort().join('-')

                // Prevent duplicate lines
                if (!lines.some(l => l.id === lineId)) {
                    lines.push({
                        id: lineId,
                        source: city.id,
                        target: targetId,
                        x1: city.x,
                        y1: city.y,
                        x2: targetCity.x,
                        y2: targetCity.y,
                        isActive: activeCityId === city.id || activeCityId === targetId
                    })
                }
            })
        })
        return lines
    }, [activeCityId])

    return (
        <section className="py-24 lg:py-32 bg-navy-950 relative overflow-hidden border-t border-white/5">

            {/* Background Soft Glows */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-navy-900 rounded-full blur-[100px] opacity-40 mix-blend-screen" />
                <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-gold-500/5 rounded-full blur-[80px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Section Header */}
                <div className="text-left md:text-center max-w-3xl mx-auto mb-16 lg:mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Croatia’s small-business deal network
                        </h2>
                        <p className="text-lg md:text-xl text-navy-300 leading-relaxed font-light">
                            From Zagreb to Split, Rijeka, Osijek, and beyond — DealFlow helps local business owners connect with serious buyers through a private, structured process.
                        </p>
                    </motion.div>
                </div>

                {/* Map and UI Container */}
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">

                    {/* Map Side */}
                    <div className="w-full lg:w-2/3 relative flex justify-center items-center">

                        {/* SVG Visual */}
                        <div className="relative w-full max-w-[800px] aspect-square rounded-full border border-white/5 bg-navy-900/10 shadow-inner flex items-center justify-center p-4">

                            <svg
                                viewBox="0 0 800 800"
                                className="w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(30,41,59,0.5)]"
                                aria-label="Interactive map of Croatian DealFlow network"
                                role="img"
                            >
                                {/* Accurate Croatia Land Outline */}
                                <path
                                    d="M721.774,126.178L755.67,203.588L800,260.201L746.282,334.515L683.176,290.857L586.7,293.594L466.754,260.744L401.565,265.135L371.317,306.154L321.255,260.744L292.045,342.685L360.364,434.288L390.612,494.6L454.756,566.875L507.948,609.5L560.627,689.516L684.123,761.552L668.777,793.76L537.611,723.55L456.689,654.833L329.071,597.795L211.735,455.334L239.892,440.77L176.274,358.455L173.664,291.95L83.966,260.744L41.201,345.948L0,279.915L3.129,211.026L8.105,207.807L105.345,214.604L130.898,180.976L178.358,213.504L233.114,217.36L232.595,161.634L281.092,141.152L294.655,59.959L405.732,6.24L450.062,31.17L554.369,117.573L669.62,156.096Z"
                                    fill="rgba(30, 41, 59, 0.4)"
                                    stroke="rgba(148, 163, 184, 0.2)"
                                    strokeWidth="1.5"
                                    strokeLinejoin="round"
                                    className="transition-all duration-1000"
                                />

                                {/* Connection Lines */}
                                {connectionLines.map(line => (
                                    <motion.line
                                        key={line.id}
                                        x1={line.x1}
                                        y1={line.y1}
                                        x2={line.x2}
                                        y2={line.y2}
                                        stroke={line.isActive ? 'rgba(212,168,83, 0.6)' : 'rgba(148, 163, 184, 0.1)'}
                                        strokeWidth={line.isActive ? 2 : 1}
                                        strokeLinecap="round"
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        whileInView={{ pathLength: 1, opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{
                                            duration: prefersReducedMotion ? 0 : 1.5,
                                            delay: prefersReducedMotion ? 0 : 0.5,
                                            ease: "easeInOut"
                                        }}
                                        className="transition-colors duration-500"
                                    />
                                ))}

                                {/* City Nodes */}
                                {CITIES.map((city, i) => {
                                    const isActive = activeCityId === city.id
                                    return (
                                        <g
                                            key={city.id}
                                            transform={`translate(${city.x}, ${city.y})`}
                                            className="cursor-pointer outline-none"
                                            onClick={() => setActiveCityId(city.id)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' || e.key === ' ') {
                                                    e.preventDefault()
                                                    setActiveCityId(city.id)
                                                }
                                            }}
                                            tabIndex={0}
                                            role="button"
                                            aria-label={`Select ${city.name}`}
                                            aria-pressed={isActive}
                                        >
                                            {/* Interactive Catch Area */}
                                            <circle r="25" fill="transparent" />

                                            {/* Outer Pulse (Active) */}
                                            {isActive && !prefersReducedMotion && (
                                                <motion.circle
                                                    r="12"
                                                    fill="rgba(212,168,83,0.2)"
                                                    initial={{ scale: 0.8, opacity: 0.8 }}
                                                    animate={{ scale: 2.5, opacity: 0 }}
                                                    transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
                                                />
                                            )}

                                            {/* Node Circle */}
                                            <motion.circle
                                                r={isActive ? "8" : "5"}
                                                fill={isActive ? "#D4A853" : "#64748B"}
                                                className="transition-all duration-300"
                                                whileHover={{ scale: 1.5, fill: "#D4A853" }}
                                            />

                                            {/* City Label (Desktop only) */}
                                            <text
                                                x="15"
                                                y="5"
                                                fill={isActive ? "#FFFFFF" : "#94A3B8"}
                                                fontSize={isActive ? "14" : "12"}
                                                fontWeight={isActive ? "bold" : "normal"}
                                                className="hidden md:block transition-all duration-300 select-none drop-shadow-md"
                                            >
                                                {city.name}
                                            </text>
                                        </g>
                                    )
                                })}
                            </svg>
                        </div>
                    </div>

                    {/* Active City Info Panel */}
                    <div className="w-full lg:w-1/3 flex flex-col justify-center gap-6">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeCity.id}
                                initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 20, y: prefersReducedMotion ? 0 : 10 }}
                                animate={{ opacity: 1, x: 0, y: 0 }}
                                exit={{ opacity: 0, x: prefersReducedMotion ? 0 : -20, y: prefersReducedMotion ? 0 : -10 }}
                                transition={{ duration: 0.3 }}
                                className="bg-[#FAFAFA] rounded-3xl p-8 shadow-xl border border-white flex flex-col relative overflow-hidden w-full max-w-sm mx-auto lg:max-w-none"
                            >
                                {/* Decorative Top Accent */}
                                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-gold-400 to-accent-500" />

                                <span className="text-gold-600 text-xs font-bold uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                                    <MapPin className="w-3.5 h-3.5" />
                                    {activeCity.region}
                                </span>

                                <h3 className="text-3xl font-bold text-navy-950 mb-3 tracking-tight">
                                    {activeCity.name}
                                </h3>

                                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-navy-50 rounded-lg text-xs font-semibold text-navy-700 w-max mb-6">
                                    <TrendingUp className="w-3.5 h-3.5 text-accent-600" />
                                    {activeCity.tags}
                                </div>

                                <p className="text-navy-600 text-sm leading-relaxed mb-8">
                                    {activeCity.desc}
                                </p>

                                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-navy-100 text-xs text-navy-500">
                                    <div className="flex flex-col gap-1">
                                        <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-gold-500" /> Private profiles</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="flex items-center gap-1.5"><Handshake className="w-3.5 h-3.5 text-gold-500" /> Network access</span>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Mobile Fallback City Selector */}
                        <div className="lg:hidden flex gap-2 overflow-x-auto pb-4 pt-2 snap-x hide-scrollbar px-1">
                            {CITIES.map((city) => (
                                <button
                                    key={`btn-${city.id}`}
                                    onClick={() => setActiveCityId(city.id)}
                                    className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCityId === city.id
                                        ? 'bg-gold-500 text-navy-950 shadow-md'
                                        : 'bg-white/5 border border-white/10 text-navy-300 hover:bg-white/10 hover:text-white'
                                        }`}
                                >
                                    {city.name}
                                </button>
                            ))}
                        </div>

                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
        </section>
    )
}
