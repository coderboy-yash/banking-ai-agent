import type { Account, Transaction, User } from '../types'

export const DEMO_EMAIL = 'demo@yashbank.com'
export const DEMO_PASSWORD = 'password123'

export const seedUser: User = {
  id: 'u1',
  name: 'Jordan Lee',
  email: DEMO_EMAIL,
  phone: '9876543210',
  dateOfBirth: '1994-06-12',
  panNumber: 'ABCDE1234F',
  annualIncome: 4200000,
  employmentType: 'salaried',
  memberSince: '2022-03-01',
}

// Total across all accounts: ₹1,00,00,000 (1 crore) — an established, active customer.
export const seedAccounts: Account[] = [
  { id: 'a1', type: 'checking', accountNumber: '4821', balance: 850000, currency: 'INR' },
  { id: 'a2', type: 'savings', accountNumber: '7734', balance: 2200000, currency: 'INR' },
  { id: 'a3', type: 'rd', accountNumber: '3391', balance: 1500000, currency: 'INR' },
  { id: 'a4', type: 'fd', accountNumber: '6650', balance: 5450000, currency: 'INR' },
]

const d = (daysAgo: number) => {
  const date = new Date('2026-08-16')
  date.setDate(date.getDate() - daysAgo)
  return date.toISOString().slice(0, 10)
}

