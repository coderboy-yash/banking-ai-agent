import type { CardActivity, IssuedCard, Loan } from '../types'

// Demo data for the logged-in customer's loans and issued cards — presentational,
// not tied to a real backend table yet. Gives future agent features (loan status,
// spend patterns) real structured data to reason over.

const d = (daysAgo: number) => {
  const date = new Date('2026-08-16')
  date.setDate(date.getDate() - daysAgo)
  return date.toISOString().slice(0, 10)
}

export const loans: Loan[] = [
  {
    id: 'loan-car-1',
    type: 'car',
    status: 'approved',
    principal: 800000,
    amountPaid: 640000,
    amountDue: 160000,
    interestRate: '9.00% p.a.',
    tenureMonths: 60,
    appliedDate: '2023-06-01',
    approvedDate: '2023-06-15',
  },
  {
    id: 'loan-home-1',
    type: 'home',
    status: 'pending',
    principal: 6500000,
    amountPaid: 0,
    amountDue: 6500000,
    interestRate: '8.50% p.a.',
    tenureMonths: 240,
    appliedDate: d(12),
  },
]

const debitActivity: CardActivity[] = [
  { id: 'ca1', date: d(2), description: 'Swiggy', amount: 645 },
  { id: 'ca2', date: d(3), description: 'BigBasket', amount: 3420 },
  { id: 'ca3', date: d(10), description: 'Reliance Fresh', amount: 2150 },
  { id: 'ca4', date: d(18), description: 'DMart', amount: 4100 },
]

const creditActivity: CardActivity[] = [
  { id: 'ca5', date: d(6), description: 'IndiGo Flight Booking', amount: 8250 },
  { id: 'ca6', date: d(16), description: 'Taj Hotel', amount: 14200 },
  { id: 'ca7', date: d(27), description: 'Croma Electronics', amount: 18999 },
  { id: 'ca8', date: d(44), description: "PVR Cinemas", amount: 960 },
]

export const issuedCards: IssuedCard[] = [
  {
    id: 'card-debit-1',
    type: 'debit',
    name: 'Classic Debit Card',
    last4: '8842',
    recentActivity: debitActivity,
  },
  {
    id: 'card-credit-1',
    type: 'credit',
    name: 'Rewards Credit Card',
    last4: '5567',
    creditLimit: 500000,
    outstanding: 42500,
    recentActivity: creditActivity,
  },
]
