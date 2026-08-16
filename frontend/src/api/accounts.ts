import type { Account } from '../types'
import { apiClient, mockDelay, USE_MOCK } from './client'
import { mockDB } from '../mocks/store'

function toAccount(a: Account & { ownerId: string }): Account {
  const { id, type, accountNumber, balance, currency } = a
  return { id, type, accountNumber, balance, currency }
}

export async function getAccounts(userId: string): Promise<Account[]> {
  if (USE_MOCK) {
    await mockDelay()
    const db = mockDB.get()
    return db.accounts.filter((a) => a.ownerId === userId).map(toAccount)
  }
  const res = await apiClient.get<Account[]>('/accounts')
  return res.data
}
