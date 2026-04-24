'use client'

import { useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Handshake, MapPin, Shield, TrendingUp } from 'lucide-react'

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
    { id: 'zagreb', name: 'Zagreb', region: 'Središnja Hrvatska', tags: 'savjetnici, kupci, agencije', desc: 'Glavno čvorište za kvalificirani interes i savjetničke razgovore.', x: 324, y: 145, connections: ['split', 'rijeka', 'osijek', 'zadar', 'varazdin', 'karlovac'] },
    { id: 'split', name: 'Split', region: 'Dalmacija', tags: 'turizam, obiteljske tvrtke', desc: 'Diskretne transakcije u hospitalityju, uslugama i lokalnoj trgovini.', x: 388, y: 598, connections: ['zadar', 'dubrovnik', 'zagreb'] },
    { id: 'rijeka', name: 'Rijeka', region: 'Kvarner', tags: 'logistika, trgovina, usluge', desc: 'Regionalne prilike za kupce koji traže operativne i uslužne tvrtke.', x: 110, y: 242, connections: ['pula', 'zagreb', 'zadar', 'karlovac'] },
    { id: 'osijek', name: 'Osijek', region: 'Slavonija', tags: 'proizvodnja, IT, poljoprivreda', desc: 'Istočni hub za industrijske, proizvodne i rastuće digitalne tvrtke.', x: 703, y: 197, connections: ['slavonskiBrod', 'zagreb'] },
    { id: 'zadar', name: 'Zadar', region: 'Dalmacija', tags: 'nekretnine, retail, turizam', desc: 'Obalno tržište s jakim interesom za turizam i specijalizirane usluge.', x: 219, y: 479, connections: ['split', 'rijeka', 'zagreb'] },
    { id: 'pula', name: 'Pula', region: 'Istra', tags: 'boutique usluge, turizam', desc: 'Snažan interes kupaca za male tvrtke s ponovljivim prihodima.', x: 27, y: 333, connections: ['rijeka'] },
    { id: 'dubrovnik', name: 'Dubrovnik', region: 'Južna Dalmacija', tags: 'premium turizam', desc: 'Visokovrijedne prilike u premium hospitality i uslužnom segmentu.', x: 619, y: 761, connections: ['split'] },
    { id: 'varazdin', name: 'Varaždin', region: 'Sjever Hrvatske', tags: 'industrija, tehnologija', desc: 'Sjeverni koridor za proizvodnju, B2B usluge i obiteljske izlaze.', x: 374, y: 47, connections: ['zagreb'] },
    { id: 'slavonskiBrod', name: 'Slavonski Brod', region: 'Slavonija', tags: 'logistika, industrija', desc: 'Operativne tvrtke povezane s istočnim logističkim pravcima.', x: 608, y: 275, connections: ['osijek', 'zagreb'] },
    { id: 'karlovac', name: 'Karlovac', region: 'Središnja Hrvatska', tags: 'transport, proizvodnja', desc: 'Strateška pozicija za supply-chain i regionalne uslužne tvrtke.', x: 265, y: 209, connections: ['zagreb', 'rijeka'] },
]

