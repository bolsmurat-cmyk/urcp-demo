'use client'
import { useRouter, usePathname } from 'next/navigation'
import { Home, Package, ScanLine, ArrowLeftRight, MoreHorizontal } from 'lucide-react'

const NAV = [
  { label: 'Home',      icon: Home,             path: '/dashboard'  },
  { label: 'Inventory', icon: Package,           path: '/inventory'  },
  { label: 'Scan',      icon: ScanLine,          path: '/scan'       },
  { label: 'Movements', icon: ArrowLeftRight,    path: '/movements'  },
  { label: 'More',      icon: MoreHorizontal,    path: '/more'       },
]

export default function BottomNav() {
  const router   = useRouter()
  const pathname = usePathname()

  return (
    <nav style={{ background: '#fff', borderTop: '0.5px solid rgba(0,0,0,0.08)', display: 'flex', paddingBottom: 'env(safe-area-inset-bottom, 8px)' }}>
      {NAV.map(({ label, icon: Icon, path }) => {
        const active = pathname === path || (path !== '/dashboard' && pathname.startsWith(path))
        return (
          <button key={path} onClick={() => router.push(path)}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, fontSize: 10, padding: '10px 0 4px', background: 'none', border: 'none', cursor: 'pointer', color: active ? '#0F6E56' : '#888' }}>
            <Icon size={22} strokeWidth={active ? 2 : 1.5} />
            <span style={{ fontWeight: active ? 500 : 400 }}>{label}</span>
          </button>
        )
      })}
    </nav>
  )
}
