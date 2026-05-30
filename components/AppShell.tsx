'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth'
import BottomNav from '@/components/BottomNav'

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const router   = useRouter()

  useEffect(() => {
    if (!user) router.replace('/login')
  }, [user, router])

  if (!user) return null

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100dvh', maxWidth: 480, margin: '0 auto', background: '#F4F6F5' }}>
      <div style={{ flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}>
        {children}
      </div>
      <BottomNav />
    </div>
  )
}
