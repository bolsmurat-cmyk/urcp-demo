'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { MOCK_USERS } from '@/lib/mockData'

type User = { id: string; name: string; email: string; role: string; org: string }
type AuthCtx = { user: User | null; login: (email: string, pw: string) => boolean; logout: () => void }

const AuthContext = createContext<AuthCtx>({ user: null, login: () => false, logout: () => {} })

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const saved = sessionStorage.getItem('urcp_user')
    if (saved) setUser(JSON.parse(saved))
  }, [])

  const login = (email: string, pw: string): boolean => {
    const found = MOCK_USERS.find(u => u.email === email && u.password === pw)
    if (!found) return false
    const u: User = { id: found.id, name: found.name, email: found.email, role: found.role, org: found.org }
    setUser(u)
    sessionStorage.setItem('urcp_user', JSON.stringify(u))
    return true
  }

  const logout = () => {
    setUser(null)
    sessionStorage.removeItem('urcp_user')
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() { return useContext(AuthContext) }