export default function CroatiaDealNetwork() {
    const [activeCityId, setActiveCityId] = useState('zagreb')
    const shouldReduceMotion = useReducedMotion()

    const activeCity = useMemo(() => CITIES.find((city) => city.id === activeCityId) ?? CITIES[0], [activeCityId])

    const connectionLines = useMemo(() => {
        const lines: { id: string; x1: number; y1: number; x2: number; y2: number; source: string; target: string; isActive: boolean }[] = []

        CITIES.forEach((city) => {
            city.connections.forEach((targetId) => {
                const targetCity = CITIES.find((candidate) => candidate.id === targetId)
                if (!targetCity) return

                const lineId = [city.id, targetId].sort().join('-')
                if (!lines.some((line) => line.id === lineId)) {
                    lines.push({
                        id: lineId,
                        source: city.id,
                        target: targetId,
                        x1: city.x,
                        y1: city.y,
                        x2: targetCity.x,
                        y2: targetCity.y,
                        isActive: activeCityId === city.id || activeCityId === targetId,
                    })
                }
            })
        })

        return lines
    }, [activeCityId])

    return (
        <section className="py-24 lg:py-28 bg-navy-950 relative overflow-hidden border-t border-white/10">
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_30%,rgba(185,144,22,0.12),transparent_32%)]" />

            <div className="section-shell relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <p className="text-xs font-bold uppercase tracking-wider text-gold-400 mb-4">Hrvatska mreža transakcija</p>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-5">
                        Lokalni odnosi, nacionalni doseg.
                    </h2>
                    <p className="text-lg md:text-xl text-navy-300 leading-relaxed font-sans">
                        Od Zagreba do Splita, Rijeke, Osijeka i Istre, Heritance povezuje vlasnike s ozbiljnim kupcima kroz strukturiran i tih proces.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_0.9fr] gap-10 items-center">
                    <div className="relative w-full overflow-hidden rounded-lg border border-white/10 bg-white/[0.03] p-3 shadow-glass">
                        <svg
                            viewBox="0 0 800 800"
                            className="w-full h-full min-h-[420px] object-contain"
                            aria-label="Mreža Heritance transakcija u Hrvatskoj"
                            role="img"
                        >
                            <path
                                d="M721.774,126.178L755.67,203.588L800,260.201L746.282,334.515L683.176,290.857L586.7,293.594L466.754,260.744L401.565,265.135L371.317,306.154L321.255,260.744L292.045,342.685L360.364,434.288L390.612,494.6L454.756,566.875L507.948,609.5L560.627,689.516L684.123,761.552L668.777,793.76L537.611,723.55L456.689,654.833L329.071,597.795L211.735,455.334L239.892,440.77L176.274,358.455L173.664,291.95L83.966,260.744L41.201,345.948L0,279.915L3.129,211.026L8.105,207.807L105.345,214.604L130.898,180.976L178.358,213.504L233.114,217.36L232.595,161.634L281.092,141.152L294.655,59.959L405.732,6.24L450.062,31.17L554.369,117.573L669.62,156.096Z"
                                fill="rgba(20,40,63,0.52)"
                                stroke="rgba(188,204,220,0.22)"
                                strokeWidth="1.5"
                                strokeLinejoin="round"
                            />

                            {connectionLines.map((line) => (
                                <motion.line
                                    key={line.id}
                                    x1={line.x1}
                                    y1={line.y1}
                                    x2={line.x2}
                                    y2={line.y2}
                                    stroke={line.isActive ? 'rgba(231,201,95,0.78)' : 'rgba(188,204,220,0.15)'}
                                    strokeWidth={line.isActive ? 2.2 : 1}
                                    strokeLinecap="round"
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    whileInView={{ pathLength: 1, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: shouldReduceMotion ? 0 : 1.1, ease: 'easeInOut' }}
                                />
                            ))}

                            {CITIES.map((city) => {
                                const isActive = activeCityId === city.id
                                return (
                                    <g
                                        key={city.id}
                                        transform={`translate(${city.x}, ${city.y})`}
                                        className="cursor-pointer outline-none"
                                        onClick={() => setActiveCityId(city.id)}
                                        onKeyDown={(event) => {
                                            if (event.key === 'Enter' || event.key === ' ') {
                                                event.preventDefault()
                                                setActiveCityId(city.id)
                                            }
                                        }}
                                        tabIndex={0}
                                        role="button"
                                        aria-label={`Odaberi ${city.name}`}
                                        aria-pressed={isActive}
                                    >
                                        <circle r="25" fill="transparent" />
                                        {isActive && !shouldReduceMotion && (
                                            <motion.circle
                                                r="12"
                                                fill="rgba(231,201,95,0.18)"
                                                initial={{ scale: 0.8, opacity: 0.8 }}
                                                animate={{ scale: 2.4, opacity: 0 }}
                                                transition={{ repeat: Infinity, duration: 2, ease: 'easeOut' }}
                                            />
                                        )}
                                        <motion.circle
                                            r={isActive ? 8 : 5}
                                            fill={isActive ? '#E7C95F' : '#829AB1'}
                                            whileHover={{ scale: 1.35, fill: '#E7C95F' }}
                                        />
                                        <text
                                            x="15"
                                            y="5"
                                            fill={isActive ? '#FFFFFF' : '#BCCCDC'}
                                            fontSize={isActive ? '14' : '12'}
                                            fontWeight={isActive ? '700' : '500'}
                                            className="hidden md:block select-none"
                                        >
                                            {city.name}
                                        </text>
                                    </g>
                                )
                            })}
                        </svg>
                    </div>

                    <div className="space-y-5">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeCity.id}
                                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -12 }}
                                transition={{ duration: 0.25 }}
                                className="premium-card p-7"
                            >
                                <span className="text-gold-700 text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-1.5">
                                    <MapPin className="w-3.5 h-3.5" />
                                    {activeCity.region}
                                </span>
                                <h3 className="text-3xl font-bold text-navy-950 mb-3">{activeCity.name}</h3>
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-navy-50 rounded-lg text-xs font-bold text-navy-700 mb-6">
                                    <TrendingUp className="w-3.5 h-3.5 text-gold-600" />
                                    {activeCity.tags}
                                </div>
                                <p className="text-navy-600 text-sm leading-relaxed mb-7">{activeCity.desc}</p>
                                <div className="grid grid-cols-2 gap-3 pt-5 border-t border-navy-100 text-xs text-navy-500">
                                    <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-gold-600" /> Privatni profili</span>
                                    <span className="flex items-center gap-1.5"><Handshake className="w-3.5 h-3.5 text-gold-600" /> Provjeren pristup</span>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-wrap">
                            {CITIES.map((city) => (
                                <button
                                    key={city.id}
                                    onClick={() => setActiveCityId(city.id)}
                                    className={`shrink-0 px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeCityId === city.id
                                        ? 'gradient-gold text-navy-950 shadow-md'
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
        </section>
    )
}
