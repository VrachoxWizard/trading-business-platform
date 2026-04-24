import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

// Placeholder — will be SSR from Supabase blog_posts table
export default function BlogPostPage({ params }: { params: { slug: string } }) {
    return (
        <div className="min-h-screen bg-[var(--background)] pt-24">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-[var(--muted-foreground)] text-sm mb-8 hover:text-navy-950 transition-colors font-sans"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Blog
                </Link>

                <article className="bg-white rounded-[8px] shadow-card border border-[var(--border)] p-8 md:p-12">
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center gap-3 text-xs text-[var(--muted-foreground)] mb-4 font-sans">
                            <span>Heritance Team</span>
                            <span>·</span>
                            <span>8 min read</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-navy-950 mb-4">
                            {params.slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                        </h1>
                        <p className="text-[var(--muted-foreground)] max-w-xl mx-auto font-sans">
                            This article is coming soon. Check back for expert insights on M&A, valuations, and succession planning in Croatia.
                        </p>
                    </div>

                    <div className="prose prose-navy max-w-none font-sans">
                        <p className="text-[var(--muted-foreground)] leading-relaxed">
                            Content for this blog post will be loaded from the Heritance database once the blog_posts table is populated.
                            In the meantime, explore our other resources:
                        </p>
                    </div>

                    <div className="mt-8 pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row gap-4">
                        <Link
                            href="/valuate"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg gradient-gold text-navy-950 font-semibold text-sm font-sans shadow-sm hover:shadow-md transition-all"
                        >
                            Get Free Valuation
                        </Link>
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-[var(--border)] text-navy-700 font-semibold text-sm font-sans hover:bg-navy-50 transition-all"
                        >
                            Contact an Advisor
                        </Link>
                    </div>
                </article>
            </div>
        </div>
    )
}
