import Link from 'next/link'
import { ArrowRight, BookOpen } from 'lucide-react'

const placeholderPosts = [
    {
        slug: 'procjena-vrijednosti-male-tvrtke',
        title: 'Kako razmišljati o vrijednosti male tvrtke',
        excerpt: 'Praktičan pregled multiplikatora, EBITDA-e, ponovljivih prihoda i faktora koji kupcima ulijevaju povjerenje.',
        date: '2026-04-20',
        readTime: '8 min',
    },
    {
        slug: 'sukcesija-obiteljske-tvrtke',
        title: 'Sukcesija obiteljske tvrtke bez žurbe',
        excerpt: 'Zašto je najbolji trenutak za planiranje izlaza često godinama prije stvarne prodaje ili prijenosa.',
        date: '2026-04-15',
        readTime: '12 min',
    },
    {
        slug: 'nda-u-kupoprodaji-tvrtke',
        title: 'Kako NDA štiti vlasnika i ozbiljnog kupca',
        excerpt: 'Uloga ugovora o povjerljivosti u transakcijama gdje reputacija, zaposlenici i odnosi moraju ostati zaštićeni.',
        date: '2026-04-10',
        readTime: '6 min',
    },
]

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-background pt-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-14">
                    <p className="eyebrow mb-4">
                        <BookOpen className="w-3.5 h-3.5" />
                        Vodiči i uvidi
                    </p>
                    <h1 className="text-3xl md:text-5xl font-bold text-navy-950 mb-4">
                        Heritance bilješke
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-sans">
                        Razmišljanja o procjeni vrijednosti, kupoprodaji tvrtki, povjerljivosti i sukcesiji u hrvatskom kontekstu.
                    </p>
                </div>

                <div className="space-y-5">
                    {placeholderPosts.map((post) => (
                        <Link key={post.slug} href={`/blog/${post.slug}`} className="block premium-card p-6 md:p-8 hover:shadow-elevated hover:border-gold-600/30 transition-all group">
                            <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3 font-sans">
                                <time>{new Date(post.date).toLocaleDateString('hr-HR', { day: 'numeric', month: 'long', year: 'numeric' })}</time>
                                <span>/</span>
                                <span>{post.readTime}</span>
                            </div>
                            <h2 className="text-xl md:text-2xl font-bold text-navy-950 mb-3 group-hover:text-gold-700 transition-colors">
                                {post.title}
                            </h2>
                            <p className="text-muted-foreground leading-relaxed font-sans mb-4">
                                {post.excerpt}
                            </p>
                            <span className="inline-flex items-center gap-2 text-gold-700 font-bold text-sm group-hover:gap-3 transition-all font-sans">
                                Pročitajte
                                <ArrowRight className="w-4 h-4" />
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
