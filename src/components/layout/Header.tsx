'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Menu,
    X,
    TrendingUp,
    Building2,
    Search,
    LayoutDashboard,
    LogIn,
    ChevronRight,
    BookOpen,
    ShoppingCart,
    Mail,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

const navItems = [
    { href: '/listings', label: 'Marketplace', icon: Search },
    { href: '/valuate', label: 'AI Valuator', icon: TrendingUp },
    { href: '/sell', label: 'Sell', icon: Building2 },
    { href: '/buy', label: 'Buy', icon: ShoppingCart },
    { href: '/succession', label: 'Succession', icon: BookOpen },
]

export default function Header() {
    const [isOpen, setIsOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [user, setUser] = useState<{ id: string; email?: string } | null>(null)
    const pathname = usePathname()
    const supabase = createClient()

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

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
    }, [supabase.auth])

    const isActive = (href: string) => pathname === href

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? 'glass shadow-md py-3'
                : 'bg-transparent py-5'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <div className="w-9 h-9 rounded-lg bg-gold-600 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                            <span className="text-white font-display font-bold text-lg leading-none">H</span>
                        </div>
                        <span className="text-xl font-display font-bold tracking-tight">
                            <span className={isScrolled ? 'text-navy-950' : 'text-white'}>Herit</span>
                            <span className="text-gold-600">ance</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center gap-1">
                        {navItems.map((item) => {
                            const Icon = item.icon
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${isActive(item.href)
                                        ? 'bg-gold-600 text-white shadow-sm'
                                        : isScrolled
                                            ? 'text-navy-700 hover:bg-navy-50 hover:text-navy-950'
                                            : 'text-white/80 hover:text-white hover:bg-white/10'
                                        }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    {item.label}
                                </Link>
                            )
                        })}
                    </nav>

                    {/* Right side */}
                    <div className="hidden lg:flex items-center gap-3">
                        {user ? (
                            <Link
                                href="/dashboard"
                                className="flex items-center gap-2 px-5 py-2.5 rounded-lg gradient-gold text-navy-950 font-semibold text-sm shadow-sm hover:shadow-md transition-all hover:scale-[1.02]"
                            >
                                <LayoutDashboard className="w-4 h-4" />
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${isScrolled
                                        ? 'text-navy-700 hover:text-navy-950'
                                        : 'text-white/80 hover:text-white'
                                        }`}
                                >
                                    <LogIn className="w-4 h-4" />
                                    Sign In
                                </Link>
                                <Link
                                    href="/login?mode=signup"
                                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg gradient-gold text-navy-950 font-semibold text-sm shadow-sm hover:shadow-md transition-all hover:scale-[1.02]"
                                >
                                    Get Started
                                    <ChevronRight className="w-4 h-4" />
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={`lg:hidden p-2 rounded-lg transition-colors ${isScrolled ? 'text-navy-950' : 'text-white'
                            }`}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden glass border-t border-white/20 mt-2"
                    >
                        <div className="px-4 py-4 space-y-2">
                            {navItems.map((item) => {
                                const Icon = item.icon
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${isActive(item.href)
                                            ? 'bg-gold-600 text-white'
                                            : 'text-navy-700 hover:bg-navy-50'
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
                                    className="flex items-center gap-3 px-4 py-3 rounded-lg gradient-gold text-navy-950 font-semibold text-sm"
                                >
                                    <LayoutDashboard className="w-5 h-5" />
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href="/login"
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-navy-700 hover:bg-navy-50 text-sm font-medium"
                                    >
                                        <LogIn className="w-5 h-5" />
                                        Sign In
                                    </Link>
                                    <Link
                                        href="/login?mode=signup"
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg gradient-gold text-navy-950 font-semibold text-sm"
                                    >
                                        Get Started
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
