import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'

const footerLinks = {
    Platform: [
        { label: 'Marketplace', href: '/listings' },
        { label: 'Free Valuation', href: '/valuate' },
        { label: 'Sell a Business', href: '/sell' },
        { label: 'Buy a Business', href: '/buy' },
    ],
    Company: [
        { label: 'About Heritance', href: '#' },
        { label: 'Succession Planning', href: '/succession' },
        { label: 'Blog', href: '/blog' },
        { label: 'Contact', href: '/contact' },
    ],
    Legal: [
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms of Service', href: '#' },
        { label: 'NDA Policy', href: '#' },
        { label: 'GDPR', href: '#' },
    ],
}

export default function Footer() {
    return (
        <footer className="bg-navy-950 text-white">
            {/* CTA Strip */}
            <div className="border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <h3 className="text-2xl font-display font-bold mb-2">
                                Ready to write the next chapter?
                            </h3>
                            <p className="text-navy-300 font-sans">
                                Whether buying or selling, Heritance guides you through every step.
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <Link
                                href="/valuate"
                                className="px-6 py-3 rounded-lg gradient-gold text-navy-950 font-semibold text-sm hover:shadow-md transition-all hover:scale-[1.02]"
                            >
                                Free Valuation →
                            </Link>
                            <Link
                                href="/listings"
                                className="px-6 py-3 rounded-lg border border-white/20 text-white font-semibold text-sm hover:bg-white/10 transition-all"
                            >
                                Browse Listings
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
                    {/* Brand column */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex items-center gap-2.5 mb-6">
                            <div className="w-9 h-9 rounded-lg bg-gold-600 flex items-center justify-center">
                                <span className="text-white font-display font-bold text-lg leading-none">H</span>
                            </div>
                            <span className="text-xl font-display font-bold">
                                Herit<span className="text-gold-400">ance</span>
                            </span>
                        </Link>
                        <p className="text-navy-300 text-sm leading-relaxed mb-6 max-w-sm font-sans">
                            Where businesses find their next chapter. AI-powered valuations,
                            confidential deal rooms, and expert M&A brokerage for micro and
                            small businesses in Croatia and the wider region.
                        </p>
                        <div className="space-y-3 text-sm text-navy-400 font-sans">
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                <span>Zagreb, Croatia</span>
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

                    {/* Link columns */}
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title}>
                            <h4 className="text-sm font-semibold uppercase tracking-wider text-navy-400 mb-4 font-sans">
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

            {/* Bottom bar */}
            <div className="border-t border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-navy-400 font-sans">
                        <p>© {new Date().getFullYear()} Heritance. All rights reserved.</p>
                        <p>
                            Where businesses find their next chapter.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
