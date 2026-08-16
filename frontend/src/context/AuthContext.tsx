import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { User } from '../types'
import * as authApi from '../api/auth'

interface AuthContextValue {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('meridian_user')
    if (stored) setUser(JSON.parse(stored))
    setLoading(false)
  }, [])

  function persist(token: string, user: User) {
    localStorage.setItem('meridian_token', token)
    localStorage.setItem('meridian_user', JSON.stringify(user))
    setUser(user)
  }

  async function login(email: string, password: string) {
    const result = await authApi.login(email, password)
    persist(result.token, result.user)
  }

  async function signup(name: string, email: string, password: string) {
    const result = await authApi.signup(name, email, password)
    persist(result.token, result.user)
  }

  function logout() {
    localStorage.removeItem('meridian_token')
    localStorage.removeItem('meridian_user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
