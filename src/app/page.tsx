'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
  FileText,
  Handshake,
  Lock,
  Shield,
  Sparkles,
  TrendingUp,
  Users,
} from 'lucide-react'
import CroatiaDealNetwork from '@/components/CroatiaDealNetwork'
import DealMarquee from '@/components/DealMarquee'
import ProcessTimeline from '@/components/ProcessTimeline'
import TestimonialCarousel from '@/components/TestimonialCarousel'

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
}

const personas = [
  {
    icon: Building2,
    title: 'Vlasnici tvrtki',
    desc: 'Saznajte raspon vrijednosti, pripremite anonimni teaser i razgovarajte tek s ozbiljnim kupcima.',
    cta: 'Procijenite tvrtku',
    href: '/valuate',
  },
  {
    icon: Users,
    title: 'Kupci i investitori',
    desc: 'Pregledajte strukturirane prilike s jasnim financijskim pokazateljima i NDA pristupom.',
    cta: 'Pregledajte prilike',
    href: '/listings',
  },
  {
    icon: Handshake,
    title: 'Savjetnici i fondovi',
    desc: 'Koristite Heritance kao diskretan kanal za izvore prilika, co-brokerage i portfeljne izlaze.',
    cta: 'Razgovarajte s nama',
    href: '/contact',
  },
]

const features = [
  {
    icon: Sparkles,
    title: 'Procjena u nekoliko minuta',
    desc: 'Indikativni raspon vrijednosti temeljen na industriji, EBITDA-i, prihodima i kvaliteti poslovanja.',
  },
  {
    icon: Shield,
    title: 'Povjerljivost od prvog koraka',
    desc: 'Identitet vlasnika ostaje zaštićen dok ne postoji stvaran interes i potpisan NDA.',
  },
  {
    icon: BarChart3,
    title: 'Pametno uparivanje',
    desc: 'Kupci se filtriraju prema sektoru, veličini, regiji i investicijskoj tezi.',
  },
  {
    icon: FileText,
    title: 'Blind teaser i dokumentacija',
    desc: 'Profesionalno pozicioniranje tvrtke bez otkrivanja osjetljivih podataka.',
  },
  {
    icon: Lock,
    title: 'Sigurna transakcijska soba',
    desc: 'Financije, ugovori i pitanja vode se kroz kontroliran, NDA-zaštićen proces.',
  },
  {
    icon: Handshake,
    title: 'Savjetnička podrška',
    desc: 'Struktura, pregovori i zatvaranje transakcije uz ljudsku podršku, ne samo softver.',
  },
]

const comparisons = [
  { feature: 'Anonimni nastup na tržištu', heritance: true, traditional: false },
  { feature: 'Brza indikativna procjena', heritance: true, traditional: false },
  { feature: 'Digitalni NDA i data room', heritance: true, traditional: false },
  { feature: 'Uparivanje kupaca prema kriterijima', heritance: true, traditional: false },
  { feature: 'Savjetnik kroz pregovore', heritance: true, traditional: true },
  { feature: 'Pregled pipelinea u stvarnom vremenu', heritance: true, traditional: false },
]

