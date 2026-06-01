'use client'
import { useParams, useRouter } from 'next/navigation'
import AppShell from '@/components/AppShell'
import { getProduct, getInventoryForProduct, MOVEMENTS, getWarehouse } from '@/lib/mockData'
import { ArrowLeft, QrCode, MoreVertical, PackageOpen, PackageMinus, ArrowLeftRight, FileText, Award } from 'lucide-react'

const DOCS = [
  { name: 'Datasheet — FSD-400 Series', type: 'PDF', size: '2.1 MB', date: '12 Mar 2025', icon: FileText, bg: '#FAEEDA', color: '#854F0B' },
  { name: 'Warranty Certificate',        type: 'PDF', size: '0.8 MB', date: '12 Mar 2025', icon: Award,    bg: '#E1F5EE', color: '#0F6E56' },
]

export default function ProductDetail() {
  const { id }  = useParams<{ id: string }>()
  const router  = useRouter()
  const product = getProduct(id)
  const inv     = getInventoryForProduct(id)

  if (!product) return (
    <AppShell>
      <div style={{ padding: 32, textAlign: 'center', color: '#999' }}>Product not found</div>
    </AppShell>
  )

  const movements = MOVEMENTS.filter(m => m.product_id === id).slice(0, 5)
  const totalQty   = inv.reduce((s, i) => s + i.qty,          0)
  const totalXfer  = inv.reduce((s, i) => s + i.transferable, 0)
  const totalValue = inv.reduce((s, i) => s + i.total_value,  0)
  const avgCost    = inv[0]?.avg_cost ?? 0

  const mvBadge = (type: string) => ({
    IN:       { label: 'IN',    bg: '#E1F5EE', color: '#085041' },
    OUT:      { label: 'OUT',   bg: '#FCEBEB', color: '#791F1F' },
    TRANSFER: { label: 'XFER', bg: '#E6F1FB', color: '#0C447C' },
  }[type] ?? { label: type, bg: '#F1EFE8', color: '#555' })

  return (
    <AppShell>
      {/* Header */}
      <div style={{ background: '#fff', padding: '12px 14px 0', borderBottom: '0.5px solid rgba(0,0,0,0.07)', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <button onClick={() => router.back()} style={{ width: 34, height: 34, background: '#F4F6F5', border: '0.5px solid rgba(0,0,0,0.1)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <ArrowLeft size={16} color="#555" />
          </button>
          <span style={{ fontSize: 17, fontWeight: 500, flex: 1 }}>Product detail</span>
          <button style={{ width: 34, height: 34, background: '#F4F6F5', border: '0.5px solid rgba(0,0,0,0.1)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <QrCode size={16} color="#555" />
          </button>
          <button style={{ width: 34, height: 34, background: '#F4F6F5', border: '0.5px solid rgba(0,0,0,0.1)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <MoreVertical size={16} color="#555" />
          </button>
        </div>

        {/* Product hero */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, background: '#E1F5EE', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 28 }}>
            🔍
          </div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 500, color: '#1a1a1a', marginBottom: 3 }}>{product.name}</div>
            <div style={{ fontSize: 12, color: '#999', marginBottom: 6 }}>{product.code} · {product.category} · {product.unit}</div>
            <div style={{ display: 'flex', gap: 4 }}>
              <span className="badge badge-ok">Available</span>
              <span className="badge badge-danger">{product.criticality}</span>
              <span className="badge badge-info">{product.asset_type}</span>
            </div>
          </div>
        </div>

        {/* KPI strip */}
        <div style={{ display: 'flex', borderTop: '0.5px solid rgba(0,0,0,0.06)', marginLeft: -14, marginRight: -14 }}>
          {[
            { label: 'Total units',   value: totalQty.toString() },
            { label: 'Transferable',  value: totalXfer.toString() },
            { label: 'Avg cost',      value: `$${avgCost.toFixed(2)}` },
            { label: 'Total value',   value: `$${totalValue.toLocaleString('en', { maximumFractionDigits: 0 })}` },
          ].map(({ label, value }, i, arr) => (
            <div key={label} style={{ flex: 1, textAlign: 'center', padding: '10px 4px', borderRight: i < arr.length-1 ? '0.5px solid rgba(0,0,0,0.06)' : 'none' }}>
              <div style={{ fontSize: 17, fontWeight: 500, color: '#1a1a1a' }}>{value}</div>
              <div style={{ fontSize: 10, color: '#999', marginTop: 1 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: 14 }} className="animate-in">

        {/* Stock by org */}
        <div style={{ fontSize: 11, fontWeight: 500, color: '#999', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8 }}>Stock by organisation</div>
        <div style={{ background: '#fff', borderRadius: 14, border: '0.5px solid rgba(0,0,0,0.08)', overflow: 'hidden', marginBottom: 14 }}>
          {inv.map((row, idx) => (
            <div key={row.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 14px', borderBottom: idx < inv.length-1 ? '0.5px solid rgba(0,0,0,0.06)' : 'none' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: row.org.color, flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: '#1a1a1a' }}>{row.org.name}</div>
                <div style={{ fontSize: 11, color: '#999' }}>{row.warehouse.name} · {row.location}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 14, fontWeight: 500, color: row.qty <= 10 ? '#E24B4A' : '#1a1a1a' }}>{row.qty} units</div>
                <div style={{ fontSize: 11, color: '#bbb', marginBottom: 3 }}>${row.total_value.toLocaleString('en', { maximumFractionDigits: 0 })} value</div>
                {row.transferable > 0
                  ? <span style={{ fontSize: 10, fontWeight: 500, padding: '2px 6px', borderRadius: 3, background: '#E6F1FB', color: '#0C447C' }}>{row.transferable} transferable</span>
                  : <span style={{ fontSize: 10, padding: '2px 6px', borderRadius: 3, background: '#F1EFE8', color: '#999' }}>0 transferable</span>
                }
              </div>
            </div>
          ))}
        </div>

        {/* Documents */}
        <div style={{ fontSize: 11, fontWeight: 500, color: '#999', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8 }}>Documents</div>
        <div style={{ background: '#fff', borderRadius: 14, border: '0.5px solid rgba(0,0,0,0.08)', overflow: 'hidden', marginBottom: 14 }}>
          {DOCS.map(({ name, type, size, date, icon: Icon, bg, color }, idx) => (
            <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 14px', borderBottom: idx === 0 ? '0.5px solid rgba(0,0,0,0.06)' : 'none' }}>
              <div style={{ width: 34, height: 34, borderRadius: 8, background: bg, color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={16} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: '#1a1a1a' }}>{name}</div>
                <div style={{ fontSize: 11, color: '#999' }}>{type} · {size} · {date}</div>
              </div>
              <span style={{ fontSize: 20, color: '#ccc' }}>↓</span>
            </div>
          ))}
        </div>

        {/* Recent movements */}
        <div style={{ fontSize: 11, fontWeight: 500, color: '#999', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8 }}>Recent movements</div>
        <div style={{ background: '#fff', borderRadius: 14, border: '0.5px solid rgba(0,0,0,0.08)', overflow: 'hidden', marginBottom: 16 }}>
          {movements.length > 0 ? movements.map((m, idx) => {
            const { label, bg, color } = mvBadge(m.type)
            const wh = m.to_wh ? getWarehouse(m.to_wh) : m.from_wh ? getWarehouse(m.from_wh) : null
            return (
              <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderBottom: idx < movements.length-1 ? '0.5px solid rgba(0,0,0,0.06)' : 'none' }}>
                <span style={{ fontSize: 11, fontWeight: 500, padding: '2px 8px', borderRadius: 4, background: bg, color, minWidth: 40, textAlign: 'center', flexShrink: 0 }}>{label}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, color: '#1a1a1a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.note}</div>
                  <div style={{ fontSize: 11, color: '#999' }}>{m.date} · {m.user}</div>
                </div>
                <span style={{ fontSize: 13, fontWeight: 500, color: m.type === 'OUT' ? '#E24B4A' : m.type === 'IN' ? '#0F6E56' : '#185FA5', flexShrink: 0 }}>
                  {m.type === 'IN' ? '+' : m.type === 'OUT' ? '-' : ''}{m.qty}
                </span>
              </div>
            )
          }) : (
            <div style={{ padding: '20px 14px', textAlign: 'center', color: '#bbb', fontSize: 13 }}>No movements recorded yet</div>
          )}
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
          <button onClick={() => router.push('/receiving')}
            style={{ flex: 1, height: 46, background: '#fff', border: '0.5px solid rgba(0,0,0,0.15)', borderRadius: 12, fontSize: 13, fontWeight: 500, color: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, cursor: 'pointer' }}>
            <PackageOpen size={16} color="#0F6E56" /> Receive
          </button>
          <button onClick={() => router.push('/issue')}
            style={{ flex: 1, height: 46, background: '#fff', border: '0.5px solid rgba(0,0,0,0.15)', borderRadius: 12, fontSize: 13, fontWeight: 500, color: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, cursor: 'pointer' }}>
            <PackageMinus size={16} color="#185FA5" /> Issue
          </button>
          <button onClick={() => router.push(`/transfer?product=${product.id}`)}
            style={{ flex: 1, height: 46, background: '#0F6E56', border: 'none', borderRadius: 12, fontSize: 13, fontWeight: 500, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, cursor: 'pointer' }}>
            <ArrowLeftRight size={16} /> Transfer
          </button>
        </div>
      </div>
    </AppShell>
  )
}
