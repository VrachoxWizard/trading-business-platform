import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Building2,
  CheckCircle2,
  FileSignature,
  FileText,
  Handshake,
  LockKeyhole,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
} from 'lucide-react'
import CroatiaDealNetwork from '@/components/CroatiaDealNetwork'
import DealMarquee from '@/components/DealMarquee'
import ProcessTimeline from '@/components/ProcessTimeline'
import TestimonialCarousel from '@/components/TestimonialCarousel'
import Hero3DScene from '@/components/ui/Hero3DScene'
import { FadeInStaggerContainer, FadeInItem } from '@/components/ui/FadeInStagger'

const trustMetrics = [
  { value: '€850K-€12M', label: 'raspon aktivnih prilika' },
  { value: '48h', label: 'do indikativne procjene' },
  { value: 'NDA', label: 'prije osjetljivih podataka' },
]

const personaCards = [
  {
    icon: Building2,
    title: 'Vlasnici tvrtki',
    desc: 'Testirajte vrijednost, pripremite anoniman teaser i razgovarajte samo s kvalificiranim kupcima.',
    cta: 'Pokrenite procjenu',
    href: '/valuate',
  },
  {
    icon: Search,
    title: 'Kupci i investitori',
    desc: 'Pregledajte strukturirane prilike s jasnim financijama, kriterijima pristupa i kontroliranim NDA tokom.',
    cta: 'Istražite tržište',
    href: '/listings',
  },
  {
    icon: Handshake,
    title: 'Savjetnici i fondovi',
    desc: 'Koristite Heritance kao pouzdan kanal za deal sourcing, co-brokerage i portfeljne izlaze.',
    cta: 'Razgovarajte s nama',
    href: '/contact',
  },
]

const platformPillars = [
  {
    icon: Sparkles,
    title: 'AI procjena vrijednosti',
    desc: 'Indikativni raspon temeljen na prihodu, EBITDA-i, sektoru, kvaliteti prihoda i riziku prijenosa.',
  },
  {
    icon: FileText,
    title: 'AI teaser bez otkrivanja identiteta',
    desc: 'Profesionalan sažetak prilike koji štiti vlasnika, zaposlenike i kupce dok interes ne postane ozbiljan.',
  },
  {
    icon: FileSignature,
    title: 'Siguran NDA tok',
    desc: 'Kupac pristupa osjetljivim podacima tek nakon provjere interesa, digitalnog NDA-a i odobrenja vlasnika.',
  },
  {
    icon: Users,
    title: 'Pametno uparivanje kupaca',
    desc: 'Filtriranje prema sektoru, geografiji, veličini transakcije, investicijskoj tezi i operativnoj sposobnosti.',
  },
  {
    icon: BarChart3,
    title: 'Kontrolirani pipeline',
    desc: 'Jasan pregled interesa, statusa NDA-a, upita i sljedećih koraka bez kaotičnih e-mail niti.',
  },
  {
    icon: ShieldCheck,
    title: 'Povjerljivost kao temelj',
    desc: 'Proces je građen za vlasnike koji žele opcije, ali ne žele javni signal da je tvrtka na prodaju.',
  },
]

const proofPoints = [
  'Anonimni profili prije NDA-a',
  'Kvalificirani kupci i investitori',
  'Strukturirana pitanja i odgovori',
  'Savjetnička podrška uz digitalni proces',
]

const comparisonRows = [
  { feature: 'Anonimni izlazak na tržište', heritance: true, traditional: false },
  { feature: 'AI indikativna procjena', heritance: true, traditional: false },
  { feature: 'Digitalni NDA i kontrolirani pristup', heritance: true, traditional: false },
  { feature: 'Uparivanje kupaca prema kriterijima', heritance: true, traditional: false },
  { feature: 'Savjetnik kroz pregovore', heritance: true, traditional: true },
  { feature: 'Pipeline vidljiv u stvarnom vremenu', heritance: true, traditional: false },
]

