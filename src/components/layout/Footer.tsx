import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'

const footerLinks = {
    Platforma: [
        { label: 'Tržnica prilika', href: '/listings' },
        { label: 'Procjena vrijednosti', href: '/valuate' },
        { label: 'Prodaja tvrtke', href: '/sell' },
        { label: 'Kupnja tvrtke', href: '/buy' },
    ],
    Savjetovanje: [
        { label: 'Sukcesija', href: '/succession' },
        { label: 'Blog', href: '/blog' },
        { label: 'Kontakt', href: '/contact' },
        { label: 'Za partnere', href: '/contact' },
    ],
    Povjerenje: [
        { label: 'Povjerljivost', href: '#' },
        { label: 'NDA proces', href: '#' },
        { label: 'Uvjeti korištenja', href: '#' },
        { label: 'Privatnost i GDPR', href: '#' },
    ],
}

export default function Footer() {
    return (
        <footer className="bg-navy-950 text-white">
            <div className="border-b border-white/10">
                <div className="section-shell py-12">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div className="max-w-2xl">
                            <p className="text-xs font-bold uppercase tracking-wider text-gold-400 mb-3">Diskretno. Strukturirano. Savjetovano.</p>
                            <h3 className="text-2xl md:text-3xl font-display font-bold mb-2">
                                Razgovarajmo prije nego tržište sazna.
                            </h3>
                            <p className="text-navy-300 font-sans">
                                Vlasnicima, kupcima i investitorima pomažemo procijeniti opcije bez nepotrebnog izlaganja.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Link
                                href="/valuate"
                                className="px-6 py-3 rounded-lg gradient-gold text-navy-950 font-bold text-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                            >
                                Procijenite tvrtku
                            </Link>
                            <Link
                                href="/contact"
                                className="px-6 py-3 rounded-lg border border-white/20 text-white font-bold text-sm hover:bg-white/10 transition-all"
                            >
                                Zatražite razgovor
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="section-shell py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex items-center gap-2.5 mb-6">
                            <div className="w-9 h-9 rounded-lg gradient-gold flex items-center justify-center">
                                <span className="text-navy-950 font-display font-bold text-lg leading-none">H</span>
                            </div>
                            <span className="text-xl font-display font-bold">
                                Herit<span className="text-gold-400">ance</span>
                            </span>
                        </Link>
                        <p className="text-navy-300 text-sm leading-relaxed mb-6 max-w-sm font-sans">
                            Premium platforma za procjene vrijednosti, povjerljive transakcije i savjetovanje pri kupoprodaji tvrtki u Hrvatskoj i regiji.
                        </p>
                        <div className="space-y-3 text-sm text-navy-400 font-sans">
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                <span>Zagreb, Hrvatska</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                <a href="mailto:info@heritance.hr" className="hover:text-white transition-colors">
                                    info@heritance.hr
                                </a>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4" />
                                <a href="tel:+385123456789" className="hover:text-white transition-colors">
                                    +385 1 234 5678
                                </a>
                            </div>
                        </div>
                    </div>

                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title}>
                            <h4 className="text-sm font-bold uppercase tracking-wider text-navy-400 mb-4 font-sans">
                                {title}
                            </h4>
                            <ul className="space-y-3">
                                {links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-navy-300 hover:text-white transition-colors font-sans"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            <div className="border-t border-white/10">
                <div className="section-shell py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-navy-400 font-sans">
                        <p>© {new Date().getFullYear()} Heritance. Sva prava pridržana.</p>
                        <p>Diskretna kupoprodaja tvrtki uz savjetničku podršku.</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
