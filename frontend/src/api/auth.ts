import type { AuthResult, SignupInput } from '../types'
import { apiClient } from './client'

export async function login(email: string, password: string): Promise<AuthResult> {
  const res = await apiClient.post<AuthResult>('/login', { email, password })
  return res.data
}

export async function signup(input: SignupInput): Promise<AuthResult> {
  const res = await apiClient.post<AuthResult>('/signup', input)
  return res.data
}
