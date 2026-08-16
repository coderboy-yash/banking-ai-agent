export type EmploymentType = 'salaried' | 'self-employed' | 'student' | 'other'

export interface User {
  id: string
  name: string
  email: string
  phone: string
  dateOfBirth: string
  panNumber: string
  annualIncome: number
  employmentType: EmploymentType
  memberSince: string
}

export interface SignupInput {
  name: string
  email: string
  password: string
  phone: string
  dateOfBirth: string
  panNumber: string
  annualIncome: number
  employmentType: EmploymentType
}

export type AccountType = 'checking' | 'savings' | 'rd' | 'fd'

export interface Account {
  id: string
  type: AccountType
  accountNumber: string
  balance: number
  currency: string
}

export type TransactionCategory =
  | 'groceries'
  | 'dining'
  | 'rent'
  | 'utilities'
  | 'subscription'
  | 'income'
  | 'transfer'
  | 'other'

export interface Transaction {
  id: string
  accountId: string
  date: string
  description: string
  category: TransactionCategory
  amount: number
  direction: 'credit' | 'debit'
}

export interface AuthResult {
  token: string
  user: User
}

export type LoanType = 'car' | 'home'
export type LoanStatus = 'approved' | 'pending'

export interface Loan {
  id: string
  type: LoanType
  status: LoanStatus
  principal: number
  amountPaid: number
  amountDue: number
  interestRate: string
  tenureMonths: number
  appliedDate: string
  approvedDate?: string
}

export type IssuedCardType = 'debit' | 'credit'

export interface CardActivity {
  id: string
  date: string
  description: string
  amount: number
}

export interface IssuedCard {
  id: string
  type: IssuedCardType
  name: string
  last4: string
  creditLimit?: number
  outstanding?: number
  recentActivity: CardActivity[]
}
