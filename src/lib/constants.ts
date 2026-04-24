export const INDUSTRIES = [
    'Tehnologija i SaaS',
    'Proizvodnja',
    'Maloprodaja i e-commerce',
    'Hrana i piće',
    'Zdravstvo',
    'Građevinarstvo',
    'Turizam i ugostiteljstvo',
    'Profesionalne usluge',
    'Transport i logistika',
    'Poljoprivreda',
    'Nekretnine',
    'Mediji i zabava',
    'Obrazovanje',
    'Energetika',
    'Financijske usluge',
    'Ostalo',
] as const

export const REGIONS = [
    'Zagreb i okolica',
    'Splitsko-dalmatinska',
    'Primorsko-goranska',
    'Istra',
    'Osječko-baranjska',
    'Varaždin',
    'Dubrovačko-neretvanska',
    'Zadar',
    'Krapinsko-zagorska',
    'Sisačko-moslavačka',
    'Slavonija',
    'Šira regija (Slovenija)',
    'Šira regija (Srbija)',
    'Šira regija (BiH)',
    'Ostalo',
] as const

export const LISTING_STATUSES = {
    draft: { label: 'Nacrt', color: '#6B7280' },
    active: { label: 'Aktivno', color: '#10B981' },
    under_nda: { label: 'Pod NDA', color: '#F59E0B' },
    negotiation: { label: 'Pregovori', color: '#3B82F6' },
    closed: { label: 'Zatvoreno', color: '#8B5CF6' },
} as const

export const TRANSACTION_TYPES = [
    'Potpuna akvizicija',
    'Većinski udio',
    'Manjinski udio',
    'Management buyout',
    'Kupnja imovine',
    'Spajanje',
] as const

export const EV_RANGES = [
    { label: '< €100K', min: 0, max: 100000 },
    { label: '€100K - €500K', min: 100000, max: 500000 },
    { label: '€500K - €1M', min: 500000, max: 1000000 },
    { label: '€1M - €5M', min: 1000000, max: 5000000 },
    { label: '€5M - €10M', min: 5000000, max: 10000000 },
    { label: '> €10M', min: 10000000, max: Infinity },
] as const

export const INDUSTRY_MULTIPLIERS: Record<string, { evToEbitda: number; evToRevenue: number }> = {
    'Tehnologija i SaaS': { evToEbitda: 12, evToRevenue: 3.5 },
    'Proizvodnja': { evToEbitda: 6, evToRevenue: 1.2 },
    'Maloprodaja i e-commerce': { evToEbitda: 7, evToRevenue: 1.0 },
    'Hrana i piće': { evToEbitda: 6.5, evToRevenue: 1.1 },
    'Zdravstvo': { evToEbitda: 10, evToRevenue: 2.5 },
    'Građevinarstvo': { evToEbitda: 5, evToRevenue: 0.8 },
    'Turizam i ugostiteljstvo': { evToEbitda: 8, evToRevenue: 1.5 },
    'Profesionalne usluge': { evToEbitda: 8, evToRevenue: 1.8 },
    'Transport i logistika': { evToEbitda: 6, evToRevenue: 1.0 },
    'Poljoprivreda': { evToEbitda: 5.5, evToRevenue: 0.9 },
    'Nekretnine': { evToEbitda: 9, evToRevenue: 2.0 },
    'Mediji i zabava': { evToEbitda: 8, evToRevenue: 1.5 },
    'Obrazovanje': { evToEbitda: 7, evToRevenue: 1.3 },
    'Energetika': { evToEbitda: 7, evToRevenue: 1.4 },
    'Financijske usluge': { evToEbitda: 9, evToRevenue: 2.2 },
    'Ostalo': { evToEbitda: 6, evToRevenue: 1.0 },
}
