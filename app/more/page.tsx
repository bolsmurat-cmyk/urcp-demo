'use client'
import { useRouter } from 'next/navigation'
import AppShell from '@/components/AppShell'
import { useAuth } from '@/lib/auth'
import { ROLE_LABELS } from '@/lib/mockData'
import { LogOut, ChevronRight, Users, ClipboardList, BarChart2, Settings } from 'lucide-react'

export default function MorePage() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const initials = user?.name.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase() ?? ''

  const items = [
    { label: 'Users & roles',  icon: Users,         path: '/more',   badge: 'Soon' },
    { label: 'Audit log',      icon: ClipboardList, path: '/more',   badge: 'Soon' },
    { label: 'Reports',        icon: BarChart2,     path: '/more',   badge: 'Soon' },
    { label: 'Settings',       icon: Settings,      path: '/more',   badge: 'Soon' },
  ]

  return (
    <AppShell>
      <div style={{ padding: '20px 14px 14px' }} className="animate-in">
        {/* Profile card */}
        <div style={{ background: '#fff', borderRadius: 16, border: '0.5px solid rgba(0,0,0,0.08)', padding: '20px 16px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 52, height: 52, borderRadius: '50%', background: '#E1F5EE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 500, color: '#0F6E56', flexShrink: 0 }}>
            {initials}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 17, fontWeight: 500, color: '#1a1a1a' }}>{user?.name}</div>
            <div style={{ fontSize: 13, color: '#999', marginTop: 2 }}>{user?.email}</div>
            <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
              <span className="badge badge-ok">{user ? ROLE_LABELS[user.role] ?? user.role : ''}</span>
              <span className="badge badge-gray">{user?.org}</span>
            </div>
          </div>
        </div>

        {/* Menu */}
        <div style={{ background: '#fff', borderRadius: 14, border: '0.5px solid rgba(0,0,0,0.08)', overflow: 'hidden', marginBottom: 14 }}>
          {items.map(({ label, icon: Icon, badge }, idx) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 14px', borderBottom: idx < items.length-1 ? '0.5px solid rgba(0,0,0,0.06)' : 'none' }}>
              <Icon size={18} color="#555" />
              <span style={{ flex: 1, fontSize: 14, color: '#999' }}>{label}</span>
              <span className="badge badge-gray" style={{ fontSize: 10 }}>{badge}</span>
            </div>
          ))}
        </div>

        <button onClick={() => { logout(); router.push('/login') }}
          style={{ width: '100%', height: 50, background: '#fff', border: '0.5px solid #E24B4A', borderRadius: 12, fontSize: 15, fontWeight: 500, color: '#A32D2D', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer' }}>
          <LogOut size={18} />
          Sign out
        </button>

        <div style={{ textAlign: 'center', marginTop: 24, fontSize: 12, color: '#ccc' }}>
          URCP v1.0.0 · USCEM Group · Fast Track Demo
        </div>
      </div>
    </AppShell>
  )
}
