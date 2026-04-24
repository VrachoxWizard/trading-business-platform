'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import {
    BookOpen,
    Building2,
    ChevronRight,
    LayoutDashboard,
    LogIn,
    Menu,
    Search,
    ShoppingCart,
    TrendingUp,
    X,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

const navItems = [
    { href: '/listings', label: 'Tržnica', icon: Search },
    { href: '/valuate', label: 'Procjena', icon: TrendingUp },
    { href: '/sell', label: 'Prodaja', icon: Building2 },
    { href: '/buy', label: 'Kupnja', icon: ShoppingCart },
    { href: '/succession', label: 'Sukcesija', icon: BookOpen },
]

const darkHeroRoutes = ['/', '/sell', '/buy', '/succession', '/login']

export default function Header() {
    const [isOpen, setIsOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [user, setUser] = useState<{ id: string; email?: string } | null>(null)
    const pathname = usePathname()
    const supabase = useMemo(() => createClient(), [])

    const usesDarkHero = darkHeroRoutes.includes(pathname)
    const solidHeader = !usesDarkHero || isScrolled || isOpen

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 16)
        handleScroll()
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [pathname])

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            setUser(user ? { id: user.id, email: user.email } : null)
        }
        getUser()

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ? { id: session.user.id, email: session.user.email } : null)
        })

        return () => subscription.unsubscribe()
    }, [supabase])

    const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)
    const navText = solidHeader ? 'text-navy-700' : 'text-white/85'
    const brandText = solidHeader ? 'text-navy-950' : 'text-white'

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${solidHeader
                ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-sm py-3'
                : 'bg-transparent py-5'
                }`}
        >
            <div className="section-shell">
                <div className="flex items-center justify-between gap-4">
                    <Link href="/" className="flex items-center gap-2.5 group" aria-label="Heritance početna">
                        <div className="w-9 h-9 rounded-lg gradient-gold flex items-center justify-center shadow-sm ring-1 ring-white/20 transition-transform group-hover:-translate-y-0.5">
                            <span className="text-navy-950 font-display font-bold text-lg leading-none">H</span>
                        </div>
                        <span className="text-xl font-display font-bold">
                            <span className={brandText}>Herit</span>
                            <span className="text-gold-500">ance</span>
                        </span>
                    </Link>

                    <nav className="hidden lg:flex items-center gap-1">
                        {navItems.map((item) => {
                            const Icon = item.icon
                            const active = isActive(item.href)
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${active
                                        ? 'bg-navy-950 text-white shadow-sm'
                                        : `${navText} hover:bg-black/5 hover:text-navy-950`
                                        }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    {item.label}
                                </Link>
                            )
                        })}
                    </nav>

                    <div className="hidden lg:flex items-center gap-3">
                        {user ? (
                            <Link
                                href="/dashboard"
                                className="flex items-center gap-2 px-5 py-2.5 rounded-lg gradient-gold text-navy-950 font-bold text-sm shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                            >
                                <LayoutDashboard className="w-4 h-4" />
                                Nadzorna ploča
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${solidHeader
                                        ? 'text-navy-700 hover:text-navy-950 hover:bg-navy-50'
                                        : 'text-white/85 hover:text-white hover:bg-white/10'
                                        }`}
                                >
                                    <LogIn className="w-4 h-4" />
                                    Prijava
                                </Link>
                                <Link
                                    href="/login?mode=signup"
                                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg gradient-gold text-navy-950 font-bold text-sm shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                                >
                                    Počnite
                                    <ChevronRight className="w-4 h-4" />
                                </Link>
                            </>
                        )}
                    </div>

                    <button
                        onClick={() => setIsOpen((open) => !open)}
                        className={`lg:hidden p-2 rounded-lg transition-colors ${solidHeader ? 'text-navy-950' : 'text-white'}`}
                        aria-label="Otvori navigaciju"
                        aria-expanded={isOpen}
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-background border-t border-border mt-3 shadow-md"
                    >
                        <div className="px-4 py-4 space-y-2">
                            {navItems.map((item) => {
                                const Icon = item.icon
                                const active = isActive(item.href)
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all ${active
                                            ? 'bg-navy-950 text-white'
                                            : 'text-navy-700 hover:bg-black/5'
                                            }`}
                                    >
                                        <Icon className="w-5 h-5" />
                                        {item.label}
                                    </Link>
                                )
                            })}
                            <hr className="border-navy-100 my-2" />
                            {user ? (
                                <Link
                                    href="/dashboard"
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-3 px-4 py-3 rounded-lg gradient-gold text-navy-950 font-bold text-sm"
                                >
                                    <LayoutDashboard className="w-5 h-5" />
                                    Nadzorna ploča
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href="/login"
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-navy-700 hover:bg-navy-50 text-sm font-semibold"
                                    >
                                        <LogIn className="w-5 h-5" />
                                        Prijava
                                    </Link>
                                    <Link
                                        href="/login?mode=signup"
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg gradient-gold text-navy-950 font-bold text-sm"
                                    >
                                        Počnite
                                        <ChevronRight className="w-4 h-4" />
                                    </Link>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}
