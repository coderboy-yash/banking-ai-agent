import type { Account, Transaction, User } from '../types'

export const DEMO_EMAIL = 'demo@yashbank.com'
export const DEMO_PASSWORD = 'password123'

export const seedUser: User = {
  id: 'u1',
  name: 'Jordan Lee',
  email: DEMO_EMAIL,
  memberSince: '2022-03-01',
}

export const seedAccounts: Account[] = [
  { id: 'a1', type: 'checking', accountNumber: '4821', balance: 4382.17, currency: 'USD' },
  { id: 'a2', type: 'savings', accountNumber: '7734', balance: 12905.5, currency: 'USD' },
]

const d = (daysAgo: number) => {
  const date = new Date('2026-08-16')
  date.setDate(date.getDate() - daysAgo)
  return date.toISOString().slice(0, 10)
}

export const seedTransactions: Transaction[] = [
  { id: 't1', accountId: 'a1', date: d(1), description: 'Whole Foods Market', category: 'groceries', amount: 86.42, direction: 'debit' },
  { id: 't2', accountId: 'a1', date: d(2), description: 'Netflix', category: 'subscription', amount: 15.99, direction: 'debit' },
  { id: 't3', accountId: 'a1', date: d(3), description: 'Chipotle', category: 'dining', amount: 13.25, direction: 'debit' },
  { id: 't4', accountId: 'a2', date: d(3), description: 'Transfer from Checking', category: 'transfer', amount: 500, direction: 'credit' },
  { id: 't5', accountId: 'a1', date: d(3), description: 'Transfer to Savings', category: 'transfer', amount: 500, direction: 'debit' },
  { id: 't6', accountId: 'a1', date: d(5), description: 'PG&E Electric', category: 'utilities', amount: 92.3, direction: 'debit' },
  { id: 't7', accountId: 'a1', date: d(6), description: 'Starbucks', category: 'dining', amount: 6.75, direction: 'debit' },
  { id: 't8', accountId: 'a1', date: d(7), description: 'Acme Corp Payroll', category: 'income', amount: 3200, direction: 'credit' },
  { id: 't9', accountId: 'a1', date: d(8), description: 'Rent Payment - Skyline Apartments', category: 'rent', amount: 1450, direction: 'debit' },
  { id: 't10', accountId: 'a1', date: d(9), description: "Trader Joe's", category: 'groceries', amount: 54.1, direction: 'debit' },
  { id: 't11', accountId: 'a1', date: d(10), description: 'Amazon.com', category: 'other', amount: 67.89, direction: 'debit' },
  { id: 't12', accountId: 'a1', date: d(11), description: 'Shell Gas Station', category: 'other', amount: 48.0, direction: 'debit' },
  { id: 't13', accountId: 'a1', date: d(12), description: 'Spotify', category: 'subscription', amount: 10.99, direction: 'debit' },
  { id: 't14', accountId: 'a2', date: d(14), description: 'Interest Payment', category: 'income', amount: 12.4, direction: 'credit' },
  { id: 't15', accountId: 'a1', date: d(15), description: 'Comcast Internet', category: 'utilities', amount: 79.99, direction: 'debit' },
  { id: 't16', accountId: 'a1', date: d(16), description: 'Target', category: 'groceries', amount: 122.34, direction: 'debit' },
  { id: 't17', accountId: 'a1', date: d(17), description: 'Uber', category: 'other', amount: 22.1, direction: 'debit' },
  { id: 't18', accountId: 'a1', date: d(18), description: 'Gold\'s Gym Membership', category: 'subscription', amount: 45.0, direction: 'debit' },
  { id: 't19', accountId: 'a1', date: d(21), description: 'Acme Corp Payroll', category: 'income', amount: 3200, direction: 'credit' },
  { id: 't20', accountId: 'a1', date: d(23), description: "Trader Joe's", category: 'groceries', amount: 61.2, direction: 'debit' },
]
