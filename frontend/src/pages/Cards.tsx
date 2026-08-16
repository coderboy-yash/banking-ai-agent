import { Link } from 'react-router-dom'
import { PublicHeader } from '../components/PublicHeader'
import { PublicFooter } from '../components/PublicFooter'
import { PageBanner } from '../components/PageBanner'
import { images } from '../lib/images'
import { debitCards, creditCards, type CardOffer } from '../data/cards'

function CardTile({ card }: { card: CardOffer }) {
  const Icon = card.icon
  return (
    <div className="rounded-xl border-2 border-maroon-400 bg-gradient-to-br from-maroon-800 to-maroon-950 overflow-hidden">
      <div className="p-6 pb-0">
        <div className="relative rounded-2xl border-2 border-maroon-400 overflow-hidden shadow-xl aspect-[1.586/1]">
          <img src={card.image} alt="" className="absolute inset-0 size-full object-cover" />
          <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient}`} />
          <div className="relative p-5 h-full flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="w-9 h-6.5 rounded-md bg-gradient-to-br from-gold-400 to-gold-500" />
              <Icon className="size-6 text-white/80" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-white font-semibold">{card.name}</p>
              <p className="mt-3 text-white/50 text-xs tracking-widest">•••• •••• •••• 8842</p>
            </div>
          </div>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-white">{card.name}</h3>
        <p className="mt-1 text-sm text-white/70">{card.bestFor}</p>
        <p className="mt-2 text-sm text-white/90">
          <span className="font-medium">Annual fee: </span>
          {card.annualFee}
        </p>
        <Link
          to={`/cards/${card.slug}`}
          className="mt-5 inline-flex items-center rounded-full bg-white px-5 py-2 text-sm font-semibold text-maroon-900 hover:bg-maroon-50 transition-colors"
        >
          View details
        </Link>
      </div>
    </div>
  )
}

export default function Cards() {
  return (
    <div className="min-h-screen bg-white">
      <PublicHeader />
      <PageBanner
        title="Cards for however you pay"
        subtitle="From everyday debit to travel-ready credit, choose the card that fits how you spend."
        image={images.atmKeypad}
      />

      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-semibold text-slate-900">Debit Cards</h2>
        <div className="mt-6 grid sm:grid-cols-2 gap-6">
          {debitCards.map((c) => (
            <CardTile key={c.slug} card={c} />
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-semibold text-slate-900">Credit Cards</h2>
        <div className="mt-6 grid sm:grid-cols-2 gap-6">
          {creditCards.map((c) => (
            <CardTile key={c.slug} card={c} />
          ))}
        </div>
      </section>

      <PublicFooter />
    </div>
  )
}
