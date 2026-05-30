'use client'
import { useRouter } from 'next/navigation'
import AppShell from '@/components/AppShell'
import { ArrowLeft, PackageOpen, FileText, Upload } from 'lucide-react'

export default function ReceivingPage() {
  const router = useRouter()
  return (
    <AppShell>
      <div style={{ background: '#fff', padding: '12px 14px', borderBottom: '0.5px solid rgba(0,0,0,0.07)', display: 'flex', alignItems: 'center', gap: 10, position: 'sticky', top: 0, zIndex: 10 }}>
        <button onClick={() => router.back()} style={{ width: 34, height: 34, background: '#F4F6F5', border: '0.5px solid rgba(0,0,0,0.1)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <ArrowLeft size={16} color="#555" />
        </button>
        <span style={{ fontSize: 17, fontWeight: 500 }}>Receive stock</span>
      </div>

      <div style={{ padding: 14 }} className="animate-in">
        <div style={{ background: '#fff', borderRadius: 14, border: '0.5px solid rgba(0,0,0,0.08)', overflow: 'hidden', marginBottom: 14 }}>
          <div style={{ padding: '14px 14px 8px' }}>
            <div style={{ fontSize: 12, fontWeight: 500, color: '#999', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 10 }}>Receiving method</div>
            {[
              { label: 'Manual entry',     desc: 'Enter product and quantity manually', icon: PackageOpen, active: true },
              { label: 'Against document', desc: 'Match against Delivery Note or Invoice', icon: FileText, active: false },
              { label: 'Excel import',     desc: 'Upload a spreadsheet (.xlsx)',         icon: Upload,    active: false },
            ].map(({ label, desc, icon: Icon, active }) => (
              <button key={label} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', background: 'none', border: 'none', borderBottom: '0.5px solid rgba(0,0,0,0.06)', cursor: 'pointer', textAlign: 'left' }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: active ? '#E1F5EE' : '#F4F6F5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={18} color={active ? '#0F6E56' : '#aaa'} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 500, color: active ? '#1a1a1a' : '#999' }}>{label}</div>
                  <div style={{ fontSize: 12, color: '#bbb' }}>{desc}</div>
                </div>
                {active && <span style={{ fontSize: 20, color: '#0F6E56' }}>›</span>}
                {!active && <span className="badge badge-gray" style={{ fontSize: 10 }}>Soon</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Manual entry form */}
        <div style={{ fontSize: 11, fontWeight: 500, color: '#999', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8 }}>Receiving details</div>
        <div style={{ background: '#fff', borderRadius: 14, border: '0.5px solid rgba(0,0,0,0.08)', overflow: 'hidden', marginBottom: 14 }}>
          {[
            { label: 'Warehouse',  placeholder: 'Select destination warehouse' },
            { label: 'Product',    placeholder: 'Search or scan product' },
            { label: 'Supplier',   placeholder: 'Select supplier' },
            { label: 'Reference',  placeholder: 'GRN / Invoice number' },
          ].map(({ label, placeholder }, idx, arr) => (
            <div key={label} style={{ padding: '10px 14px', borderBottom: idx < arr.length-1 ? '0.5px solid rgba(0,0,0,0.06)' : 'none' }}>
              <div style={{ fontSize: 11, color: '#999', marginBottom: 4 }}>{label}</div>
              <div style={{ fontSize: 14, color: '#bbb' }}>{placeholder}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
          <div style={{ flex: 1, background: '#fff', borderRadius: 14, border: '0.5px solid rgba(0,0,0,0.08)', padding: '14px', textAlign: 'center' }}>
            <div style={{ fontSize: 11, color: '#999', marginBottom: 4 }}>Quantity</div>
            <div style={{ fontSize: 28, fontWeight: 500, color: '#1a1a1a' }}>—</div>
          </div>
          <div style={{ flex: 1, background: '#fff', borderRadius: 14, border: '0.5px solid rgba(0,0,0,0.08)', padding: '14px', textAlign: 'center' }}>
            <div style={{ fontSize: 11, color: '#999', marginBottom: 4 }}>Unit cost</div>
            <div style={{ fontSize: 28, fontWeight: 500, color: '#1a1a1a' }}>—</div>
          </div>
        </div>

        <div style={{ background: '#E6F1FB', borderRadius: 12, padding: '12px 14px', marginBottom: 20, fontSize: 13, color: '#185FA5', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 18 }}>ℹ</span>
          This screen is coming in Sprint 3. Transfer and Inventory Search are fully functional.
        </div>

        <button onClick={() => router.back()}
          style={{ width: '100%', height: 50, background: '#0F6E56', color: '#fff', border: 'none', borderRadius: 12, fontSize: 16, fontWeight: 500, cursor: 'pointer' }}>
          Back to dashboard
        </button>
      </div>
    </AppShell>
  )
}
