import { Navigate, Link, useParams } from 'react-router-dom'
import { Check, ShieldCheck, Sparkles, Zap } from 'lucide-react'
import { PublicHeader } from '../components/PublicHeader'
import { PublicFooter } from '../components/PublicFooter'
import { allCards } from '../data/cards'

const strip = [
  { icon: ShieldCheck, title: 'Bank-grade security', text: 'Every transaction protected end to end.' },
  { icon: Zap, title: 'Instant issuance', text: 'Get your digital card the moment you apply.' },
  { icon: Sparkles, title: 'No hidden charges', text: 'Every fee listed upfront, always.' },
]

export default function CardDetail() {
  const { slug } = useParams()
  const card = allCards.find((c) => c.slug === slug)

  if (!card) return <Navigate to="/cards" replace />

  const Icon = card.icon

  return (
    <div className="min-h-screen bg-white">
      <PublicHeader />

      <section className="bg-gradient-to-br from-maroon-50 via-white to-maroon-50">
        <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-sm font-semibold text-maroon-700">{card.name}</p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight text-slate-900">{card.headline}</h1>
            <p className="mt-4 text-slate-600 max-w-md">{card.bestFor}</p>
            <Link
              to="/signup"
              className="mt-7 inline-flex items-center rounded-full bg-maroon-800 px-6 py-3 text-sm font-semibold text-white hover:bg-maroon-700 transition-colors"
            >
              Apply now
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {card.perks.map((perk) => (
              <div key={perk.label} className={`${perk.tone} rounded-xl border-2 border-maroon-400 p-5 text-white`}>
                <p className="text-lg font-bold">{perk.label}</p>
                <p className="mt-1 text-xs text-white/75">{perk.sublabel}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-start">
        <div className="relative rounded-2xl border-2 border-maroon-400 overflow-hidden shadow-xl aspect-[1.586/1]">
          <img src={card.image} alt="" className="absolute inset-0 size-full object-cover" />
          <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient}`} />
          <div className="relative p-6 h-full flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="w-10 h-7 rounded-md bg-gradient-to-br from-gold-400 to-gold-500" />
              <Icon className="size-7 text-white/80" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-white text-lg font-semibold">{card.name}</p>
              <p className="mt-3 text-white/50 text-sm tracking-widest">•••• •••• •••• 8842</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900">What you get</h2>
          <p className="mt-2 text-sm text-slate-600">
            <span className="font-medium text-slate-900">Annual fee: </span>
            {card.annualFee}
          </p>
          <ul className="mt-5 space-y-3">
            {card.benefits.map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-sm text-slate-700">
                <Check className="size-4 text-maroon-700 shrink-0 mt-0.5" strokeWidth={2} />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-16 grid sm:grid-cols-3 gap-8">
          {strip.map(({ icon: StripIcon, title, text }) => (
            <div key={title} className="text-center">
              <div className="mx-auto size-12 rounded-full bg-maroon-100 text-maroon-800 flex items-center justify-center">
                <StripIcon className="size-5.5" strokeWidth={1.75} />
              </div>
              <h3 className="mt-4 text-sm font-semibold text-slate-900">{title}</h3>
              <p className="mt-1.5 text-sm text-slate-500">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-maroon-800 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl font-semibold">Ready to apply for the {card.name}?</h2>
          <p className="mt-3 text-white/70">Open your Yash Bank account first — the card follows automatically.</p>
          <Link
            to="/signup"
            className="mt-7 inline-flex items-center rounded-full bg-white text-maroon-900 px-6 py-3 text-sm font-semibold hover:bg-maroon-50 transition-colors"
          >
            Apply now
          </Link>
        </div>
      </section>

      <PublicFooter />
    </div>
  )
}
