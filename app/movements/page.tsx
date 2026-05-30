'use client'
import AppShell from '@/components/AppShell'
import { useRouter } from 'next/navigation'
import { MOVEMENTS, getProduct, getWarehouse } from '@/lib/mockData'
import { ArrowLeft } from 'lucide-react'

const TYPE_STYLE: Record<string, {bg:string,color:string,label:string}> = {
  IN:       { bg: '#E1F5EE', color: '#085041', label: 'IN'   },
  OUT:      { bg: '#FCEBEB', color: '#791F1F', label: 'OUT'  },
  TRANSFER: { bg: '#E6F1FB', color: '#0C447C', label: 'XFER' },
}

export default function MovementsPage() {
  const router = useRouter()
  return (
    <AppShell>
      <div style={{ background: '#fff', padding: '12px 14px', borderBottom: '0.5px solid rgba(0,0,0,0.07)', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ fontSize: 17, fontWeight: 500 }}>Movements</div>
        <div style={{ fontSize: 13, color: '#999', marginTop: 2 }}>All organisations · Last 30 days</div>
      </div>
      <div style={{ padding: 14 }} className="animate-in">
        <div style={{ background: '#fff', borderRadius: 14, border: '0.5px solid rgba(0,0,0,0.08)', overflow: 'hidden' }}>
          {MOVEMENTS.map((m, idx) => {
            const prod = getProduct(m.product_id)
            const { bg, color, label } = TYPE_STYLE[m.type] ?? { bg: '#F1EFE8', color: '#555', label: m.type }
            const wh = m.to_wh ? getWarehouse(m.to_wh) : m.from_wh ? getWarehouse(m.from_wh) : null
            return (
              <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 14px', borderBottom: idx < MOVEMENTS.length-1 ? '0.5px solid rgba(0,0,0,0.06)' : 'none' }}>
                <span style={{ fontSize: 11, fontWeight: 500, padding: '2px 8px', borderRadius: 4, background: bg, color, minWidth: 40, textAlign: 'center', flexShrink: 0 }}>{label}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: '#1a1a1a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{prod?.name}</div>
                  <div style={{ fontSize: 11, color: '#999' }}>{m.date} · {m.user}</div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: m.type === 'OUT' ? '#E24B4A' : m.type === 'IN' ? '#0F6E56' : '#185FA5' }}>
                    {m.type === 'IN' ? '+' : m.type === 'OUT' ? '-' : ''}{m.qty}
                  </div>
                  <div style={{ fontSize: 10, color: '#bbb' }}>{wh?.name?.slice(0,12)}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </AppShell>
  )
}