export const seedTransactions: Transaction[] = [
  // Checking (a1) — everyday activity
  { id: 't1', accountId: 'a1', date: d(1), description: 'Acme Corp Payroll', category: 'income', amount: 185000, direction: 'credit' },
  { id: 't2', accountId: 'a1', date: d(2), description: 'Swiggy', category: 'dining', amount: 645, direction: 'debit' },
  { id: 't3', accountId: 'a1', date: d(3), description: 'BigBasket', category: 'groceries', amount: 3420, direction: 'debit' },
  { id: 't4', accountId: 'a1', date: d(4), description: 'Netflix', category: 'subscription', amount: 649, direction: 'debit' },
  { id: 't5', accountId: 'a1', date: d(5), description: 'Uber', category: 'other', amount: 380, direction: 'debit' },
  { id: 't6', accountId: 'a1', date: d(6), description: 'Jio Fiber', category: 'utilities', amount: 1499, direction: 'debit' },
  { id: 't7', accountId: 'a1', date: d(7), description: 'Zomato', category: 'dining', amount: 890, direction: 'debit' },
  { id: 't8', accountId: 'a1', date: d(8), description: 'Amazon.in', category: 'other', amount: 5670, direction: 'debit' },
  { id: 't9', accountId: 'a1', date: d(9), description: 'Rent Payment - Prestige Apartments', category: 'rent', amount: 65000, direction: 'debit' },
  { id: 't10', accountId: 'a1', date: d(10), description: 'Reliance Fresh', category: 'groceries', amount: 2150, direction: 'debit' },
  { id: 't11', accountId: 'a1', date: d(11), description: 'Starbucks', category: 'dining', amount: 480, direction: 'debit' },
  { id: 't12', accountId: 'a1', date: d(12), description: 'Transfer to RD', category: 'transfer', amount: 25000, direction: 'debit' },
  { id: 't13', accountId: 'a1', date: d(13), description: 'Airtel Postpaid', category: 'utilities', amount: 899, direction: 'debit' },
  { id: 't14', accountId: 'a1', date: d(14), description: 'Flipkart', category: 'other', amount: 3200, direction: 'debit' },
  { id: 't15', accountId: 'a1', date: d(15), description: 'Spotify', category: 'subscription', amount: 199, direction: 'debit' },
  { id: 't16', accountId: 'a1', date: d(17), description: 'Ola Cabs', category: 'other', amount: 250, direction: 'debit' },
  { id: 't17', accountId: 'a1', date: d(18), description: 'DMart', category: 'groceries', amount: 4100, direction: 'debit' },
  { id: 't18', accountId: 'a1', date: d(19), description: 'Electricity Bill - BESCOM', category: 'utilities', amount: 2340, direction: 'debit' },
  { id: 't19', accountId: 'a1', date: d(20), description: 'Cult.fit Membership', category: 'subscription', amount: 1500, direction: 'debit' },
  { id: 't20', accountId: 'a1', date: d(22), description: "Domino's Pizza", category: 'dining', amount: 720, direction: 'debit' },
  { id: 't21', accountId: 'a1', date: d(24), description: 'Myntra', category: 'other', amount: 2800, direction: 'debit' },
  { id: 't22', accountId: 'a1', date: d(26), description: 'Water Bill - BWSSB', category: 'utilities', amount: 450, direction: 'debit' },
  { id: 't23', accountId: 'a1', date: d(28), description: 'Transfer to Savings', category: 'transfer', amount: 50000, direction: 'debit' },
  { id: 't24', accountId: 'a1', date: d(31), description: 'Acme Corp Payroll', category: 'income', amount: 185000, direction: 'credit' },
  { id: 't25', accountId: 'a1', date: d(33), description: 'Swiggy', category: 'dining', amount: 560, direction: 'debit' },
  { id: 't26', accountId: 'a1', date: d(35), description: 'BigBasket', category: 'groceries', amount: 2980, direction: 'debit' },
  { id: 't27', accountId: 'a1', date: d(38), description: 'Rent Payment - Prestige Apartments', category: 'rent', amount: 65000, direction: 'debit' },
  { id: 't28', accountId: 'a1', date: d(40), description: 'Netflix', category: 'subscription', amount: 649, direction: 'debit' },
  { id: 't29', accountId: 'a1', date: d(42), description: 'Amazon.in', category: 'other', amount: 6540, direction: 'debit' },
  { id: 't30', accountId: 'a1', date: d(45), description: 'Zomato', category: 'dining', amount: 610, direction: 'debit' },
  { id: 't31', accountId: 'a1', date: d(48), description: 'LIC Premium', category: 'other', amount: 12500, direction: 'debit' },
  { id: 't32', accountId: 'a1', date: d(50), description: 'Croma Electronics', category: 'other', amount: 18999, direction: 'debit' },
  { id: 't33', accountId: 'a1', date: d(53), description: 'Reliance Fresh', category: 'groceries', amount: 1890, direction: 'debit' },
  { id: 't34', accountId: 'a1', date: d(56), description: 'Jio Fiber', category: 'utilities', amount: 1499, direction: 'debit' },
  { id: 't35', accountId: 'a1', date: d(60), description: 'Transfer to FD', category: 'transfer', amount: 100000, direction: 'debit' },
  { id: 't36', accountId: 'a1', date: d(62), description: 'Acme Corp Payroll', category: 'income', amount: 185000, direction: 'credit' },
  { id: 't37', accountId: 'a1', date: d(65), description: 'Uber', category: 'other', amount: 410, direction: 'debit' },
  { id: 't38', accountId: 'a1', date: d(70), description: 'Apollo Pharmacy', category: 'other', amount: 950, direction: 'debit' },

  // Savings (a2)
  { id: 't39', accountId: 'a2', date: d(5), description: 'Interest Credit', category: 'income', amount: 4200, direction: 'credit' },
  { id: 't40', accountId: 'a2', date: d(15), description: 'NEFT - Freelance Payment', category: 'income', amount: 45000, direction: 'credit' },
  { id: 't41', accountId: 'a2', date: d(28), description: 'Transfer from Checking', category: 'transfer', amount: 50000, direction: 'credit' },
  { id: 't42', accountId: 'a2', date: d(35), description: 'Interest Credit', category: 'income', amount: 4100, direction: 'credit' },
  { id: 't43', accountId: 'a2', date: d(50), description: 'Mutual Fund SIP', category: 'other', amount: 20000, direction: 'debit' },
  { id: 't44', accountId: 'a2', date: d(65), description: 'Interest Credit', category: 'income', amount: 3950, direction: 'credit' },
  { id: 't45', accountId: 'a2', date: d(80), description: 'Interest Credit', category: 'income', amount: 3800, direction: 'credit' },
  { id: 't46', accountId: 'a2', date: d(90), description: 'Interest Credit', category: 'income', amount: 3700, direction: 'credit' },

  // Recurring Deposit (a3)
  { id: 't47', accountId: 'a3', date: d(12), description: 'Transfer from Checking', category: 'transfer', amount: 25000, direction: 'credit' },
  { id: 't48', accountId: 'a3', date: d(20), description: 'Interest Credit', category: 'income', amount: 6200, direction: 'credit' },
  { id: 't49', accountId: 'a3', date: d(42), description: 'Transfer from Checking', category: 'transfer', amount: 25000, direction: 'credit' },
  { id: 't50', accountId: 'a3', date: d(50), description: 'Interest Credit', category: 'income', amount: 6100, direction: 'credit' },
  { id: 't51', accountId: 'a3', date: d(72), description: 'Transfer from Checking', category: 'transfer', amount: 25000, direction: 'credit' },
  { id: 't52', accountId: 'a3', date: d(80), description: 'Interest Credit', category: 'income', amount: 6000, direction: 'credit' },

  // Fixed Deposit (a4)
  { id: 't53', accountId: 'a4', date: d(30), description: 'Interest Credit', category: 'income', amount: 28500, direction: 'credit' },
  { id: 't54', accountId: 'a4', date: d(60), description: 'Transfer from Checking', category: 'transfer', amount: 100000, direction: 'credit' },
  { id: 't55', accountId: 'a4', date: d(60), description: 'Interest Credit', category: 'income', amount: 28200, direction: 'credit' },
  { id: 't56', accountId: 'a4', date: d(90), description: 'Interest Credit', category: 'income', amount: 27900, direction: 'credit' },
]
