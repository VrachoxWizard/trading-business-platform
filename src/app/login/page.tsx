'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { TrendingUp, Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react'
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
            setError('An error occurred. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen gradient-hero flex items-center justify-center px-4 py-20">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-2">
                        <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center shadow-lg">
                            <TrendingUp className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold text-white">
                            Deal<span className="text-gold-500">Flow</span>
                        </span>
                    </Link>
                </div>

                {/* Card */}
                <div className="glass rounded-2xl p-8 shadow-elevated">
                    {/* Mode toggle */}
                    <div className="flex rounded-xl bg-navy-50 p-1 mb-8">
                        <button
                            onClick={() => setMode('login')}
                            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${mode === 'login'
                                ? 'bg-white text-navy-950 shadow-sm'
                                : 'text-navy-500 hover:text-navy-700'
                                }`}
                        >
                            Sign In
                        </button>
                        <button
                            onClick={() => setMode('signup')}
                            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${mode === 'signup'
                                ? 'bg-white text-navy-950 shadow-sm'
                                : 'text-navy-500 hover:text-navy-700'
                                }`}
                        >
                            Create Account
                        </button>
                    </div>

                    <h2 className="text-2xl font-bold text-navy-950 mb-2">
                        {mode === 'login' ? 'Welcome back' : 'Join DealFlow'}
                    </h2>
                    <p className="text-navy-500 text-sm mb-6">
                        {mode === 'login'
                            ? 'Sign in to access your deals and dashboard.'
                            : 'Create an account to start buying or selling businesses.'}
                    </p>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm mb-6">
                            {error}
                        </div>
                    )}

                    <form action={handleSubmit} className="space-y-5">
                        {mode === 'signup' && (
                            <div>
                                <label htmlFor="full_name" className="block text-sm font-medium text-navy-700 mb-1.5">
                                    Full Name
                                </label>
                                <input
                                    id="full_name"
                                    name="full_name"
                                    type="text"
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-navy-200 bg-white text-navy-950 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
                                    placeholder="Your full name"
                                />
                            </div>
                        )}

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-navy-700 mb-1.5">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-navy-200 bg-white text-navy-950 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
                                    placeholder="you@company.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-navy-700 mb-1.5">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    minLength={6}
                                    className="w-full pl-10 pr-12 py-3 rounded-xl border border-navy-200 bg-white text-navy-950 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-navy-400 hover:text-navy-600"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {mode === 'signup' && (
                            <div>
                                <label htmlFor="role" className="block text-sm font-medium text-navy-700 mb-1.5">
                                    I am a...
                                </label>
                                <select
                                    id="role"
                                    name="role"
                                    className="w-full px-4 py-3 rounded-xl border border-navy-200 bg-white text-navy-950 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
                                >
                                    <option value="buyer">Buyer / Investor</option>
                                    <option value="seller">Business Owner (Seller)</option>
                                </select>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl gradient-accent text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-all hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    {mode === 'login' ? 'Sign In' : 'Create Account'}
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>

                    {mode === 'login' && (
                        <p className="text-center text-sm text-navy-500 mt-4">
                            <button className="text-accent-600 hover:text-accent-700 font-medium">
                                Forgot password?
                            </button>
                        </p>
                    )}
                </div>

                <p className="text-center text-sm text-navy-300 mt-6">
                    By continuing, you agree to DealFlow&apos;s{' '}
                    <Link href="#" className="text-gold-400 hover:text-gold-300">Terms</Link>{' '}
                    and{' '}
                    <Link href="#" className="text-gold-400 hover:text-gold-300">Privacy Policy</Link>.
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
