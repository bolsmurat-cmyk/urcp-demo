'use client'
import { useRouter } from 'next/navigation'
import AppShell from '@/components/AppShell'
import { ArrowLeft, PackageMinus, HardHat, Wrench, Trash2 } from 'lucide-react'

export default function IssuePage() {
  const router = useRouter()
  return (
    <AppShell>
      <div style={{ background: '#fff', padding: '12px 14px', borderBottom: '0.5px solid rgba(0,0,0,0.07)', display: 'flex', alignItems: 'center', gap: 10, position: 'sticky', top: 0, zIndex: 10 }}>
        <button onClick={() => router.back()} style={{ width: 34, height: 34, background: '#F4F6F5', border: '0.5px solid rgba(0,0,0,0.1)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <ArrowLeft size={16} color="#555" />
        </button>
        <span style={{ fontSize: 17, fontWeight: 500 }}>Issue stock</span>
      </div>

      <div style={{ padding: 14 }} className="animate-in">
        <div style={{ fontSize: 11, fontWeight: 500, color: '#999', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8 }}>Issue reason</div>
        <div style={{ background: '#fff', borderRadius: 14, border: '0.5px solid rgba(0,0,0,0.08)', overflow: 'hidden', marginBottom: 14 }}>
          {[
            { label: 'Project issue',    desc: 'Issued to a construction project',   icon: HardHat,     active: true  },
            { label: 'Consumption',      desc: 'Used / consumed on-site',             icon: PackageMinus,active: false },
            { label: 'Asset assignment', desc: 'Assigned to a fixed asset',           icon: Wrench,      active: false },
            { label: 'Disposal',         desc: 'Damaged or end-of-life disposal',     icon: Trash2,      active: false },
          ].map(({ label, desc, icon: Icon, active }) => (
            <button key={label} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', background: 'none', border: 'none', borderBottom: '0.5px solid rgba(0,0,0,0.06)', cursor: 'pointer', textAlign: 'left' }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: active ? '#E6F1FB' : '#F4F6F5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={18} color={active ? '#185FA5' : '#aaa'} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 500, color: active ? '#1a1a1a' : '#999' }}>{label}</div>
                <div style={{ fontSize: 12, color: '#bbb' }}>{desc}</div>
              </div>
              {active ? <span style={{ fontSize: 20, color: '#185FA5' }}>›</span> : <span className="badge badge-gray" style={{ fontSize: 10 }}>Soon</span>}
            </button>
          ))}
        </div>

        <div style={{ fontSize: 11, fontWeight: 500, color: '#999', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8 }}>Issue details</div>
        <div style={{ background: '#fff', borderRadius: 14, border: '0.5px solid rgba(0,0,0,0.08)', overflow: 'hidden', marginBottom: 14 }}>
          {[
            { label: 'From warehouse', placeholder: 'Select source warehouse' },
            { label: 'Product',        placeholder: 'Search or scan product'  },
            { label: 'Project / Area', placeholder: 'Select cost centre'      },
            { label: 'Reference',      placeholder: 'Work order / job number' },
          ].map(({ label, placeholder }, idx, arr) => (
            <div key={label} style={{ padding: '10px 14px', borderBottom: idx < arr.length-1 ? '0.5px solid rgba(0,0,0,0.06)' : 'none' }}>
              <div style={{ fontSize: 11, color: '#999', marginBottom: 4 }}>{label}</div>
              <div style={{ fontSize: 14, color: '#bbb' }}>{placeholder}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#FCEBEB', borderRadius: 12, padding: '12px 14px', marginBottom: 20, fontSize: 13, color: '#791F1F', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 18 }}>⚠</span>
          Stock issue is coming in Sprint 3. Core inventory and transfer flows are live now.
        </div>

        <button onClick={() => router.back()}
          style={{ width: '100%', height: 50, background: '#185FA5', color: '#fff', border: 'none', borderRadius: 12, fontSize: 16, fontWeight: 500, cursor: 'pointer' }}>
          Back to dashboard
        </button>
      </div>
    </AppShell>
  )
}
