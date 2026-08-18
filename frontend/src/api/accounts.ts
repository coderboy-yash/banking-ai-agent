import type { Account } from '../types'
import { apiClient } from './client'

export async function getAccounts(): Promise<Account[]> {
  const res = await apiClient.get<Account[]>('/accounts')
  return res.data
}
