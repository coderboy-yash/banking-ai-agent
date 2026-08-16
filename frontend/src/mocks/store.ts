import type { Account, Transaction, User } from '../types'
import { DEMO_EMAIL, DEMO_PASSWORD, seedAccounts, seedTransactions, seedUser } from './seed'

// Mock-only "backend" persisted to localStorage. Never a pattern for real auth —
// this exists purely so the frontend has believable, stateful data before the Go
// backend is wired up.

interface MockCredential {
  userId: string
  email: string
  password: string
}

export type MockAccount = Account & { ownerId: string }

interface MockDB {
  users: User[]
  credentials: MockCredential[]
  accounts: MockAccount[]
  transactions: Transaction[]
}

const STORAGE_KEY = 'yash_mock_db'

function seedDB(): MockDB {
  return {
    users: [seedUser],
    credentials: [{ userId: seedUser.id, email: DEMO_EMAIL, password: DEMO_PASSWORD }],
    accounts: seedAccounts.map((a) => ({ ...a, ownerId: seedUser.id })),
    transactions: seedTransactions,
  }
}

function load(): MockDB {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) {
    const fresh = seedDB()
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh))
    return fresh
  }
  return JSON.parse(raw) as MockDB
}

function save(db: MockDB) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db))
}

export const mockDB = {
  get: load,
  set: save,
}