export default function HomePage() {
  return (
    <>
      <section className="relative min-h-[92svh] flex items-center overflow-hidden pt-28 pb-20 bg-navy-950">
        <div className="absolute inset-0">
          <Image
            src="/images/hero_croatian_owner.png"
            alt="Vlasnik male hrvatske tvrtke u radionici"
            fill
            priority
            className="object-cover object-center lg:object-[62%_50%]"
            sizes="100vw"
            quality={92}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/92 to-navy-950/20" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy-950 to-transparent" />
        </div>

        <div className="section-shell relative z-10">
          <motion.div
            initial={false}
            animate="show"
            transition={{ staggerChildren: 0.1 }}
            className="max-w-3xl"
          >
            <motion.div variants={fadeIn} className="mb-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
                Za vlasnike koji žele miran izlaz
              </span>
            </motion.div>

            <motion.h1 variants={fadeIn} className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold text-white leading-[1.06] mb-6 tracking-tight">
              Diskretna prodaja tvrtke, bez gubitka kontrole.
            </motion.h1>

            <motion.p variants={fadeIn} className="text-lg lg:text-xl text-navy-100 mb-9 max-w-2xl leading-relaxed font-sans">
              Heritance pomaže hrvatskim vlasnicima procijeniti vrijednost poslovanja, pripremiti transakciju i povezati se s provjerenim kupcima pod punom povjerljivošću.
            </motion.p>

            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 mb-9">
              <Link
                href="/valuate"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg gradient-gold text-navy-950 font-bold text-base shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
              >
                Procijenite vrijednost
                <TrendingUp className="w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border border-white/20 bg-white/[0.08] text-white font-bold text-base backdrop-blur-md transition-all hover:bg-white/[0.14]"
              >
                Povjerljiv razgovor
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>

            <motion.div variants={fadeIn} className="flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-wider text-white/85">
              {['Anonimni teaser', 'NDA pristup', 'Savjetnik uz transakciju'].map((item) => (
                <span key={item} className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-navy-950/35 px-3 py-2 backdrop-blur-sm">
                  <CheckCircle2 className="w-3.5 h-3.5 text-gold-400" />
                  {item}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <CroatiaDealNetwork />
      <DealMarquee />

      <section className="py-24 quiet-band">
        <div className="section-shell">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <p className="eyebrow mb-4">Tri publike, jedan povjerljiv proces</p>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-navy-950 mb-4 tracking-tight">
              Platforma za trenutke kada posao postaje osoban.
            </h2>
            <p className="text-lg text-muted-foreground font-sans">
              Kupoprodaja tvrtke traži diskreciju, jasne brojke i dobar redoslijed poteza.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {personas.map((persona) => {
              const Icon = persona.icon
              return (
                <Link key={persona.title} href={persona.href} className="premium-card p-7 group transition-all hover:-translate-y-1 hover:shadow-elevated">
                  <div className="w-12 h-12 rounded-lg gradient-accent flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-gold-400" />
                  </div>
                  <h3 className="text-xl font-bold text-navy-950 mb-3">{persona.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed font-sans mb-6">{persona.desc}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-bold text-gold-700 group-hover:gap-3 transition-all">
                    {persona.cta}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-24 bg-navy-950">
        <div className="section-shell">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-wider text-gold-400 mb-4">Transakcije bez improvizacije</p>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4 tracking-tight">
              Sve što treba za ozbiljan, ali tih izlazak na tržište.
            </h2>
            <p className="text-lg text-navy-300 font-sans">
              Kombiniramo digitalne alate s brokerskim iskustvom, tako da vlasnik vidi sljedeći korak prije nego ga tržište vidi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <div key={feature.title} className="premium-panel p-6 transition-all hover:border-gold-500/30 hover:bg-white/[0.08]">
                  <div className="w-11 h-11 rounded-lg bg-gold-400/12 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-gold-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-navy-300 font-sans">{feature.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-28 bg-navy-950 border-t border-white/10">
        <div className="section-shell max-w-5xl">
          <div className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-wider text-gold-400 mb-4">Proces</p>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-5 tracking-tight">
              Od prve procjene do prijenosa vlasništva.
            </h2>
            <p className="text-lg text-navy-300 font-sans max-w-2xl mx-auto">
              Osam koraka koji smanjuju rizik, štite povjerljivost i daju pregovorima profesionalnu strukturu.
            </p>
          </div>
          <ProcessTimeline />
          <div className="text-center mt-14">
            <Link
              href="/sell"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg gradient-gold text-navy-950 font-bold shadow-lg transition-all hover:-translate-y-0.5"
            >
              Pogledajte proces prodaje
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 bg-navy-950 border-t border-white/10">
        <div className="section-shell">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-wider text-gold-400 mb-4">Povjerenje</p>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-5 tracking-tight">
              Osjećaj kontrole u procesu koji je rijetko lagan.
            </h2>
            <p className="text-lg text-navy-300 font-sans max-w-2xl mx-auto">
              Iskustva vlasnika, kupaca i savjetnika koji su trebali jasan, tih i profesionalan put.
            </p>
          </div>
          <TestimonialCarousel />
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="eyebrow mb-4">Heritance nasuprot klasičnom pristupu</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-navy-950 mb-4 tracking-tight">
              Manje izlaganja, više strukture.
            </h2>
          </div>

          <div className="premium-card overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-navy-50">
                  <th className="text-left py-4 px-6 text-sm font-bold text-navy-700 font-sans">Mogućnost</th>
                  <th className="text-center py-4 px-6 text-sm font-bold text-gold-700 font-sans">Heritance</th>
                  <th className="text-center py-4 px-6 text-sm font-bold text-navy-400 font-sans">Klasično</th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((item, index) => (
                  <tr key={item.feature} className={index % 2 === 0 ? 'bg-white' : 'bg-navy-50/45'}>
                    <td className="py-4 px-6 text-sm text-navy-700 font-semibold font-sans">{item.feature}</td>
                    <td className="text-center py-4 px-6">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mx-auto" />
                    </td>
                    <td className="text-center py-4 px-6">
                      {item.traditional ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600 mx-auto" />
                      ) : (
                        <span className="text-navy-300">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-24 gradient-hero">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-gold-400 mb-4">Prvi korak može ostati potpuno privatan</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 tracking-tight">
            Saznajte gdje stojite prije nego išta najavite.
          </h2>
          <p className="text-lg text-navy-200 mb-10 max-w-2xl mx-auto font-sans">
            Procjena je indikativna, povjerljiva i dovoljno jasna da znate vrijedi li otvoriti razgovor.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/valuate"
              className="inline-flex items-center justify-center gap-2 px-9 py-4 rounded-lg gradient-gold text-navy-950 font-bold shadow-lg transition-all hover:-translate-y-0.5"
            >
              Pokrenite procjenu
              <TrendingUp className="w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-9 py-4 rounded-lg border border-white/20 text-white font-bold hover:bg-white/10 transition-all"
            >
              Dogovorite poziv
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
