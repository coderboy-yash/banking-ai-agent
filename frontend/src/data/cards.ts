import type { LucideIcon } from 'lucide-react'
import { CreditCard, Landmark, Plane, Wallet } from 'lucide-react'
import { images } from '../lib/images'

export interface CardPerk {
  label: string
  sublabel: string
  tone: string
}

export interface CardOffer {
  slug: string
  icon: LucideIcon
  name: string
  image: string
  gradient: string
  annualFee: string
  bestFor: string
  headline: string
  benefits: string[]
  perks: CardPerk[]
}

export const debitCards: CardOffer[] = [
  {
    slug: 'classic-debit',
    icon: Wallet,
    name: 'Classic Debit Card',
    image: images.textureWave,
    gradient: 'from-slate-900/90 to-slate-950/90',
    annualFee: 'Free for the first year, ₹150 thereafter',
    bestFor: 'Everyday spending and ATM access',
    headline: 'Everyday banking, zero fuss',
    benefits: [
      'Daily ATM withdrawal limit of ₹25,000',
      'Daily POS/online spend limit of ₹1,00,000',
      'Accepted at all Yash Bank and partner ATMs nationwide',
      'Zero-liability protection on reported fraud',
    ],
    perks: [
      { label: 'Zero Fee', sublabel: 'Free in year one', tone: 'bg-maroon-700' },
      { label: 'Instant Issue', sublabel: 'Digital card in minutes', tone: 'bg-slate-800' },
      { label: '5% Off', sublabel: 'Dining & entertainment', tone: 'bg-maroon-800' },
      { label: '24/7 Support', sublabel: 'Dedicated helpline', tone: 'bg-slate-700' },
    ],
  },
  {
    slug: 'platinum-debit',
    icon: Landmark,
    name: 'Platinum Debit Card',
    image: images.textureInk,
    gradient: 'from-maroon-900/90 to-black/90',
    annualFee: '₹750 per year',
    bestFor: 'Higher limits and travel perks',
    headline: 'Higher limits, more perks',
    benefits: [
      'Daily ATM withdrawal limit of ₹1,00,000',
      'Complimentary airport lounge access, 2 visits per quarter',
      'Purchase protection insurance up to ₹1,00,000',
      'Concierge services for travel and dining bookings',
    ],
    perks: [
      { label: 'Lounge Access', sublabel: '2 visits every quarter', tone: 'bg-maroon-700' },
      { label: '₹1L Cover', sublabel: 'Purchase protection', tone: 'bg-black' },
      { label: 'Concierge', sublabel: 'Travel & dining bookings', tone: 'bg-maroon-800' },
      { label: 'Zero Liability', sublabel: 'On reported fraud', tone: 'bg-slate-800' },
    ],
  },
]

export const creditCards: CardOffer[] = [
  {
    slug: 'rewards-credit',
    icon: CreditCard,
    name: 'Rewards Credit Card',
    image: images.textureGold,
    gradient: 'from-maroon-800/90 to-maroon-950/90',
    annualFee: '₹500, waived on annual spend above ₹1,00,000',
    bestFor: 'Everyday spends, cashback and reward points',
    headline: 'Earn more on everything you spend',
    benefits: [
      '2 reward points for every ₹100 spent',
      '5% cashback on groceries, dining and utility bills',
      'Redeem points for statement credit, vouchers or products',
      'Zero fraud liability on lost or stolen cards',
    ],
    perks: [
      { label: '2X Points', sublabel: 'On every ₹100 spent', tone: 'bg-maroon-700' },
      { label: '5% Cashback', sublabel: 'Groceries, dining, utilities', tone: 'bg-gold-500' },
      { label: 'Welcome Bonus', sublabel: '1,000 points on first spend', tone: 'bg-maroon-800' },
      { label: 'No-Cost EMI', sublabel: 'On partner brands', tone: 'bg-slate-800' },
    ],
  },
  {
    slug: 'travel-credit',
    icon: Plane,
    name: 'Travel Credit Card',
    image: images.textureNightEarth,
    gradient: 'from-gold-500/80 to-maroon-950/90',
    annualFee: '₹2,500, waived on annual spend above ₹3,00,000',
    bestFor: 'Frequent flyers and international spends',
    headline: 'Built for the way you travel',
    benefits: [
      'Airline miles on every spend, accelerated on travel bookings',
      'Unlimited complimentary airport lounge access',
      'Zero forex markup on international transactions',
      'Complimentary travel insurance up to ₹50,00,000',
    ],
    perks: [
      { label: 'Unlimited Lounge', sublabel: 'Access worldwide', tone: 'bg-maroon-700' },
      { label: 'Zero Forex', sublabel: 'No markup abroad', tone: 'bg-gold-500' },
      { label: '₹50L Cover', sublabel: 'Complimentary travel insurance', tone: 'bg-black' },
      { label: 'Airline Miles', sublabel: 'Accelerated on bookings', tone: 'bg-maroon-800' },
    ],
  },
]

export const allCards = [...debitCards, ...creditCards]
