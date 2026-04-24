export function formatCurrency(value: number): string {
    return new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value)
}

export function formatNumber(value: number): string {
    return new Intl.NumberFormat('de-DE').format(value)
}

export function cn(...classes: (string | undefined | null | false)[]): string {
    return classes.filter(Boolean).join(' ')
}

export function getInitials(name: string): string {
    return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
}

export function truncate(str: string, length: number): string {
    if (str.length <= length) return str
    return str.slice(0, length) + '...'
}

export function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-')
}

export function calculateEV(ebitda: number, multiplier: number): number {
    return ebitda * multiplier
}

export function getMatchScoreLabel(score: number): string {
    if (score >= 90) return 'Excellent Match'
    if (score >= 80) return 'Strong Match'
    if (score >= 70) return 'Good Match'
    return 'Partial Match'
}

export function getMatchScoreColor(score: number): string {
    if (score >= 90) return '#10B981'
    if (score >= 80) return '#3B82F6'
    if (score >= 70) return '#F59E0B'
    return '#6B7280'
}

export function timeAgo(date: string): string {
    const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000)
    const intervals = [
        { label: 'year', seconds: 31536000 },
        { label: 'month', seconds: 2592000 },
        { label: 'week', seconds: 604800 },
        { label: 'day', seconds: 86400 },
        { label: 'hour', seconds: 3600 },
        { label: 'minute', seconds: 60 },
    ]
    for (const interval of intervals) {
        const count = Math.floor(seconds / interval.seconds)
        if (count >= 1) return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`
    }
    return 'just now'
}
