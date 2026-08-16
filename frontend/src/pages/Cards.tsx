import type { LucideIcon } from 'lucide-react'
import { Check, CreditCard, Landmark, Plane, Wallet } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PublicHeader } from '../components/PublicHeader'
import { PublicFooter } from '../components/PublicFooter'
import { PageBanner } from '../components/PageBanner'
import { images } from '../lib/images'

interface CardOffer {
  icon: LucideIcon
  name: string
  gradient: string
  annualFee: string
  bestFor: string
  benefits: string[]
}

const debitCards: CardOffer[] = [
  {
    icon: Wallet,
    name: 'Classic Debit Card',
    gradient: 'from-slate-700 to-slate-950',
    annualFee: 'Free for the first year, ₹150 thereafter',
    bestFor: 'Everyday spending and ATM access',
    benefits: [
      'Daily ATM withdrawal limit of ₹25,000',
      'Daily POS/online spend limit of ₹1,00,000',
      'Accepted at all Yash Bank and partner ATMs nationwide',
      'Zero-liability protection on reported fraud',
    ],
  },
  {
    icon: Landmark,
    name: 'Platinum Debit Card',
    gradient: 'from-maroon-800 to-black',
    annualFee: '₹750 per year',
    bestFor: 'Higher limits and travel perks',
    benefits: [
      'Daily ATM withdrawal limit of ₹1,00,000',
      'Complimentary airport lounge access, 2 visits per quarter',
      'Purchase protection insurance up to ₹1,00,000',
      'Concierge services for travel and dining bookings',
    ],
  },
]

const creditCards: CardOffer[] = [
  {
    icon: CreditCard,
    name: 'Rewards Credit Card',
    gradient: 'from-maroon-700 to-maroon-950',
    annualFee: '₹500, waived on annual spend above ₹1,00,000',
    bestFor: 'Everyday spends, cashback and reward points',
    benefits: [
      '2 reward points for every ₹100 spent',
      '5% cashback on groceries, dining and utility bills',
      'Redeem points for statement credit, vouchers or products',
      'Zero fraud liability on lost or stolen cards',
    ],
  },
  {
    icon: Plane,
    name: 'Travel Credit Card',
    gradient: 'from-gold-500 to-maroon-950',
    annualFee: '₹2,500, waived on annual spend above ₹3,00,000',
    bestFor: 'Frequent flyers and international spends',
    benefits: [
      'Airline miles on every spend, accelerated on travel bookings',
      'Unlimited complimentary airport lounge access',
      'Zero forex markup on international transactions',
      'Complimentary travel insurance up to ₹50,00,000',
    ],
  },
]

function CardRow({ card }: { card: CardOffer }) {
  const Icon = card.icon
  return (
    <div className="rounded-xl border-2 border-maroon-500 bg-white overflow-hidden">
      <div className="p-6 pb-0">
        <div className={`rounded-2xl border-2 border-maroon-500 bg-gradient-to-br ${card.gradient} p-5 shadow-xl aspect-[1.586/1] flex flex-col justify-between`}>
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
      <div className="p-6">
        <h3 className="text-lg font-semibold text-slate-900">{card.name}</h3>
        <p className="mt-1 text-sm text-slate-500">{card.bestFor}</p>
        <p className="mt-2 text-sm text-slate-700">
          <span className="font-medium">Annual fee: </span>
          {card.annualFee}
        </p>
        <ul className="mt-4 space-y-2">
          {card.benefits.map((b) => (
            <li key={b} className="flex items-start gap-2 text-sm text-slate-700">
              <Check className="size-4 text-maroon-700 shrink-0 mt-0.5" strokeWidth={2} />
              {b}
            </li>
          ))}
        </ul>
        <Link
          to="/signup"
          className="mt-5 inline-flex items-center rounded-full bg-maroon-800 px-5 py-2 text-sm font-semibold text-white hover:bg-maroon-700 transition-colors"
        >
          Apply now
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
            <CardRow key={c.name} card={c} />
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-semibold text-slate-900">Credit Cards</h2>
        <div className="mt-6 grid sm:grid-cols-2 gap-6">
          {creditCards.map((c) => (
            <CardRow key={c.name} card={c} />
          ))}
        </div>
      </section>

      <PublicFooter />
    </div>
  )
}
