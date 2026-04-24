import Link from 'next/link'
import { ArrowRight, BookOpen } from 'lucide-react'

// Placeholder blog page — will be connected to `blog_posts` Supabase table
const placeholderPosts = [
    {
        slug: 'how-to-value-small-business-croatia',
        title: 'How to Value a Small Business in Croatia',
        excerpt: 'A practical guide to understanding what your Croatian micro or small business is worth, using the most common valuation methods.',
        date: '2026-04-20',
        readTime: '8 min read',
    },
    {
        slug: 'succession-planning-guide',
        title: 'The Complete Guide to Business Succession Planning',
        excerpt: 'Over 60% of Croatian small businesses face succession challenges. Here\'s how to prepare for a smooth ownership transition.',
        date: '2026-04-15',
        readTime: '12 min read',
    },
    {
        slug: 'nda-process-explained',
        title: 'How NDAs Work in Business Acquisitions',
        excerpt: 'Understanding the role of Non-Disclosure Agreements in protecting both buyers and sellers during the M&A process.',
        date: '2026-04-10',
        readTime: '6 min read',
    },
]

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-[var(--background)] pt-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-navy-50 text-navy-700 mb-4 font-sans">
                        <BookOpen className="w-3 h-3" />
                        Insights & Guides
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold text-navy-950 mb-4">
                        The Heritance Blog
                    </h1>
                    <p className="text-[var(--muted-foreground)] text-lg max-w-2xl mx-auto font-sans">
                        Expert insights on business valuation, M&A strategy, and succession planning for Croatian business owners.
                    </p>
                </div>

                {/* Posts */}
                <div className="space-y-6">
                    {placeholderPosts.map((post) => (
                        <Link
                            key={post.slug}
                            href={`/blog/${post.slug}`}
                            className="block bg-white rounded-[8px] p-6 md:p-8 shadow-card border border-[var(--border)] hover:shadow-elevated hover:border-gold-600/30 transition-all group"
                        >
                            <div className="flex items-center gap-3 text-xs text-[var(--muted-foreground)] mb-3 font-sans">
                                <time>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</time>
                                <span>·</span>
                                <span>{post.readTime}</span>
                            </div>
                            <h2 className="text-xl md:text-2xl font-bold text-navy-950 mb-3 group-hover:text-gold-600 transition-colors">
                                {post.title}
                            </h2>
                            <p className="text-[var(--muted-foreground)] leading-relaxed font-sans mb-4">
                                {post.excerpt}
                            </p>
                            <span className="inline-flex items-center gap-2 text-gold-600 font-semibold text-sm group-hover:gap-3 transition-all font-sans">
                                Read more
                                <ArrowRight className="w-4 h-4" />
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
