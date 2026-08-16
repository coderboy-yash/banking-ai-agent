export interface User {
  id: string
  name: string
  email: string
  memberSince: string
}

export type AccountType = 'checking' | 'savings'

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
