'use client'

import { Suspense, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowRight, Eye, EyeOff, Lock, Mail, Shield } from 'lucide-react'
import { login, signup } from './actions'

function LoginForm() {
    const searchParams = useSearchParams()
    const [mode, setMode] = useState<'login' | 'signup'>(
        searchParams.get('mode') === 'signup' ? 'signup' : 'login'
    )
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (formData: FormData) => {
        setLoading(true)
        setError('')
        try {
            if (mode === 'login') {
                await login(formData)
            } else {
                await signup(formData)
            }
        } catch {
            setError('Nešto nije uspjelo. Provjerite podatke i pokušajte ponovno.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen gradient-hero flex items-center justify-center px-4 py-24">
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-2">
                        <div className="w-12 h-12 rounded-lg gradient-gold flex items-center justify-center shadow-lg">
                            <span className="text-navy-950 font-display font-bold text-2xl leading-none">H</span>
                        </div>
                        <span className="text-2xl font-display font-bold text-white">
                            Herit<span className="text-gold-400">ance</span>
                        </span>
                    </Link>
                </div>

                <div className="glass p-7 md:p-8 rounded-lg shadow-elevated">
                    <div className="flex rounded-lg bg-navy-50 p-1 mb-8">
                        <button
                            type="button"
                            onClick={() => setMode('login')}
                            className={`flex-1 py-2.5 rounded-md text-sm font-bold transition-all ${mode === 'login'
                                ? 'bg-white text-navy-950 shadow-sm'
                                : 'text-navy-500 hover:text-navy-700'
                                }`}
                        >
                            Prijava
                        </button>
                        <button
                            type="button"
                            onClick={() => setMode('signup')}
                            className={`flex-1 py-2.5 rounded-md text-sm font-bold transition-all ${mode === 'signup'
                                ? 'bg-white text-navy-950 shadow-sm'
                                : 'text-navy-500 hover:text-navy-700'
                                }`}
                        >
                            Novi račun
                        </button>
                    </div>

                    <div className="mb-6">
                        <p className="eyebrow mb-4">
                            <Shield className="w-3.5 h-3.5" />
                            Povjerljiv pristup
                        </p>
                        <h1 className="text-2xl font-bold text-navy-950 mb-2">
                            {mode === 'login' ? 'Dobro došli natrag' : 'Otvorite Heritance račun'}
                        </h1>
                        <p className="text-navy-500 text-sm font-sans">
                            {mode === 'login'
                                ? 'Pristupite svojim razgovorima, NDA zahtjevima i nadzornoj ploči.'
                                : 'Kreirajte profil kupca ili prodavatelja za povjerljiv rad s prilikama.'}
                        </p>
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm mb-6">
                            {error}
                        </div>
                    )}

                    <form action={handleSubmit} className="space-y-5">
                        {mode === 'signup' && (
                            <div>
                                <label htmlFor="full_name" className="block text-sm font-bold text-navy-700 mb-1.5">
                                    Ime i prezime
                                </label>
                                <input
                                    id="full_name"
                                    name="full_name"
                                    type="text"
                                    required
                                    className="field-shell"
                                    placeholder="Vaše ime"
                                />
                            </div>
                        )}

                        <div>
                            <label htmlFor="email" className="block text-sm font-bold text-navy-700 mb-1.5">
                                Email adresa
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className="field-shell pl-10"
                                    placeholder="ime@tvrtka.hr"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-bold text-navy-700 mb-1.5">
                                Lozinka
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    minLength={6}
                                    className="field-shell pl-10 pr-12"
                                    placeholder="Najmanje 6 znakova"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((visible) => !visible)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-navy-400 hover:text-navy-600"
                                    aria-label={showPassword ? 'Sakrij lozinku' : 'Prikaži lozinku'}
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {mode === 'signup' && (
                            <div>
                                <label htmlFor="role" className="block text-sm font-bold text-navy-700 mb-1.5">
                                    Primarna uloga
                                </label>
                                <select id="role" name="role" className="field-shell">
                                    <option value="buyer">Kupac / investitor</option>
                                    <option value="seller">Vlasnik tvrtke</option>
                                </select>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg gradient-accent text-white font-bold text-sm shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-50"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    {mode === 'login' ? 'Prijavite se' : 'Kreirajte račun'}
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>

                    {mode === 'login' && (
                        <p className="text-center text-sm text-navy-500 mt-4">
                            <button type="button" className="text-gold-700 hover:text-gold-600 font-bold">
                                Zaboravljena lozinka?
                            </button>
                        </p>
                    )}
                </div>

                <p className="text-center text-sm text-navy-300 mt-6">
                    Nastavkom prihvaćate Heritance{' '}
                    <Link href="#" className="text-gold-400 hover:text-gold-300">uvjete</Link>{' '}
                    i{' '}
                    <Link href="#" className="text-gold-400 hover:text-gold-300">pravila privatnosti</Link>.
                </p>
            </motion.div>
        </div>
    )
}

export default function LoginPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen gradient-hero flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            </div>
        }>
            <LoginForm />
        </Suspense>
    )
}
