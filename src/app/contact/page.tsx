'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
    Mail,
    Phone,
    MapPin,
    Send,
    CheckCircle2,
    Building2,
} from 'lucide-react'

const fadeIn = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
}

const stagger = { animate: { transition: { staggerChildren: 0.1 } } }

export default function ContactPage() {
    const [submitted, setSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)

        // Stub — would POST to /api/contact or Resend
        await new Promise(resolve => setTimeout(resolve, 1000))

        setSubmitted(true)
        setLoading(false)
    }

    return (
        <div className="min-h-screen bg-[var(--background)] pt-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <motion.div initial="initial" animate="animate" variants={stagger}>
                    {/* Header */}
                    <motion.div variants={fadeIn} className="text-center mb-16">
                        <h1 className="text-3xl md:text-5xl font-bold text-navy-950 mb-4">
                            Get in touch
                        </h1>
                        <p className="text-[var(--muted-foreground)] text-lg max-w-2xl mx-auto font-sans">
                            Whether you have a question about selling, buying, or succession planning — our team is here to help.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                        {/* Contact Form */}
                        <motion.div variants={fadeIn} className="lg:col-span-3">
                            <div className="bg-white rounded-[8px] shadow-card border border-[var(--border)] p-8">
                                {submitted ? (
                                    <div className="text-center py-12">
                                        <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
                                            <CheckCircle2 className="w-8 h-8 text-green-600" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-navy-950 mb-2">Message sent</h2>
                                        <p className="text-[var(--muted-foreground)] font-sans">
                                            We&apos;ll get back to you within 24 hours. Check your email for confirmation.
                                        </p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-navy-700 mb-1.5 font-sans">Full Name *</label>
                                                <input
                                                    required
                                                    type="text"
                                                    className="w-full px-4 py-3 rounded-[4px] border border-[var(--border)] text-sm font-sans focus:outline-none focus:ring-2 focus:ring-gold-600"
                                                    placeholder="Your name"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-navy-700 mb-1.5 font-sans">Email *</label>
                                                <input
                                                    required
                                                    type="email"
                                                    className="w-full px-4 py-3 rounded-[4px] border border-[var(--border)] text-sm font-sans focus:outline-none focus:ring-2 focus:ring-gold-600"
                                                    placeholder="you@company.com"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-navy-700 mb-1.5 font-sans">Company</label>
                                            <input
                                                type="text"
                                                className="w-full px-4 py-3 rounded-[4px] border border-[var(--border)] text-sm font-sans focus:outline-none focus:ring-2 focus:ring-gold-600"
                                                placeholder="Company name (optional)"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-navy-700 mb-1.5 font-sans">Inquiry Type</label>
                                            <select className="w-full px-4 py-3 rounded-[4px] border border-[var(--border)] text-sm font-sans focus:outline-none focus:ring-2 focus:ring-gold-600">
                                                <option>I want to sell my business</option>
                                                <option>I want to buy a business</option>
                                                <option>Succession planning advice</option>
                                                <option>Partnership opportunity</option>
                                                <option>General inquiry</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-navy-700 mb-1.5 font-sans">Message *</label>
                                            <textarea
                                                required
                                                rows={5}
                                                className="w-full px-4 py-3 rounded-[4px] border border-[var(--border)] text-sm font-sans focus:outline-none focus:ring-2 focus:ring-gold-600 resize-none"
                                                placeholder="Tell us about your situation..."
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg gradient-gold text-navy-950 font-semibold text-sm font-sans shadow-sm hover:shadow-md transition-all disabled:opacity-50"
                                        >
                                            {loading ? (
                                                <div className="w-4 h-4 border-2 border-navy-950/30 border-t-navy-950 rounded-full animate-spin" />
                                            ) : (
                                                <Send className="w-4 h-4" />
                                            )}
                                            {loading ? 'Sending...' : 'Send Message'}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </motion.div>

                        {/* Contact Info */}
                        <motion.div variants={fadeIn} className="lg:col-span-2 space-y-6">
                            <div className="bg-white rounded-[8px] shadow-card border border-[var(--border)] p-6">
                                <h3 className="text-lg font-bold text-navy-950 mb-4">Our Office</h3>
                                <div className="space-y-4 text-sm text-[var(--muted-foreground)] font-sans">
                                    <div className="flex items-start gap-3">
                                        <MapPin className="w-5 h-5 text-gold-600 mt-0.5" />
                                        <div>
                                            <p className="font-medium text-navy-700">Zagreb, Croatia</p>
                                            <p>Available for in-person meetings by appointment</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Mail className="w-5 h-5 text-gold-600 mt-0.5" />
                                        <div>
                                            <p className="font-medium text-navy-700">Email</p>
                                            <a href="mailto:info@heritance.hr" className="hover:text-gold-600 transition-colors">info@heritance.hr</a>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Phone className="w-5 h-5 text-gold-600 mt-0.5" />
                                        <div>
                                            <p className="font-medium text-navy-700">Phone</p>
                                            <a href="tel:+385123456789" className="hover:text-gold-600 transition-colors">+385 1 234 5678</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-navy-950 rounded-[8px] p-6">
                                <h3 className="text-lg font-bold text-white mb-3">Free 30-Minute Consultation</h3>
                                <p className="text-navy-300 text-sm leading-relaxed mb-4 font-sans">
                                    Not sure where to start? Book a free, no-obligation call with one of our M&A advisors. 100% confidential.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    <div className="flex items-center gap-1.5 text-xs text-navy-300 font-sans">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-gold-400" />
                                        No obligation
                                    </div>
                                    <div className="flex items-center gap-1.5 text-xs text-navy-300 font-sans">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-gold-400" />
                                        100% confidential
                                    </div>
                                    <div className="flex items-center gap-1.5 text-xs text-navy-300 font-sans">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-gold-400" />
                                        Expert guidance
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