export default function HomePage() {
  return (
    <>
      <section className="relative flex min-h-[88svh] items-center overflow-hidden bg-navy-950 pb-16 pt-28 text-white sm:pb-20 lg:pt-32">
        <div className="absolute inset-0">
          <Hero3DScene />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy-950 via-navy-950/80 to-transparent pointer-events-none" />
        </div>

        <FadeInStaggerContainer delay={0.2} className="section-shell relative z-10 grid items-center gap-12 lg:grid-cols-[1.02fr_0.78fr] pointer-events-none">
          <div className="max-w-3xl pointer-events-auto">
            <FadeInItem>
              <span className="mb-6 inline-flex max-w-full flex-wrap items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[0.68rem] font-bold uppercase leading-tight tracking-wider text-white backdrop-blur-md sm:text-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-trust-400" />
                Povjerljivo tržište za akvizicije u Hrvatskoj
              </span>
            </FadeInItem>

            <FadeInItem>
              <h1 className="mb-6 max-w-4xl text-[2.2rem] leading-[1.04] text-white sm:text-[3.5rem] lg:text-[4.75rem]">
                <span className="block">Kupnja i prodaja</span>
                <span className="block">tvrtki, bez gubitka</span>
                <span className="block">povjerenja.</span>
              </h1>
            </FadeInItem>

            <FadeInItem>
              <p className="mb-9 max-w-2xl text-base leading-relaxed text-navy-100 sm:text-lg lg:text-xl drop-shadow-md">
                Heritance povezuje vlasnike, kupce i savjetnike kroz siguran M&A proces:
                AI procjenu vrijednosti, anoniman teaser, NDA pristup i provjereno uparivanje.
              </p>
            </FadeInItem>

            <FadeInItem className="mb-9 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/valuate"
                className="cta-primary cta-primary-gold min-h-12 w-full px-8 text-base hover:-translate-y-0.5 hover:shadow-xl sm:w-auto"
              >
                Procijenite tvrtku
                <TrendingUp className="h-5 w-5" />
              </Link>
              <Link
                href="/listings"
                className="cta-primary cta-ghost-hero min-h-12 w-full px-8 text-base sm:w-auto"
              >
                Pregledajte prilike
                <ArrowRight className="h-5 w-5" />
              </Link>
            </FadeInItem>

            <FadeInItem className="grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
              {trustMetrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-xl border border-white/10 bg-white/[0.08] px-4 py-3 backdrop-blur-md"
                >
                  <p className="metric-numeral text-xl font-bold text-white">{metric.value}</p>
                  <p className="text-xs font-semibold uppercase tracking-wider text-navy-300">
                    {metric.label}
                  </p>
                </div>
              ))}
            </FadeInItem>
          </div>

          <FadeInItem className="pointer-events-auto">
            <aside className="premium-panel hidden p-6 lg:block">
              <div className="mb-6 flex items-center justify-between gap-4 border-b border-white/10 pb-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-gold-400">
                    Deal room status
                  </p>
                  <h2 className="mt-2 text-2xl font-bold text-white">Kontrolirani pristup</h2>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-trust-400/15 text-trust-300">
                  <LockKeyhole className="h-6 w-6" />
                </div>
              </div>

              <div className="space-y-4">
                {[
                  ['AI valuation', 'Raspon spreman za vlasnika', 'Dovršeno'],
                  ['Blind teaser', 'Identitet skriven do odobrenja', 'U izradi'],
                  ['Buyer review', 'Provjera teze i kapaciteta', 'Sljedeće'],
                ].map(([title, desc, status]) => (
                  <div
                    key={title}
                    className="rounded-xl border border-white/10 bg-white/[0.06] p-4"
                  >
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <p className="font-bold text-white">{title}</p>
                      <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-bold text-gold-300">
                        {status}
                      </span>
                    </div>
                    <p className="text-sm text-navy-300">{desc}</p>
                  </div>
                ))}
              </div>

              <Link
                href="/login"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-bold text-white transition-all hover:bg-white/[0.16]"
              >
                Prijavite se u platformu
                <ArrowRight className="h-4 w-4" />
              </Link>
            </aside>
          </FadeInItem>
        </FadeInStaggerContainer>
      </section>

      <section className="border-y border-navy-100 bg-white py-8">
        <div className="section-shell flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-sm font-bold uppercase tracking-wider text-navy-500">
            Građeno za transakcije gdje reputacija vrijedi koliko i cijena
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:min-w-[640px]">
            {proofPoints.map((point) => (
              <div key={point} className="flex items-center gap-2 text-sm font-semibold text-navy-700">
                <CheckCircle2 className="h-4 w-4 text-trust-600" />
                {point}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="quiet-band py-24">
        <div className="section-shell">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <p className="eyebrow mb-4">Jedna platforma, tri ključne uloge</p>
            <h2 className="mb-4 text-navy-950">
              Od prve procjene do ozbiljnog kupca, proces ostaje strukturiran.
            </h2>
            <p className="text-lg text-muted-foreground">
              Heritance smanjuje šum tržišta i uvodi jasan redoslijed informacija,
              pristupa i razgovora.
            </p>
          </div>

          <FadeInStaggerContainer className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {personaCards.map((persona) => {
              const Icon = persona.icon
              return (
                <FadeInItem key={persona.title}>
                  <Link
                    href={persona.href}
                    className="premium-card group p-7 card-interactive hover:shadow-elevated block h-full"
                  >
                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-finance-100 text-finance-700">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mb-3 text-xl font-bold text-navy-950">{persona.title}</h3>
                    <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                      {persona.desc}
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm font-bold text-finance-700 transition-all group-hover:gap-3">
                      {persona.cta}
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>
                </FadeInItem>
              )
            })}
          </FadeInStaggerContainer>
        </div>
      </section>

      <CroatiaDealNetwork />
      <DealMarquee />

      <section className="bg-white py-24">
        <div className="section-shell grid gap-12 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow mb-4">AI + sigurnost + ljudski proces</p>
            <h2 className="mb-5 text-navy-950">Alati koji štite povjerljivost, ali ubrzavaju odluke.</h2>
            <p className="mb-8 text-lg text-navy-600">
              Platforma je dizajnirana za male i srednje transakcije u kojima vlasnik
              treba kontrolu, kupac treba jasne brojke, a obje strane trebaju povjerenje.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                href="/sell"
                className="cta-primary cta-primary-ink min-h-12 px-7 text-base hover:-translate-y-0.5"
              >
                Pripremite prodaju
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/buy"
                className="cta-secondary min-h-12 px-7 text-base text-navy-800 hover:-translate-y-0.5 hover:bg-finance-50"
              >
                Kupite tvrtku
                <Search className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <FadeInStaggerContainer className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {platformPillars.map((feature) => {
              const Icon = feature.icon
              return (
                <FadeInItem key={feature.title} className="premium-card p-6">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-trust-100 text-trust-700">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-navy-950">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-navy-600">{feature.desc}</p>
                </FadeInItem>
              )
            })}
          </FadeInStaggerContainer>
        </div>
      </section>

      <section id="how-it-works" className="border-t border-white/10 bg-navy-950 py-28">
        <div className="section-shell max-w-5xl">
          <div className="mb-16 text-center">
            <p className="mb-4 text-xs font-bold uppercase tracking-wider text-gold-400">
              Transakcijski proces
            </p>
            <h2 className="mb-5 text-white">Od prve procjene do prijenosa vlasništva.</h2>
            <p className="mx-auto max-w-2xl text-lg text-navy-300">
              Osam koraka koji smanjuju rizik, štite povjerljivost i daju pregovorima
              profesionalnu strukturu.
            </p>
          </div>
          <ProcessTimeline />
          <div className="mt-14 text-center">
            <Link
              href="/sell"
              className="cta-primary cta-primary-gold min-h-12 px-8 text-base hover:-translate-y-0.5"
            >
              Pogledajte proces prodaje
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-navy-950 py-24">
        <div className="section-shell">
          <div className="mb-14 text-center">
            <p className="mb-4 text-xs font-bold uppercase tracking-wider text-gold-400">
              Povjerenje
            </p>
            <h2 className="mb-5 text-white">Osjećaj kontrole u procesu koji je rijetko lagan.</h2>
            <p className="mx-auto max-w-2xl text-lg text-navy-300">
              Iskustva vlasnika, kupaca i savjetnika koji su trebali jasan, tih i profesionalan put.
            </p>
          </div>
          <TestimonialCarousel />
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="eyebrow mb-4">Heritance nasuprot klasičnom pristupu</p>
            <h2 className="mb-4 text-navy-950">Manje izlaganja, više strukture.</h2>
            <p className="mx-auto max-w-2xl text-navy-600">
              Klasični proces često počinje mrežom poznanstava. Heritance počinje kontrolom,
              provjerom i jasnim pravima pristupa.
            </p>
          </div>

          <div className="premium-card overflow-hidden">
            <table className="w-full">
              <caption className="sr-only">
                Usporedba Heritance i klasičnog pristupa kupoprodaji
              </caption>
              <thead>
                <tr className="bg-finance-50">
                  <th className="px-5 py-4 text-left text-sm font-bold text-navy-700 sm:px-6">
                    Mogućnost
                  </th>
                  <th className="px-4 py-4 text-center text-sm font-bold text-finance-700 sm:px-6">
                    Heritance
                  </th>
                  <th className="px-4 py-4 text-center text-sm font-bold text-navy-400 sm:px-6">
                    Klasično
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((item, index) => (
                  <tr key={item.feature} className={index % 2 === 0 ? 'bg-white' : 'bg-navy-50/70'}>
                    <td className="px-5 py-4 text-sm font-semibold text-navy-700 sm:px-6">
                      {item.feature}
                    </td>
                    <td className="px-4 py-4 text-center sm:px-6">
                      <BadgeCheck className="mx-auto h-5 w-5 text-trust-600" />
                    </td>
                    <td className="px-4 py-4 text-center sm:px-6">
                      {item.traditional ? (
                        <BadgeCheck className="mx-auto h-5 w-5 text-trust-600" />
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

      <section className="gradient-hero py-24">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <p className="mb-4 text-xs font-bold uppercase tracking-wider text-gold-400">
            Prvi korak može ostati potpuno privatan
          </p>
          <h2 className="mb-6 text-white">Saznajte gdje stojite prije nego išta najavite.</h2>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-navy-200">
            Procjena je indikativna, povjerljiva i dovoljno jasna da znate vrijedi li
            otvoriti razgovor s tržištem.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/valuate"
              className="cta-primary cta-primary-gold min-h-12 px-9 text-base hover:-translate-y-0.5"
            >
              Pokrenite procjenu
              <TrendingUp className="h-5 w-5" />
            </Link>
            <Link
              href="/contact"
              className="cta-primary cta-ghost-hero min-h-12 px-9 text-base"
            >
              Dogovorite razgovor
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
