import type { Transaction } from '../types'
import { apiClient } from './client'

export async function getTransactions(accountId?: string): Promise<Transaction[]> {
  const res = await apiClient.get<Transaction[]>('/transactions', { params: { accountId } })
  return res.data
}

export interface TransferInput {
  fromAccountId: string
  toAccountNumber: string
  amount: number
  memo?: string
}

export async function transfer(input: TransferInput): Promise<void> {
  await apiClient.post('/transfer', input)
}
