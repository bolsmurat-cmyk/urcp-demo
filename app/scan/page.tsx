'use client'
import AppShell from '@/components/AppShell'
import { useRouter } from 'next/navigation'
import { ScanLine } from 'lucide-react'

export default function ScanPage() {
  const router = useRouter()
  return (
    <AppShell>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80dvh', padding: 32, textAlign: 'center' }}>
        <div style={{ width: 80, height: 80, borderRadius: 20, background: '#E1F5EE', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
          <ScanLine size={40} color="#0F6E56" />
        </div>
        <div style={{ fontSize: 20, fontWeight: 500, color: '#1a1a1a', marginBottom: 8 }}>QR Scanner</div>
        <div style={{ fontSize: 14, color: '#999', maxWidth: 260, marginBottom: 24 }}>
          Camera-based QR scanning will be available in the next sprint. Products and locations will generate scannable QR codes.
        </div>
        <span className="badge badge-info" style={{ fontSize: 13, padding: '6px 16px' }}>Coming in Sprint 2</span>
        <button onClick={() => router.push('/inventory')} style={{ marginTop: 24, background: '#0F6E56', color: '#fff', border: 'none', borderRadius: 12, padding: '12px 24px', fontSize: 15, fontWeight: 500, cursor: 'pointer' }}>
          Search inventory instead
        </button>
      </div>
    </AppShell>
  )
}
