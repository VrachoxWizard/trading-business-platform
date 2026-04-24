import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const title = slug
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')

    return (
        <div className="min-h-screen bg-background pt-24">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <Link href="/blog" className="inline-flex items-center gap-2 text-muted-foreground text-sm mb-8 hover:text-navy-950 transition-colors font-bold">
                    <ArrowLeft className="w-4 h-4" />
                    Povratak na bilješke
                </Link>

                <article className="premium-card p-8 md:p-12">
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center gap-3 text-xs text-muted-foreground mb-4 font-sans">
                            <span>Heritance tim</span>
                            <span>/</span>
                            <span>8 min</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-navy-950 mb-4">{title}</h1>
                        <p className="text-muted-foreground max-w-xl mx-auto font-sans">
                            Ovaj vodič uskoro stiže. Do tada možete istražiti procjenu vrijednosti ili zatražiti povjerljiv razgovor.
                        </p>
                    </div>

                    <div className="text-muted-foreground leading-relaxed font-sans">
                        Sadržaj će se učitavati iz Heritance baze znanja nakon povezivanja blog modula.
                    </div>

                    <div className="mt-8 pt-8 border-t border-border flex flex-col sm:flex-row gap-4">
                        <Link href="/valuate" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg gradient-gold text-navy-950 font-bold text-sm font-sans shadow-sm hover:shadow-md transition-all">
                            Procjena vrijednosti
                        </Link>
                        <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-border text-navy-700 font-bold text-sm font-sans hover:bg-navy-50 transition-all">
                            Kontakt savjetnika
                        </Link>
                    </div>
                </article>
            </div>
        </div>
    )
}
