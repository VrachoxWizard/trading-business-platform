// DealFlow M&A Platform — Constants

export const INDUSTRIES = [
    'Technology & SaaS',
    'Manufacturing',
    'Retail & E-commerce',
    'Food & Beverage',
    'Healthcare',
    'Construction',
    'Tourism & Hospitality',
    'Professional Services',
    'Transport & Logistics',
    'Agriculture',
    'Real Estate',
    'Media & Entertainment',
    'Education',
    'Energy',
    'Financial Services',
    'Other',
] as const

export const REGIONS = [
    'Zagreb & Surroundings',
    'Split-Dalmatia',
    'Primorje-Gorski Kotar',
    'Istria',
    'Osijek-Baranja',
    'Varaždin',
    'Dubrovnik-Neretva',
    'Zadar',
    'Krapina-Zagorje',
    'Sisak-Moslavina',
    'Slavonia',
    'Wider Region (Slovenia)',
    'Wider Region (Serbia)',
    'Wider Region (BiH)',
    'Other',
] as const

export const LISTING_STATUSES = {
    draft: { label: 'Draft', color: '#6B7280' },
    active: { label: 'Active', color: '#10B981' },
    under_nda: { label: 'Under NDA', color: '#F59E0B' },
    negotiation: { label: 'In Negotiation', color: '#3B82F6' },
    closed: { label: 'Closed', color: '#8B5CF6' },
} as const

export const TRANSACTION_TYPES = [
    'Full Acquisition',
    'Majority Stake',
    'Minority Stake',
    'Management Buyout',
    'Asset Purchase',
    'Merger',
] as const

export const EV_RANGES = [
    { label: '< €100K', min: 0, max: 100000 },
    { label: '€100K – €500K', min: 100000, max: 500000 },
    { label: '€500K – €1M', min: 500000, max: 1000000 },
    { label: '€1M – €5M', min: 1000000, max: 5000000 },
    { label: '€5M – €10M', min: 5000000, max: 10000000 },
    { label: '> €10M', min: 10000000, max: Infinity },
] as const

export const INDUSTRY_MULTIPLIERS: Record<string, { evToEbitda: number; evToRevenue: number }> = {
    'Technology & SaaS': { evToEbitda: 12, evToRevenue: 3.5 },
    'Manufacturing': { evToEbitda: 6, evToRevenue: 1.2 },
    'Retail & E-commerce': { evToEbitda: 7, evToRevenue: 1.0 },
    'Food & Beverage': { evToEbitda: 6.5, evToRevenue: 1.1 },
    'Healthcare': { evToEbitda: 10, evToRevenue: 2.5 },
    'Construction': { evToEbitda: 5, evToRevenue: 0.8 },
    'Tourism & Hospitality': { evToEbitda: 8, evToRevenue: 1.5 },
    'Professional Services': { evToEbitda: 8, evToRevenue: 1.8 },
    'Transport & Logistics': { evToEbitda: 6, evToRevenue: 1.0 },
    'Agriculture': { evToEbitda: 5.5, evToRevenue: 0.9 },
    'Real Estate': { evToEbitda: 9, evToRevenue: 2.0 },
    'Media & Entertainment': { evToEbitda: 8, evToRevenue: 1.5 },
    'Education': { evToEbitda: 7, evToRevenue: 1.3 },
    'Energy': { evToEbitda: 7, evToRevenue: 1.4 },
    'Financial Services': { evToEbitda: 9, evToRevenue: 2.2 },
    'Other': { evToEbitda: 6, evToRevenue: 1.0 },
}
