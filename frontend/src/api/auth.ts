import type { AuthResult } from '../types'
import { apiClient, mockDelay, USE_MOCK } from './client'
import { mockDB } from '../mocks/store'

function makeMockToken(userId: string) {
  return `mock.${userId}.${Date.now()}`
}

export async function login(email: string, password: string): Promise<AuthResult> {
  if (USE_MOCK) {
    await mockDelay()
    const db = mockDB.get()
    const cred = db.credentials.find((c) => c.email === email && c.password === password)
    if (!cred) throw new Error('Invalid email or password')
    const user = db.users.find((u) => u.id === cred.userId)!
    return { token: makeMockToken(user.id), user }
  }
  const res = await apiClient.post<AuthResult>('/login', { email, password })
  return res.data
}

export async function signup(name: string, email: string, password: string): Promise<AuthResult> {
  if (USE_MOCK) {
    await mockDelay()
    const db = mockDB.get()
    if (db.credentials.some((c) => c.email === email)) {
      throw new Error('An account with that email already exists')
    }
    const userId = `u${db.users.length + 1}`
    const user = { id: userId, name, email, memberSince: new Date().toISOString().slice(0, 10) }
    db.users.push(user)
    db.credentials.push({ userId, email, password })
    db.accounts.push({
      id: `a${db.accounts.length + 1}`,
      ownerId: userId,
      type: 'checking',
      accountNumber: String(Math.floor(1000 + Math.random() * 8999)),
      balance: 500,
      currency: 'USD',
    })
    mockDB.set(db)
    return { token: makeMockToken(userId), user }
  }
  const res = await apiClient.post<AuthResult>('/signup', { name, email, password })
  return res.data
}
