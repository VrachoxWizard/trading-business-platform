import Link from 'next/link'
import { TrendingUp, Mail, MapPin, Phone } from 'lucide-react'

const footerLinks = {
    Platform: [
        { label: 'Browse Deals', href: '/listings' },
        { label: 'Free Valuation', href: '/valuate' },
        { label: 'Sell a Business', href: '/sell' },
        { label: 'For Investors', href: '/listings?role=buyer' },
    ],
    Company: [
        { label: 'About DealFlow', href: '#' },
        { label: 'Our Process', href: '/sell#process' },
        { label: 'Pricing', href: '#pricing' },
        { label: 'Blog', href: '#' },
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
                            <h3 className="text-2xl font-bold mb-2">
                                Ready to make a move?
                            </h3>
                            <p className="text-navy-300">
                                Whether buying or selling, DealFlow guides you through every step.
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <Link
                                href="/valuate"
                                className="px-6 py-3 rounded-xl gradient-gold text-navy-950 font-semibold text-sm hover:shadow-xl transition-all hover:scale-[1.02]"
                            >
                                Free Valuation →
                            </Link>
                            <Link
                                href="/listings"
                                className="px-6 py-3 rounded-xl border border-white/20 text-white font-semibold text-sm hover:bg-white/10 transition-all"
                            >
                                Browse Deals
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
                        <Link href="/" className="flex items-center gap-2 mb-6">
                            <div className="w-10 h-10 rounded-xl gradient-accent flex items-center justify-center">
                                <TrendingUp className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold">
                                Deal<span className="text-gold-500">Flow</span>
                            </span>
                        </Link>
                        <p className="text-navy-300 text-sm leading-relaxed mb-6 max-w-sm">
                            The premier M&A advisory platform for micro and small businesses
                            in Croatia and the wider region. AI-powered valuations,
                            confidential deal rooms, and expert brokerage.
                        </p>
                        <div className="space-y-3 text-sm text-navy-400">
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                <span>Zagreb, Croatia</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                <a href="mailto:info@dealflow.hr" className="hover:text-white transition-colors">
                                    info@dealflow.hr
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
                            <h4 className="text-sm font-semibold uppercase tracking-wider text-navy-400 mb-4">
                                {title}
                            </h4>
                            <ul className="space-y-3">
                                {links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-navy-300 hover:text-white transition-colors"
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
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-navy-400">
                        <p>© {new Date().getFullYear()} DealFlow. All rights reserved.</p>
                        <p>
                            Powered by AI · Built for Croatian M&A
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
