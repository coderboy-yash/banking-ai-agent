import type { Transaction } from '../types'
import { apiClient, mockDelay, USE_MOCK } from './client'
import { mockDB } from '../mocks/store'

export async function getTransactions(userId: string, accountId?: string): Promise<Transaction[]> {
  if (USE_MOCK) {
    await mockDelay()
    const db = mockDB.get()
    const accountIds = db.accounts.filter((a) => a.ownerId === userId).map((a) => a.id)
    return db.transactions
      .filter((t) => accountIds.includes(t.accountId) && (!accountId || t.accountId === accountId))
      .sort((a, b) => b.date.localeCompare(a.date))
  }
  const res = await apiClient.get<Transaction[]>('/transactions', { params: { accountId } })
  return res.data
}

export interface TransferInput {
  fromAccountId: string
  toAccountNumber: string
  amount: number
  memo?: string
}

export async function transfer(userId: string, input: TransferInput): Promise<void> {
  if (USE_MOCK) {
    await mockDelay()
    const db = mockDB.get()
    const from = db.accounts.find((a) => a.id === input.fromAccountId && a.ownerId === userId)
    if (!from) throw new Error('Source account not found')
    if (from.balance < input.amount) throw new Error('Insufficient funds')
    const to = db.accounts.find((a) => a.accountNumber === input.toAccountNumber)

    from.balance -= input.amount
    const today = new Date().toISOString().slice(0, 10)
    db.transactions.unshift({
      id: `t${db.transactions.length + 1}`,
      accountId: from.id,
      date: today,
      description: to ? `Transfer to •••• ${to.accountNumber}` : `Transfer to •••• ${input.toAccountNumber}`,
      category: 'transfer',
      amount: input.amount,
      direction: 'debit',
    })

    if (to) {
      to.balance += input.amount
      db.transactions.unshift({
        id: `t${db.transactions.length + 2}`,
        accountId: to.id,
        date: today,
        description: `Transfer from •••• ${from.accountNumber}`,
        category: 'transfer',
        amount: input.amount,
        direction: 'credit',
      })
    }

    mockDB.set(db)
    return
  }
  await apiClient.post('/transfer', input)
}
