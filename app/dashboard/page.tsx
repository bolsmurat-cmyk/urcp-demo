'use client'
import { useRouter } from 'next/navigation'
import AppShell from '@/components/AppShell'
import { useAuth } from '@/lib/auth'
import { ALERTS, ORGS, getKPIs, PRODUCTS, getProduct } from '@/lib/mockData'
import { Bell, TrendingUp, AlertTriangle, ClipboardCheck, ArrowLeftRight,
         PackageSearch, PackageOpen, PackageMinus, Search } from 'lucide-react'

export default function Dashboard() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const kpi = getKPIs()

  const initials = user?.name.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase() ?? 'JP'

  const alertIcon = (type: string) => {
    if (type === 'low_stock') return <AlertTriangle size={16} />
    if (type === 'approval')  return <ClipboardCheck size={16} />
    return <ArrowLeftRight size={16} />
  }

  const alertColor = (sev: string) => ({
    danger:  { bg: '#FCEBEB', color: '#A32D2D' },
    warning: { bg: '#FAEEDA', color: '#854F0B' },
    info:    { bg: '#E6F1FB', color: '#185FA5' },
  }[sev] ?? { bg: '#F1EFE8', color: '#5F5E5A' })

  return (
    <AppShell>
      {/* Top bar */}
      <div style={{ background: '#fff', padding: '12px 16px 14px', borderBottom: '0.5px solid rgba(0,0,0,0.07)', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button onClick={() => router.push('/more')}
            style={{ width: 36, height: 36, borderRadius: '50%', background: '#E1F5EE', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 500, color: '#0F6E56', cursor: 'pointer', flexShrink: 0 }}>
            {initials}
          </button>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, color: '#999' }}>Good morning,</div>
            <div style={{ fontSize: 16, fontWeight: 500, color: '#1a1a1a' }}>{user?.name}</div>
          </div>
          <div style={{ position: 'relative' }}>
            <button style={{ width: 36, height: 36, background: '#F4F6F5', border: '0.5px solid rgba(0,0,0,0.1)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <Bell size={18} color="#555" />
            </button>
            <div style={{ width: 8, height: 8, background: '#E24B4A', borderRadius: '50%', position: 'absolute', top: 6, right: 6, border: '1.5px solid #fff' }} />
          </div>
        </div>
        {/* Org filter pills */}
        <div style={{ display: 'flex', gap: 6, marginTop: 10, overflowX: 'auto', paddingBottom: 2 }}>
          {['All orgs', ...ORGS.map(o => o.name)].map((label, i) => (
            <button key={label} style={{ fontSize: 12, padding: '4px 12px', borderRadius: 20, border: '0.5px solid rgba(0,0,0,0.1)', whiteSpace: 'nowrap', background: i === 0 ? '#0F6E56' : '#fff', color: i === 0 ? '#fff' : '#555', cursor: 'pointer', flexShrink: 0 }}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: 14 }} className="animate-in">
        {/* KPI grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
          {[
            { label: 'Total inventory value', value: `$${kpi.totalValue.toLocaleString('en', { maximumFractionDigits: 0 })}`, sub: '↑ $2,140 this week', subColor: '#0F6E56' },
            { label: 'Products tracked',      value: '247',                     sub: 'across 4 warehouses',  subColor: '#999' },
            { label: 'Pending approvals',     value: kpi.pendingApprovals.toString(), sub: '3 urgent', subColor: '#BA7517' },
            { label: 'Movements today',       value: (kpi.todayIn + kpi.todayOut).toString(), sub: `${kpi.todayIn} in · ${kpi.todayOut} out`, subColor: '#999' },
          ].map(({ label, value, sub, subColor }) => (
            <div key={label} style={{ background: '#fff', borderRadius: 14, border: '0.5px solid rgba(0,0,0,0.08)', padding: '14px 14px 12px' }}>
              <div style={{ fontSize: 11, color: '#999', marginBottom: 6 }}>{label}</div>
              <div style={{ fontSize: 22, fontWeight: 500, color: '#1a1a1a', marginBottom: 3 }}>{value}</div>
              <div style={{ fontSize: 11, color: subColor, display: 'flex', alignItems: 'center', gap: 3 }}>
                {subColor === '#0F6E56' && <TrendingUp size={11} />}
                {sub}
              </div>
            </div>
          ))}
        </div>

        {/* Alerts */}
        <div style={{ fontSize: 11, fontWeight: 500, color: '#999', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8 }}>Alerts</div>
        <div style={{ background: '#fff', borderRadius: 14, border: '0.5px solid rgba(0,0,0,0.08)', overflow: 'hidden', marginBottom: 16 }}>
          {ALERTS.map((a, idx) => {
            const { bg, color } = alertColor(a.severity)
            const prod = getProduct(a.product_id)
            return (
              <button key={a.id} onClick={() => router.push(`/inventory?q=${prod?.name ?? ''}`)}
                style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', background: 'none', border: 'none', borderBottom: idx < ALERTS.length-1 ? '0.5px solid rgba(0,0,0,0.06)' : 'none', cursor: 'pointer', textAlign: 'left' }}>
                <div style={{ width: 34, height: 34, borderRadius: 8, background: bg, color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {alertIcon(a.type)}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: '#1a1a1a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{a.message}</div>
                  <div style={{ fontSize: 11, color: '#999', marginTop: 1 }}>{a.type === 'low_stock' ? 'Low stock alert' : a.type === 'approval' ? 'Approval required' : 'Transfer active'}</div>
                </div>
                <div style={{ fontSize: 18, color: '#ccc' }}>›</div>
              </button>
            )
          })}
        </div>

        {/* Quick actions */}
        <div style={{ fontSize: 11, fontWeight: 500, color: '#999', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8 }}>Quick actions</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
          {[
            { label: 'Receive stock',     icon: PackageOpen,   path: '/receiving',  bg: '#E1F5EE', color: '#0F6E56' },
            { label: 'Issue stock',       icon: PackageMinus,  path: '/issue',      bg: '#E6F1FB', color: '#185FA5' },
            { label: 'Transfer',          icon: ArrowLeftRight,path: '/transfer',   bg: '#FAEEDA', color: '#854F0B' },
            { label: 'Search inventory',  icon: Search,        path: '/inventory',  bg: '#F1EFE8', color: '#5F5E5A' },
          ].map(({ label, icon: Icon, path, bg, color }) => (
            <button key={label} onClick={() => router.push(path)}
              style={{ background: '#fff', border: '0.5px solid rgba(0,0,0,0.08)', borderRadius: 14, padding: '14px 12px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 10, cursor: 'pointer', textAlign: 'left' }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: bg, color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={18} />
              </div>
              <span style={{ fontSize: 13, fontWeight: 500, color: '#1a1a1a' }}>{label}</span>
            </button>
          ))}
        </div>

        {/* Recent products */}
        <div style={{ fontSize: 11, fontWeight: 500, color: '#999', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8 }}>Recent products</div>
        <div style={{ background: '#fff', borderRadius: 14, border: '0.5px solid rgba(0,0,0,0.08)', overflow: 'hidden', marginBottom: 24 }}>
          {PRODUCTS.slice(0,4).map((p, idx) => (
            <button key={p.id} onClick={() => router.push(`/inventory/${p.id}`)}
              style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px', background: 'none', border: 'none', borderBottom: idx < 3 ? '0.5px solid rgba(0,0,0,0.06)' : 'none', cursor: 'pointer', textAlign: 'left' }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: '#E1F5EE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <PackageSearch size={16} color="#0F6E56" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: '#1a1a1a' }}>{p.name}</div>
                <div style={{ fontSize: 11, color: '#999' }}>{p.code} · {p.category}</div>
              </div>
              <span className={`badge ${p.status === 'Approved' ? 'badge-ok' : 'badge-pending'}`}>{p.status === 'Approved' ? 'Approved' : 'Pending'}</span>
            </button>
          ))}
        </div>
      </div>
    </AppShell>
  )
}
